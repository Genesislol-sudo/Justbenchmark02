import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Gauge, Sparkles, TriangleAlert } from "lucide-react";

import { TIER_LABEL, type Tier } from "@/lib/parts";
import { USE_CASES, recommend, type UseCase } from "@/lib/recommender";
import { TierBadge } from "@/components/TierBadge";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Build Recommender — Pick Your PC Parts | JustBenchmarks" },
      {
        name: "description",
        content:
          "Choose a budget level and what you use a PC for, and get a full recommended parts list with a reason for every choice.",
      },
      { property: "og:title", content: "Build Recommender — Pick Your PC Parts" },
      {
        property: "og:description",
        content: "Cheap, mid-range or expensive builds for gaming, editing, programming and study.",
      },
    ],
  }),
  component: BuilderPage,
});

const TIERS: Tier[] = ["budget", "mid", "high"];

const tierBlurb: Record<Tier, string> = {
  budget: "Get it working well, spend as little as possible",
  mid: "The sweet spot most people should aim for",
  high: "No compromises, top of the range",
};

function OptionButton({
  active,
  title,
  subtitle,
  onClick,
}: {
  active: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition-all ${
        active
          ? "border-primary bg-primary/10 glow-cyan"
          : "border-border bg-surface-2 hover:border-primary/50"
      }`}
    >
      <div className="font-display font-bold">{title}</div>
      <div className="mt-1 text-xs leading-snug text-muted-foreground">{subtitle}</div>
    </button>
  );
}

function BuilderPage() {
  const [useCase, setUseCase] = useState<UseCase>("gaming");
  const [tier, setTier] = useState<Tier>("mid");

  const rec = useMemo(() => recommend(useCase, tier), [useCase, tier]);

  return (
    <div className="circuit-bg min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10">
          <div className="numeric text-xs uppercase tracking-widest text-muted-foreground">Tool 02</div>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Build Recommender</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Two questions, one complete parts list. No prices — just how expensive each part sits.
          </p>
        </header>

        <section className="panel mb-6 space-y-6 p-6">
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              1. What will you use it for?
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {USE_CASES.map((u) => (
                <OptionButton
                  key={u.id}
                  active={useCase === u.id}
                  title={u.name}
                  subtitle={u.blurb}
                  onClick={() => setUseCase(u.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              2. How much do you want to spend?
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {TIERS.map((t) => (
                <OptionButton
                  key={t}
                  active={tier === t}
                  title={TIER_LABEL[t]}
                  subtitle={tierBlurb[t]}
                  onClick={() => setTier(t)}
                />
              ))}
            </div>
          </div>
        </section>

        <section key={`${useCase}-${tier}`} className="animate-rise space-y-6">
          <div className="panel flex flex-wrap items-center justify-between gap-4 p-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Recommended</div>
              <h2 className="mt-1 text-2xl font-bold">{rec.headline}</h2>
            </div>
            <Link
              to="/benchmark"
              search={{
                cpu: rec.selection.cpu.id,
                gpu: rec.selection.gpu.id,
                ram: rec.selection.ram.id,
                storage: rec.selection.storage.id,
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Gauge className="size-4" /> Benchmark this build
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {rec.parts.map((p, i) => (
              <article
                key={p.category}
                className="panel animate-rise p-5"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {p.category}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold">{p.name}</h3>
                  </div>
                  <TierBadge tier={p.tier} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.why}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="panel p-6">
              <h3 className="flex items-center gap-2 font-bold">
                <Sparkles className="size-4 text-tier-budget" /> What it does well
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {rec.strengths.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-tier-budget" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel p-6">
              <h3 className="flex items-center gap-2 font-bold">
                <TriangleAlert className="size-4 text-tier-mid" /> Trade-offs to know
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {rec.tradeoffs.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-tier-mid" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
