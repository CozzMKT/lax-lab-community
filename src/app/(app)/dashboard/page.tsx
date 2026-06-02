"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  ChevronRight,
  ChevronLeft,
  Flame,
  Trophy,
  Star,
  Clock,
  MapPin,
  MessageSquare,
  Heart,
  Users,
  ArrowRight,
  BookOpen,
  Target,
} from "lucide-react";

function ScrollRow({ title, viewAllHref, children }: { title: string; viewAllHref?: string; children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between px-[4%] mb-3">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-[13px] text-gray-400 hover:text-white flex items-center gap-1 transition-colors duration-150">
            View All <ChevronRight size={14} />
          </Link>
        )}
      </div>
      <div className="relative group/row">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-brand-dark to-transparent z-10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-[4%] scroll-smooth"
        >
          {children}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-brand-dark to-transparent z-10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
    </section>
  );
}

const continueTraining = [
  { title: "Wall Ball Mastery", category: "Stick Skills", progress: 65, totalDrills: 12, completed: 8, image: "🥍" },
  { title: "Dodging Fundamentals", category: "Offense", progress: 40, totalDrills: 10, completed: 4, image: "🏃" },
  { title: "Defensive Footwork", category: "Defense", progress: 20, totalDrills: 8, completed: 2, image: "🛡️" },
  { title: "Shooting Accuracy", category: "Shooting", progress: 85, totalDrills: 15, completed: 13, image: "🎯" },
  { title: "Ground Ball Techniques", category: "Fundamentals", progress: 50, totalDrills: 6, completed: 3, image: "⚡" },
];

const programs = [
  { title: "30-Day Offensive Domination", desc: "Master every dodge, feed, and finish", lessons: 30, duration: "30 days", gradient: "from-green-600 to-emerald-900", icon: Target },
  { title: "D1 Recruiting Blueprint", desc: "Step-by-step guide to getting recruited", lessons: 12, duration: "6 weeks", gradient: "from-blue-600 to-indigo-900", icon: Star },
  { title: "Elite Goalie Training", desc: "Become an unbeatable wall in the cage", lessons: 20, duration: "4 weeks", gradient: "from-purple-600 to-violet-900", icon: Trophy },
];

const drills = [
  { title: "Up Hash Layup Shooting", category: "Shooting", cover: "/drills/up-hash-layup-shooting.png", video: undefined },
  { title: "Climb the Ladder", category: "Shooting", cover: "/drills/climb-the-ladder.png", video: undefined },
  { title: "Flat Feet Rotation Shooting", category: "Shooting", cover: "/drills/flat-feet-rotation-shooting.png", video: undefined },
  { title: "Standing Toss Shooting", category: "Shooting", cover: "/drills/standing-toss-shooting.png", video: "/drills/f5-standing-toss-shooting.mp4" },
  { title: "One Knee Pop Shooting", category: "Shooting", cover: "/drills/one-knee-pop-shooting.png", video: "/drills/ll-one-knee-pop-2.mp4" },
  { title: "Spin & Fire", category: "Shooting", cover: "/drills/lay-up-shooting.png", video: "/drills/spin-fire.mp4" },
  { title: "BTC Split Up the Hash", category: "Dodging", cover: "/drills/btc-split-up-hash-shooting.png", video: "/drills/btc-split-up-the-hash-2.mp4" },
  { title: "ATC Split Dodge Alley", category: "Dodging", cover: "/drills/atc-split-dodge-alley.png", video: "/drills/atc-split-dodge-alley.mp4" },
  { title: "Snake and Stick w/ Stick", category: "Stick Work", cover: "/drills/snake-and-stick.png", video: undefined },
  { title: "Fake and Wrap", category: "Finishing", cover: "/drills/up-the-hash-layup-shooting-cover.png", video: "/drills/fake-wrap.mp4" },
  { title: "Dip & Dunk", category: "Finishing", cover: "/drills/layup-shooting-up-the-hash.png", video: "/drills/dip-dunk-ll.mp4" },
  { title: "Shoulder Lean", category: "Footwork", cover: "/drills/4-cone-jab-drill.png", video: "/drills/shoulder-lean-ll.mp4" },
];

const drillCategoryColors: Record<string, { text: string; bg: string }> = {
  Shooting: { text: "text-orange-400", bg: "bg-orange-400/10" },
  Dodging: { text: "text-purple-400", bg: "bg-purple-400/10" },
  "Stick Work": { text: "text-cyan-400", bg: "bg-cyan-400/10" },
  Finishing: { text: "text-red-400", bg: "bg-red-400/10" },
  Footwork: { text: "text-blue-400", bg: "bg-blue-400/10" },
};

const camps = [
  { title: "Elite Offensive Skills Clinic", location: "Ridgefield, CT", date: "April 12", spots: 6, price: "$175", status: "limited" as const },
  { title: "High School Conditioning Camp", location: "Patterson, NY", date: "April 19", spots: 19, price: "$125", status: "open" as const },
  { title: "Goalie Intensive Weekend", location: "Stamford, CT", date: "May 3", spots: 8, price: "$200", status: "limited" as const },
  { title: "Youth Skills & Drills Day", location: "White Plains, NY", date: "May 10", spots: 25, price: "$95", status: "open" as const },
];

const communityPosts = [
  { user: "Jules Heningburg", channel: "#announcements", text: "New drill of the week is live! Check out this behind-the-back finishing move...", likes: 42, replies: 18, time: "2h" },
  { user: "Coach Mike", channel: "#film-review", text: "Great footwork on this dodge — here's what I'd adjust for next time...", likes: 28, replies: 12, time: "5h" },
  { user: "Alex R.", channel: "#wins", text: "Just got my first D1 offer! Thanks to the recruiting roadmap for making this happen.", likes: 156, replies: 47, time: "8h" },
  { user: "Brady K.", channel: "#challenges", text: "Hit D1 Prospect rank — first member to reach the top! Who's next?", likes: 89, replies: 31, time: "12h" },
];

const leaderboard = [
  { rank: 1, name: "Brady K.", xp: 5420, title: "D1 Prospect", color: "text-brand-green", bg: "bg-brand-green" },
  { rank: 2, name: "Marcus T.", xp: 4810, title: "Elite", color: "text-orange-400", bg: "bg-orange-400" },
  { rank: 3, name: "Ryan S.", xp: 4350, title: "Elite", color: "text-orange-400", bg: "bg-orange-400" },
];

export default function DashboardPage() {
  const userXP = 1820;
  const streak = 7;
  const rankPosition = 7;
  const currentRank = "All-Star";
  const nextRank = "Elite";
  const nextRankXP = 3000;
  const progress = ((userXP - 1500) / (nextRankXP - 1500)) * 100;

  return (
    <div className="h-full overflow-y-auto bg-brand-dark">
      {/* Hero Banner */}
      <div className="relative h-[420px] w-full overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 via-emerald-900/30 to-brand-dark" />

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-end pb-12 px-[4%]">
          <div className="flex items-end justify-between w-full gap-8">
            {/* Left: Welcome + CTA */}
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-[13px] font-medium text-brand-green uppercase tracking-wider">Next Live Call</span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
                Welcome back, John
              </h1>
              <p className="text-[15px] text-gray-300 mb-5 leading-relaxed">
                Jules Heningburg is going live this Thursday at 7:00 PM EST — don&apos;t miss the weekly coaching breakdown and Q&A session.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/coaching"
                  className="inline-flex items-center gap-2 bg-white text-brand-dark font-bold text-[13px] px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors duration-150"
                >
                  <Play size={14} fill="currentColor" />
                  Join Live Call
                </Link>
                <Link
                  href="/drills"
                  className="inline-flex items-center gap-2 bg-white/10 text-white font-medium text-[13px] px-6 py-2.5 rounded-lg hover:bg-white/20 border border-white/10 transition-colors duration-150"
                >
                  Start Training
                </Link>
              </div>
            </div>

            {/* Right: Stats Card */}
            <div className="hidden lg:block bg-brand-dark/80 backdrop-blur-xl border border-white/10 rounded-xl p-5 w-72 shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-brand-green flex items-center justify-center text-brand-dark font-bold text-sm">
                  JD
                </div>
                <div>
                  <p className="text-[15px] font-bold text-white">John Doe</p>
                  <p className="text-2xs text-yellow-400 font-medium">{currentRank} · #{rankPosition}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{userXP.toLocaleString()}</p>
                  <p className="text-2xs text-gray-500">XP</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Flame size={14} className="text-orange-400" />
                    <p className="text-lg font-bold text-white">{streak}</p>
                  </div>
                  <p className="text-2xs text-gray-500">Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">#{rankPosition}</p>
                  <p className="text-2xs text-gray-500">Ranking</p>
                </div>
              </div>

              {/* Rank Progress */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xs text-yellow-400 font-medium">{currentRank}</span>
                  <span className="text-2xs text-gray-500">{nextRank}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-[10px] text-gray-500 mt-1">{(nextRankXP - userXP).toLocaleString()} XP to {nextRank}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="pt-6">
        {/* Continue Training */}
        <ScrollRow title="Continue Training" viewAllHref="/drills">
          {continueTraining.map((item) => (
            <Link
              key={item.title}
              href="/drills"
              className="group shrink-0 w-64 bg-brand-dark-light border border-brand-dark-border rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-150 hover:scale-[1.02]"
            >
              <div className="h-32 bg-gradient-to-br from-brand-dark-light to-brand-dark flex items-center justify-center text-4xl">
                {item.image}
              </div>
              <div className="p-3.5">
                <p className="text-2xs text-brand-green font-medium mb-0.5">{item.category}</p>
                <h3 className="text-[13px] font-semibold text-white mb-2">{item.title}</h3>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex-1 h-1 bg-brand-dark-border rounded-full overflow-hidden">
                    <div className="h-full bg-brand-green rounded-full" style={{ width: `${item.progress}%` }} />
                  </div>
                  <span className="text-2xs text-gray-500">{item.progress}%</span>
                </div>
                <p className="text-[10px] text-gray-600">{item.completed}/{item.totalDrills} drills completed</p>
              </div>
            </Link>
          ))}
        </ScrollRow>

        {/* Programs */}
        <ScrollRow title="Programs" viewAllHref="/programs">
          {programs.map((program) => (
            <Link
              key={program.title}
              href="/programs"
              className="group shrink-0 w-80 rounded-lg overflow-hidden hover:scale-[1.02] transition-all duration-150"
            >
              <div className={`h-44 bg-gradient-to-br ${program.gradient} p-5 flex flex-col justify-between relative`}>
                <program.icon size={32} className="text-white/30" />
                <div>
                  <h3 className="text-[15px] font-bold text-white mb-1">{program.title}</h3>
                  <p className="text-[13px] text-white/70">{program.desc}</p>
                </div>
              </div>
              <div className="bg-brand-dark-light border border-t-0 border-brand-dark-border rounded-b-lg px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3 text-2xs text-gray-500">
                  <span className="flex items-center gap-1"><BookOpen size={11} /> {program.lessons} lessons</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {program.duration}</span>
                </div>
                <ArrowRight size={14} className="text-gray-600 group-hover:text-white transition-colors duration-150" />
              </div>
            </Link>
          ))}
        </ScrollRow>

        {/* Drill Library */}
        <ScrollRow title="Drill Library" viewAllHref="/drills">
          {drills.map((drill) => {
            const colors = drillCategoryColors[drill.category] ?? { text: "text-gray-400", bg: "bg-gray-400/10" };
            return (
              <Link
                key={drill.title}
                href="/drills"
                className="group shrink-0 w-72 bg-brand-dark-light border border-brand-dark-border rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-150 hover:scale-[1.02]"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video h-40 w-full overflow-hidden bg-brand-dark">
                  <Image
                    src={drill.cover}
                    alt={drill.title}
                    fill
                    className="object-cover transition-transform duration-150 group-hover:scale-105"
                  />
                  {/* Play button overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-150">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-150">
                      <Play size={20} className="text-brand-dark ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  {/* Video badge */}
                  {drill.video && (
                    <span className="absolute top-2 right-2 text-[10px] font-semibold text-white bg-brand-green/80 backdrop-blur-sm px-2 py-0.5 rounded">
                      Video
                    </span>
                  )}
                </div>
                {/* Info */}
                <div className="p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${colors.text} ${colors.bg}`}>
                      {drill.category}
                    </span>
                  </div>
                  <h3 className="text-[13px] font-semibold text-white leading-tight mb-1">{drill.title}</h3>
                  <p className="text-2xs text-gray-500">Jules Heningburg</p>
                </div>
              </Link>
            );
          })}
        </ScrollRow>

        {/* Upcoming Camps */}
        <ScrollRow title="Upcoming Camps & Clinics" viewAllHref="/camps">
          {camps.map((camp) => (
            <Link
              key={camp.title}
              href="/camps"
              className="group shrink-0 w-72 bg-brand-dark-light border border-brand-dark-border rounded-lg p-4 hover:border-gray-600 transition-all duration-150 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-brand-green" />
                <span className="text-2xs text-gray-500">{camp.location}</span>
              </div>
              <h3 className="text-[13px] font-semibold text-white mb-1">{camp.title}</h3>
              <p className="text-2xs text-gray-500 mb-3">{camp.date}</p>
              <div className="flex items-center justify-between">
                <span className={`text-2xs font-medium ${camp.status === "limited" ? "text-yellow-400" : "text-brand-green"}`}>
                  {camp.spots} spots left
                </span>
                <span className="text-[13px] font-bold text-white">{camp.price}</span>
              </div>
            </Link>
          ))}
        </ScrollRow>

        {/* Community Highlights */}
        <ScrollRow title="Community Highlights" viewAllHref="/channels/general">
          {communityPosts.map((post, i) => (
            <div
              key={i}
              className="shrink-0 w-72 bg-brand-dark-light border border-brand-dark-border rounded-lg p-4 hover:border-gray-600 transition-all duration-150"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-brand-green text-2xs font-bold">
                  {post.user.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-white">{post.user}</p>
                  <p className="text-[10px] text-gray-600">{post.channel} · {post.time}</p>
                </div>
              </div>
              <p className="text-[13px] text-gray-400 leading-relaxed mb-3 line-clamp-2">{post.text}</p>
              <div className="flex items-center gap-4 text-2xs text-gray-600">
                <span className="flex items-center gap-1"><Heart size={11} /> {post.likes}</span>
                <span className="flex items-center gap-1"><MessageSquare size={11} /> {post.replies}</span>
              </div>
            </div>
          ))}
        </ScrollRow>

        {/* Leaderboard Section */}
        <section className="px-[4%] mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Leaderboard</h2>
            <Link href="/leaderboard" className="text-[13px] text-gray-400 hover:text-white flex items-center gap-1 transition-colors duration-150">
              Full Rankings <ChevronRight size={14} />
            </Link>
          </div>
          <div className="bg-brand-dark-light border border-brand-dark-border rounded-xl overflow-hidden max-w-2xl">
            {leaderboard.map((player) => (
              <div key={player.rank} className="flex items-center gap-3 px-5 py-3 border-b border-brand-dark-border/50">
                <span className="text-[13px] font-bold text-gray-600 w-6 text-center">{player.rank}</span>
                <div className={`w-8 h-8 rounded-lg ${player.bg} flex items-center justify-center text-xs font-bold ${player.bg === "bg-brand-green" ? "text-brand-dark" : "text-white"}`}>
                  {player.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-white">{player.name}</p>
                  <p className={`text-2xs ${player.color}`}>{player.title}</p>
                </div>
                <span className="text-[13px] font-bold text-gray-300">{player.xp.toLocaleString()} XP</span>
              </div>
            ))}
            {/* Your Position */}
            <div className="flex items-center gap-3 px-5 py-3 bg-brand-green/5 border-l-2 border-l-brand-green">
              <span className="text-[13px] font-bold text-brand-green w-6 text-center">{rankPosition}</span>
              <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center text-xs font-bold text-brand-dark">
                JD
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-white">You</p>
                <p className="text-2xs text-yellow-400">{currentRank}</p>
              </div>
              <span className="text-[13px] font-bold text-brand-green">{userXP.toLocaleString()} XP</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
