import { motion, AnimatePresence } from "motion/react";
import { Building2, Users, MessageCircle } from "lucide-react";

export type AppSection = "presentation" | "manufacturers" | "users" | "contact";

interface Props {
  activeSection: AppSection;
  onChange: (section: AppSection) => void;
  isVisible: boolean;
}

export function SearchModeSelector({ activeSection, onChange, isVisible }: Props) {
  const toggleSections: { id: AppSection; icon: any }[] = [
    { id: "manufacturers", icon: Building2 },
    { id: "users", icon: Users },
    { id: "contact", icon: MessageCircle },
  ];

  const activeIndex = toggleSections.findIndex((s) => s.id === activeSection);
  const isPresentationActive = activeSection === "presentation";

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed left-[20px] top-[24.5%] z-50 flex flex-col items-center">
          {/* Connecting Point with Halo effect when presentation is active */}
          <div className="flex flex-col items-center mb-4">
            <button 
              onClick={() => onChange("presentation")}
              className="relative flex items-center justify-center group"
            >
              {isPresentationActive && (
                <motion.div 
                  layoutId="halo"
                  className="absolute w-12 h-12 bg-blue-500/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isPresentationActive ? 'bg-blue-400 scale-125 shadow-[0_0_15px_rgba(59,130,246,1)]' : 'bg-white/20 group-hover:bg-white/40'}`} />
            </button>
            <div className="w-px h-8 bg-linear-to-b from-blue-500/50 via-blue-500/20 to-transparent mt-2" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="selector-blur flex flex-col items-center py-[6px] !h-auto min-h-[220px]"
          >
            {/* Active Indicator Circle - only visible index > -1 */}
            <AnimatePresence>
              {activeIndex !== -1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, y: activeIndex * 68 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bg-blue-500 rounded-full w-[56px] h-[56px] z-0 shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                  transition={{
                    type: "spring",
                    damping: 18,
                    stiffness: 120,
                  }}
                />
              )}
            </AnimatePresence>

            {toggleSections.map((section) => {
              const isActive = activeSection === section.id;
              const Icon = section.icon;

              return (
                <button
                  key={section.id}
                  onClick={() => onChange(section.id)}
                  className="relative z-10 w-[56px] h-[56px] my-[6px] flex items-center justify-center transition-all duration-500 group"
                >
                  <Icon 
                    className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/20 group-hover:text-white/50'}`} 
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                </button>
              );
            })}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
