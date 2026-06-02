"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Hash,
  Megaphone,
  Zap,
  Video,
  Dumbbell,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Settings,
  ChevronDown,
  ChevronRight,
  Calendar,
  Trophy,
  Medal,
  MapPin,
  Star,
} from "lucide-react";

const communityChannels = [
  { name: "announcements", icon: Megaphone, href: "/channels/announcements" },
  { name: "general", icon: Hash, href: "/channels/general" },
  { name: "challenges", icon: Zap, href: "/channels/challenges" },
  { name: "film-review", icon: Video, href: "/channels/film-review" },
  { name: "wins", icon: Trophy, href: "/channels/wins" },
];

const navSections = [
  {
    label: "Training",
    items: [
      { name: "Drill Library", icon: Dumbbell, href: "/drills" },
      { name: "Programs", icon: BookOpen, href: "/programs" },
    ],
  },
  {
    label: "Compete",
    items: [
      { name: "Leaderboard", icon: Medal, href: "/leaderboard" },
      { name: "Achievements", icon: Star, href: "/achievements" },
    ],
  },
  {
    label: "Coaching",
    items: [
      { name: "Live Coaching", icon: Calendar, href: "/coaching" },
      { name: "Recruiting", icon: GraduationCap, href: "/programs?tab=recruiting" },
    ],
  },
  {
    label: "Events",
    items: [
      { name: "Camps & Clinics", icon: MapPin, href: "/camps" },
    ],
  },
];

const ranks = [
  { name: "Rookie", minXP: 0, color: "text-gray-500", bg: "bg-gray-500" },
  { name: "Starter", minXP: 250, color: "text-blue-400", bg: "bg-blue-400" },
  { name: "Varsity", minXP: 750, color: "text-purple-400", bg: "bg-purple-400" },
  { name: "All-Star", minXP: 1500, color: "text-yellow-400", bg: "bg-yellow-400" },
  { name: "Elite", minXP: 3000, color: "text-orange-400", bg: "bg-orange-400" },
  { name: "D1 Prospect", minXP: 5000, color: "text-brand-green", bg: "bg-brand-green" },
];

function getCurrentRank(xp: number) {
  let current = ranks[0];
  let next: typeof ranks[0] | null = ranks[1];
  for (let i = ranks.length - 1; i >= 0; i--) {
    if (xp >= ranks[i].minXP) {
      current = ranks[i];
      next = ranks[i + 1] || null;
      break;
    }
  }
  return { current, next };
}

const userXP = 1820;
const { current: currentRank, next: nextRank } = getCurrentRank(userXP);
const xpProgress = nextRank
  ? ((userXP - currentRank.minXP) / (nextRank.minXP - currentRank.minXP)) * 100
  : 100;

export default function Sidebar() {
  const pathname = usePathname();
  const [communityOpen, setCommunityOpen] = useState(true);
  const [sectionsOpen, setSectionsOpen] = useState<Record<string, boolean>>({
    Training: true,
    Compete: true,
    Coaching: true,
    Events: true,
  });

  const toggleSection = (label: string) => {
    setSectionsOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="w-60 bg-brand-dark flex flex-col border-r border-brand-dark-border shrink-0">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2.5 px-4 h-12 border-b border-brand-dark-border shrink-0 hover:bg-brand-dark-hover transition-colors duration-150">
        <Image
          src="/icon-light.png"
          alt="Lax Lab"
          width={24}
          height={24}
          style={{ width: 24, height: "auto" }}
        />
        <span className="font-semibold text-white text-[13px] tracking-tight">LAX LAB</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-1.5">
        {/* Community */}
        <button
          onClick={() => setCommunityOpen(!communityOpen)}
          className="flex items-center gap-1 px-2 py-1 text-2xs font-medium uppercase tracking-wider text-gray-500 hover:text-gray-300 w-full mb-0.5 transition-colors duration-150"
        >
          {communityOpen ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
          Community
        </button>

        {communityOpen &&
          communityChannels.map((channel) => {
            const active = isActive(channel.href);
            return (
              <Link
                key={channel.name}
                href={channel.href}
                className={`flex items-center gap-2 px-2 py-[5px] rounded text-[13px] transition-colors duration-150 ${
                  active
                    ? "text-white bg-white/[0.06]"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]"
                }`}
              >
                <channel.icon size={15} className={active ? "text-brand-green" : "text-gray-500"} strokeWidth={active ? 2 : 1.5} />
                {channel.name}
              </Link>
            );
          })}

        {/* Sections */}
        {navSections.map((section) => (
          <div key={section.label} className="mt-3">
            <button
              onClick={() => toggleSection(section.label)}
              className="flex items-center gap-1 px-2 py-1 text-2xs font-medium uppercase tracking-wider text-gray-500 hover:text-gray-300 w-full mb-0.5 transition-colors duration-150"
            >
              {sectionsOpen[section.label] ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
              {section.label}
            </button>

            {sectionsOpen[section.label] &&
              section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-2 py-[5px] rounded text-[13px] transition-colors duration-150 ${
                      active
                        ? "text-white bg-white/[0.06]"
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]"
                    }`}
                  >
                    <item.icon size={15} className={active ? "text-brand-green" : "text-gray-500"} strokeWidth={active ? 2 : 1.5} />
                    {item.name}
                  </Link>
                );
              })}
          </div>
        ))}

        {/* DMs */}
        <div className="mt-3">
          <Link
            href="/messages"
            className={`flex items-center gap-2 px-2 py-[5px] rounded text-[13px] transition-colors duration-150 ${
              isActive("/messages")
                ? "text-white bg-white/[0.06]"
                : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]"
            }`}
          >
            <MessageSquare size={15} className={isActive("/messages") ? "text-brand-green" : "text-gray-500"} strokeWidth={isActive("/messages") ? 2 : 1.5} />
            Messages
            <span className="ml-auto bg-brand-green text-brand-dark text-2xs font-semibold rounded-full w-[18px] h-[18px] flex items-center justify-center">
              3
            </span>
          </Link>
        </div>
      </nav>

      {/* Bottom: XP + User */}
      <div className="border-t border-brand-dark-border p-2 space-y-1">
        <Link href="/achievements" className="block px-2 py-1.5 rounded hover:bg-white/[0.03] transition-colors duration-150">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-2xs font-semibold ${currentRank.color}`}>{currentRank.name}</span>
            <span className="text-2xs text-gray-600">{userXP.toLocaleString()} XP</span>
          </div>
          <div className="h-1 bg-brand-dark-border rounded-full overflow-hidden">
            <div
              className={`h-full ${currentRank.bg} rounded-full`}
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          {nextRank && (
            <p className="text-[9px] text-gray-600 mt-0.5">
              {(nextRank.minXP - userXP).toLocaleString()} to {nextRank.name}
            </p>
          )}
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-2 px-2 py-1.5 rounded text-[13px] text-gray-400 hover:text-gray-200 hover:bg-white/[0.03] transition-colors duration-150"
        >
          <div className="w-6 h-6 rounded-full bg-brand-green/80 flex items-center justify-center text-brand-dark text-2xs font-semibold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-gray-200 truncate leading-tight">John Doe</p>
            <p className={`text-[10px] leading-tight ${currentRank.color}`}>{currentRank.name}</p>
          </div>
          <Settings size={13} className="text-gray-600" />
        </Link>
      </div>
    </aside>
  );
}
