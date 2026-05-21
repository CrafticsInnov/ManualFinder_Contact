import { motion } from "motion/react";
import { Send, Mail, User, MessageSquare, Building2, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function ContactForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState<"manufacturer" | "support">("manufacturer");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = String(formData.get("name") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    fetch('/api/send-mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, company, email, message, role }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Erreur lors de l\'envoi du message');
        }
        setSubmitted(true);
      })
      .catch(() => {
        alert('Erreur lors de l\'envoi du message. Merci de réessayer plus tard.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (submitted) {
    return (
      <div className="flex justify-center py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card text-center max-w-md"
        >
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
            <CheckCircle2 className="w-10 h-10 text-blue-400" />
          </div>
          <h2 className="text-2xl font-sans font-light tracking-tight mb-2 uppercase">{t.contact.successTitle}</h2>
          <p className="text-white/40 text-sm font-mono tracking-widest leading-relaxed">
            {t.contact.successDesc}
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="mt-8 py-2 px-6 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-colors"
          >
            {t.contact.successBtn}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card w-full max-w-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-sans font-extralight tracking-widest uppercase mb-4">{t.contact.header}</h2>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setRole("manufacturer")}
              className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest border transition-all ${role === "manufacturer" ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-white/10 text-white/30 hover:border-white/20'}`}
            >
              {t.contact.role1}
            </button>
            <button 
              onClick={() => setRole("support")}
              className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest border transition-all ${role === "support" ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-white/10 text-white/30 hover:border-white/20'}`}
            >
              {t.contact.role2}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-mono tracking-widest text-white/40 ml-1">{t.contact.labelName}</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input required name="name" type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] uppercase font-mono tracking-widest text-white/40 ml-1">{t.contact.labelCompany}</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input name="company" type="text" placeholder="Acme Inc." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[9px] uppercase font-mono tracking-widest text-white/40 ml-1">{t.contact.labelEmail}</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input required name="email" type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[9px] uppercase font-mono tracking-widest text-white/40 ml-1">{t.contact.labelMessage}</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-white/20" />
              <textarea required name="message" rows={4} placeholder={t.contact.placeholderHelp} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none" />
            </div>
          </div>

          <div className="md:col-span-2">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all disabled:opacity-50"
            >
              {isSubmitting ? t.contact.submitBusy : t.contact.submitIdle}
              {!isSubmitting && <Send className="w-4 h-4" />}
            </button>
            <p className="mt-4 text-[10px] uppercase tracking-widest text-white/35 text-center font-mono">
              {t.contact.notice}
            </p>
          </div>
        </form>
      </motion.div>
    </section>
  );
}

