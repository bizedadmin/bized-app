"use client";
import { useState } from "react";
import Link from "next/link";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const G  = "#25D366"; // WhatsApp Green
const DG = "#075E54"; // Dark Green
const LB = "#34B7F1"; // WhatsApp Blue

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Features", "How it Works", "Pricing", "FAQs"];

const FEATURES = [
  {
    emoji: "🛒",
    title: "WhatsApp Commerce",
    desc: "Let customers browse your catalog and checkout — all inside WhatsApp. No app download needed.",
    color: "from-green-400/20 to-emerald-500/5",
    accent: "#25D366",
  },
  {
    emoji: "📣",
    title: "Broadcast Campaigns",
    desc: "Send targeted WhatsApp campaigns to thousands of opted-in customers with 98% open rates.",
    color: "from-blue-400/20 to-sky-500/5",
    accent: "#34B7F1",
  },
  {
    emoji: "👥",
    title: "Team Inbox",
    desc: "Route conversations to the right agents, assign tickets, and collaborate in real time.",
    color: "from-purple-400/20 to-violet-500/5",
    accent: "#8B5CF6",
  },
  {
    emoji: "🤖",
    title: "AI Chatbot",
    desc: "Deploy a 24/7 AI agent that books, sells, answers FAQs, and escalates when needed.",
    color: "from-amber-400/20 to-orange-500/5",
    accent: "#F59E0B",
  },
  {
    emoji: "💳",
    title: "Payment Links",
    desc: "Generate and send payment links in any chat. Collect money in seconds, not days.",
    color: "from-pink-400/20 to-rose-500/5",
    accent: "#EC4899",
  },
  {
    emoji: "🌐",
    title: "PWA Storefront",
    desc: "A blazing-fast web store synced live with your WhatsApp Catalog. One inventory, everywhere.",
    color: "from-teal-400/20 to-cyan-500/5",
    accent: "#14B8A6",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Connect your WhatsApp",
    desc: "Link your WhatsApp Business account via Meta's Cloud API in under 5 minutes.",
    icon: "📱",
  },
  {
    num: "02",
    title: "Set up your store",
    desc: "Import or build your product catalog. Configure your AI agent, broadcast lists, and team.",
    icon: "⚙️",
  },
  {
    num: "03",
    title: "Grow on autopilot",
    desc: "Let Bized handle orders, payments, broadcasts, and support while you focus on your business.",
    icon: "🚀",
  },
];

const TESTIMONIALS = [
  {
    name: "Amara Osei",
    role: "Founder, Ama's Naturals",
    location: "🇬🇭 Accra, Ghana",
    text: "We went from manually replying to 200 messages a day to running everything on Bized. Sales tripled in 3 months.",
    avatar: "AO",
    rating: 5,
  },
  {
    name: "Carlos Méndez",
    role: "CEO, Rapido Eats",
    location: "🇲🇽 Mexico City",
    text: "The broadcast feature alone is worth it. Our flash sale campaigns get 94% read rates. Email never came close.",
    avatar: "CM",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Owner, Bloom Boutique",
    location: "🇮🇳 Mumbai, India",
    text: "The AI chatbot handles 80% of customer queries automatically. My team can finally focus on real work.",
    avatar: "PS",
    rating: 5,
  },
];

const PLANS = [
  {
    name: "Free",
    price: "0",
    interval: "/forever",
    desc: "Perfect for getting started",
    highlight: false,
    features: [
      "1 WhatsApp number",
      "500 messages/month",
      "Basic catalog (10 products)",
      "1 team member",
      "Community support",
    ],
    cta: "Start Free",
  },
  {
    name: "Growth",
    price: "49",
    interval: "/month",
    desc: "For businesses ready to scale",
    highlight: true,
    features: [
      "3 WhatsApp numbers",
      "Unlimited messages",
      "Unlimited catalog",
      "10 team members",
      "AI Chatbot (1,000 sessions/mo)",
      "Broadcast campaigns",
      "Payment links",
      "Priority support",
    ],
    cta: "Start 14-day Trial",
  },
  {
    name: "Enterprise",
    price: "199",
    interval: "/month",
    desc: "For high-volume operations",
    highlight: false,
    features: [
      "Unlimited WhatsApp numbers",
      "Unlimited everything",
      "Custom AI training",
      "Unlimited team members",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom integrations",
      "White-label options",
    ],
    cta: "Talk to Sales",
  },
];

const FAQS = [
  {
    q: "Do I need a WhatsApp Business API account?",
    a: "Yes, but we make it easy. Bized connects to Meta's Cloud API and walks you through the setup in minutes — no technical knowledge needed.",
  },
  {
    q: "Is Bized available in my country?",
    a: "Bized works anywhere WhatsApp is available — that's 180+ countries. We support multi-currency payments and multiple languages.",
  },
  {
    q: "Can I migrate my existing catalog?",
    a: "Yes! Import products via CSV or sync directly from your Shopify, WooCommerce, or existing WhatsApp Catalog.",
  },
  {
    q: "How does the AI Chatbot work?",
    a: "We train a GPT-4 powered agent on your products, FAQs, and business rules. It handles inquiries, takes orders, and escalates to your team when needed.",
  },
  {
    q: "What payment gateways do you support?",
    a: "Stripe, Paystack, Flutterwave, Razorpay, Square, and bank transfers. More are added regularly.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. No long-term contracts. Cancel your plan any time from your dashboard.",
  },
];

const STATS = [
  { value: "2,000+", label: "Active Businesses" },
  { value: "98%", label: "Message Open Rate" },
  { value: "180+", label: "Countries Supported" },
  { value: "3.2M+", label: "Messages Sent" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-sm">★</span>
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 dark:border-white/8 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        aria-expanded={open}
      >
        <span className="pr-4 text-sm sm:text-base">{q}</span>
        <span
          className="shrink-0 w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B141A] text-gray-900 dark:text-white">

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0B141A]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5" aria-label="Bized home">
            <div className="w-9 h-9 bg-[#25D366] rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <span className="text-xl font-black text-[#075E54] dark:text-white tracking-tight">bized</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#25D366] dark:hover:text-[#25D366] transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a href="/login" className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#25D366] transition-colors px-3 py-2">
              Sign in
            </a>
            <a
              href="/signup"
              className="bg-[#25D366] hover:bg-[#1fba58] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-green-500/20 hover:shadow-green-500/40 transition-all hover:-translate-y-px active:translate-y-0"
            >
              Get Started Free
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-5 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#0B141A]" role="menu">
            <ul className="flex flex-col gap-1 pt-4" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link} role="menuitem">
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
              <a href="/login" className="text-center py-3 font-semibold text-gray-600 dark:text-gray-300">Sign in</a>
              <a href="/signup" className="bg-[#25D366] text-white py-3 rounded-2xl text-center font-bold shadow-lg shadow-green-500/20">
                Get Started Free
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          aria-label="Hero"
          className="relative overflow-hidden px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28"
        >
          {/* Background glows */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-400/15 rounded-full blur-[100px]" />
            <div className="absolute top-32 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-[80px]" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full px-3.5 py-1.5 mb-8">
              <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold text-[#075E54] dark:text-[#25D366]">
                Official Meta WhatsApp Cloud API Partner
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white mb-6">
              Your Entire Business,{" "}
              <br className="hidden sm:block" />
              <span className="text-[#25D366]">Powered by WhatsApp.</span>
            </h1>

            <p className="text-base sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Sell products, send campaigns, manage your team, deploy AI chatbots,
              and collect payments — all from the app your customers already use every day.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/signup"
                className="bg-[#25D366] hover:bg-[#1fba58] text-white font-bold px-8 py-4 rounded-2xl text-base shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Get Started — It&apos;s Free
              </a>
              <a
                href="#how-it-works"
                className="flex items-center justify-center gap-2.5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-semibold px-8 py-4 rounded-2xl text-base hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <span className="w-8 h-8 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366]" aria-hidden="true">▶</span>
                See how it works
              </a>
            </div>

            {/* Trust strip */}
            <p className="mt-8 text-xs text-gray-400 dark:text-gray-500 font-medium">
              No credit card required &nbsp;·&nbsp; Free plan forever &nbsp;·&nbsp; Setup in 5 minutes
            </p>
          </div>

          {/* Hero mockup */}
          <div className="relative max-w-lg mx-auto mt-14 px-2" aria-hidden="true">
            <div className="bg-[#111B21] rounded-[32px] shadow-2xl shadow-black/40 overflow-hidden border border-white/5">
              {/* Status bar */}
              <div className="bg-[#1F2C34] px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center text-white font-black text-sm">B</div>
                  <div>
                    <div className="text-white text-sm font-semibold">Bized Store</div>
                    <div className="text-[#25D366] text-xs">● Online</div>
                  </div>
                </div>
                <div className="flex gap-4 text-gray-400">
                  <span className="text-lg">📞</span>
                  <span className="text-lg">⋮</span>
                </div>
              </div>

              {/* Chat messages */}
              <div className="bg-[#0B141A] p-4 space-y-3 min-h-[220px]">
                <div className="flex justify-end">
                  <div className="bg-[#005C4B] text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[75%] shadow-sm">
                    Hi! I want to order the Cold Press Juice 🥤
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-[#1F2C34] text-white text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[80%] shadow-sm">
                    Great choice! 🎉 Here's your cart:
                    <div className="mt-2 bg-[#111B21] rounded-xl p-3 text-xs space-y-1.5">
                      <div className="flex justify-between"><span className="text-gray-300">Cold Press Green</span><span className="text-[#25D366] font-bold">$4.99</span></div>
                      <div className="flex justify-between"><span className="text-gray-300">Orange Immunity Shot</span><span className="text-[#25D366] font-bold">$2.99</span></div>
                      <div className="border-t border-white/10 pt-1.5 flex justify-between font-bold"><span>Total</span><span className="text-[#25D366]">$7.98</span></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="w-full bg-[#25D366] text-white text-sm font-bold py-3 rounded-xl shadow-lg shadow-green-500/20">
                    ✅ Pay Now — $7.98
                  </button>
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -right-2 top-8 bg-white dark:bg-[#1F2C34] rounded-2xl shadow-xl px-3.5 py-2.5 text-xs font-bold text-[#25D366] border border-gray-100 dark:border-white/10">
              +$7.98 received 💰
            </div>
            <div className="absolute -left-2 bottom-8 bg-white dark:bg-[#1F2C34] rounded-2xl shadow-xl px-3.5 py-2.5 text-xs font-bold text-gray-700 dark:text-white border border-gray-100 dark:border-white/10">
              📦 Order #1024 confirmed
            </div>
          </div>
        </section>

        {/* ── STATS ─────────────────────────────────────────────────────────── */}
        <section aria-label="Key statistics" className="py-10 border-y border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <dt className="text-2xl sm:text-4xl font-black text-[#075E54] dark:text-[#25D366]">{value}</dt>
                  <dd className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────────── */}
        <section id="features" aria-labelledby="features-heading" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-bold text-[#25D366] uppercase tracking-widest mb-3">Everything you need</p>
            <h2 id="features-heading" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
              One platform.<br className="sm:hidden" /> Infinite channels.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
              Every tool your business needs to acquire, retain, and monetise customers on WhatsApp.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className={`group relative bg-gradient-to-br ${f.color} border border-gray-100 dark:border-white/8 rounded-3xl p-6 sm:p-8 hover:border-opacity-80 hover:-translate-y-1 transition-all duration-300 cursor-default`}
              >
                <div className="text-4xl mb-5" aria-hidden="true">{f.emoji}</div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                <div
                  className="absolute bottom-6 right-6 w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition-opacity font-bold"
                  style={{ backgroundColor: f.accent }}
                  aria-hidden="true"
                >→</div>
              </article>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section
          id="how-it-works"
          aria-labelledby="how-heading"
          className="py-20 px-4 sm:px-6 bg-gray-50/50 dark:bg-white/[0.02] border-y border-gray-100 dark:border-white/5"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs sm:text-sm font-bold text-[#25D366] uppercase tracking-widest mb-3">Simple setup</p>
              <h2 id="how-heading" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
                Up and running in minutes
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
                No technical skills needed. Connect, configure, and start selling.
              </p>
            </div>

            <ol className="relative flex flex-col md:flex-row gap-8 md:gap-6">
              {/* Connector line — desktop only */}
              <div aria-hidden="true" className="hidden md:block absolute top-10 left-[16.666%] right-[16.666%] h-px bg-gradient-to-r from-transparent via-[#25D366]/40 to-transparent" />

              {STEPS.map((step, i) => (
                <li key={step.num} className="flex-1 flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <div className="w-20 h-20 bg-white dark:bg-[#111B21] border-2 border-[#25D366]/30 rounded-3xl flex items-center justify-center text-3xl shadow-lg shadow-green-500/5">
                      {step.icon}
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#25D366] rounded-full text-white text-xs font-black flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-black text-gray-900 dark:text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── COMMERCE DEEP DIVE ──────────────────────────────────────────── */}
        <section aria-labelledby="commerce-heading" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text */}
            <div className="flex-1 order-2 lg:order-1">
              <p className="text-xs sm:text-sm font-bold text-[#25D366] uppercase tracking-widest mb-3">WhatsApp Commerce</p>
              <h2 id="commerce-heading" className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-5">
                Your catalog, inside every conversation.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-7">
                Customers browse products, add to cart, and pay — all without leaving WhatsApp. 
                Reduce drop-offs, increase conversions, and make re-ordering feel effortless.
              </p>
              <ul className="space-y-3" aria-label="Commerce features">
                {["Native in-chat checkout", "Automatic cart recovery messages", "Real-time inventory sync", "Multi-currency support"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <span className="w-5 h-5 bg-[#25D366]/15 rounded-full flex items-center justify-center text-[#25D366] text-xs flex-shrink-0" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className="flex-1 order-1 lg:order-2 w-full max-w-sm mx-auto lg:mx-0" aria-hidden="true">
              <div className="bg-[#111B21] rounded-[28px] p-5 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#128C7E] rounded-full flex items-center justify-center text-white font-bold text-sm">B</div>
                  <div>
                    <div className="text-white text-sm font-semibold">Bloom Boutique</div>
                    <div className="text-[#25D366] text-xs">● 1 of 3 agents online</div>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: "Rose Gold Necklace", price: "$42.00", emoji: "📿" },
                    { label: "Pearl Drop Earrings", price: "$28.00", emoji: "💎" },
                    { label: "Velvet Scrunchie Set", price: "$12.00", emoji: "🎀" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 bg-[#1F2C34] p-3 rounded-xl">
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{item.label}</div>
                        <div className="text-[#25D366] text-xs font-bold mt-0.5">{item.price}</div>
                      </div>
                      <button className="text-xs bg-[#25D366] text-white px-2.5 py-1 rounded-lg font-bold">Add</button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-[#25D366] text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-green-500/20">
                  🛒 View Cart (2 items)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
        <section
          aria-labelledby="testimonials-heading"
          className="py-20 px-4 sm:px-6 bg-[#075E54] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                Loved by businesses worldwide
              </h2>
              <p className="text-white/60 max-w-md mx-auto">
                Join thousands of entrepreneurs already growing with Bized.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
                  <StarRating count={t.rating} />
                  <blockquote className="mt-4 text-white/90 text-sm leading-relaxed mb-5">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{t.name}</div>
                      <div className="text-white/50 text-xs">{t.role}</div>
                      <div className="text-white/40 text-xs">{t.location}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────────────────────────── */}
        <section id="pricing" aria-labelledby="pricing-heading" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-bold text-[#25D366] uppercase tracking-widest mb-3">Pricing</p>
            <h2 id="pricing-heading" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-base">
              Start free. Upgrade when you&apos;re ready. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col ${
                  plan.highlight
                    ? "bg-[#075E54] ring-2 ring-[#25D366] ring-offset-4 ring-offset-white dark:ring-offset-[#0B141A]"
                    : "border border-gray-100 dark:border-white/8 bg-white dark:bg-[#111B21]"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#25D366] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-lg font-black mb-1 ${plan.highlight ? "text-white" : "text-gray-900 dark:text-white"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mb-4 ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>{plan.desc}</p>
                  <div className="flex items-end gap-1">
                    <span className={`text-4xl sm:text-5xl font-black ${plan.highlight ? "text-white" : "text-gray-900 dark:text-white"}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-sm mb-1.5 ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>{plan.interval}</span>
                  </div>
                </div>

                <ul className="flex-1 space-y-2.5 mb-8" aria-label={`${plan.name} plan features`}>
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.highlight ? "text-white/80" : "text-gray-600 dark:text-gray-400"}`}>
                      <span className={`mt-0.5 flex-shrink-0 ${plan.highlight ? "text-[#25D366]" : "text-[#25D366]"}`} aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.name === "Enterprise" ? "/contact" : "/signup"}
                  className={`text-center font-bold py-3.5 rounded-2xl text-sm transition-all hover:-translate-y-px active:translate-y-0 ${
                    plan.highlight
                      ? "bg-[#25D366] text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
                      : "border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section
          id="faqs"
          aria-labelledby="faq-heading"
          className="py-20 px-4 sm:px-6 bg-gray-50/50 dark:bg-white/[0.02] border-y border-gray-100 dark:border-white/5"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="faq-heading" className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
                Frequently asked questions
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Still have questions?{" "}
                <a href="/contact" className="text-[#25D366] font-semibold hover:underline">Chat with our team</a>
              </p>
            </div>

            <div className="space-y-3" role="list" aria-label="FAQ items">
              {FAQS.map((faq) => (
                <div key={faq.q} role="listitem">
                  <FaqItem q={faq.q} a={faq.a} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
        <section aria-labelledby="cta-heading" className="py-24 px-4 sm:px-6 text-center relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-400/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="text-5xl mb-6" aria-hidden="true">💬</div>
            <h2 id="cta-heading" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-5">
              Ready to grow your business on WhatsApp?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base mb-10 max-w-md mx-auto">
              Join 2,000+ businesses already using Bized. Start for free, upgrade when you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/signup"
                className="bg-[#25D366] hover:bg-[#1fba58] text-white font-bold px-10 py-4 rounded-2xl text-base shadow-xl shadow-green-500/30 hover:-translate-y-0.5 transition-all"
              >
                Start For Free
              </a>
              <a
                href="/demo"
                className="border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-semibold px-10 py-4 rounded-2xl text-base hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#0B141A] px-4 sm:px-6 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            {/* Brand col */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#25D366] rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
                <span className="font-black text-lg text-[#075E54] dark:text-white tracking-tight">bized</span>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed max-w-[180px]">
                The unified WhatsApp Business platform for modern commerce.
              </p>
            </div>

            {/* Link groups */}
            {[
              { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { heading: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"] },
            ].map((col) => (
              <nav key={col.heading} aria-label={`${col.heading} links`}>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{col.heading}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-xs text-gray-500 dark:text-gray-500 hover:text-[#25D366] dark:hover:text-[#25D366] transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100 dark:border-white/5">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              © {new Date().getFullYear()} Bized, Inc. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Not affiliated with Meta or WhatsApp Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
