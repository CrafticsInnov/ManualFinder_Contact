import { useState, useRef, useEffect } from "react";
import { Background } from "./components/Background";
import { Hero } from "./components/Hero";
import { ManufacturerBlock } from "./components/ManufacturerBlock";
import { ContactForm } from "./components/ContactForm";
import { FloatingManuals } from "./components/FloatingManuals";
import { SearchModeSelector, AppSection } from "./components/SearchModeSelector";
import { Navbar } from "./components/Navbar";
import { PublicPlatformBlock } from "./components/PublicPlatformBlock";
import { MarketplaceReadinessBlock } from "./components/MarketplaceReadinessBlock";
import { useLanguage } from "./contexts/LanguageContext";

export default function App() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<AppSection>("presentation");
  const [isSearchMode, setIsSearchMode] = useState(false);

  const presentationRef = useRef<HTMLDivElement>(null);
  const manufacturerRef = useRef<HTMLDivElement>(null);
  const publicRef = useRef<HTMLDivElement>(null);
  const marketplaceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleSectionChange = (section: AppSection) => {
    setActiveSection(section);
    const refs = {
      presentation: presentationRef,
      manufacturers: manufacturerRef,
      public: publicRef,
      marketplace: marketplaceRef,
      contact: contactRef,
    };
    refs[section].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === presentationRef.current) setActiveSection("presentation");
            if (entry.target === manufacturerRef.current) setActiveSection("manufacturers");
            if (entry.target === publicRef.current) setActiveSection("public");
            if (entry.target === marketplaceRef.current) setActiveSection("marketplace");
            if (entry.target === contactRef.current) setActiveSection("contact");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (presentationRef.current) observer.observe(presentationRef.current);
    if (manufacturerRef.current) observer.observe(manufacturerRef.current);
    if (publicRef.current) observer.observe(publicRef.current);
    if (marketplaceRef.current) observer.observe(marketplaceRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen selection:bg-blue-500/30 custom-scrollbar overflow-x-hidden">
      <Background />
      <Navbar />
      
      {/* Navigation / Mode Selector */}
      <SearchModeSelector 
        activeSection={activeSection} 
        onChange={handleSectionChange} 
        isVisible={!isSearchMode} 
      />

      {/* Dynamic Overlays */}
      <FloatingManuals />

      <div className="relative z-10 lg:pl-32">
        <div ref={presentationRef}>
          <Hero onNextAction={() => handleSectionChange("manufacturers")} />
        </div>

        <div ref={manufacturerRef} className="py-64">
          <ManufacturerBlock />
        </div>

        <div ref={publicRef} className="py-64">
          <PublicPlatformBlock />
        </div>

        <div ref={marketplaceRef} className="py-64">
          <MarketplaceReadinessBlock />
        </div>

        <div ref={contactRef} className="py-64">
          <ContactForm />
        </div>

        {/* Simple Footer */}
        <footer className="py-24 border-t border-white/5 text-center px-6 lg:pr-32">
          <div className="flex justify-center items-center gap-8 mb-8 opacity-30 grayscale items-center flex-wrap">
            <span className="text-[10px] uppercase font-mono tracking-widest">{t.footer.partner}</span>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <span className="text-[10px] uppercase font-mono tracking-widest">{t.footer.certified}</span>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase font-mono tracking-widest">{t.footer.security}</span>
              <span className="text-[11px] font-bold tracking-widest">CRAFTICS</span>
            </div>
          </div>
          <div className="text-[10px] uppercase font-mono tracking-[0.5em] text-white/10">
            ManualFinder © 2026 • {t.hero.badge}
          </div>
          <div className="mt-6 flex justify-center flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase font-mono tracking-widest text-white/35">
            <a href="#" className="hover:text-white/70 transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white/70 transition-colors">{t.footer.terms}</a>
            <a href="#contact" className="hover:text-white/70 transition-colors">{t.footer.support}</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

