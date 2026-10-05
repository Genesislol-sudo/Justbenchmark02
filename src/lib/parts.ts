export type Tier = "budget" | "mid" | "high";

export const TIER_LABEL: Record<Tier, string> = {
  budget: "Cheap",
  mid: "Mid-range",
  high: "Expensive",
};

export type Cpu = {
  id: string;
  name: string;
  brand: "AMD" | "Intel";
  tier: Tier;
  cores: number;
  threads: number;
  /** 0-100 relative single+multi blended rating */
  score: number;
  gamingScore: number;
  productivityScore: number;
};

export type Gpu = {
  id: string;
  name: string;
  brand: "NVIDIA" | "AMD" | "Intel";
  tier: Tier;
  vram: number;
  /** 0-100 relative raster rating */
  score: number;
};

export type RamOption = {
  id: string;
  name: string;
  tier: Tier;
  capacity: number;
  score: number;
}

export type StorageOption = {
  id: string;
  name: string;
  tier: Tier;
  score: number;
  note: string;
};

export const CPUS: Cpu[] = [
  { id: "i3-12100f", name: "Intel Core i3-12100F", brand: "Intel", tier: "budget", cores: 4, threads: 8, score: 34, gamingScore: 44, productivityScore: 26 },
  { id: "r5-5500", name: "AMD Ryzen 5 5500", brand: "AMD", tier: "budget", cores: 6, threads: 12, score: 38, gamingScore: 40, productivityScore: 36 },
  { id: "i5-12400f", name: "Intel Core i5-12400F", brand: "Intel", tier: "budget", cores: 6, threads: 12, score: 46, gamingScore: 55, productivityScore: 40 },
  { id: "r5-5600", name: "AMD Ryzen 5 5600", brand: "AMD", tier: "budget", cores: 6, threads: 12, score: 48, gamingScore: 56, productivityScore: 42 },
  { id: "r5-5700x", name: "AMD Ryzen 7 5700X", brand: "AMD", tier: "mid", cores: 8, threads: 16, score: 56, gamingScore: 58, productivityScore: 54 },
  { id: "i5-13400f", name: "Intel Core i5-13400F", brand: "Intel", tier: "mid", cores: 10, threads: 16, score: 58, gamingScore: 62, productivityScore: 55 },
  { id: "r5-7600", name: "AMD Ryzen 5 7600", brand: "AMD", tier: "mid", cores: 6, threads: 12, score: 62, gamingScore: 70, productivityScore: 54 },
  { id: "i5-13600k", name: "Intel Core i5-13600K", brand: "Intel", tier: "mid", cores: 14, threads: 20, score: 72, gamingScore: 74, productivityScore: 71 },
  { id: "r7-7700x", name: "AMD Ryzen 7 7700X", brand: "AMD", tier: "mid", cores: 8, threads: 16, score: 73, gamingScore: 76, productivityScore: 70 },
  { id: "r7-7800x3d", name: "AMD Ryzen 7 7800X3D", brand: "AMD", tier: "high", cores: 8, threads: 16, score: 82, gamingScore: 95, productivityScore: 70 },
  { id: "i7-14700k", name: "Intel Core i7-14700K", brand: "Intel", tier: "high", cores: 20, threads: 28, score: 86, gamingScore: 82, productivityScore: 89 },
  { id: "r9-7950x", name: "AMD Ryzen 9 7950X", brand: "AMD", tier: "high", cores: 16, threads: 32, score: 92, gamingScore: 82, productivityScore: 98 },
  { id: "i9-14900k", name: "Intel Core i9-14900K", brand: "Intel", tier: "high", cores: 24, threads: 32, score: 95, gamingScore: 90, productivityScore: 99 },
  { id: "r7-9800x3d", name: "AMD Ryzen 7 9800X3D", brand: "AMD", tier: "high", cores: 8, threads: 16, score: 96, gamingScore: 100, productivityScore: 82 },
{ id: "r7-7800x3d", name: "AMD Ryzen 7 7800X3D", brand: "AMD", tier: "high", cores: 8, threads: 16, score: 96, gamingScore: 97, productivityScore: 77 },
];;

export const GPUS: Gpu[] = [
  { id: "igpu", name: "Integrated Graphics (no GPU)", brand: "Intel", tier: "budget", vram: 0, score: 6 },
  { id: "gtx1650", name: "NVIDIA GTX 1650", brand: "NVIDIA", tier: "budget", vram: 4, score: 16 },
  { id: "rx6600", name: "AMD Radeon RX 6600", brand: "AMD", tier: "budget", vram: 8, score: 30 },
  { id: "rtx3050", name: "NVIDIA RTX 3050", brand: "NVIDIA", tier: "budget", vram: 8, score: 24 },
  { id: "arc-a750", name: "Intel Arc A750", brand: "Intel", tier: "budget", vram: 8, score: 33 },
  { id: "rtx4060", name: "NVIDIA RTX 4060", brand: "NVIDIA", tier: "mid", vram: 8, score: 40 },
  { id: "rx7600", name: "AMD Radeon RX 7600", brand: "AMD", tier: "mid", vram: 8, score: 38 },
  { id: "rtx4060ti", name: "NVIDIA RTX 4060 Ti", brand: "NVIDIA", tier: "mid", vram: 8, score: 47 },
  { id: "rx7700xt", name: "AMD Radeon RX 7700 XT", brand: "AMD", tier: "mid", vram: 12, score: 54 },
  { id: "rtx4070", name: "NVIDIA RTX 4070", brand: "NVIDIA", tier: "mid", vram: 12, score: 60 },
  { id: "rx7800xt", name: "AMD Radeon RX 7800 XT", brand: "AMD", tier: "mid", vram: 16, score: 63 },
  { id: "rtx4070ts", name: "NVIDIA RTX 4070 Ti Super", brand: "NVIDIA", tier: "high", vram: 16, score: 74 },
  { id: "rx7900xtx", name: "AMD Radeon RX 7900 XTX", brand: "AMD", tier: "high", vram: 24, score: 85 },
  { id: "rtx4080s", name: "NVIDIA RTX 4080 Super", brand: "NVIDIA", tier: "high", vram: 16, score: 88 },
  { id: "rtx4090", name: "NVIDIA RTX 4090", brand: "NVIDIA", tier: "high", vram: 24, score: 100 },
];

export const RAM_OPTIONS: RamOption[] = [
  { id: "8gb", name: "8 GB", tier: "budget", capacity: 8, score: 25 },
  { id: "16gb", name: "16 GB", tier: "budget", capacity: 16, score: 55 },
  { id: "32gb", name: "32 GB", tier: "mid", capacity: 32, score: 80 },
  { id: "64gb", name: "64 GB", tier: "high", capacity: 64, score: 95 },
  { id: "128gb", name: "128 GB", tier: "high", capacity: 128, score: 100 },
];

export const STORAGE_OPTIONS: StorageOption[] = [
  { id: "hdd", name: "Hard Drive (HDD)", tier: "budget", score: 12, note: "Spinning disk — slow boot and load times." },
  { id: "sata-ssd", name: "SATA SSD", tier: "budget", score: 45, note: "Big jump over HDD, capped by the SATA link." },
  { id: "nvme3", name: "NVMe SSD (Gen 3)", tier: "mid", score: 75, note: "Fast enough for almost everything." },
  { id: "nvme4", name: "NVMe SSD (Gen 4)", tier: "high", score: 92, note: "Great for large game and video files." },
  { id: "nvme5", name: "NVMe SSD (Gen 5)", tier: "high", score: 100, note: "Bleeding edge sequential speed." },
];

export type GameProfile = {
  id: string;
  name: string;
  /** how heavy the game is; higher = harder to run */
  weight: number;
  cpuBias: number;
};

export const GAME_PROFILES: GameProfile[] = [
  { id: "esports", name: "Valorant / CS2 (esports)", weight: 0.28, cpuBias: 0.6 },
  { id: "gta5", name: "GTA V", weight: 0.55, cpuBias: 0.4 },
  { id: "fortnite", name: "Fortnite", weight: 0.7, cpuBias: 0.35 },
  { id: "cyberpunk", name: "Cyberpunk 2077", weight: 1.35, cpuBias: 0.2 },
];

export type WorkloadProfile = {
  id: string;
  name: string;
  cpuWeight: number;
  gpuWeight: number;
  ramWeight: number;
  storageWeight: number;
};

export const WORKLOADS: WorkloadProfile[] = [
  { id: "gaming", name: "Gaming", cpuWeight: 0.3, gpuWeight: 0.52, ramWeight: 0.1, storageWeight: 0.08 },
  { id: "editing", name: "Video Editing", cpuWeight: 0.35, gpuWeight: 0.3, ramWeight: 0.2, storageWeight: 0.15 },
  { id: "programming", name: "Programming", cpuWeight: 0.45, gpuWeight: 0.1, ramWeight: 0.28, storageWeight: 0.17 },
  { id: "study", name: "Study & Office", cpuWeight: 0.4, gpuWeight: 0.08, ramWeight: 0.3, storageWeight: 0.22 },
];

export type Selection = {
  cpu: Cpu;
  gpu: Gpu;
  ram: RamOption;
  storage: StorageOption;
};

export type BenchmarkResult = {
  cpu: number;
  gpu: number;
  ram: number;
  storage: number;
  overall: number;
  tier: Tier;
  workloadScores: { id: string; name: string; score: number }[];
  fps: { game: string; fps1080: number; fps1440: number }[];
  bottleneck: { kind: "cpu" | "gpu" | "none"; gap: number; message: string };
};

const clamp = (n: number, min = 1, max = 999) => Math.max(min, Math.min(max, n));

export function tierFromScore(score: number): Tier {
  if (score >= 72) return "high";
  if (score >= 42) return "mid";
  return "budget";
}

export function estimateFps(sel: Selection, game: GameProfile) {
  const gpuPower = Math.pow(sel.gpu.score, 1.05);
  const cpuPower = Math.pow(sel.cpu.gamingScore, 1.0);
  const ramPenalty = sel.ram.capacity <= 8 ? 0.78 : sel.ram.capacity >= 16 ? 1 : 0.9;

  const gpuFps = (gpuPower * 2.6) / (game.weight * 1.6);
  const cpuFps = (cpuPower * 2.9) / (game.weight * 0.75 + 0.5);
  // blended, limited by whichever part is the ceiling
  const blend = gpuFps * (1 - game.cpuBias) + cpuFps * game.cpuBias;
  const limited = Math.min(blend, Math.min(gpuFps, cpuFps) * 1.35);

  const fps1080 = clamp(Math.round(limited * ramPenalty), 8, 700);
  const fps1440 = clamp(Math.round(fps1080 * (0.66 + sel.gpu.score / 700)), 6, 600);
  return { fps1080, fps1440 };
}

export function computeBenchmark(sel: Selection): BenchmarkResult {
  const cpu = sel.cpu.score;
  const gpu = sel.gpu.score;
  const ram = sel.ram.score;
  const storage = sel.storage.score;

  const overall = Math.round(cpu * 0.32 + gpu * 0.42 + ram * 0.14 + storage * 0.12);

  const workloadScores = WORKLOADS.map((w) => ({
    id: w.id,
    name: w.name,
    score: Math.round(
      (w.id === "gaming" ? sel.cpu.gamingScore : sel.cpu.productivityScore) * w.cpuWeight +
        gpu * w.gpuWeight +
        ram * w.ramWeight +
        storage * w.storageWeight,
    ),
  }));

  const fps = GAME_PROFILES.map((g) => ({ game: g.name, ...estimateFps(sel, g) }));

  const gap = sel.cpu.gamingScore - gpu;
  let bottleneck: BenchmarkResult["bottleneck"] = {
    kind: "none",
    gap: Math.abs(gap),
    message: "Your CPU and GPU are well matched — neither one is holding the other back.",
  };
  if (gap > 28) {
    bottleneck = {
      kind: "gpu",
      gap,
      message: `Your ${sel.cpu.name} is much stronger than your ${sel.gpu.name}. The graphics card is the limit — upgrading it would give the biggest boost in games.`,
    };
  } else if (gap < -28) {
    bottleneck = {
      kind: "cpu",
      gap: -gap,
      message: `Your ${sel.gpu.name} is being held back by the ${sel.cpu.name}. In CPU-heavy games you will not get the frames the GPU can deliver.`,
    };
  }

  return { cpu, gpu, ram, storage, overall, tier: tierFromScore(overall), workloadScores, fps, bottleneck };
}

export type ReferenceBuild = { id: string; name: string; tier: Tier; selection: Selection };

const byId = <T extends { id: string }>(arr: T[], id: string): T => arr.find((x) => x.id === id)!;

export const REFERENCE_BUILDS: ReferenceBuild[] = [
  {
    id: "ref-budget",
    name: "Cheap reference build",
    tier: "budget",
    selection: {
      cpu: byId(CPUS, "i3-12100f"),
      gpu: byId(GPUS, "rtx3050"),
      ram: byId(RAM_OPTIONS, "16gb"),
      storage: byId(STORAGE_OPTIONS, "sata-ssd"),
    },
  },
  {
    id: "ref-mid",
    name: "Mid-range reference build",
    tier: "mid",
    selection: {
      cpu: byId(CPUS, "r5-7600"),
      gpu: byId(GPUS, "rtx4060ti"),
      ram: byId(RAM_OPTIONS, "32gb"),
      storage: byId(STORAGE_OPTIONS, "nvme3"),
    },
  },
  {
    id: "ref-high",
    name: "Expensive reference build",
    tier: "high",
    selection: {
      cpu: byId(CPUS, "r7-9800x3d"),
      gpu: byId(GPUS, "rtx4090"),
      ram: byId(RAM_OPTIONS, "64gb"),
      storage: byId(STORAGE_OPTIONS, "nvme5"),
    },
  },
];

export const DEFAULT_SELECTION: Selection = {
  cpu: byId(CPUS, "r5-5600"),
  gpu: byId(GPUS, "rtx4060"),
  ram: byId(RAM_OPTIONS, "16gb"),
  storage: byId(STORAGE_OPTIONS, "nvme3"),
};

export function findPart(kind: "cpu" | "gpu" | "ram" | "storage", id: string) {
  if (kind === "cpu") return CPUS.find((c) => c.id === id);
  if (kind === "gpu") return GPUS.find((g) => g.id === id);
  if (kind === "ram") return RAM_OPTIONS.find((r) => r.id === id);
  return STORAGE_OPTIONS.find((s) => s.id === id);
}
