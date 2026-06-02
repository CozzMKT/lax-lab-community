"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Dumbbell,
  BookOpen,
  Calendar,
  MapPin,
  MessageSquare,
  Trophy,
  Star,
  Medal,
  Users,
  Video,
  ChevronRight,
  Check,
  Flame,
  GraduationCap,
  ArrowRight,
  Zap,
  Shield,
  X,
  Sun,
  Moon,
} from "lucide-react";

const features = [
  {
    icon: Dumbbell,
    title: "50+ Video Drills",
    desc: "Full drill library covering shooting, dodging, defense, footwork, and lacrosse IQ — all taught by D1-level coaches.",
  },
  {
    icon: BookOpen,
    title: "Structured Programs",
    desc: "1-month and 3-month offensive programs plus a complete D1 Recruiting Roadmap. Follow week-by-week training plans.",
  },
  {
    icon: Calendar,
    title: "Live Coaching Calls",
    desc: "Biweekly live webinars with Jules Heningburg. Get real-time feedback, film breakdowns, and Q&A sessions.",
  },
  {
    icon: MessageSquare,
    title: "Private Community",
    desc: "Discord-style channels for announcements, challenges, film review, and wins. Connect with serious lacrosse athletes.",
  },
  {
    icon: Trophy,
    title: "Gamification & Ranks",
    desc: "Earn XP, unlock achievements, climb the leaderboard, and rank up from Rookie to D1 Prospect. Track your progress.",
  },
  {
    icon: MapPin,
    title: "In-Person Camps",
    desc: "Browse and register for elite camps, clinics, and showcases. Members get 5-10% off all in-person events.",
  },
];

const upcomingCamps = [
  { title: "Elite Offensive Skills Clinic", location: "Ridgefield, CT", date: "April 12, 2026", spots: "6 spots left", price: 125, status: "limited" as const },
  { title: "High School Conditioning Camp", location: "Patterson, NY", date: "April 19, 2026", spots: "19 spots left", price: 175, status: "open" as const },
  { title: "D1 Prospect Showcase", location: "Princeton, NJ", date: "May 10, 2026", spots: "18 spots left", price: 295, status: "invite-only" as const },
  { title: "Summer Elite Training Week", location: "Ridgefield, CT", date: "June 15-19, 2026", spots: "22 spots left", price: 495, status: "open" as const },
];

const testimonials = [
  {
    name: "Brandon K.",
    role: "Junior, Attack — NJ",
    content: "Just got my first D1 offer from UMass! The recruiting roadmap was a game changer — knowing when to email and what to say made all the difference.",
  },
  {
    name: "Tyler M.",
    role: "Sophomore, Midfield — CT",
    content: "4 goals and 2 assists today! That roll dodge series from the drill library is LETHAL. My coach asked what I've been doing differently.",
  },
  {
    name: "Ryan S.",
    role: "Junior, Attack — NY",
    content: "I'm on week 4 of the 3-month program and my split dodge is already way smoother. The live coaching calls are worth the membership alone.",
  },
];

const included = [
  "Access to ALL digital programs",
  "Full drill library (50+ drills)",
  "D1 Recruiting Roadmap",
  "Biweekly live coaching calls with Jules",
  "Private community access",
  "Direct messaging with coaches",
  "24-hour coach response time",
  "XP tracking, leaderboard & achievements",
  "5-10% off all in-person camps & clinics",
];

const coachCredentials = [
  "4-Time PLL All-Star (2019, 2021, 2022, 2023)",
  "7th Overall Pick — 2018 MLL Draft",
  "Two-Time All-American at Rutgers University",
  "First Team All-Big Ten (2x)",
  "Tewaaraton Award Watch List (multiple seasons)",
  "207 career points at Rutgers (117G, 90A)",
  "ESPN Lacrosse Analyst & Commentator",
  "Black Lacrosse Alliance — Founding Member",
];

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // No Stripe configured yet — go straight to dashboard for testing
        window.location.href = "/dashboard";
      }
    } catch {
      // Fallback for testing without Stripe
      window.location.href = "/dashboard";
    } finally {
      setCheckoutLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("laxlab-theme");
    if (saved === "light") setIsDark(false);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      localStorage.setItem("laxlab-theme", prev ? "light" : "dark");
      return !prev;
    });
  };

  const t = isDark
    ? {
        bg: "bg-brand-dark",
        bgAlt: "bg-brand-dark-light",
        bgAlt30: "bg-brand-dark-light/30",
        text: "text-white",
        textMuted: "text-gray-400",
        textFaint: "text-gray-500",
        textFainter: "text-gray-600",
        border: "border-brand-dark-border",
        card: "bg-brand-dark-light border-brand-dark-border",
        inputBg: "bg-brand-dark border-brand-dark-border text-white placeholder-gray-600",
        navBg: "bg-brand-dark/90",
        logoSrc: "/icon-light.png",
        heroGrad1: "from-brand-dark via-brand-dark/60 to-brand-dark/40",
        heroGrad2: "from-brand-dark/70 via-transparent to-brand-dark/70",
        heroGradBottom: "from-brand-dark",
        pillBg: "bg-black/40 border-white/10",
        tagText: "text-gray-300",
      }
    : {
        bg: "bg-white",
        bgAlt: "bg-gray-50",
        bgAlt30: "bg-gray-100/60",
        text: "text-gray-900",
        textMuted: "text-gray-600",
        textFaint: "text-gray-500",
        textFainter: "text-gray-400",
        border: "border-gray-200",
        card: "bg-white border-gray-200 shadow-sm",
        inputBg: "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400",
        navBg: "bg-white/90",
        logoSrc: "/icon-dark.png",
        heroGrad1: "from-gray-900 via-gray-900/60 to-gray-900/40",
        heroGrad2: "from-gray-900/70 via-transparent to-gray-900/70",
        heroGradBottom: "from-gray-900",
        pillBg: "bg-black/40 border-white/10",
        tagText: "text-gray-300",
      };

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} transition-colors duration-300`}>
      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${t.navBg} backdrop-blur-md border-b ${t.border}`}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={t.logoSrc}
              alt="Lax Lab"
              width={28}
              height={28}
              style={{ width: 28, height: "auto" }}
            />
            <span className={`font-bold ${t.text} text-sm tracking-tight`}>LAX LAB</span>
          </Link>

          <div className={`hidden md:flex items-center gap-6 text-[13px] ${t.textMuted}`}>
            <a href="#features" className={`hover:${t.text} transition-colors duration-150`}>Features</a>
            <a href="#camps" className={`hover:${t.text} transition-colors duration-150`}>Camps</a>
            <a href="#pricing" className={`hover:${t.text} transition-colors duration-150`}>Pricing</a>
            <a href="#testimonials" className={`hover:${t.text} transition-colors duration-150`}>Athletes</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${t.textMuted} hover:${t.text} transition-colors duration-150`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className={`text-[13px] ${t.textMuted} hover:${t.text} px-3 py-1.5 transition-colors duration-150`}
            >
              Log In
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className="bg-brand-green hover:bg-brand-green-hover text-brand-dark font-semibold text-[13px] px-4 py-1.5 rounded-lg transition-colors duration-150"
            >
              Join Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero — Full-bleed background image, Netflix-style */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${t.heroGrad1} z-[1]`} />
        <div className={`absolute inset-0 bg-gradient-to-r ${t.heroGrad2} z-[1]`} />
        <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${t.heroGradBottom} to-transparent z-[1]`} />

        <div className="relative z-[2] max-w-4xl mx-auto text-center px-6 pt-20">
          <div className={`inline-flex items-center gap-2 ${t.pillBg} backdrop-blur-sm border text-brand-green text-2xs font-medium px-3 py-1 rounded-full mb-6`}>
            <Zap size={12} />
            The #1 Online Lacrosse Training Academy
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5 drop-shadow-lg text-white">
            Train like a{" "}
            <span className="text-brand-green">D1 athlete.</span>
            <br />
            From anywhere.
          </h1>

          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
            50+ video drills, structured programs, live coaching from Jules Heningburg,
            a private community of serious athletes, and in-person camps — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <button
              onClick={() => setShowSignup(true)}
              className="bg-brand-green hover:bg-brand-green-hover text-brand-dark font-bold text-sm px-8 py-3 rounded-lg transition-colors duration-150 flex items-center gap-2 shadow-lg shadow-brand-green/20"
            >
              Start Training — $149/mo
              <ArrowRight size={16} />
            </button>
            <Link
              href="#features"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-150 flex items-center gap-1.5"
            >
              <Play size={14} />
              See what&apos;s inside
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-300 text-[13px]">
            <div className="flex items-center gap-1.5">
              <Users size={14} />
              <span><strong className="text-white">247</strong> active members</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Dumbbell size={14} />
              <span><strong className="text-white">50+</strong> drills</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={14} />
              <span><strong className="text-white">4.9</strong> avg rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GraduationCap size={14} />
              <span><strong className="text-white">250+</strong> D1 athletes trained</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={`px-6 py-20 border-t ${t.border}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${t.text}`}>Everything you need to dominate</h2>
            <p className={`text-[15px] ${t.textFaint} max-w-xl mx-auto`}>
              One platform. Drills, programs, coaching, community, camps, and progress tracking — built for serious lacrosse athletes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`border rounded-lg p-5 ${t.card} hover:scale-[1.02] transition-all duration-150`}
              >
                <div className="w-9 h-9 rounded-lg bg-brand-green/10 flex items-center justify-center mb-3">
                  <feature.icon size={18} className="text-brand-green" />
                </div>
                <h3 className={`font-semibold ${t.text} text-[15px] mb-1.5`}>{feature.title}</h3>
                <p className={`text-[13px] ${t.textFaint} leading-relaxed`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Strip */}
      <section className="py-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src="/hero-bg.png" alt="Jules Heningburg in action" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src="/jules-coaching.png" alt="Jules coaching young athletes" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src="/jules-action-2.png" alt="Jules dodging in PLL game" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src="/jules-indoor.jpg" alt="Jules leading indoor training session" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* Camps Section */}
      <section id="camps" className={`px-6 py-20 ${t.bgAlt30} border-t ${t.border}`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${t.text}`}>Upcoming Camps & Clinics</h2>
              <p className={`text-[15px] ${t.textFaint}`}>
                In-person training with Jules Heningburg and the Lax Lab coaching staff
              </p>
            </div>
            <button
              onClick={() => setShowSignup(true)}
              className="hidden md:flex items-center gap-1.5 text-brand-green hover:text-brand-green-hover text-[13px] font-medium transition-colors duration-150"
            >
              View All Events
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {upcomingCamps.map((camp) => (
              <div
                key={camp.title}
                className={`border rounded-lg p-4 ${t.card} hover:scale-[1.01] transition-all duration-150`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-semibold ${t.text} text-[13px]`}>{camp.title}</h3>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                    camp.status === "open"
                      ? "bg-brand-green/10 text-brand-green border-brand-green/20"
                      : camp.status === "limited"
                      ? "bg-yellow-400/10 text-yellow-400 border-yellow-400/20"
                      : "bg-purple-400/10 text-purple-400 border-purple-400/20"
                  }`}>
                    {camp.status === "invite-only" ? "Invite Only" : camp.status === "limited" ? "Limited" : "Open"}
                  </span>
                </div>
                <div className={`flex items-center gap-3 text-2xs ${t.textFaint} mb-3`}>
                  <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    {camp.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {camp.date}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${t.text}`}>${camp.price}</span>
                    <span className={`text-2xs font-medium ${camp.status === "limited" ? "text-yellow-400" : t.textFaint}`}>
                      {camp.spots}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowSignup(true)}
                    className="text-2xs text-brand-green hover:text-brand-green-hover font-medium transition-colors duration-150"
                  >
                    Register →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className={`px-6 py-20 border-t ${t.border}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${t.text}`}>Athletes are seeing results</h2>
            <p className={`text-[15px] ${t.textFaint}`}>Real feedback from Lax Lab members</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((tm) => (
              <div
                key={tm.name}
                className={`border rounded-lg p-5 ${t.card}`}
              >
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className={`text-[13px] ${t.textMuted} leading-relaxed mb-4`}>
                  &ldquo;{tm.content}&rdquo;
                </p>
                <div>
                  <p className={`text-[13px] font-semibold ${t.text}`}>{tm.name}</p>
                  <p className={`text-2xs ${t.textFaint}`}>{tm.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={`px-6 py-20 ${t.bgAlt30} border-t ${t.border}`}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${t.text}`}>One plan. Everything included.</h2>
          <p className={`text-[15px] ${t.textFaint} mb-10`}>No hidden fees. Cancel anytime.</p>

          <div className={`border border-brand-green/20 rounded-xl p-8 text-left ${isDark ? "bg-brand-dark-light" : "bg-white shadow-lg"}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-xl font-bold ${t.text}`}>Elite Digital Coaching</h3>
                <p className={`text-[13px] ${t.textFaint} mt-0.5`}>Full access to everything in Lax Lab</p>
              </div>
              <div className="text-right">
                <p className={`text-3xl font-bold ${t.text}`}>$149</p>
                <p className={`text-2xs ${t.textFaint}`}>/month</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {included.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={14} className="text-brand-green shrink-0" />
                  <span className={`text-[13px] ${t.textMuted}`}>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowSignup(true)}
              className="w-full bg-brand-green hover:bg-brand-green-hover text-brand-dark font-bold text-sm py-3 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2"
            >
              Join Lax Lab — $149/mo
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Coach Section — Real Jules Bio with photos */}
      <section className={`px-6 py-20 border-t ${t.border}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-2xs text-brand-green font-medium uppercase tracking-wider mb-2">Your Head Coach</p>
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${t.text}`}>Jules Heningburg</h2>
            <p className={`text-[15px] ${t.textFaint} max-w-2xl mx-auto`}>
              Former professional lacrosse player, 4-time PLL All-Star, and one of the most versatile and influential figures in the sport today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Photo collage */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                <Image src="/jules-action-2.png" alt="Jules in PLL action" fill className="object-cover" />
              </div>
              <div className="space-y-3">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src="/jules-coaching.png" alt="Jules coaching camp" fill className="object-cover" />
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src="/jules-indoor.jpg" alt="Jules leading indoor session" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Bio + Credentials */}
            <div>
              <p className={`text-[15px] ${t.textMuted} leading-relaxed mb-6`}>
                Jules Heningburg is a former professional lacrosse player for the Boston Cannons in the Premier Lacrosse League (PLL). He is widely considered one of the most versatile and influential figures in the sport today — both for his performance on the field and his leadership off it.
              </p>
              <p className={`text-[15px] ${t.textMuted} leading-relaxed mb-6`}>
                A two-time All-American at Rutgers University and founding member of the Black Lacrosse Alliance, Jules is committed to making world-class lacrosse training accessible to every serious athlete. Through Lax Lab, he brings the same intensity, knowledge, and mentorship that shaped his career directly to you.
              </p>

              <div className="space-y-2">
                {coachCredentials.map((cred, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Check size={14} className="text-brand-green shrink-0" />
                    <span className={`text-[13px] ${t.textMuted}`}>{cred}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className={`flex items-center gap-2 text-[13px] ${t.textFaint}`}>
                  <Shield size={14} className="text-brand-green" />
                  <span>PLL: Redwoods, Chaos, Cannons</span>
                </div>
                <div className={`flex items-center gap-2 text-[13px] ${t.textFaint}`}>
                  <GraduationCap size={14} className="text-brand-green" />
                  <span>Rutgers University</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with background image */}
      <section className="relative px-6 py-24 text-center overflow-hidden">
        <Image
          src="/jules-action-1.jpg"
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-dark/80 z-[1]" />
        <div className="relative z-[2] max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Ready to train like a D1 athlete?</h2>
          <p className="text-[15px] text-gray-300 mb-8">
            Join 247 athletes who are getting better every single day with Lax Lab.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setShowSignup(true)}
              className="bg-brand-green hover:bg-brand-green-hover text-brand-dark font-bold text-sm px-8 py-3 rounded-lg transition-colors duration-150 flex items-center gap-2"
            >
              Start Training Today
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
            >
              Already a member? Log in
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`px-6 py-8 border-t ${t.border}`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={t.logoSrc}
              alt="Lax Lab"
              width={20}
              height={20}
              style={{ width: 20, height: "auto" }}
            />
            <span className={`text-2xs ${t.textFainter}`}>&copy; 2026 Lax Lab. All rights reserved.</span>
          </div>
          <div className={`flex items-center gap-4 text-2xs ${t.textFainter}`}>
            <a href="#" className={`hover:${t.textMuted} transition-colors duration-150`}>Privacy</a>
            <a href="#" className={`hover:${t.textMuted} transition-colors duration-150`}>Terms</a>
            <a href="#" className={`hover:${t.textMuted} transition-colors duration-150`}>Contact</a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4" onClick={() => setShowLogin(false)}>
          <div className={`border rounded-xl max-w-sm w-full p-6 ${t.card}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className={`text-lg font-bold ${t.text}`}>Log In</h2>
              <button onClick={() => setShowLogin(false)} className={`${t.textFaint} hover:${t.text} transition-colors duration-150`}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className={`block text-2xs font-medium ${t.textFaint} mb-1`}>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full border rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-brand-green/50 ${t.inputBg}`}
                />
              </div>
              <div>
                <label className={`block text-2xs font-medium ${t.textFaint} mb-1`}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full border rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-brand-green/50 ${t.inputBg}`}
                />
              </div>
              <Link
                href="/dashboard"
                className="block w-full bg-brand-green hover:bg-brand-green-hover text-brand-dark font-bold text-[13px] py-2.5 rounded-lg transition-colors duration-150 text-center"
              >
                Log In
              </Link>
              <p className={`text-2xs ${t.textFainter} text-center`}>
                Don&apos;t have an account?{" "}
                <button onClick={() => { setShowLogin(false); setShowSignup(true); }} className="text-brand-green hover:text-brand-green-hover">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4" onClick={() => setShowSignup(false)}>
          <div className={`border rounded-xl max-w-sm w-full p-6 ${t.card}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className={`text-lg font-bold ${t.text}`}>Join Lax Lab</h2>
              <button onClick={() => setShowSignup(false)} className={`${t.textFaint} hover:${t.text} transition-colors duration-150`}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-2xs font-medium ${t.textFaint} mb-1`}>First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className={`w-full border rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-brand-green/50 ${t.inputBg}`}
                  />
                </div>
                <div>
                  <label className={`block text-2xs font-medium ${t.textFaint} mb-1`}>Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className={`w-full border rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-brand-green/50 ${t.inputBg}`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-2xs font-medium ${t.textFaint} mb-1`}>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full border rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-brand-green/50 ${t.inputBg}`}
                />
              </div>
              <div>
                <label className={`block text-2xs font-medium ${t.textFaint} mb-1`}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full border rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-brand-green/50 ${t.inputBg}`}
                />
              </div>
              <div>
                <label className={`block text-2xs font-medium ${t.textFaint} mb-1`}>Position</label>
                <select className={`w-full border rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-brand-green/50 ${t.inputBg}`}>
                  <option value="">Select position</option>
                  <option>Attack</option>
                  <option>Midfield</option>
                  <option>Defense</option>
                  <option>Goalie</option>
                  <option>FOGO</option>
                </select>
              </div>

              <div className={`rounded-lg p-3 flex items-center justify-between ${isDark ? "bg-brand-dark" : "bg-gray-100"}`}>
                <div>
                  <p className={`text-[13px] font-semibold ${t.text}`}>Elite Digital Coaching</p>
                  <p className={`text-2xs ${t.textFaint}`}>Full access to everything</p>
                </div>
                <p className={`text-sm font-bold ${t.text}`}>$149<span className={`text-2xs ${t.textFaint} font-normal`}>/mo</span></p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="block w-full bg-brand-green hover:bg-brand-green-hover text-brand-dark font-bold text-[13px] py-2.5 rounded-lg transition-colors duration-150 text-center disabled:opacity-70"
              >
                {checkoutLoading ? "Loading..." : "Create Account & Start Training →"}
              </button>
              <p className={`text-2xs ${t.textFainter} text-center`}>
                Already a member?{" "}
                <button onClick={() => { setShowSignup(false); setShowLogin(true); }} className="text-brand-green hover:text-brand-green-hover">
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
