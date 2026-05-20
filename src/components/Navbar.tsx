import { motion } from "motion/react";
import { ManualFinderLogo } from "./ManualFinderLogo";
import { useLanguage } from "../contexts/LanguageContext";
import { Language } from "../translations";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  const langs: { id: Language; label: string }[] = [
    { id: "fr", label: "FR" },
    { id: "us", label: "US" },
    { id: "es", label: "ES" },
    { id: "de", label: "DE" },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex justify-between items-center bg-linear-to-b from-black/50 to-transparent"
    >
      <div className="flex items-center gap-3">
        <ManualFinderLogo className="w-10 h-10" />
        <span className="font-sans font-medium tracking-[0.1em] text-lg uppercase hidden sm:block">
          Manual<span className="text-blue-500 font-bold">Finder</span>
        </span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 mr-2">
          {langs.map((l) => (
            <button
              key={l.id}
              onClick={() => setLanguage(l.id)}
              className={`text-[9px] font-bold font-mono transition-all px-1.5 py-0.5 rounded ${
                language === l.id 
                ? "bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                : "text-white/30 hover:text-white/60"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden md:block">
          {t.nav.edition}
        </div>
        <div className="w-px h-4 bg-white/10 hidden md:block" />
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-mono text-white/30 uppercase">{t.nav.powered}</span>
          <span className="text-[10px] font-bold text-white/60 tracking-wider">CRAFTICS</span>
        </div>
      </div>
    </motion.nav>
  );
}
