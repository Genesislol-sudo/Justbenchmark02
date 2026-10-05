import { TIER_LABEL, type Tier } from "@/lib/parts";
import { cn } from "@/lib/utils";

const styles: Record<Tier, string> = {
  budget: "bg-tier-budget/15 text-tier-budget border-tier-budget/40",
  mid: "bg-tier-mid/15 text-tier-mid border-tier-mid/40",
  high: "bg-tier-high/15 text-tier-high border-tier-high/40",
};

export function TierBadge({ tier, className }: { tier: Tier; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        styles[tier],
        className,
      )}
    >
      {TIER_LABEL[tier]}
    </span>
  );
}
