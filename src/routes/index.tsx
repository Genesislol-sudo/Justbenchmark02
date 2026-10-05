import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge, Wrench, ArrowRight, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JustBenchmarks — PC Benchmark & Build Lab" },
      {
        name: "description",
        content:
          "Score your PC specs against reference builds, estimate game FPS, and get a recommended parts list for your budget and use case.",
      },
      { property: "og:title", content: "JustBenchmarks — PC Benchmark & Build Lab" },
      {
        property: "og:description",
        content: "Two interactive PC hardware tools: a benchmark dashboard and a build recommender.",
      },
    ],
  }),
  component: Home,
});

const tools = [
  {
    to: "/benchmark" as const,
    icon: Gauge,
    kicker: "Tool 01",
    title: "Benchmark Dashboard",
    body: "Enter your CPU, GPU, RAM and storage. Get a performance score, charts against reference builds, estimated FPS in real games and a bottleneck check.",
    cta: "Score my PC",
  },
  {
    to: "/builder" as const,
    icon: Wrench,
    kicker: "Tool 02",
    title: "Build Recommender",
    body: "Pick a budget level and what you use a PC for. Get a full parts list — CPU to cooling — with a plain-English reason for every choice.",
    cta: "Build my PC",
  },
];

function Home() {
  return (
    <div className="circuit-bg">
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.82_0.15_197/0.16),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
            <Zap className="size-3.5" /> School Tech Fest — Hardware Lab
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] sm:text-7xl">
            Know what your <span className="text-gradient-brand">PC</span> can really do
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Two tools in one lab. Score the machine you already own, or design the one you want — with no
            prices, just clear <span className="text-tier-budget">cheap</span> /{" "}
            <span className="text-tier-mid">mid-range</span> / <span className="text-tier-high">expensive</span>{" "}
            labels.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/benchmark"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Score my PC <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Recommend a build
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-2">
        {tools.map((t, i) => (
          <Link
            key={t.to}
            to={t.to}
            className="panel group animate-rise relative overflow-hidden p-8 transition-all hover:-translate-y-1 hover:glow-cyan"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <div className="numeric text-xs uppercase tracking-widest text-muted-foreground">{t.kicker}</div>
            <t.icon className="mt-5 size-9 text-primary" />
            <h2 className="mt-4 text-2xl font-bold">{t.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              {t.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="panel grid gap-6 p-8 sm:grid-cols-3">
          {[
            { k: "40+", v: "Real components rated" },
            { k: "4", v: "Game FPS estimates" },
            { k: "0", v: "Prices, ever" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="numeric text-4xl font-bold text-primary">{s.k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
