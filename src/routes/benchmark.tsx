import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,

  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, CheckCircle2, Cpu as CpuIcon, HardDrive, MemoryStick, Monitor } from "lucide-react";

import {
  CPUS,
  GPUS,
  RAM_OPTIONS,
  STORAGE_OPTIONS,
  DEFAULT_SELECTION,
  REFERENCE_BUILDS,
  TIER_LABEL,
  computeBenchmark,
  type Selection,
} from "@/lib/parts";
import { TierBadge } from "@/components/TierBadge";
import { useCountUp } from "@/hooks/useCountUp";

type SearchParams = { cpu: string; gpu: string; ram: string; storage: string };

const asId = (v: unknown, fallback: string) => (typeof v === "string" && v ? v : fallback);

export const Route = createFileRoute("/benchmark")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    cpu: asId(search["cpu"], DEFAULT_SELECTION.cpu.id),
    gpu: asId(search["gpu"], DEFAULT_SELECTION.gpu.id),
    ram: asId(search["ram"], DEFAULT_SELECTION.ram.id),
    storage: asId(search["storage"], DEFAULT_SELECTION.storage.id),
  }),
  head: () => ({
    meta: [
      { title: "Benchmark Dashboard — Score Your PC Specs | JustBenchmarks" },
      {
        name: "description",
        content:
          "Pick your CPU, GPU, RAM and storage to get a performance score, comparison charts, estimated game FPS and a bottleneck check.",
      },
      { property: "og:title", content: "Benchmark Dashboard — Score Your PC Specs" },
      {
        property: "og:description",
        content: "Compare your PC against cheap, mid-range and expensive reference builds.",
      },
    ],
  }),
  component: BenchmarkPage,
});

const selectCls =
  "w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary";

function Field({
  label,
  icon: Icon,
  value,
  onChange,
  options,
}: {
  label: string;
  icon: React.ElementType;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; name: string; tier: keyof typeof TIER_LABEL }[];
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </span>
      <select className={selectCls} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name} — {TIER_LABEL[o.tier]}
          </option>
        ))}
      </select>
    </label>
  );
}

function ScoreRing({ score }: { score: number }) {
  const animated = useCountUp(score);
  const pct = Math.min(100, animated);
  return (
    <div className="relative flex size-44 items-center justify-center">
      <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
        <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="var(--brand-cyan)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * 326.7} 326.7`}
        />
      </svg>
      <div className="text-center">
        <div className="numeric text-5xl font-bold text-primary">{Math.round(animated)}</div>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">/ 100</div>
      </div>
    </div>
  );
}

const tooltipStyle = {
  backgroundColor: "var(--surface-2)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "var(--foreground)",
};

function BenchmarkPage() {
  const search = Route.useSearch();

  const [cpuId, setCpuId] = useState(search.cpu ?? DEFAULT_SELECTION.cpu.id);
  const [gpuId, setGpuId] = useState(search.gpu ?? DEFAULT_SELECTION.gpu.id);
  const [ramId, setRamId] = useState(search.ram ?? DEFAULT_SELECTION.ram.id);
  const [storageId, setStorageId] = useState(search.storage ?? DEFAULT_SELECTION.storage.id);

  const selection: Selection = useMemo(
    () => ({
      cpu: CPUS.find((c) => c.id === cpuId) ?? DEFAULT_SELECTION.cpu,
      gpu: GPUS.find((g) => g.id === gpuId) ?? DEFAULT_SELECTION.gpu,
      ram: RAM_OPTIONS.find((r) => r.id === ramId) ?? DEFAULT_SELECTION.ram,
      storage: STORAGE_OPTIONS.find((s) => s.id === storageId) ?? DEFAULT_SELECTION.storage,
    }),
    [cpuId, gpuId, ramId, storageId],
  );

  const result = useMemo(() => computeBenchmark(selection), [selection]);

  const comparison = useMemo(
    () => [
      { name: "Your PC", score: result.overall, self: true },
      ...REFERENCE_BUILDS.map((b) => ({
        name: TIER_LABEL[b.tier],
        score: computeBenchmark(b.selection).overall,
        self: false,
      })),
    ],
    [result.overall],
  );

  const radarData = [
    { axis: "CPU", value: result.cpu },
    { axis: "GPU", value: result.gpu },
    { axis: "Memory", value: result.ram },
    { axis: "Storage", value: result.storage },
  ];

  return (
    <div className="circuit-bg min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10">
          <div className="numeric text-xs uppercase tracking-widest text-muted-foreground">Tool 01</div>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Benchmark Dashboard</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Choose the parts inside your PC. Everything updates instantly — nothing is saved.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="panel h-fit space-y-5 p-6 lg:sticky lg:top-20">
            <h2 className="text-lg font-bold">Your specs</h2>
            <Field label="Processor" icon={CpuIcon} value={cpuId} onChange={setCpuId} options={CPUS} />
            <Field label="Graphics card" icon={Monitor} value={gpuId} onChange={setGpuId} options={GPUS} />
            <Field label="Memory" icon={MemoryStick} value={ramId} onChange={setRamId} options={RAM_OPTIONS} />
            <Field label="Storage" icon={HardDrive} value={storageId} onChange={setStorageId} options={STORAGE_OPTIONS} />
            <p className="text-xs leading-relaxed text-muted-foreground">{selection.storage.note}</p>
          </aside>

          <div className="space-y-6">
            <section className="panel flex flex-col items-center gap-8 p-8 sm:flex-row">
              <ScoreRing score={result.overall} />
              <div className="flex-1 space-y-4 text-center sm:text-left">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Overall rating</div>
                  <div className="mt-1 flex items-center justify-center gap-3 sm:justify-start">
                    <h2 className="text-3xl font-bold">{TIER_LABEL[result.tier]} class</h2>
                    <TierBadge tier={result.tier} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { l: "CPU", v: result.cpu },
                    { l: "GPU", v: result.gpu },
                    { l: "RAM", v: result.ram },
                    { l: "Disk", v: result.storage },
                  ].map((s) => (
                    <div key={s.l} className="rounded-lg bg-surface-2 p-3">
                      <div className="numeric text-2xl font-bold">{s.v}</div>
                      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section
              className={`panel flex items-start gap-4 p-6 ${
                result.bottleneck.kind === "none" ? "border-tier-budget/40" : "border-tier-mid/50"
              }`}
            >
              {result.bottleneck.kind === "none" ? (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-tier-budget" />
              ) : (
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-tier-mid" />
              )}
              <div>
                <h3 className="font-bold">
                  {result.bottleneck.kind === "none" ? "Balanced build" : "Bottleneck detected"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{result.bottleneck.message}</p>
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              <section className="panel p-6">
                <h3 className="mb-4 font-bold">Versus reference builds</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={comparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--surface-2)" }} />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                      {comparison.map((d) => (
                        <Cell key={d.name} fill={d.self ? "var(--brand-cyan)" : "var(--chart-5)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </section>

              <section className="panel p-6">
                <h3 className="mb-4 font-bold">Build balance</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={radarData} outerRadius="72%">
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="axis" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />

                    <Radar
                      dataKey="value"
                      stroke="var(--brand-amber)"
                      fill="var(--brand-amber)"
                      fillOpacity={0.35}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                  </RadarChart>
                </ResponsiveContainer>
              </section>
            </div>

            <section className="panel p-6">
              <h3 className="mb-1 font-bold">Estimated frames per second</h3>
              <p className="mb-4 text-xs text-muted-foreground">High settings. Real results vary by driver and game version.</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={result.fps} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="game"
                    width={150}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--surface-2)" }} />
                  <Bar dataKey="fps1080" name="1080p" fill="var(--brand-cyan)" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="fps1440" name="1440p" fill="var(--brand-magenta)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 flex gap-5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-sm bg-cyan" /> 1080p
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-sm bg-magenta" /> 1440p
                </span>
              </div>
            </section>

            <section className="panel p-6">
              <h3 className="mb-4 font-bold">Workload ratings</h3>
              <div className="space-y-4">
                {result.workloadScores.map((w) => (
                  <div key={w.id}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span>{w.name}</span>
                      <span className="numeric font-bold text-primary">{w.score}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-700"
                        style={{ width: `${Math.min(100, w.score)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
