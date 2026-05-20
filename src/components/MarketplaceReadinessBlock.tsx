import { motion } from "motion/react";
import { CheckCircle2, ExternalLink, ClipboardList } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function MarketplaceReadinessBlock() {
  const { t } = useLanguage();

  const checklist = [
    t.marketplace.item1,
    t.marketplace.item2,
    t.marketplace.item3,
    t.marketplace.item4,
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-blue-500/15 blur-[90px] rounded-full" />

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-blue-500/25 bg-blue-500/10 text-blue-300 text-[11px] uppercase tracking-widest font-mono">
              <ClipboardList className="w-4 h-4" />
              {t.marketplace.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-light leading-tight mb-5">
              {t.marketplace.title}
            </h2>
            <p className="text-white/50 leading-relaxed mb-8">
              {t.marketplace.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://appsource.microsoft.com/"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all"
              >
                {t.marketplace.btnListing}
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://learn.microsoft.com/partner-center/marketplace-offers/"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl border border-white/15 bg-white/5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 hover:bg-white/10 transition-all"
              >
                {t.marketplace.btnDocs}
                <ExternalLink className="w-4 h-4 text-white/50" />
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-3">
            {checklist.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <p className="text-sm text-white/75 leading-relaxed">{item}</p>
              </motion.div>
            ))}

            <div className="p-4 rounded-2xl border border-blue-500/25 bg-blue-500/10 text-xs text-blue-100/90 leading-relaxed">
              {t.marketplace.note}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}