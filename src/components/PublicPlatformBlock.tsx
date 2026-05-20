import { motion } from "motion/react";
import { Smartphone, Laptop, Zap, Users } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function PublicPlatformBlock() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-card relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -mr-32 -mt-32" />
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/40">{t.public.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-light mb-6 leading-tight">
              {t.public.title.split(" with ").length > 1 ? (
                <>
                  {t.public.title.split(" with ")[0]} <br />
                  <span className="font-normal text-blue-500">with {t.public.title.split(" with ")[1]}</span>
                </>
              ) : (
                <>
                  {t.public.title.split(" audience")[0]} <br />
                  <span className="font-normal text-blue-500">{t.public.title.includes("audience") ? "Your Global Audience." : t.public.title}</span>
                </>
              )}
            </h2>
            <p className="text-white/40 mb-8 text-lg leading-relaxed">
              {t.public.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium">{t.public.feature1}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <Laptop className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium">{t.public.feature2}</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-bold uppercase tracking-wider text-blue-400">{t.public.advTitle}</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed italic">
                "{t.public.advQuote}"
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative z-10 p-8 rounded-3xl bg-linear-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-sm">
               <div className="aspect-[4/5] bg-black/40 rounded-2xl overflow-hidden relative flex items-center justify-center border border-white/5">
                  <div className="absolute inset-0 bg-mesh opacity-10" />
                  <div className="text-center p-8">
                     <Smartphone className="w-16 h-16 text-blue-500/40 mx-auto mb-6" />
                     <div className="hologram-text mb-2 text-blue-400">SCANNING_ACTIVE</div>
                     <div className="text-2xl font-mono opacity-20">|||||||||||||||||</div>
                  </div>
               </div>
            </div>
            {/* Visual Accents */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 blur-[80px] rounded-full" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
