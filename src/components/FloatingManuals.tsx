import { motion } from "motion/react";
import { FileText, Cpu, BookOpen, Layers } from "lucide-react";

export function FloatingManuals() {
  const items = [
    { icon: FileText, label: "TECH_SPECS_2026", x: "10%", y: "20%", delay: 0 },
    { icon: Cpu, label: "HARDWARE_MAPPING", x: "85%", y: "15%", delay: 1.5 },
    { icon: BookOpen, label: "USER_GUIDE_V2", x: "80%", y: "75%", delay: 0.8 },
    { icon: Layers, label: "ASSEMBLY_MAP", x: "15%", y: "80%", delay: 2.2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 0.4, 0],
            scale: [0.9, 1.1, 0.9],
            y: [0, -40, 0],
            x: [0, 20, 0]
          }}
          transition={{ 
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
          className="absolute"
          style={{ left: item.x, top: item.y }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-20 rounded-lg border border-blue-500/20 bg-blue-500/5 backdrop-blur-md flex flex-col items-center justify-center p-2">
              <item.icon className="w-6 h-6 text-blue-400 mb-2 opacity-50" strokeWidth={1} />
              <div className="w-8 h-0.5 bg-blue-500/20 rounded-full" />
              <div className="w-6 h-0.5 bg-blue-500/10 rounded-full mt-1" />
            </div>
            <div className="text-[8px] font-mono tracking-[0.3em] text-blue-400/40 uppercase">
              {item.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
