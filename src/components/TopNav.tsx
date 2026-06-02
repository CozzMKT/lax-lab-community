"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Star,
  MessageSquare,
  X,
  Dumbbell,
  BookOpen,
} from "lucide-react";

const navItems = [
  { name: "Home", href: "/dashboard" },
  { name: "Training", href: "/drills", dropdown: [
    { name: "Drill Library", href: "/drills", icon: Dumbbell },
    { name: "Programs", href: "/programs", icon: BookOpen },
  ]},
  { name: "Community", href: "/channels/general" },
  { name: "Camps & Events", href: "/camps" },
  { name: "Leaderboard", href: "/leaderboard" },
] as const;

export default function TopNav() {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const trainingRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (trainingRef.current && !trainingRef.current.contains(e.target as Node)) {
        setTrainingOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const isTrainingActive = pathname.startsWith("/drills") || pathname.startsWith("/programs");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark/0 pointer-events-none">
      <div className="pointer-events-auto">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center gap-8">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/icon-light.png"
              alt="Lax Lab"
              width={30}
              height={30}
              style={{ width: 30, height: "auto" }}
            />
            <span className="font-bold text-white text-[15px] tracking-tight hidden sm:inline">LAX LAB</span>
          </Link>

          {/* Main Nav */}
          <div className="flex items-center gap-1">
            {navItems.map((item) =>
              "dropdown" in item && item.dropdown ? (
                <div key={item.name} ref={trainingRef} className="relative">
                  <button
                    onClick={() => setTrainingOpen(!trainingOpen)}
                    className={`px-3 py-1.5 rounded text-[13px] font-medium transition-colors duration-150 flex items-center gap-1 ${
                      isTrainingActive
                        ? "text-white bg-white/[0.08]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.name}
                    <ChevronDown size={12} className={`transition-transform duration-150 ${trainingOpen ? "rotate-180" : ""}`} />
                  </button>
                  {trainingOpen && (
                    <div className="absolute left-0 top-full mt-1.5 w-48 bg-brand-dark-light border border-brand-dark-border rounded-lg shadow-xl shadow-black/40 overflow-hidden">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setTrainingOpen(false)}
                          className={`flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] transition-colors duration-150 ${
                            isActive(sub.href)
                              ? "text-brand-green bg-brand-green/5"
                              : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                          }`}
                        >
                          <sub.icon size={15} />
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1.5 rounded text-[13px] font-medium transition-colors duration-150 ${
                    isActive(item.href)
                      ? "text-white bg-white/[0.08]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          <div className="flex-1" />

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div ref={searchRef} className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-brand-dark-light border border-brand-dark-border rounded-lg overflow-hidden">
                  <Search size={14} className="text-gray-500 ml-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search drills, programs, camps..."
                    className="bg-transparent px-2 py-1.5 text-[13px] text-white placeholder-gray-600 focus:outline-none w-52"
                    autoFocus
                  />
                  <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="p-1.5 text-gray-500 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors duration-150"
                >
                  <Search size={18} />
                </button>
              )}
            </div>

            {/* Messages */}
            <Link
              href="/channels/general"
              className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors duration-150"
            >
              <MessageSquare size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-green rounded-full" />
            </Link>

            {/* Notifications */}
            <div ref={notificationsRef} className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors duration-150"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-brand-dark-light border border-brand-dark-border rounded-lg shadow-xl shadow-black/40 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-brand-dark-border">
                    <p className="text-[13px] font-semibold text-white">Notifications</p>
                    <button className="text-2xs text-brand-green hover:text-brand-green/80 transition-colors duration-150">
                      Mark all read
                    </button>
                  </div>

                  {/* Notification Items */}
                  <div className="max-h-80 overflow-y-auto">
                    {/* New Program Available - unread */}
                    <div className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors duration-150 cursor-pointer">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-green shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-white">New Program Available</p>
                        <p className="text-2xs text-gray-400 truncate">Offensive Skills Foundation is now live with 26 drills and video breakdowns.</p>
                        <p className="text-2xs text-gray-600 mt-0.5">2h ago</p>
                      </div>
                    </div>

                    {/* Weekly Coaching Call - unread */}
                    <div className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors duration-150 cursor-pointer">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-green shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-white">Weekly Coaching Call</p>
                        <p className="text-2xs text-gray-400 truncate">Jules goes live Thursday at 7 PM EST. Don&apos;t miss the Q&amp;A!</p>
                        <p className="text-2xs text-gray-600 mt-0.5">1d ago</p>
                      </div>
                    </div>

                    {/* New Drills Added - read */}
                    <div className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors duration-150 cursor-pointer">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-gray-600 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-gray-300">New Drills Added</p>
                        <p className="text-2xs text-gray-500 truncate">15 new drill videos just dropped in the library. Check them out.</p>
                        <p className="text-2xs text-gray-600 mt-0.5">2d ago</p>
                      </div>
                    </div>

                    {/* Leaderboard Update - read */}
                    <div className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors duration-150 cursor-pointer">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-gray-600 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-gray-300">Leaderboard Update</p>
                        <p className="text-2xs text-gray-500 truncate">You moved up to #7! Keep grinding to hit Elite rank.</p>
                        <p className="text-2xs text-gray-600 mt-0.5">3d ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-brand-dark-border px-4 py-2.5">
                    <Link
                      href="/notifications"
                      onClick={() => setNotificationsOpen(false)}
                      className="block text-center text-2xs text-brand-green hover:text-brand-green/80 transition-colors duration-150"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-white/[0.06] transition-colors duration-150"
              >
                <div className="w-7 h-7 rounded bg-brand-green flex items-center justify-center text-brand-dark text-2xs font-bold">
                  JD
                </div>
                <ChevronDown size={12} className={`text-gray-500 transition-transform duration-150 ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-brand-dark-light border border-brand-dark-border rounded-lg shadow-xl shadow-black/40 overflow-hidden">
                  {/* Current Profile */}
                  <div className="px-4 py-3 border-b border-brand-dark-border">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded bg-brand-green flex items-center justify-center text-brand-dark text-xs font-bold">
                        JD
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-white">John Doe</p>
                        <p className="text-2xs text-yellow-400">All-Star · 1,820 XP</p>
                      </div>
                    </div>
                  </div>

                  {/* Switch Profile */}
                  <div className="px-2 py-2 border-b border-brand-dark-border">
                    <p className="text-[9px] text-gray-600 uppercase tracking-wider font-medium px-2 mb-1">Switch Profile</p>
                    <Link
                      href="/profiles"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-2 py-1.5 rounded text-[13px] text-gray-400 hover:text-white hover:bg-white/[0.03] transition-colors duration-150"
                    >
                      <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-[9px] font-bold">
                        JD
                      </div>
                      John Jr.
                      <span className="text-2xs text-gray-600 ml-auto">Kid</span>
                    </Link>
                    <Link
                      href="/profiles"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-2 py-1.5 rounded text-[13px] text-gray-400 hover:text-white hover:bg-white/[0.03] transition-colors duration-150"
                    >
                      <div className="w-6 h-6 rounded bg-brand-dark border border-brand-dark-border flex items-center justify-center text-gray-500 text-[9px]">
                        +
                      </div>
                      Add Profile
                    </Link>
                  </div>

                  {/* Menu Items */}
                  <div className="px-2 py-2">
                    <Link
                      href="/achievements"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-2 py-1.5 rounded text-[13px] text-gray-400 hover:text-white hover:bg-white/[0.03] transition-colors duration-150"
                    >
                      <Star size={14} />
                      Achievements & Rank
                    </Link>
                    <Link
                      href="/customize"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-2 py-1.5 rounded text-[13px] text-gray-400 hover:text-white hover:bg-white/[0.03] transition-colors duration-150"
                    >
                      <User size={14} />
                      Customize Portal
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-2 py-1.5 rounded text-[13px] text-gray-400 hover:text-white hover:bg-white/[0.03] transition-colors duration-150"
                    >
                      <Settings size={14} />
                      Settings
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-2.5 px-2 py-1.5 rounded text-[13px] text-red-400 hover:bg-red-400/10 transition-colors duration-150 mt-1 border-t border-brand-dark-border pt-2"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
