import { motion } from "motion/react";

export function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Dynamic Overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-mesh opacity-20" />
      
      {/* Scan Line Animation */}
      <div className="scan-line" />

      {/* Subtle Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
