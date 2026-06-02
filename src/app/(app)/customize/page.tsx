"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  GripVertical,
  Eye,
  EyeOff,
  Dumbbell,
  BookOpen,
  MapPin,
  MessageSquare,
  Trophy,
  Calendar,
  Star,
  Flame,
  Zap,
  Medal,
} from "lucide-react";

interface PortalSection {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  locked?: boolean;
}

const defaultSections: PortalSection[] = [
  { id: "continue", name: "Continue Training", description: "Pick up where you left off with in-progress drills and programs", icon: Flame, enabled: true },
  { id: "programs", name: "Programs", description: "Structured multi-week training programs", icon: BookOpen, enabled: true },
  { id: "drills", name: "Drill Library", description: "Browse all available drills by category and difficulty", icon: Dumbbell, enabled: true },
  { id: "camps", name: "Upcoming Camps & Clinics", description: "In-person training events near you", icon: MapPin, enabled: true },
  { id: "community", name: "Community Highlights", description: "Latest posts and discussions from the community", icon: MessageSquare, enabled: true },
  { id: "leaderboard", name: "Leaderboard", description: "See where you rank against other members", icon: Medal, enabled: true },
  { id: "coaching", name: "Live Coaching Schedule", description: "Upcoming live calls and Q&A sessions with coaches", icon: Calendar, enabled: false },
  { id: "achievements", name: "Recent Achievements", description: "Badges and milestones you've recently unlocked", icon: Star, enabled: false },
  { id: "challenges", name: "Weekly Challenges", description: "Compete in weekly skill challenges for bonus XP", icon: Zap, enabled: false },
  { id: "recruiting", name: "Recruiting Tracker", description: "Track your recruiting journey and college interest", icon: Trophy, enabled: false },
];

export default function CustomizePage() {
  const [sections, setSections] = useState(defaultSections);
  const [saved, setSaved] = useState(false);

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const enabledCount = sections.filter((s) => s.enabled).length;

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Link href="/dashboard" className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors duration-150">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Customize Your Portal</h1>
        </div>
        <p className="text-[15px] text-gray-500 mb-8 ml-10">
          Choose which sections appear on your dashboard. Toggle sections on or off to tailor your experience.
        </p>

        {/* Stats Bar */}
        <div className="flex items-center justify-between bg-brand-dark-light border border-brand-dark-border rounded-xl px-5 py-3.5 mb-6">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-2xs text-gray-500">Active Sections</p>
              <p className="text-lg font-bold text-white">{enabledCount}</p>
            </div>
            <div className="h-8 w-px bg-brand-dark-border" />
            <div>
              <p className="text-2xs text-gray-500">Available</p>
              <p className="text-lg font-bold text-gray-400">{sections.length - enabledCount}</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className={`px-5 py-2 rounded-lg text-[13px] font-bold transition-all duration-150 ${
              saved
                ? "bg-brand-green text-brand-dark"
                : "bg-white text-brand-dark hover:bg-gray-200"
            }`}
          >
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        {/* Sections List */}
        <div className="space-y-2">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`flex items-center gap-4 bg-brand-dark-light border rounded-xl px-5 py-4 transition-all duration-150 ${
                section.enabled
                  ? "border-brand-green/20 bg-brand-green/[0.02]"
                  : "border-brand-dark-border hover:border-gray-600"
              }`}
            >
              <div className="text-gray-600 cursor-grab">
                <GripVertical size={16} />
              </div>

              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                section.enabled ? "bg-brand-green/10" : "bg-brand-dark"
              }`}>
                <section.icon size={18} className={section.enabled ? "text-brand-green" : "text-gray-600"} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className={`text-[13px] font-semibold ${section.enabled ? "text-white" : "text-gray-400"}`}>
                  {section.name}
                </h3>
                <p className="text-2xs text-gray-500 mt-0.5">{section.description}</p>
              </div>

              <button
                onClick={() => toggleSection(section.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-2xs font-medium transition-all duration-150 ${
                  section.enabled
                    ? "bg-brand-green/10 text-brand-green hover:bg-brand-green/20"
                    : "bg-white/[0.04] text-gray-500 hover:bg-white/[0.08] hover:text-gray-300"
                }`}
              >
                {section.enabled ? <Eye size={13} /> : <EyeOff size={13} />}
                {section.enabled ? "Visible" : "Hidden"}
              </button>
            </div>
          ))}
        </div>

        {/* Upsell Banner */}
        <div className="mt-8 bg-gradient-to-r from-brand-green/10 via-emerald-900/10 to-brand-dark-light border border-brand-green/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap size={18} className="text-brand-green" />
            <h3 className="text-[15px] font-bold text-white">Unlock More Sections</h3>
          </div>
          <p className="text-[13px] text-gray-400 mb-4 leading-relaxed">
            Get access to exclusive content like the Recruiting Tracker, Advanced Film Review, and 1-on-1 Coaching slots with your membership.
          </p>
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 bg-brand-green text-brand-dark font-bold text-[13px] px-5 py-2 rounded-lg hover:bg-brand-green-hover transition-colors duration-150"
          >
            Upgrade Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
