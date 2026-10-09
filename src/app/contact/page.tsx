"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2, Mail, User, MessageSquare } from "lucide-react";
import Link from "next/link";

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "03fc4609-a61d-48c3-8c97-59b31a47ddf9";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] -left-20 w-64 sm:w-80 h-64 sm:h-80 bg-brand-neon/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-72 sm:w-96 h-72 sm:h-96 bg-brand-orange/20 rounded-full blur-[140px]" />
        <div className="absolute top-[60%] right-[40%] w-56 sm:w-72 h-56 sm:h-72 bg-brand-purple/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-neon/60 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
            CONNECTION_OPEN
          </span>
          <h1
            className="font-semibold mb-4 tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            LET&apos;S CONNECT
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            Have a project idea, collaboration opportunity, or just want to say
            hello? I&apos;d love to hear from you. Fill out the form below and
            I&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-8 xl:gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-morphism rounded-2xl p-6 sm:p-8 md:p-10">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                    <CheckCircle className="text-green-400" size={32} />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3">
                    Message Sent Successfully
                  </h2>
                  <p className="text-zinc-400 text-sm mb-8 max-w-sm mx-auto">
                    Thank you for reaching out. I&apos;ll review your message
                    and respond as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all text-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500 mb-2"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                      />
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-neon/40 focus:ring-1 focus:ring-brand-neon/20 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                      />
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-neon/40 focus:ring-1 focus:ring-brand-neon/20 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500 mb-2"
                    >
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare
                        size={16}
                        className="absolute left-4 top-4 text-zinc-600"
                      />
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell me about your project, idea, or question..."
                        className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-neon/40 focus:ring-1 focus:ring-brand-neon/20 transition-all text-sm resize-none"
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                    >
                      <AlertCircle
                        size={18}
                        className="text-red-400 shrink-0 mt-0.5"
                      />
                      <p className="text-red-400 text-sm">{errorMessage}</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-gradient-to-r from-brand-orange to-orange-400 text-black rounded-xl font-bold transition-all hover:brightness-110 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-brand-orange/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send_Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Side panel */}
          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Info card */}
            <div className="neo-panel p-6 rounded-2xl">
              <p className="accent-rule text-[10px] mb-5">Connection Info</p>
              <div className="space-y-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                    Response Time
                  </p>
                  <p className="text-sm text-zinc-200">
                    Typically within 24–48 hours
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                    Location
                  </p>
                  <p className="text-sm text-zinc-200">
                    United States / Remote
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                    Open To
                  </p>
                  <p className="text-sm text-zinc-200">
                    Collaborations, opportunities, and interesting conversations
                  </p>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="neo-panel p-6 rounded-2xl">
              <p className="accent-rule text-[10px] mb-5">Quick Links</p>
              <div className="space-y-3">
                <a
                  href="https://github.com/ajay99511"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-zinc-400 hover:text-brand-neon transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center shrink-0 group-hover:border-brand-neon/40 transition-colors">
                    <span className="font-mono text-[10px] text-brand-neon">
                      GH
                    </span>
                  </span>
                  github.com/ajay99511
                </a>
                <Link
                  href="/projects"
                  className="flex items-center gap-3 text-sm text-zinc-400 hover:text-brand-orange transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0 group-hover:border-brand-orange/40 transition-colors">
                    <span className="font-mono text-[10px] text-brand-orange">
                      PJ
                    </span>
                  </span>
                  View Projects
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-3 text-sm text-zinc-400 hover:text-brand-purple transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center shrink-0 group-hover:border-brand-purple/40 transition-colors">
                    <span className="font-mono text-[10px] text-brand-purple">
                      AB
                    </span>
                  </span>
                  About Me
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
