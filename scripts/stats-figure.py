"""Render public/images/robostats/stats.png: coverage of 95% binomial intervals at n=50.

Curves for Wilson, Agresti-Coull and Clopper-Pearson are computed by exact enumeration
(same estimand as robostats/validation/coverage.py) and cross-checked against the committed
downsampled CSVs in the robostats repo. The Wald curve is computed here only; robostats
does not implement Wald.

Usage:
  python3 scripts/stats-figure.py --coverage-dir ../robostats/results/coverage --fonts ./fonts
"""
from __future__ import annotations

import argparse
import csv
import sys
from pathlib import Path

import numpy as np
from scipy import stats
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager

N = 50
LEVEL = 0.95
Z = stats.norm.ppf(1 - (1 - LEVEL) / 2)

BG, INK, MUTED, RULE = "#F6F3EC", "#15130F", "#6E675C", "#D9D3C7"
COLORS = {  # validated with the dataviz palette checker against BG
    "wald": "#C8471A",
    "clopper_pearson": "#2a78d6",
    "wilson": "#1baf7a",
    "agresti_coull": "#eda100",
}
LABELS = {
    "wald": "Wald, the naive ±z·√(p̂(1−p̂)/n) everyone quotes (not in robostats)",
    "clopper_pearson": "Clopper-Pearson",
    "wilson": "Wilson",
    "agresti_coull": "Agresti-Coull",
}


def grid() -> np.ndarray:
    lin = np.linspace(0.001, 0.999, 1999)
    lo = np.logspace(np.log10(1e-6), np.log10(0.01), 200)
    return np.unique(np.concatenate([lin, lo, 1 - lo]))


def bounds(method: str, x: np.ndarray, n: int) -> tuple[np.ndarray, np.ndarray]:
    phat = x / n
    if method == "wald":
        se = np.sqrt(phat * (1 - phat) / n)
        return phat - Z * se, phat + Z * se
    if method == "wilson":
        denom = 1 + Z**2 / n
        centre = (phat + Z**2 / (2 * n)) / denom
        half = Z * np.sqrt(phat * (1 - phat) / n + Z**2 / (4 * n**2)) / denom
        return centre - half, centre + half
    if method == "agresti_coull":
        nt = n + Z**2
        pt = (x + Z**2 / 2) / nt
        half = Z * np.sqrt(pt * (1 - pt) / nt)
        return pt - half, pt + half
    if method == "clopper_pearson":
        lo = np.where(x == 0, 0.0, stats.beta.ppf((1 - LEVEL) / 2, x, n - x + 1))
        hi = np.where(x == n, 1.0, stats.beta.ppf(1 - (1 - LEVEL) / 2, x + 1, n - x))
        return lo, hi
    raise ValueError(method)


def coverage(method: str, p: np.ndarray, n: int) -> np.ndarray:
    x = np.arange(n + 1)
    lo, hi = bounds(method, x, n)
    pmf = stats.binom.pmf(x[None, :], n, p[:, None])  # (len(p), n+1)
    contained = (lo[None, :] <= p[:, None]) & (p[:, None] <= hi[None, :])
    return (pmf * contained).sum(axis=1)


def crosscheck(method: str, p: np.ndarray, cov: np.ndarray, csv_path: Path) -> None:
    rows = [r for r in csv.reader(csv_path.open()) if r and not r[0].startswith("#")]
    rows = rows[1:]  # header p,coverage
    ref_p = np.array([float(r[0]) for r in rows])
    ref_c = np.array([float(r[1]) for r in rows])
    ours = np.interp(ref_p, p, cov)
    exact = np.isin(ref_p, p)
    diff = np.abs(ours[exact] - ref_c[exact]).max()
    print(f"{method:16s} {exact.sum():3d}/{len(ref_p)} grid points matched, max |diff| = {diff:.2e}")
    if diff > 1e-9:
        print("  disagreement with committed curve; stopping.", file=sys.stderr)
        sys.exit(1)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--coverage-dir", type=Path, default=None)
    ap.add_argument("--fonts", type=Path, default=None)
    ap.add_argument("--out", type=Path, default=Path("public/images/robostats/stats.png"))
    args = ap.parse_args()

    if args.fonts:
        for f in args.fonts.rglob("IBMPlexMono-*.ttf"):
            font_manager.fontManager.addfont(str(f))
        plt.rcParams["font.family"] = "IBM Plex Mono"

    p = grid()
    curves = {m: coverage(m, p, N) for m in COLORS}
    if args.coverage_dir:
        for m in ("wilson", "agresti_coull", "clopper_pearson"):
            crosscheck(m, p, curves[m], args.coverage_dir / f"{m}-n{N}-{LEVEL:.2f}.csv")

    fig, ax = plt.subplots(figsize=(16, 9), dpi=150)
    fig.patch.set_facecolor(BG)
    ax.set_facecolor(BG)

    order = ["agresti_coull", "wilson", "clopper_pearson", "wald"]  # draw Wald last, on top
    for m in order:
        ax.plot(p, curves[m], color=COLORS[m], lw=1.4 if m != "wald" else 1.9, solid_joinstyle="miter")

    ax.axhline(LEVEL, color=INK, lw=0.8, ls=(0, (1, 3)))
    ax.text(0.995, LEVEL - 0.004, "nominal 95%", ha="right", va="top", color=INK, fontsize=11)

    # legend as a colored text column in the empty band below the curves
    x0, y0, dy = 0.30, 0.875, 0.018
    for i, m in enumerate(["clopper_pearson", "wilson", "agresti_coull", "wald"]):
        ax.plot([x0 - 0.035, x0 - 0.01], [y0 - i * dy] * 2, color=COLORS[m], lw=2.2,
                solid_capstyle="butt")
        ax.text(x0, y0 - i * dy, LABELS[m], ha="left", va="center", color=COLORS[m],
                fontsize=11.5, fontweight="medium")
    ax.text(x0, y0 - 4 * dy - 0.004,
            "Wald falls to 0 coverage as p → 0 or 1 (clipped below 0.78).",
            ha="left", va="center", color=MUTED, fontsize=10.5)

    ax.set_xlim(0, 1)
    ax.set_ylim(0.78, 1.003)
    ax.set_xlabel("true success probability p", color=MUTED, fontsize=12, labelpad=10)
    ax.set_ylabel("actual coverage of a nominal 95% interval", color=MUTED, fontsize=12, labelpad=10)
    ax.set_xticks([0, 0.25, 0.5, 0.75, 1])
    ax.set_yticks([0.80, 0.85, 0.90, 0.95, 1.00])
    ax.tick_params(colors=MUTED, labelsize=11, length=0)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    for s in ("left", "bottom"):
        ax.spines[s].set_color(RULE)
    ax.grid(axis="y", color=RULE, lw=0.6)

    fig.text(0.07, 0.95, f"Same success rate, different honesty.  n = {N} rollouts per task",
             color=INK, fontsize=18, fontweight="medium", ha="left", va="top")
    fig.text(0.07, 0.905,
             "Coverage computed by exact enumeration over x = 0..n at every p. "
             "Wilson, Agresti-Coull and Clopper-Pearson curves match robostats/results/coverage.",
             color=MUTED, fontsize=11, ha="left", va="top")
    fig.text(0.93, 0.03, "robostats", color=MUTED, fontsize=11, ha="right", va="bottom")

    fig.subplots_adjust(left=0.07, right=0.93, top=0.84, bottom=0.11)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(args.out, facecolor=BG)
    fig.savefig(args.out.with_suffix(".svg"), facecolor=BG)
    print("wrote", args.out)


if __name__ == "__main__":
    main()
