import { motion } from "motion/react";
import { FileText, Cpu, Settings, Layers } from "lucide-react";

export function HolographicManuals() {
  const manuals = [
    { icon: FileText, label: "TECHNICAL_SPEC_V4.pdf", x: "15%", y: "20%", delay: 0 },
    { icon: Cpu, label: "CORE_PROCESSOR_DIAGRAM", x: "75%", y: "15%", delay: 1.5 },
    { icon: Settings, label: "SYSTEM_CONFIG_MANUAL", x: "80%", y: "65%", delay: 0.8 },
    { icon: Layers, label: "ASSEMBLY_GUIDE_3D", x: "12%", y: "75%", delay: 2.2 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none opacity-50">
      {manuals.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [0.95, 1.05, 0.95],
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: m.delay,
            ease: "easeInOut"
          }}
          className="absolute"
          style={{ left: m.x, top: m.y }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 border border-blue-500/30 bg-blue-500/5 backdrop-blur-sm rounded-sm">
              <m.icon className="w-8 h-8 text-blue-400 opacity-80" strokeWidth={1} />
            </div>
            <div className="hologram-text tracking-widest text-[9px]">
              {m.label}
            </div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
