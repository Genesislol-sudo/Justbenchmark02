import { CPUS, GPUS, RAM_OPTIONS, STORAGE_OPTIONS, type Selection, type Tier } from "./parts";

export type UseCase = "gaming" | "editing" | "study" | "programming";

export const USE_CASES: { id: UseCase; name: string; blurb: string }[] = [
  { id: "gaming", name: "Gaming", blurb: "High frames in modern games" },
  { id: "editing", name: "Video Editing", blurb: "Timeline scrubbing and exports" },
  { id: "programming", name: "Programming", blurb: "Compiling, containers, many tabs" },
  { id: "study", name: "Study & Office", blurb: "Notes, browsing, documents" },
];

export type RecommendedPart = {
  category: string;
  name: string;
  tier: Tier;
  why: string;
};

export type Recommendation = {
  parts: RecommendedPart[];
  selection: Selection;
  strengths: string[];
  tradeoffs: string[];
  headline: string;
};

const cpu = (id: string) => CPUS.find((c) => c.id === id)!;
const gpu = (id: string) => GPUS.find((g) => g.id === id)!;
const ram = (id: string) => RAM_OPTIONS.find((r) => r.id === id)!;
const sto = (id: string) => STORAGE_OPTIONS.find((s) => s.id === id)!;

type Core = {
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  board: [string, Tier];
  psu: [string, Tier];
  pcCase: [string, Tier];
  cooling: [string, Tier];
};

const TABLE: Record<UseCase, Record<Tier, Core>> = {
  gaming: {
    budget: {
      cpu: "i5-12400f", gpu: "rx6600", ram: "16gb", storage: "sata-ssd",
      board: ["B660 / A620 micro-ATX", "budget"],
      psu: ["550W 80+ Bronze", "budget"],
      pcCase: ["Airflow mesh mid-tower", "budget"],
      cooling: ["Stock air cooler", "budget"],
    },
    mid: {
      cpu: "r5-7600", gpu: "rtx4070", ram: "32gb", storage: "nvme4",
      board: ["B650 ATX", "mid"],
      psu: ["750W 80+ Gold", "mid"],
      pcCase: ["Mesh-front mid-tower, 3 fans", "mid"],
      cooling: ["Dual-tower air cooler", "mid"],
    },
    high: {
      cpu: "r7-9800x3d", gpu: "rtx4090", ram: "64gb", storage: "nvme5",
      board: ["X670E ATX", "high"],
      psu: ["1000W 80+ Platinum ATX 3.0", "high"],
      pcCase: ["Full tower, high airflow", "high"],
      cooling: ["360mm AIO liquid cooler", "high"],
    },
  },
  editing: {
    budget: {
      cpu: "r5-5600", gpu: "rtx3050", ram: "16gb", storage: "nvme3",
      board: ["B550 micro-ATX", "budget"],
      psu: ["550W 80+ Bronze", "budget"],
      pcCase: ["Quiet mid-tower", "budget"],
      cooling: ["Stock air cooler", "budget"],
    },
    mid: {
      cpu: "i5-13600k", gpu: "rtx4060ti", ram: "32gb", storage: "nvme4",
      board: ["B760 ATX", "mid"],
      psu: ["750W 80+ Gold", "mid"],
      pcCase: ["Mid-tower with dust filters", "mid"],
      cooling: ["240mm AIO liquid cooler", "mid"],
    },
    high: {
      cpu: "r9-7950x", gpu: "rtx4080s", ram: "128gb", storage: "nvme5",
      board: ["X670E ATX with dual M.2", "high"],
      psu: ["1000W 80+ Platinum", "high"],
      pcCase: ["Full tower, 8 drive bays", "high"],
      cooling: ["360mm AIO liquid cooler", "high"],
    },
  },
  programming: {
    budget: {
      cpu: "r5-5500", gpu: "igpu", ram: "16gb", storage: "sata-ssd",
      board: ["A520 micro-ATX", "budget"],
      psu: ["450W 80+ Bronze", "budget"],
      pcCase: ["Compact micro-ATX case", "budget"],
      cooling: ["Stock air cooler", "budget"],
    },
    mid: {
      cpu: "r7-7700x", gpu: "rtx4060", ram: "32gb", storage: "nvme4",
      board: ["B650 ATX", "mid"],
      psu: ["650W 80+ Gold", "mid"],
      pcCase: ["Quiet mid-tower", "mid"],
      cooling: ["Tower air cooler", "mid"],
    },
    high: {
      cpu: "i9-14900k", gpu: "rtx4070ts", ram: "128gb", storage: "nvme5",
      board: ["Z790 ATX with 2.5G LAN", "high"],
      psu: ["1000W 80+ Platinum", "high"],
      pcCase: ["Full tower, sound-damped", "high"],
      cooling: ["360mm AIO liquid cooler", "high"],
    },
  },
  study: {
    budget: {
      cpu: "i3-12100f", gpu: "igpu", ram: "8gb", storage: "sata-ssd",
      board: ["H610 micro-ATX", "budget"],
      psu: ["450W 80+ Bronze", "budget"],
      pcCase: ["Small micro-ATX case", "budget"],
      cooling: ["Stock air cooler", "budget"],
    },
    mid: {
      cpu: "r5-5600", gpu: "igpu", ram: "16gb", storage: "nvme3",
      board: ["B550 micro-ATX", "mid"],
      psu: ["550W 80+ Bronze", "mid"],
      pcCase: ["Quiet compact case", "mid"],
      cooling: ["Low-profile air cooler", "mid"],
    },
    high: {
      cpu: "i5-13600k", gpu: "rtx4060", ram: "32gb", storage: "nvme4",
      board: ["B760 ATX", "high"],
      psu: ["650W 80+ Gold", "high"],
      pcCase: ["Silent mid-tower", "high"],
      cooling: ["Tower air cooler", "high"],
    },
  },
};

const WHY: Record<UseCase, { cpu: string; gpu: string; ram: string; storage: string }> = {
  gaming: {
    cpu: "Strong per-core speed, which is what game engines actually lean on.",
    gpu: "The single biggest factor for frame rate and visual settings.",
    ram: "Enough headroom to keep the game and a browser open together.",
    storage: "Cuts level-load times and stops texture pop-in.",
  },
  editing: {
    cpu: "Lots of cores speed up exports and effect rendering.",
    gpu: "Accelerates timeline playback, effects and hardware encoding.",
    ram: "Large timelines and high-res footage eat memory fast.",
    storage: "Fast scratch and cache drive keeps scrubbing smooth.",
  },
  programming: {
    cpu: "Parallel cores cut compile and test-suite times.",
    gpu: "Only needs to drive displays unless you touch ML or graphics work.",
    ram: "Containers, emulators and dozens of tabs all live in memory.",
    storage: "Faster dependency installs, indexing and project searches.",
  },
  study: {
    cpu: "Plenty quick for documents, video calls and browsing.",
    gpu: "Integrated graphics handle everything outside of gaming.",
    ram: "Keeps many tabs and a video call responsive.",
    storage: "The upgrade you feel most day to day — near-instant boot.",
  },
};

const STRENGTHS: Record<UseCase, Record<Tier, string[]>> = {
  gaming: {
    budget: ["Comfortable 1080p gaming at medium-high settings", "Runs every esports title at high frame rates", "Low power draw and quiet"],
    mid: ["High refresh 1440p gaming", "Handles ray tracing in most titles", "Room to add more storage later"],
    high: ["4K gaming with maxed settings", "Ray tracing without compromise", "Will stay fast for years"],
  },
  editing: {
    budget: ["Fine for 1080p timelines", "Handles short projects and school films", "Quiet and compact"],
    mid: ["Smooth 4K timeline scrubbing", "Noticeably faster exports", "Enough memory for effects-heavy edits"],
    high: ["Multi-stream 4K and 6K editing", "Very fast exports and renders", "Massive memory for colour and VFX work"],
  },
  programming: {
    budget: ["Snappy for web and app development", "Quiet and small enough for a desk", "Cheap to upgrade later"],
    mid: ["Fast builds and test runs", "Comfortable with containers and VMs", "Good multi-monitor support"],
    high: ["Very fast compiles on big codebases", "Runs heavy local infrastructure", "Handles local ML experiments"],
  },
  study: {
    budget: ["Instant boot and quick app launches", "Perfect for documents and browsing", "Very low running cost"],
    mid: ["Handles heavy multitasking", "Great for online classes and research", "Silent under normal use"],
    high: ["Fast at everything school throws at it", "Can game casually on the side", "Long lifespan before upgrades"],
  },
};

const TRADEOFFS: Record<UseCase, Record<Tier, string[]>> = {
  gaming: {
    budget: ["Struggles at 1440p and above", "Ray tracing is mostly off the table", "8 GB of VRAM limits future titles"],
    mid: ["Not a 4K maxed-settings machine", "Will want a PSU upgrade for a bigger GPU later"],
    high: ["Overkill for anything under 1440p", "High power draw and heat"],
  },
  editing: {
    budget: ["4K editing needs proxy files", "Exports take a while"],
    mid: ["Heavy VFX work will still queue", "8 GB VRAM limits some GPU effects"],
    high: ["Far more machine than short-form editing needs"],
  },
  programming: {
    budget: ["Big builds are slow", "No dedicated GPU for ML work"],
    mid: ["Not built for large-scale ML training"],
    high: ["Expensive and power-hungry for everyday coding"],
  },
  study: {
    budget: ["8 GB of RAM fills up with many tabs", "No real gaming ability"],
    mid: ["No dedicated GPU, so gaming is limited"],
    high: ["More than schoolwork requires"],
  },
};

export function recommend(useCase: UseCase, tier: Tier): Recommendation {
  const core = TABLE[useCase][tier];
  const why = WHY[useCase];
  const selection: Selection = {
    cpu: cpu(core.cpu),
    gpu: gpu(core.gpu),
    ram: ram(core.ram),
    storage: sto(core.storage),
  };

  const parts: RecommendedPart[] = [
    { category: "Processor (CPU)", name: selection.cpu.name, tier: selection.cpu.tier, why: why.cpu },
    { category: "Graphics (GPU)", name: selection.gpu.name, tier: selection.gpu.tier, why: why.gpu },
    { category: "Memory (RAM)", name: `${selection.ram.name} DDR4/DDR5`, tier: selection.ram.tier, why: why.ram },
    { category: "Storage", name: selection.storage.name, tier: selection.storage.tier, why: `${why.storage} ${selection.storage.note}` },
    { category: "Motherboard", name: core.board[0], tier: core.board[1], why: "Matches the CPU socket and gives the ports this build needs." },
    { category: "Power Supply", name: core.psu[0], tier: core.psu[1], why: "Sized with headroom so the system stays stable under load." },
    { category: "Case", name: core.pcCase[0], tier: core.pcCase[1], why: "Airflow first — cooler parts run faster and last longer." },
    { category: "Cooling", name: core.cooling[0], tier: core.cooling[1], why: "Keeps the CPU at full boost clocks instead of throttling." },
  ];

  const useCaseName = USE_CASES.find((u) => u.id === useCase)!.name;

  return {
    parts,
    selection,
    strengths: STRENGTHS[useCase][tier],
    tradeoffs: TRADEOFFS[useCase][tier],
    headline: `${tier === "budget" ? "Cheap" : tier === "mid" ? "Mid-range" : "Expensive"} ${useCaseName} build`,
  };
}
