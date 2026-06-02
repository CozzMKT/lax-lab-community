"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Play,
  Lock,
  Star,
  Trophy,
  Target,
  GraduationCap,
  Shield,
  Calendar,
  Dumbbell,
  Flame,
  Maximize2,
  X,
} from "lucide-react";

// Map drill names to their cover thumbnails and video files
const drillAssets: Record<string, { thumbnail: string; video?: string }> = {
  "Flat Feet Shooting": { thumbnail: "/drills/flat-feet-rotation-shooting.png" },
  "Layup Shooting (Middle)": { thumbnail: "/drills/layup-shooting-abovemid.png", video: "/drills/f5-layup-shooting-abovemid.mp4" },
  "Pop Shooting (Optional)": { thumbnail: "/drills/one-knee-pop-shooting.png", video: "/drills/ll-one-knee-pop-2.mp4" },
  "Pop Shooting": { thumbnail: "/drills/one-knee-pop-shooting.png", video: "/drills/ll-one-knee-pop-2.mp4" },
  "Heat Feet 4 Cone Drill": { thumbnail: "/drills/heat-feet-4-cone-drill.png" },
  "Snake and Stick (w/o stick)": { thumbnail: "/drills/snake-and-stick-wo.png" },
  "Snake and Stick (w/ stick)": { thumbnail: "/drills/snake-and-stick.png" },
  "Jab and Go Middle (Optional)": { thumbnail: "/drills/jab-and-go-middle.png", video: "/drills/jab-and-go-middle.mp4" },
  "Toss Shooting": { thumbnail: "/drills/standing-toss-shooting.png", video: "/drills/f5-standing-toss-shooting.mp4" },
  "Climb the Ladder (Optional)": { thumbnail: "/drills/climb-the-ladder.png" },
  "Layup Shooting (Alley)": { thumbnail: "/drills/layup-shooting-in-the-alley.png" },
  "Split and Go Alley (Optional)": { thumbnail: "/drills/atc-split-dodge-alley.png", video: "/drills/atc-split-dodge-alley.mp4" },
  "Layup Up the Hash": { thumbnail: "/drills/up-hash-layup-shooting.png" },
  "Split and Go Up the Hash (Optional)": { thumbnail: "/drills/btc-split-up-hash-shooting.png", video: "/drills/btc-split-up-the-hash-2.mp4" },
};

const programs = [
  {
    id: "offensive-foundations",
    title: "Offensive Skills Foundation",
    description: "A focused 4-week program designed to master the fundamentals of offense. Built by Jules Heningburg — the same structure and drills he uses with D1-caliber athletes. 6 days a week, each day targeting a specific offensive pillar.",
    duration: "4 Weeks",
    frequency: "6 days/week",
    lessons: 24,
    completedLessons: 0,
    icon: Target,
    color: "brand-green",
    highlights: ["Shooting fundamentals", "Dodging & footwork", "Sweep & step-down days", "Alley & X dodging", "Wall ball routine", "Daily warm-up included"],
    intro: `Hi, I'm Jules Heningburg, Founder and CEO of Lax Lab.\n\nAfter eight years competing at the highest level of professional lacrosse — and now having the privilege of working with ESPN as one of the top analysts of the game — I created Lax Lab to share the lessons, habits, and insights I've been fortunate enough to learn and live every day.\n\nThe Offensive Foundations Program was built to give you a clear, repeatable framework for developing your offensive lacrosse game. Whether you're just getting started or have been playing for years, this program — when done with intention and consistency — can unlock real breakthroughs and lightbulb moments in your development.`,
    howToUse: [
      "Watch each drill video: Every drill has a short video breakdown. Watch the details, listen to the reasoning, and focus on understanding the why behind each movement.",
      "Follow the Program Schedule: The next page shows a four week layout you can repeat anytime. Keep it simple, stay consistent, and trust the process. Print this out and put it on your door, fridge, or anywhere you can see it easily each day!",
      "Film Yourself & Track Progress: Film a few reps each week and jot down in your notebook or phone what feels better. Improvement is about awareness — noticing small wins over time.",
    ],
    warmup: [
      { name: "Fire Hydrants", reps: "5 each leg" },
      { name: "Leg Circles", reps: "5 each leg" },
      { name: "Leg Taps", reps: "5 each leg" },
      { name: "Deadbugs", reps: "5-10 total" },
      { name: "High Kicks", reps: "10 yds (there & back)" },
      { name: "Scoops", reps: "10 yds (there & back)" },
      { name: "World's Greatest Stretch", reps: "10 yds (there & back)" },
      { name: "Side Shuffle", reps: "10 yds (there & back)" },
      { name: "Karaoke", reps: "10 yds (there & back)" },
      { name: "High Knees", reps: "10 yds (there & back)" },
    ],
    wallBall: [
      "Right Hand",
      "Left Hand",
      "Pass, Catch, Split",
      "Pass, Switch Hands (ball in air), Catch Opposite",
      "Around the Back",
      "Back Hand",
    ],
    weeks: [
      { title: "Week 1-4: Monday — Shooting Fundamentals", dayLabel: "Monday", lessons: [
        { name: "Dynamic Warm-Up", duration: "10:00", completed: false, type: "warmup" },
        { name: "Flat Feet Shooting", duration: "15:00", completed: false, reps: "3x7-10 reps/hand (end on good rep)" },
        { name: "Layup Shooting (Middle)", duration: "15:00", completed: false, reps: "3x7-10 reps/hand (end on good rep)" },
        { name: "Pop Shooting (Optional)", duration: "15:00", completed: false, reps: "3x7-10 reps/hand (end on good rep)" },
      ]},
      { title: "Week 1-4: Tuesday — Dodging & Footwork", dayLabel: "Tuesday", lessons: [
        { name: "Dynamic Warm-Up", duration: "10:00", completed: false, type: "warmup" },
        { name: "Heat Feet 4 Cone Drill", duration: "12:00", completed: false, reps: "3 sets per hand/side" },
        { name: "Snake and Stick (w/o stick)", duration: "10:00", completed: false, reps: "Down and back (5 cones)" },
        { name: "Snake and Stick (w/ stick)", duration: "10:00", completed: false, reps: "Down and back 2x (5 cones)" },
      ]},
      { title: "Week 1-4: Wednesday — Sweep Day", dayLabel: "Wednesday", lessons: [
        { name: "Dynamic Warm-Up", duration: "10:00", completed: false, type: "warmup" },
        { name: "Layup Shooting (Middle)", duration: "15:00", completed: false, reps: "3x7-10 reps per hand" },
        { name: "Heat Feet 4 Cone Drill", duration: "12:00", completed: false, reps: "3 sets per hand" },
        { name: "Jab and Go Middle (Optional)", duration: "12:00", completed: false, reps: "3x5-7 reps each hand (R to R, L to L jabs)" },
      ]},
      { title: "Week 1-4: Thursday — Step Down Shooting", dayLabel: "Thursday", lessons: [
        { name: "Dynamic Warm-Up", duration: "10:00", completed: false, type: "warmup" },
        { name: "Pop Shooting", duration: "15:00", completed: false, reps: "3x7-10 reps each hand" },
        { name: "Toss Shooting", duration: "15:00", completed: false, reps: "3x10 reps each hand" },
        { name: "Climb the Ladder (Optional)", duration: "12:00", completed: false, reps: "3x5-7 reps each hand" },
      ]},
      { title: "Week 1-4: Friday — Alley Day", dayLabel: "Friday", lessons: [
        { name: "Dynamic Warm-Up", duration: "10:00", completed: false, type: "warmup" },
        { name: "Layup Shooting (Alley)", duration: "12:00", completed: false, reps: "3x7 reps each hand" },
        { name: "Snake and Stick (w/ stick)", duration: "10:00", completed: false, reps: "3 sets down and back" },
        { name: "Split and Go Alley (Optional)", duration: "12:00", completed: false, reps: "3x7-10 reps each hand" },
      ]},
      { title: "Week 1-4: Saturday — X Dodging Day", dayLabel: "Saturday", lessons: [
        { name: "Dynamic Warm-Up", duration: "10:00", completed: false, type: "warmup" },
        { name: "Layup Up the Hash", duration: "15:00", completed: false, reps: "3x7-10 reps each hand" },
        { name: "Snake and Stick (w/ stick)", duration: "10:00", completed: false, reps: "3 sets down and back" },
        { name: "Split and Go Up the Hash (Optional)", duration: "12:00", completed: false, reps: "3x5-7 reps each hand" },
      ]},
      { title: "Week 1-4: Sunday — Rest Day", dayLabel: "Sunday", lessons: [
        { name: "Rest & Recovery", duration: "", completed: false, reps: "Watch lacrosse, sleep, stretch, hydrate" },
      ]},
    ],
  },
  {
    id: "recruiting",
    title: "D1 Recruiting Roadmap",
    description: "Everything parents and athletes need to know about the college recruiting process. From building your highlight reel to emailing coaches — this course removes the guesswork and gives you a step-by-step plan.",
    duration: "Self-Paced",
    frequency: "At your pace",
    lessons: 12,
    completedLessons: 0,
    icon: GraduationCap,
    color: "blue-400",
    highlights: ["Recruiting timeline breakdown", "How to email college coaches", "Building your highlight reel", "Camp selection strategy", "Coach/recruiting email templates", "Monthly camps to attend"],
    weeks: [
      { title: "Module 1: Understanding the Process", dayLabel: "Module 1", lessons: [
        { name: "The Recruiting Timeline", duration: "15:00", completed: false },
        { name: "NCAA Rules You Need to Know", duration: "12:00", completed: false },
        { name: "D1 vs D2 vs D3 — What's Right for You?", duration: "10:00", completed: false },
      ]},
      { title: "Module 2: Building Your Profile", dayLabel: "Module 2", lessons: [
        { name: "Creating a Highlight Reel That Gets Watched", duration: "18:00", completed: false },
        { name: "Your Player Profile & Resume", duration: "14:00", completed: false },
        { name: "Social Media Dos and Don'ts", duration: "8:00", completed: false },
      ]},
      { title: "Module 3: Reaching Out to Coaches", dayLabel: "Module 3", lessons: [
        { name: "Email Templates That Get Replies", duration: "16:00", completed: false },
        { name: "When to Contact Coaches (By Grade)", duration: "12:00", completed: false },
        { name: "Following Up Without Being Annoying", duration: "10:00", completed: false },
      ]},
      { title: "Module 4: Making It Happen", dayLabel: "Module 4", lessons: [
        { name: "Which Camps to Attend & When", duration: "14:00", completed: false },
        { name: "Campus Visits & Unofficial Trips", duration: "11:00", completed: false },
        { name: "Committing & Signing Day", duration: "13:00", completed: false },
      ]},
    ],
  },
];

export default function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"schedule" | "intro" | "warmup" | "wallball">("schedule");
  const [expandedDrill, setExpandedDrill] = useState<string | null>(null);
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);

  const activeProgram = programs.find((p) => p.id === selectedProgram);

  if (activeProgram) {
    const progress = activeProgram.completedLessons / activeProgram.lessons;
    const isFoundation = activeProgram.id === "offensive-foundations";

    return (
      <div className="h-full overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-brand-dark-border">
          <button
            onClick={() => { setSelectedProgram(null); setActiveTab("schedule"); }}
            className="text-2xs text-gray-500 hover:text-brand-green transition-colors duration-150 mb-3 flex items-center gap-1"
          >
            <ChevronRight size={10} className="rotate-180" />
            Back to Programs
          </button>

          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg bg-${activeProgram.color}/10 flex items-center justify-center shrink-0`}>
              <activeProgram.icon size={20} className={`text-${activeProgram.color}`} />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-white mb-0.5">{activeProgram.title}</h1>
              <p className="text-[13px] text-gray-500 max-w-2xl">{activeProgram.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-2xs text-gray-600">
                  <Clock size={10} />
                  {activeProgram.duration}
                </span>
                <span className="flex items-center gap-1 text-2xs text-gray-600">
                  <Calendar size={10} />
                  {activeProgram.frequency}
                </span>
                <span className="flex items-center gap-1 text-2xs text-gray-600">
                  <BookOpen size={10} />
                  {activeProgram.lessons} drills
                </span>
                {activeProgram.completedLessons > 0 && (
                  <span className="flex items-center gap-1 text-2xs text-brand-green">
                    <CheckCircle2 size={10} />
                    {activeProgram.completedLessons}/{activeProgram.lessons} completed
                  </span>
                )}
              </div>
              {activeProgram.completedLessons > 0 && (
                <div className="mt-2.5 w-full max-w-md">
                  <div className="h-1 bg-brand-dark-border rounded-full overflow-hidden">
                    <div className="h-full bg-brand-green rounded-full transition-all" style={{ width: `${progress * 100}%` }} />
                  </div>
                  <p className="text-2xs text-gray-600 mt-0.5">{Math.round(progress * 100)}% complete</p>
                </div>
              )}
            </div>
          </div>

          {/* Tabs (for Offensive Foundations) */}
          {isFoundation && (
            <div className="flex items-center gap-1 mt-4">
              {[
                { key: "schedule" as const, label: "Schedule" },
                { key: "intro" as const, label: "Introduction" },
                { key: "warmup" as const, label: "Warm-Up" },
                { key: "wallball" as const, label: "Wall Ball" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 rounded text-2xs font-medium transition-colors duration-150 ${
                    activeTab === tab.key
                      ? "bg-brand-green/10 text-brand-green"
                      : "text-gray-500 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="px-6 py-5">
          {/* Introduction Tab */}
          {isFoundation && activeTab === "intro" && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-brand-dark-light border border-brand-dark-border rounded-lg p-5">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Flame size={16} className="text-brand-green" />
                  From Jules Heningburg
                </h3>
                <div className="text-[13px] text-gray-400 leading-relaxed whitespace-pre-line">
                  {(activeProgram as typeof programs[0]).intro}
                </div>
              </div>

              <div className="bg-brand-dark-light border border-brand-dark-border rounded-lg p-5">
                <h3 className="text-sm font-bold text-white mb-3">How to Use This Program</h3>
                <div className="space-y-3">
                  {(activeProgram as typeof programs[0]).howToUse?.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green text-2xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-[13px] text-gray-400 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-green/5 border border-brand-green/20 rounded-lg p-4 text-center">
                <p className="text-[13px] text-gray-300 italic">
                  &ldquo;Work hard, train smarter, and welcome to the Lab.&rdquo;
                </p>
                <p className="text-2xs text-brand-green font-medium mt-1">— Jules Heningburg</p>
              </div>
            </div>
          )}

          {/* Warm-Up Tab */}
          {isFoundation && activeTab === "warmup" && (
            <div className="max-w-2xl">
              <div className="bg-brand-dark-light border border-brand-dark-border rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-brand-dark-border">
                  <h3 className="font-semibold text-white text-[13px] flex items-center gap-2">
                    <Flame size={14} className="text-orange-400" />
                    Daily Dynamic Warm-Up Routine
                  </h3>
                  <p className="text-2xs text-gray-500 mt-0.5">Complete before every training session</p>
                </div>
                <div className="divide-y divide-brand-dark-border">
                  {(activeProgram as typeof programs[0]).warmup?.map((ex, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xs text-gray-600 w-4 text-right">{i + 1}</span>
                        <span className="text-[13px] text-white">{ex.name}</span>
                      </div>
                      <span className="text-2xs text-gray-500">{ex.reps}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Wall Ball Tab */}
          {isFoundation && activeTab === "wallball" && (
            <div className="max-w-2xl">
              <div className="bg-brand-dark-light border border-brand-dark-border rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-brand-dark-border">
                  <h3 className="font-semibold text-white text-[13px] flex items-center gap-2">
                    <Dumbbell size={14} className="text-brand-green" />
                    Wall Ball Routine
                  </h3>
                  <p className="text-2xs text-gray-500 mt-0.5">Use as much as you can on a weekly basis. Each skill 2-3 minutes. Work right and left hand for time (1 minute as hard as you can go). Make it fun, be creative, and work hard!</p>
                </div>
                <div className="divide-y divide-brand-dark-border">
                  {(activeProgram as typeof programs[0]).wallBall?.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2.5 px-4 py-2.5">
                      <span className="text-2xs text-gray-600 w-4 text-right">{i + 1}</span>
                      <span className="text-[13px] text-white">{skill}</span>
                      <span className="text-2xs text-gray-600 ml-auto">2-3 min</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Schedule Tab (default) */}
          {activeTab === "schedule" && (
            <div className="space-y-4">
              {/* Quick Schedule Overview (for Offensive Foundations) */}
              {isFoundation && (
                <div className="bg-brand-dark-light border border-brand-dark-border rounded-lg p-4 mb-6">
                  <h3 className="text-2xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Weekly Schedule Overview</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {[
                      { day: "Mon", focus: "Shooting", color: "text-red-400" },
                      { day: "Tue", focus: "Dodging", color: "text-blue-400" },
                      { day: "Wed", focus: "Sweep", color: "text-purple-400" },
                      { day: "Thu", focus: "Step Down", color: "text-orange-400" },
                      { day: "Fri", focus: "Alley", color: "text-yellow-400" },
                      { day: "Sat", focus: "X Dodge", color: "text-brand-green" },
                      { day: "Sun", focus: "Rest", color: "text-gray-600" },
                    ].map((d) => (
                      <div key={d.day} className="text-center">
                        <p className="text-2xs text-gray-500 mb-0.5">{d.day}</p>
                        <p className={`text-[10px] font-medium ${d.color}`}>{d.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeProgram.weeks.map((week, wi) => {
                const isRestDay = week.lessons.length === 1 && week.lessons[0].name === "Rest & Recovery";
                return (
                <div key={wi} className="bg-brand-dark-light border border-brand-dark-border rounded-lg overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-brand-dark-border flex items-center justify-between">
                    <h3 className="font-semibold text-white text-[13px]">{week.title}</h3>
                    <span className="text-2xs text-gray-600">{week.dayLabel}</span>
                  </div>
                  <div className="divide-y divide-brand-dark-border">
                    {week.lessons.map((lesson, li) => {
                      const drillKey = `${wi}-${li}`;
                      const isExpanded = expandedDrill === drillKey;
                      const assets = drillAssets[lesson.name];
                      const isWarmup = "type" in lesson && lesson.type === "warmup";
                      const isRest = lesson.name === "Rest & Recovery";
                      const hasVideo = !!assets;

                      return (
                        <div key={li}>
                          <button
                            onClick={() => {
                              if (isWarmup || isRest) return;
                              setExpandedDrill(isExpanded ? null : drillKey);
                            }}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 transition-colors duration-150 text-left ${
                              isWarmup || isRest ? "" : "hover:bg-white/[0.03] cursor-pointer"
                            } ${isExpanded ? "bg-white/[0.03]" : ""}`}
                          >
                            {lesson.completed ? (
                              <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                            ) : isRest ? (
                              <div className="w-4 h-4 rounded-full bg-gray-700 shrink-0 flex items-center justify-center">
                                <span className="text-[8px] text-gray-500">Z</span>
                              </div>
                            ) : isWarmup ? (
                              <div className="w-4 h-4 rounded-full border-2 border-orange-400/50 shrink-0 flex items-center justify-center">
                                <Flame size={8} className="text-orange-400" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-gray-600 shrink-0 flex items-center justify-center">
                                <Play size={7} className="text-gray-600 ml-0.5" />
                              </div>
                            )}

                            {/* Thumbnail preview */}
                            {assets && (
                              <div className="w-10 h-10 rounded overflow-hidden shrink-0 relative">
                                <Image
                                  src={assets.thumbnail}
                                  alt={lesson.name}
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <span className={`text-[13px] ${lesson.completed ? "text-gray-500" : "text-white"}`}>
                                {lesson.name}
                              </span>
                              {"reps" in lesson && lesson.reps && (
                                <p className="text-2xs text-gray-600 mt-0.5">{lesson.reps}</p>
                              )}
                            </div>

                            {hasVideo && (
                              <span className="text-[9px] bg-brand-green/10 text-brand-green px-1.5 py-0.5 rounded font-medium shrink-0">
                                Video
                              </span>
                            )}

                            {lesson.duration && (
                              <span className="text-2xs text-gray-600 shrink-0">{lesson.duration}</span>
                            )}

                            {!isWarmup && !isRest && (
                              <ChevronDown
                                size={14}
                                className={`text-gray-600 shrink-0 transition-transform duration-150 ${
                                  isExpanded ? "rotate-180 text-brand-green" : ""
                                }`}
                              />
                            )}
                          </button>

                          {/* Expanded Video Section */}
                          {isExpanded && (
                            <div className="px-4 pb-4 pt-2 bg-brand-dark/50">
                              {assets?.video ? (
                                <div className="rounded-lg overflow-hidden border border-brand-dark-border bg-black">
                                  <video
                                    controls
                                    poster={assets.thumbnail}
                                    className="w-full aspect-video"
                                    preload="metadata"
                                  >
                                    <source src={assets.video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                  <div className="flex items-center justify-between px-3 py-2 bg-brand-dark-light">
                                    <div>
                                      <p className="text-[13px] text-white font-medium">{lesson.name}</p>
                                      {"reps" in lesson && lesson.reps && (
                                        <p className="text-2xs text-gray-500 mt-0.5">{lesson.reps}</p>
                                      )}
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setFullscreenVideo(assets.video!);
                                      }}
                                      className="flex items-center gap-1.5 text-2xs text-gray-400 hover:text-white transition-colors duration-150 bg-white/[0.06] px-2 py-1 rounded"
                                    >
                                      <Maximize2 size={12} />
                                      Expand
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="rounded-lg border border-brand-dark-border bg-brand-dark aspect-video flex flex-col items-center justify-center">
                                  <Play size={32} className="text-gray-600 mb-2" />
                                  <p className="text-[13px] text-gray-500">Video coming soon</p>
                                  <p className="text-2xs text-gray-600 mt-0.5">{lesson.name}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
              })}
            </div>
          )}
        </div>

        {/* Fullscreen Video Modal */}
        {fullscreenVideo && (
          <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-8">
            <button
              onClick={() => setFullscreenVideo(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-150 z-10"
            >
              <X size={24} />
            </button>
            <video
              controls
              autoPlay
              className="max-w-full max-h-full rounded-lg"
            >
              <source src={fullscreenVideo} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-6 py-4 border-b border-brand-dark-border">
        <div className="flex items-center gap-2 mb-0.5">
          <BookOpen size={18} className="text-brand-green" />
          <h1 className="text-lg font-bold text-white">Programs</h1>
        </div>
        <p className="text-[13px] text-gray-500">
          Structured training programs to take your game to the next level
        </p>
      </div>

      <div className="px-6 py-5 space-y-4">
        {programs.map((program) => {
          const progress = program.completedLessons / program.lessons;

          return (
            <button
              key={program.id}
              onClick={() => setSelectedProgram(program.id)}
              className="w-full bg-brand-dark-light border border-brand-dark-border rounded-lg p-5 hover:bg-white/[0.03] transition-all duration-150 text-left group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-${program.color}/10 flex items-center justify-center shrink-0`}>
                  <program.icon size={24} className={`text-${program.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h2 className="text-sm font-bold text-white group-hover:text-brand-green transition-colors duration-150">
                      {program.title}
                    </h2>
                    {program.completedLessons > 0 && (
                      <span className="text-[9px] bg-brand-green/10 text-brand-green px-1.5 py-0.5 rounded font-medium">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-gray-500 mb-2.5 max-w-2xl">{program.description}</p>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1 text-2xs text-gray-600">
                      <Clock size={10} />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1 text-2xs text-gray-600">
                      <Calendar size={10} />
                      {program.frequency}
                    </span>
                    <span className="flex items-center gap-1 text-2xs text-gray-600">
                      <BookOpen size={10} />
                      {program.lessons} {program.id === "recruiting" ? "lessons" : "drills"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {program.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-2xs bg-brand-dark border border-brand-dark-border rounded px-2 py-0.5 text-gray-500"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {program.completedLessons > 0 && (
                    <div className="mt-3 max-w-sm">
                      <div className="h-1 bg-brand-dark-border rounded-full overflow-hidden">
                        <div className="h-full bg-brand-green rounded-full" style={{ width: `${progress * 100}%` }} />
                      </div>
                      <p className="text-2xs text-gray-600 mt-0.5">
                        {program.completedLessons}/{program.lessons} — {Math.round(progress * 100)}% complete
                      </p>
                    </div>
                  )}
                </div>
                <ChevronRight size={18} className="text-gray-600 group-hover:text-brand-green shrink-0 mt-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
