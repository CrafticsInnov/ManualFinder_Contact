import { motion } from "motion/react";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface Props {
  onNextAction: () => void;
}

export function Hero({ onNextAction }: Props) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400 mb-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        {t.hero.badge}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-6xl md:text-8xl lg:text-9xl font-sans font-extralight text-gradient leading-[0.9] mb-8"
      >
        {t.hero.title.split(". ")[0]}. <br />
        <span className="font-normal">{t.hero.title.split(". ")[1]}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-white/40 max-w-2xl text-xl md:text-2xl font-light leading-relaxed mb-12"
      >
        {t.hero.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button 
          onClick={onNextAction}
          className="px-10 py-5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all hover:scale-105"
        >
          {t.hero.btnPrimary} <ChevronRight className="w-4 h-4" />
        </button>
        <a
          href="https://appsource.microsoft.com/"
          target="_blank"
          rel="noreferrer"
          className="px-10 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all"
        >
          {t.hero.btnSecondary} <ArrowUpRight className="w-4 h-4 text-white/40" />
        </a>
      </motion.div>
    </section>
  );
}
