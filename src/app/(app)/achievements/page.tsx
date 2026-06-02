"use client";

import { useState } from "react";
import {
  Star,
  Trophy,
  Flame,
  Dumbbell,
  BookOpen,
  Target,
  Crosshair,
  Clock,
  MessageSquare,
  Video,
  GraduationCap,
  Shield,
  Zap,
  Crown,
  Medal,
  Award,
  CheckCircle2,
  Lock,
  ChevronRight,
} from "lucide-react";

const ranks = [
  { name: "Rookie", minXP: 0, color: "text-gray-400", bg: "bg-gray-400", bgLight: "bg-gray-400/10", border: "border-gray-400/20", desc: "Just getting started" },
  { name: "Starter", minXP: 250, color: "text-blue-400", bg: "bg-blue-400", bgLight: "bg-blue-400/10", border: "border-blue-400/20", desc: "Building fundamentals" },
  { name: "Varsity", minXP: 750, color: "text-purple-400", bg: "bg-purple-400", bgLight: "bg-purple-400/10", border: "border-purple-400/20", desc: "Consistent competitor" },
  { name: "All-Star", minXP: 1500, color: "text-yellow-400", bg: "bg-yellow-400", bgLight: "bg-yellow-400/10", border: "border-yellow-400/20", desc: "Top performer" },
  { name: "Elite", minXP: 3000, color: "text-orange-400", bg: "bg-orange-400", bgLight: "bg-orange-400/10", border: "border-orange-400/20", desc: "Elite level athlete" },
  { name: "D1 Prospect", minXP: 5000, color: "text-brand-green", bg: "bg-brand-green", bgLight: "bg-brand-green/10", border: "border-brand-green/20", desc: "College-ready" },
];

const userXP = 1820;

const achievements = [
  { id: "first-drill", name: "First Rep", desc: "Complete your first drill", icon: Dumbbell, category: "Drills", xp: 25, earned: true, earnedDate: "Mar 2, 2026" },
  { id: "drill-10", name: "Getting Reps", desc: "Complete 10 drills", icon: Dumbbell, category: "Drills", xp: 50, earned: true, earnedDate: "Mar 8, 2026" },
  { id: "drill-25", name: "Grinder", desc: "Complete 25 drills", icon: Target, category: "Drills", xp: 100, earned: false, progress: 22, total: 25 },
  { id: "drill-50", name: "Lab Rat", desc: "Complete all 50+ drills", icon: Trophy, category: "Drills", xp: 250, earned: false, progress: 22, total: 50 },
  { id: "shooting-master", name: "Sharpshooter", desc: "Complete all shooting drills", icon: Crosshair, category: "Drills", xp: 150, earned: true, earnedDate: "Mar 15, 2026" },
  { id: "dodge-master", name: "Ankle Breaker", desc: "Complete all dodging drills", icon: Zap, category: "Drills", xp: 150, earned: false, progress: 8, total: 12 },
  { id: "program-start", name: "Day One", desc: "Start your first program", icon: BookOpen, category: "Programs", xp: 25, earned: true, earnedDate: "Mar 1, 2026" },
  { id: "1mo-complete", name: "Month of Grind", desc: "Complete the 1-Month Offensive Program", icon: Star, category: "Programs", xp: 500, earned: false, progress: 6, total: 16 },
  { id: "3mo-complete", name: "The Full Send", desc: "Complete the 3-Month Offensive Program", icon: Crown, category: "Programs", xp: 1000, earned: false, progress: 0, total: 48 },
  { id: "recruiting-complete", name: "Recruiting Ready", desc: "Complete the D1 Recruiting Roadmap", icon: GraduationCap, category: "Programs", xp: 300, earned: false, progress: 0, total: 12 },
  { id: "streak-3", name: "Three-Peat", desc: "3-day training streak", icon: Flame, category: "Streaks", xp: 25, earned: true, earnedDate: "Mar 5, 2026" },
  { id: "streak-7", name: "Full Week", desc: "7-day training streak", icon: Flame, category: "Streaks", xp: 75, earned: true, earnedDate: "Mar 10, 2026" },
  { id: "streak-14", name: "On Fire", desc: "14-day training streak", icon: Flame, category: "Streaks", xp: 150, earned: false, progress: 7, total: 14 },
  { id: "streak-30", name: "Unstoppable", desc: "30-day training streak", icon: Flame, category: "Streaks", xp: 500, earned: false, progress: 7, total: 30 },
  { id: "first-post", name: "Ice Breaker", desc: "Post your first message in the community", icon: MessageSquare, category: "Community", xp: 15, earned: true, earnedDate: "Mar 1, 2026" },
  { id: "film-submit", name: "Film Room", desc: "Submit your first film for review", icon: Video, category: "Community", xp: 50, earned: true, earnedDate: "Mar 12, 2026" },
  { id: "help-others", name: "Team Player", desc: "Help 5 community members with tips", icon: Shield, category: "Community", xp: 75, earned: false, progress: 3, total: 5 },
  { id: "attend-webinar", name: "Tuned In", desc: "Attend a live coaching webinar", icon: Clock, category: "Community", xp: 50, earned: true, earnedDate: "Mar 1, 2026" },
  { id: "attend-5-webinars", name: "Regular", desc: "Attend 5 live coaching webinars", icon: Award, category: "Community", xp: 200, earned: false, progress: 2, total: 5 },
  { id: "watch-10", name: "Student of the Game", desc: "10 hours of training content watched", icon: Clock, category: "Watch Time", xp: 100, earned: true, earnedDate: "Mar 14, 2026" },
  { id: "watch-50", name: "Film Junkie", desc: "50 hours of training content watched", icon: Clock, category: "Watch Time", xp: 300, earned: false, progress: 31, total: 50 },
  { id: "watch-100", name: "Obsessed", desc: "100 hours of training content watched", icon: Clock, category: "Watch Time", xp: 500, earned: false, progress: 31, total: 100 },
];

const categories = ["All", "Drills", "Programs", "Streaks", "Community", "Watch Time"];

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? achievements : achievements.filter((a) => a.category === activeCategory);
  const earnedCount = achievements.filter((a) => a.earned).length;
  const totalCount = achievements.length;

  let currentRankIdx = 0;
  for (let i = ranks.length - 1; i >= 0; i--) {
    if (userXP >= ranks[i].minXP) {
      currentRankIdx = i;
      break;
    }
  }
  const currentRank = ranks[currentRankIdx];
  const nextRank = ranks[currentRankIdx + 1];
  const xpProgress = nextRank
    ? ((userXP - currentRank.minXP) / (nextRank.minXP - currentRank.minXP)) * 100
    : 100;

  return (
    <div className="h-full overflow-y-auto pt-16">
      {/* Header */}
      <div className="px-6 py-4 border-b border-brand-dark-border">
        <div className="flex items-center gap-2 mb-0.5">
          <Star size={18} className="text-brand-green" />
          <h1 className="text-lg font-bold text-white">Achievements</h1>
        </div>
        <p className="text-[13px] text-gray-500">
          Earn badges, unlock titles, and rank up by training consistently
        </p>
      </div>

      <div className="px-6 py-5 space-y-6">
        {/* Rank Progression */}
        <div>
          <h2 className="text-2xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Your Rank Progression
          </h2>

          <div className={`bg-brand-dark-light border ${currentRank.border} rounded-lg p-4 mb-3`}>
            <div className="flex items-center gap-4 mb-3">
              <div className={`w-14 h-14 rounded-lg ${currentRank.bgLight} flex items-center justify-center`}>
                <Trophy size={28} className={currentRank.color} />
              </div>
              <div>
                <p className="text-2xs text-gray-600 mb-0.5">Current Rank</p>
                <h3 className={`text-xl font-bold ${currentRank.color}`}>{currentRank.name}</h3>
                <p className="text-[13px] text-gray-500">{currentRank.desc}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xl font-bold text-white">{userXP.toLocaleString()}</p>
                <p className="text-2xs text-gray-600">Total XP</p>
              </div>
            </div>

            {nextRank && (
              <div>
                <div className="flex items-center justify-between text-2xs mb-1">
                  <span className={currentRank.color}>{currentRank.name}</span>
                  <span className="text-gray-600">
                    {(nextRank.minXP - userXP).toLocaleString()} XP to go
                  </span>
                  <span className={nextRank.color}>{nextRank.name}</span>
                </div>
                <div className="h-1.5 bg-brand-dark-border rounded-full overflow-hidden">
                  <div
                    className={`h-full ${currentRank.bg} rounded-full transition-all`}
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Rank ladder */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {ranks.map((rank, i) => {
              const unlocked = userXP >= rank.minXP;
              return (
                <div
                  key={rank.name}
                  className={`rounded-lg p-2.5 text-center transition-all duration-150 ${
                    unlocked
                      ? `${rank.bgLight} border ${rank.border}`
                      : "bg-brand-dark-light border border-brand-dark-border opacity-50"
                  } ${i === currentRankIdx ? "ring-1 ring-offset-1 ring-offset-brand-dark ring-brand-green/30" : ""}`}
                >
                  {unlocked ? (
                    <CheckCircle2 size={14} className={`${rank.color} mx-auto mb-0.5`} />
                  ) : (
                    <Lock size={14} className="text-gray-600 mx-auto mb-0.5" />
                  )}
                  <p className={`text-2xs font-bold ${unlocked ? rank.color : "text-gray-600"}`}>
                    {rank.name}
                  </p>
                  <p className="text-[9px] text-gray-600">{rank.minXP.toLocaleString()} XP</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Overview */}
        <div>
          <h2 className="text-2xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Your Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              { label: "Achievements", value: `${earnedCount}/${totalCount}`, icon: Star, color: "text-brand-green" },
              { label: "Drills Done", value: "22", icon: Dumbbell, color: "text-blue-400" },
              { label: "Training Streak", value: "7 days", icon: Flame, color: "text-orange-400" },
              { label: "Watch Time", value: "31h", icon: Clock, color: "text-purple-400" },
              { label: "Program Progress", value: "38%", icon: BookOpen, color: "text-yellow-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-brand-dark-light border border-brand-dark-border rounded-lg p-3 text-center">
                <stat.icon size={16} className={`${stat.color} mx-auto mb-1.5`} />
                <p className="text-sm font-bold text-white">{stat.value}</p>
                <p className="text-[9px] text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xs font-semibold text-gray-500 uppercase tracking-wider">
              Badges & Achievements
            </h2>
            <p className="text-2xs text-gray-600">
              {earnedCount} of {totalCount} earned
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded text-2xs font-medium transition-colors duration-150 ${
                  activeCategory === cat
                    ? "bg-brand-green text-brand-dark"
                    : "bg-brand-dark-light text-gray-400 hover:text-white border border-brand-dark-border"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1 opacity-60">
                    {achievements.filter((a) => a.category === cat && a.earned).length}/
                    {achievements.filter((a) => a.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {filtered.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-brand-dark-light border rounded-lg p-3.5 transition-all duration-150 ${
                  achievement.earned
                    ? "border-brand-green/20"
                    : "border-brand-dark-border opacity-70"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      achievement.earned ? "bg-brand-green/10" : "bg-brand-dark"
                    }`}
                  >
                    {achievement.earned ? (
                      <achievement.icon size={18} className="text-brand-green" />
                    ) : (
                      <Lock size={14} className="text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className={`text-[13px] font-semibold ${achievement.earned ? "text-white" : "text-gray-400"}`}>
                        {achievement.name}
                      </h3>
                      <span className="text-[9px] bg-brand-dark rounded-full px-1.5 py-0.5 text-brand-green font-medium">
                        +{achievement.xp} XP
                      </span>
                    </div>
                    <p className="text-2xs text-gray-500 mt-0.5">{achievement.desc}</p>

                    {achievement.earned && (
                      <p className="text-[9px] text-brand-green mt-1 flex items-center gap-0.5">
                        <CheckCircle2 size={9} />
                        Earned {achievement.earnedDate}
                      </p>
                    )}

                    {!achievement.earned && achievement.progress !== undefined && (
                      <div className="mt-1.5">
                        <div className="flex items-center justify-between text-[9px] text-gray-600 mb-0.5">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.total}</span>
                        </div>
                        <div className="h-1 bg-brand-dark-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-green/50 rounded-full"
                            style={{ width: `${(achievement.progress / achievement.total!) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
