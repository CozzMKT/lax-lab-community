"use client";

import { useState } from "react";
import {
  Medal,
  Trophy,
  Flame,
  TrendingUp,
  ChevronDown,
  Target,
  Crosshair,
  Clock,
  Dumbbell,
  Crown,
  Star,
} from "lucide-react";

const ranks = [
  { name: "Rookie", color: "text-gray-400", bg: "bg-gray-400" },
  { name: "Starter", color: "text-blue-400", bg: "bg-blue-400" },
  { name: "Varsity", color: "text-purple-400", bg: "bg-purple-400" },
  { name: "All-Star", color: "text-yellow-400", bg: "bg-yellow-400" },
  { name: "Elite", color: "text-orange-400", bg: "bg-orange-400" },
  { name: "D1 Prospect", color: "text-brand-green", bg: "bg-brand-green" },
];

const leaderboardData = [
  { rank: 1, name: "Brady K.", title: "D1 Prospect", titleColor: "text-brand-green", xp: 5420, drillsCompleted: 48, streak: 32, watchHours: 86, programProgress: 100, position: "Attack", gradYear: "2027", change: 0 },
  { rank: 2, name: "Marcus T.", title: "Elite", titleColor: "text-orange-400", xp: 4810, drillsCompleted: 44, streak: 28, watchHours: 74, programProgress: 92, position: "Midfield", gradYear: "2027", change: 1 },
  { rank: 3, name: "Ryan S.", title: "Elite", titleColor: "text-orange-400", xp: 4350, drillsCompleted: 41, streak: 21, watchHours: 68, programProgress: 88, position: "Attack", gradYear: "2028", change: -1 },
  { rank: 4, name: "Jake W.", title: "All-Star", titleColor: "text-yellow-400", xp: 3280, drillsCompleted: 35, streak: 18, watchHours: 52, programProgress: 75, position: "Midfield", gradYear: "2027", change: 2 },
  { rank: 5, name: "Chris D.", title: "All-Star", titleColor: "text-yellow-400", xp: 2950, drillsCompleted: 32, streak: 15, watchHours: 48, programProgress: 70, position: "Defense", gradYear: "2028", change: 0 },
  { rank: 6, name: "Tyler M.", title: "All-Star", titleColor: "text-yellow-400", xp: 2680, drillsCompleted: 29, streak: 12, watchHours: 43, programProgress: 65, position: "Attack", gradYear: "2029", change: 3 },
  { rank: 7, name: "John Doe", title: "All-Star", titleColor: "text-yellow-400", xp: 1820, drillsCompleted: 22, streak: 7, watchHours: 31, programProgress: 38, position: "Attack", gradYear: "2028", change: 1, isYou: true },
  { rank: 8, name: "Alex R.", title: "Varsity", titleColor: "text-purple-400", xp: 1650, drillsCompleted: 19, streak: 9, watchHours: 27, programProgress: 35, position: "Midfield", gradYear: "2028", change: -2 },
  { rank: 9, name: "Ethan P.", title: "Varsity", titleColor: "text-purple-400", xp: 1420, drillsCompleted: 17, streak: 5, watchHours: 24, programProgress: 30, position: "Goalie", gradYear: "2029", change: 0 },
  { rank: 10, name: "Sam L.", title: "Varsity", titleColor: "text-purple-400", xp: 1180, drillsCompleted: 14, streak: 3, watchHours: 19, programProgress: 22, position: "Defense", gradYear: "2027", change: -1 },
  { rank: 11, name: "Noah B.", title: "Starter", titleColor: "text-blue-400", xp: 890, drillsCompleted: 11, streak: 4, watchHours: 14, programProgress: 18, position: "Midfield", gradYear: "2029", change: 0 },
  { rank: 12, name: "Liam C.", title: "Starter", titleColor: "text-blue-400", xp: 620, drillsCompleted: 8, streak: 2, watchHours: 10, programProgress: 12, position: "Attack", gradYear: "2029", change: 1 },
];

const tabs = [
  { id: "overall", name: "Overall XP" },
  { id: "drills", name: "Drills Completed" },
  { id: "streak", name: "Training Streak" },
  { id: "hours", name: "Watch Hours" },
];

function getRankMedal(rank: number) {
  if (rank === 1) return <Crown size={16} className="text-yellow-400" />;
  if (rank === 2) return <Medal size={16} className="text-gray-300" />;
  if (rank === 3) return <Medal size={16} className="text-amber-600" />;
  return <span className="text-[13px] text-gray-500 font-medium w-4 text-center">{rank}</span>;
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("overall");
  const [filterPosition, setFilterPosition] = useState("All");

  const sortedData = [...leaderboardData].sort((a, b) => {
    if (activeTab === "drills") return b.drillsCompleted - a.drillsCompleted;
    if (activeTab === "streak") return b.streak - a.streak;
    if (activeTab === "hours") return b.watchHours - a.watchHours;
    return b.xp - a.xp;
  });

  const filteredData =
    filterPosition === "All"
      ? sortedData
      : sortedData.filter((p) => p.position === filterPosition);

  return (
    <div className="h-full overflow-y-auto pt-16">
      {/* Header */}
      <div className="px-6 py-4 border-b border-brand-dark-border">
        <div className="flex items-center gap-2 mb-0.5">
          <Medal size={18} className="text-brand-green" />
          <h1 className="text-lg font-bold text-white">Leaderboard</h1>
        </div>
        <p className="text-[13px] text-gray-500">
          Compete with the community — earn XP by completing drills, programs, and staying consistent
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="px-6 pt-5">
        <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-6">
          {/* 2nd Place */}
          <div className="bg-brand-dark-light border border-brand-dark-border rounded-lg p-3 text-center mt-5">
            <div className="w-12 h-12 rounded-full bg-gray-300/10 flex items-center justify-center mx-auto mb-1.5 border-2 border-gray-300/20">
              <span className="text-sm font-bold text-gray-300">
                {leaderboardData[1].name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <Medal size={16} className="text-gray-300 mx-auto mb-0.5" />
            <h3 className="font-semibold text-white text-[13px]">{leaderboardData[1].name}</h3>
            <p className={`text-2xs font-bold ${leaderboardData[1].titleColor}`}>{leaderboardData[1].title}</p>
            <p className="text-sm font-bold text-white mt-0.5">{leaderboardData[1].xp.toLocaleString()}</p>
            <p className="text-[9px] text-gray-600">XP</p>
          </div>

          {/* 1st Place */}
          <div className="bg-brand-dark-light border border-yellow-400/20 rounded-lg p-3 text-center relative">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
              <Crown size={20} className="text-yellow-400" />
            </div>
            <div className="w-14 h-14 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-1.5 border-2 border-yellow-400/30 mt-2">
              <span className="text-lg font-bold text-yellow-400">
                {leaderboardData[0].name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <h3 className="font-semibold text-white text-[13px]">{leaderboardData[0].name}</h3>
            <p className={`text-2xs font-bold ${leaderboardData[0].titleColor}`}>{leaderboardData[0].title}</p>
            <p className="text-lg font-bold text-yellow-400 mt-0.5">{leaderboardData[0].xp.toLocaleString()}</p>
            <p className="text-[9px] text-gray-600">XP</p>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <Flame size={10} className="text-orange-400" />
              <span className="text-[9px] text-orange-400 font-medium">{leaderboardData[0].streak} day streak</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="bg-brand-dark-light border border-brand-dark-border rounded-lg p-3 text-center mt-5">
            <div className="w-12 h-12 rounded-full bg-amber-600/10 flex items-center justify-center mx-auto mb-1.5 border-2 border-amber-600/20">
              <span className="text-sm font-bold text-amber-600">
                {leaderboardData[2].name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <Medal size={16} className="text-amber-600 mx-auto mb-0.5" />
            <h3 className="font-semibold text-white text-[13px]">{leaderboardData[2].name}</h3>
            <p className={`text-2xs font-bold ${leaderboardData[2].titleColor}`}>{leaderboardData[2].title}</p>
            <p className="text-sm font-bold text-white mt-0.5">{leaderboardData[2].xp.toLocaleString()}</p>
            <p className="text-[9px] text-gray-600">XP</p>
          </div>
        </div>
      </div>

      {/* Tabs + Filters */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-0.5 bg-brand-dark-light rounded-lg p-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded text-2xs font-medium transition-colors duration-150 ${
                  activeTab === tab.id
                    ? "bg-brand-green text-brand-dark"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
              className="bg-brand-dark-light border border-brand-dark-border rounded px-3 py-1.5 text-2xs text-gray-300 appearance-none pr-7 focus:outline-none focus:border-brand-green/50"
            >
              <option>All</option>
              <option>Attack</option>
              <option>Midfield</option>
              <option>Defense</option>
              <option>Goalie</option>
              <option>FOGO</option>
            </select>
            <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-brand-dark-light border border-brand-dark-border rounded-lg overflow-hidden mb-6">
          {/* Table Header */}
          <div className="grid grid-cols-[44px_1fr_90px_80px_70px_70px_70px] px-3.5 py-2 border-b border-brand-dark-border text-2xs text-gray-600 font-medium uppercase tracking-wider">
            <span>#</span>
            <span>Player</span>
            <span className="text-right">XP</span>
            <span className="text-right">Drills</span>
            <span className="text-right">Streak</span>
            <span className="text-right">Hours</span>
            <span className="text-right">Trend</span>
          </div>

          {/* Rows */}
          {filteredData.map((player, i) => (
            <div
              key={player.name}
              className={`grid grid-cols-[44px_1fr_90px_80px_70px_70px_70px] px-3.5 py-2.5 border-b border-brand-dark-border/50 items-center hover:bg-white/[0.03] transition-colors duration-150 ${
                player.isYou ? "bg-brand-green/5 border-l-2 border-l-brand-green" : ""
              }`}
            >
              <div className="flex items-center">{getRankMedal(i + 1)}</div>

              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-2xs font-bold ${
                  player.isYou ? "bg-brand-green text-brand-dark" : "bg-brand-dark border border-brand-dark-border text-gray-300"
                }`}>
                  {player.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-medium text-white">
                      {player.name}
                      {player.isYou && <span className="text-brand-green text-2xs ml-1">(You)</span>}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-bold ${player.titleColor}`}>{player.title}</span>
                    <span className="text-[9px] text-gray-600">{player.position} · &apos;{player.gradYear.slice(-2)}</span>
                  </div>
                </div>
              </div>

              <span className="text-[13px] font-semibold text-white text-right">{player.xp.toLocaleString()}</span>
              <span className="text-[13px] text-gray-300 text-right">{player.drillsCompleted}</span>
              <div className="flex items-center justify-end gap-0.5">
                <Flame size={10} className={player.streak >= 14 ? "text-orange-400" : "text-gray-600"} />
                <span className="text-[13px] text-gray-300">{player.streak}d</span>
              </div>
              <span className="text-[13px] text-gray-300 text-right">{player.watchHours}h</span>
              <div className="flex items-center justify-end">
                {player.change > 0 && (
                  <span className="flex items-center gap-0.5 text-2xs text-brand-green">
                    <TrendingUp size={10} /> +{player.change}
                  </span>
                )}
                {player.change < 0 && (
                  <span className="flex items-center gap-0.5 text-2xs text-red-400">
                    <TrendingUp size={10} className="rotate-180" /> {player.change}
                  </span>
                )}
                {player.change === 0 && <span className="text-2xs text-gray-600">—</span>}
              </div>
            </div>
          ))}
        </div>

        {/* How XP Works */}
        <div className="bg-brand-dark-light border border-brand-dark-border rounded-lg p-4 mb-6">
          <h3 className="text-[13px] font-semibold text-white mb-2.5 flex items-center gap-2">
            <Star size={13} className="text-brand-green" />
            How to Earn XP
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { action: "Complete a drill", xp: "+25 XP", icon: Dumbbell, color: "text-brand-green" },
              { action: "Finish a program week", xp: "+100 XP", icon: Target, color: "text-blue-400" },
              { action: "Daily training streak", xp: "+10 XP/day", icon: Flame, color: "text-orange-400" },
              { action: "Watch coaching call", xp: "+50 XP", icon: Clock, color: "text-purple-400" },
            ].map((item, i) => (
              <div key={i} className="bg-brand-dark rounded-lg p-2.5 text-center">
                <item.icon size={16} className={`${item.color} mx-auto mb-1`} />
                <p className="text-2xs text-white font-medium">{item.action}</p>
                <p className={`text-[13px] font-bold ${item.color} mt-0.5`}>{item.xp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
