"use client";

import { motion } from "framer-motion";
import { brandPrimary } from "@yd-ds/tokens";
import { cn } from "@yd-ds/ui";

const cols = Array.from({ length: 6 }, (_, i) => i);

export function GridHeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="relative hidden h-[220px] w-full max-w-[360px] shrink-0 overflow-hidden rounded-md border bg-gradient-to-br from-primary/[0.04] to-transparent p-4 md:block"
      aria-hidden
    >
      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grid-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={brandPrimary[6]} stopOpacity="0.15" />
            <stop offset="100%" stopColor={brandPrimary[6]} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={`${(i / 6) * 100}%`}
            y1="8%"
            x2={`${(i / 6) * 100}%`}
            y2="92%"
            stroke="url(#grid-line)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="8%"
            y1={`${(i / 4) * 100}%`}
            x2="92%"
            y2={`${(i / 4) * 100}%`}
            stroke="url(#grid-line)"
            strokeWidth="1"
          />
        ))}
      </svg>
      <div className="relative grid h-full grid-cols-6 grid-rows-4 gap-1.5">
        {cols.map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
            className={cn(
              "rounded-sm border border-primary/30 bg-primary/10",
              i % 2 === 0 ? "row-span-2" : "row-span-1"
            )}
          />
        ))}
      </div>
      <div className="absolute bottom-3 right-3 rounded-md border border-primary/30 bg-background/90 px-2 py-1 font-mono text-[10px] text-primary">
        24 cols
      </div>
    </motion.div>
  );
}
