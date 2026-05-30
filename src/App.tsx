import { useState, useRef, useEffect } from "react";
import { Background } from "./components/Background";
import { Hero } from "./components/Hero";
import { ManufacturerBlock } from "./components/ManufacturerBlock";
import { ContactForm } from "./components/ContactForm";
import { FloatingManuals } from "./components/FloatingManuals";
import { SearchModeSelector, AppSection } from "./components/SearchModeSelector";
import { Navbar } from "./components/Navbar";
import { PublicPlatformBlock } from "./components/PublicPlatformBlock";
import { useLanguage } from "./contexts/LanguageContext";

export default function App() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<AppSection>("presentation");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const manualNavTargetRef = useRef<AppSection | null>(null);
  const manualNavTimeoutRef = useRef<number | null>(null);

  const presentationRef = useRef<HTMLDivElement>(null);
  const manufacturerRef = useRef<HTMLDivElement>(null);
  const publicRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleSectionChange = (section: AppSection) => {
    manualNavTargetRef.current = section;
    if (manualNavTimeoutRef.current !== null) {
      window.clearTimeout(manualNavTimeoutRef.current);
    }
    manualNavTimeoutRef.current = window.setTimeout(() => {
      manualNavTargetRef.current = null;
    }, 1500);

    setActiveSection(section);
    const refs = {
      presentation: presentationRef,
      manufacturers: manufacturerRef,
      users: publicRef,
      contact: contactRef,
    };
    refs[section].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          let nextSection: AppSection | null = null;
          if (entry.target === presentationRef.current) nextSection = "presentation";
          if (entry.target === manufacturerRef.current) nextSection = "manufacturers";
          if (entry.target === publicRef.current) nextSection = "users";
          if (entry.target === contactRef.current) nextSection = "contact";
          if (!nextSection) return;

          if (manualNavTargetRef.current) {
            if (nextSection !== manualNavTargetRef.current) return;
            manualNavTargetRef.current = null;
            if (manualNavTimeoutRef.current !== null) {
              window.clearTimeout(manualNavTimeoutRef.current);
              manualNavTimeoutRef.current = null;
            }
          }

          setActiveSection(nextSection);
        });
      },
      { threshold: 0.5 }
    );

    if (presentationRef.current) observer.observe(presentationRef.current);
    if (manufacturerRef.current) observer.observe(manufacturerRef.current);
    if (publicRef.current) observer.observe(publicRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => {
      observer.disconnect();
      if (manualNavTimeoutRef.current !== null) {
        window.clearTimeout(manualNavTimeoutRef.current);
      }
    };
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

        <div ref={manufacturerRef} className="py-10">
          <ManufacturerBlock />
        </div>

        <div ref={publicRef} className="py-10">
          <PublicPlatformBlock />
        </div>

        <div ref={contactRef} className="py-10">
          <ContactForm />
        </div>

        {/* Simple Footer */}
        <footer className="py-24 border-t border-white/5 text-center px-6 lg:pr-32">
          <div className="flex justify-center items-center gap-8 mb-8 opacity-30 grayscale items-center flex-wrap">
            <span className="text-[10px] uppercase font-mono tracking-widest">{t.footer.partner}</span>
            
          </div>
          <div className="text-[10px] uppercase font-mono tracking-[0.5em] text-white/10">
            ManualFinder © 2026 • {t.hero.badge}
          </div>
          {/* liens supprimés car non présents dans la traduction */}
        </footer>
      </div>
    </main>
  );
}

