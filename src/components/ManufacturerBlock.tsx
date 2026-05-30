import { motion } from "motion/react";
import { BotMessageSquare, ScanSearch, Globe, HandCoins } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function ManufacturerBlock() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: ScanSearch,
      title: t.manufacturer.benefit1Title,
      description: t.manufacturer.benefit1Desc
    },
    {
      icon: BotMessageSquare,
      title: t.manufacturer.benefit2Title,
      description: t.manufacturer.benefit2Desc
    },
    {
      icon: HandCoins,
      title: t.manufacturer.benefit3Title,
      description: t.manufacturer.benefit3Desc
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="glass-card flex flex-col lg:flex-row gap-16 items-start">
        <div className="lg:w-1/3">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-blue-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">{t.manufacturer.badge}</span>
          </div>
          <h2 className="text-4xl font-sans font-light mb-6 leading-tight">
            {t.manufacturer.title.split(". ")[0]}. <br />
            <span className="font-normal text-blue-500">{t.manufacturer.title.split(". ")[1] || ""}</span>
          </h2>
          <p className="text-white/40 mb-8 leading-relaxed">
            {t.manufacturer.description}
          </p>
          <div className="flex flex-col gap-3">
            <button className="px-6 py-3 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all">
              {t.manufacturer.btn}
            </button>
            <div className="text-[10px] text-white/20 font-mono text-center">
              {t.manufacturer.subtext}
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <benefit.icon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium mb-2 text-sm leading-snug">{benefit.title}</h3>
                <p className="text-xs text-white/30 leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
