"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dumbbell,
  Search,
  Play,
  Grid3X3,
  List,
  ChevronDown,
  Maximize2,
  X,
} from "lucide-react";

type Category = "shooting" | "footwork" | "dodging" | "stick-work" | "finishing";

interface Drill {
  id: number;
  title: string;
  categories: Category[];
  cover: string;
  video?: string;
  coach: string;
  month1: boolean;
}

const categoryMeta: Record<Category, { label: string; color: string }> = {
  shooting: { label: "Shooting", color: "text-orange-400 bg-orange-400/10" },
  footwork: { label: "Footwork", color: "text-blue-400 bg-blue-400/10" },
  dodging: { label: "Dodging", color: "text-purple-400 bg-purple-400/10" },
  "stick-work": { label: "Stick Work", color: "text-cyan-400 bg-cyan-400/10" },
  finishing: { label: "Finishing", color: "text-red-400 bg-red-400/10" },
};

const filterCategories = [
  { id: "all", name: "All Drills", count: 26 },
  { id: "shooting", name: "Shooting", count: 13 },
  { id: "footwork", name: "Footwork", count: 7 },
  { id: "dodging", name: "Dodging", count: 2 },
  { id: "stick-work", name: "Stick Work", count: 2 },
  { id: "finishing", name: "Finishing", count: 2 },
];

const drills: Drill[] = [
  // SHOOTING (13)
  { id: 1, title: "Up Hash Layup Shooting", categories: ["shooting"], cover: "/drills/up-hash-layup-shooting.png", coach: "Jules Heningburg", month1: true },
  { id: 2, title: "Climb the Ladder", categories: ["shooting"], cover: "/drills/climb-the-ladder.png", coach: "Jules Heningburg", month1: true },
  { id: 3, title: "Flat Feet Rotation Shooting", categories: ["shooting"], cover: "/drills/flat-feet-rotation-shooting.png", coach: "Jules Heningburg", month1: true },
  { id: 4, title: "Standing Toss Shooting", categories: ["shooting"], cover: "/drills/standing-toss-shooting.png", video: "/drills/f5-standing-toss-shooting.mp4", coach: "Jules Heningburg", month1: true },
  { id: 5, title: "Layup Shooting Above/Mid", categories: ["shooting"], cover: "/drills/layup-shooting-abovemid.png", video: "/drills/f5-layup-shooting-abovemid.mp4", coach: "Jules Heningburg", month1: true },
  { id: 6, title: "One Knee Pop Shooting", categories: ["shooting"], cover: "/drills/one-knee-pop-shooting.png", video: "/drills/ll-one-knee-pop-2.mp4", coach: "Jules Heningburg", month1: true },
  { id: 7, title: "One Arm Snap Shooting", categories: ["shooting"], cover: "/drills/layup-shooting.png", video: "/drills/one-arm-snap-shooting.mp4", coach: "Jules Heningburg", month1: false },
  { id: 8, title: "Hand Exchange Question Mark", categories: ["shooting"], cover: "/drills/jab-and-go-middle.png", video: "/drills/hand-exchange-question-mark.mp4", coach: "Jules Heningburg", month1: false },
  { id: 9, title: "Gather OTR Shooting", categories: ["shooting"], cover: "/drills/layup-shooting-up-hash.png", video: "/drills/gather-otr-shooting.mp4", coach: "Jules Heningburg", month1: false },
  { id: 10, title: "Fade Shooting", categories: ["shooting"], cover: "/drills/layup-shooting-above-cage.png", video: "/drills/fade-shooting-ll.mp4", coach: "Jules Heningburg", month1: false },
  { id: 11, title: "Spin & Fire", categories: ["shooting"], cover: "/drills/lay-up-shooting.png", video: "/drills/spin-fire.mp4", coach: "Jules Heningburg", month1: false },
  { id: 12, title: "Jumpshot Shooting", categories: ["shooting"], cover: "/drills/layup-shooting-in-the-alley.png", video: "/drills/jumpshot-shooting-ll.mp4", coach: "Jules Heningburg", month1: false },
  { id: 13, title: "BTC Split Up the Hash Shooting", categories: ["shooting", "dodging"], cover: "/drills/btc-split-up-hash-shooting.png", video: "/drills/btc-split-up-the-hash-2.mp4", coach: "Jules Heningburg", month1: true },

  // FOOTWORK (7)
  { id: 14, title: "Heat Feet 4 Cone Drill", categories: ["footwork"], cover: "/drills/heat-feet-4-cone-drill.png", coach: "Jules Heningburg", month1: true },
  { id: 15, title: "Shoulder Lean", categories: ["footwork"], cover: "/drills/4-cone-jab-drill.png", video: "/drills/shoulder-lean-ll.mp4", coach: "Jules Heningburg", month1: false },
  { id: 16, title: "Heat Feet Around Cone Sideways", categories: ["footwork"], cover: "/drills/split-dodge-alley.png", video: "/drills/heat-feet-around-the-cone-sideways.mp4", coach: "Jules Heningburg", month1: false },
  { id: 17, title: "Heat Feet Around Cone Forward", categories: ["footwork"], cover: "/drills/atc-split-dodge-alley-copy.png", video: "/drills/heat-feet-around-the-cone-forward.mp4", coach: "Jules Heningburg", month1: false },
  { id: 18, title: "Half Turns COD W/ Stick", categories: ["footwork"], cover: "/drills/btc-split-up-the-hash.png", video: "/drills/half-turns-cod-w-stick.mp4", coach: "Jules Heningburg", month1: false },
  { id: 19, title: "Half Turns COD No Stick", categories: ["footwork"], cover: "/drills/btc-split-up-the-hash-cover.png", video: "/drills/half-turns-cod-no-stick-ll.mp4", coach: "Jules Heningburg", month1: false },
  { id: 20, title: "Foot in the Ground, COD Carousel", categories: ["footwork"], cover: "/drills/standing-toss-shooting-copy.png", video: "/drills/cod-carousel-ll.mp4", coach: "Jules Heningburg", month1: false },

  // DODGING (1 unique + 1 shared with shooting)
  { id: 21, title: "ATC Split Dodge Alley", categories: ["dodging"], cover: "/drills/atc-split-dodge-alley.png", video: "/drills/atc-split-dodge-alley.mp4", coach: "Jules Heningburg", month1: true },

  // STICK WORK (2)
  { id: 22, title: "Snake and Stick w/ Stick", categories: ["stick-work"], cover: "/drills/snake-and-stick.png", coach: "Jules Heningburg", month1: true },
  { id: 23, title: "Snake and Stick without Stick", categories: ["stick-work"], cover: "/drills/snake-and-stick-wo.png", coach: "Jules Heningburg", month1: true },

  // FINISHING (2)
  { id: 24, title: "Fake and Wrap", categories: ["finishing"], cover: "/drills/up-the-hash-layup-shooting-cover.png", video: "/drills/fake-wrap.mp4", coach: "Jules Heningburg", month1: false },
  { id: 25, title: "Dip & Dunk", categories: ["finishing"], cover: "/drills/layup-shooting-up-the-hash.png", video: "/drills/dip-dunk-ll.mp4", coach: "Jules Heningburg", month1: false },
];

export default function DrillLibrary() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedDrill, setExpandedDrill] = useState<number | null>(null);
  const [fullscreenVideo, setFullscreenVideo] = useState<{ src: string; title: string } | null>(null);

  const filtered = drills.filter((d) => {
    const matchesCategory =
      activeCategory === "all" || d.categories.includes(activeCategory as Category);
    const matchesSearch =
      searchQuery === "" || d.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-full">
      {/* Category Sidebar */}
      <div className="w-52 border-r border-brand-dark-border bg-brand-dark shrink-0 overflow-y-auto">
        <div className="p-3.5 border-b border-brand-dark-border">
          <div className="flex items-center gap-2">
            <Dumbbell size={14} className="text-brand-green" />
            <h2 className="font-semibold text-white text-[13px]">Drill Library</h2>
          </div>
          <p className="text-2xs text-gray-600 mt-0.5">26 drills to master your game</p>
        </div>
        <div className="p-1.5">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center justify-between px-2.5 py-[5px] rounded text-[13px] transition-colors duration-150 ${
                activeCategory === cat.id
                  ? "bg-white/[0.06] text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]"
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-2xs ${activeCategory === cat.id ? "text-brand-green" : "text-gray-600"}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Search & View Toggle Bar */}
        <div className="px-5 h-12 border-b border-brand-dark-border flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Search drills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-dark border border-brand-dark-border rounded pl-8 pr-3 py-1.5 text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-brand-green/50"
            />
          </div>
          <div className="flex items-center gap-0.5 bg-brand-dark border border-brand-dark-border rounded p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 rounded transition-colors duration-150 ${
                viewMode === "grid" ? "bg-white/[0.06] text-white" : "text-gray-500"
              }`}
            >
              <Grid3X3 size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1 rounded transition-colors duration-150 ${
                viewMode === "list" ? "bg-white/[0.06] text-white" : "text-gray-500"
              }`}
            >
              <List size={14} />
            </button>
          </div>
          <span className="text-2xs text-gray-600">{filtered.length} drills</span>
        </div>

        {/* Drills Grid / List */}
        <div className="p-5">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
              {filtered.map((drill) => {
                const isExpanded = expandedDrill === drill.id;

                return (
                  <React.Fragment key={drill.id}>
                    <button
                      onClick={() => setExpandedDrill(isExpanded ? null : drill.id)}
                      className={`group bg-brand-dark-light border rounded-lg overflow-hidden hover:bg-white/[0.03] transition-all duration-150 text-left ${
                        isExpanded ? "border-brand-green/50 ring-1 ring-brand-green/20" : "border-brand-dark-border"
                      }`}
                    >
                      {/* Cover Image */}
                      <div className="relative aspect-video">
                        <Image
                          src={drill.cover}
                          alt={drill.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-150 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-brand-green/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 scale-90 group-hover:scale-100">
                            <Play size={18} className="text-brand-dark ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                        {drill.month1 && (
                          <span className="absolute top-2 left-2 bg-brand-green/10 text-brand-green text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Month 1
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-2.5">
                        <div className="flex items-center justify-between mb-1.5">
                          <h3 className="font-medium text-white text-[13px] leading-tight group-hover:text-brand-green transition-colors duration-150">
                            {drill.title}
                          </h3>
                          <ChevronDown
                            size={14}
                            className={`text-gray-600 shrink-0 ml-1 transition-transform duration-150 ${isExpanded ? "rotate-180 text-brand-green" : ""}`}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xs text-gray-600">{drill.coach}</span>
                          <div className="flex items-center gap-1">
                            {drill.categories.map((cat) => (
                              <span
                                key={cat}
                                className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${categoryMeta[cat].color}`}
                              >
                                {categoryMeta[cat].label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Expanded video panel */}
                    {isExpanded && (
                      <div
                        className="bg-brand-dark-light border border-brand-green/20 rounded-lg p-4"
                        style={{ gridColumn: `1 / -1` }}
                      >
                        {drill.video ? (
                          <div className="flex flex-col gap-3">
                            <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-lg overflow-hidden bg-black">
                              <video
                                key={drill.video}
                                controls
                                poster={drill.cover}
                                className="w-full h-full object-contain"
                                preload="metadata"
                              >
                                <source src={drill.video} type="video/mp4" />
                              </video>
                            </div>
                            <div className="flex items-center justify-between max-w-2xl mx-auto w-full">
                              <div>
                                <h4 className="text-white font-medium text-[13px]">{drill.title}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                  {drill.categories.map((cat) => (
                                    <span key={cat} className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${categoryMeta[cat].color}`}>
                                      {categoryMeta[cat].label}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFullscreenVideo({ src: drill.video!, title: drill.title });
                                }}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-brand-green/10 text-brand-green rounded-lg text-[13px] font-medium hover:bg-brand-green/20 transition-colors duration-150"
                              >
                                <Maximize2 size={13} />
                                Expand
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center py-8 text-gray-600 text-[13px]">
                            <Play size={16} className="mr-2 opacity-40" />
                            Video coming soon
                          </div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((drill) => {
                const isExpanded = expandedDrill === drill.id;
                return (
                  <div key={drill.id}>
                    <button
                      onClick={() => setExpandedDrill(isExpanded ? null : drill.id)}
                      className={`group w-full flex items-center gap-3 bg-brand-dark-light border rounded-lg p-2.5 hover:bg-white/[0.03] transition-all duration-150 text-left ${
                        isExpanded ? "border-brand-green/50 ring-1 ring-brand-green/20" : "border-brand-dark-border"
                      }`}
                    >
                      <div className="w-24 h-14 relative rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={drill.cover}
                          alt={drill.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                        <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/40 transition-colors duration-150 flex items-center justify-center">
                          <Play size={14} className="text-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-150 ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white text-[13px] group-hover:text-brand-green transition-colors duration-150">
                          {drill.title}
                        </h3>
                        <p className="text-2xs text-gray-600 mt-0.5">{drill.coach}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {drill.categories.map((cat) => (
                          <span
                            key={cat}
                            className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${categoryMeta[cat].color}`}
                          >
                            {categoryMeta[cat].label}
                          </span>
                        ))}
                      </div>
                      {drill.month1 && (
                        <span className="bg-brand-green/10 text-brand-green text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0">
                          Month 1
                        </span>
                      )}
                      <ChevronDown
                        size={14}
                        className={`text-gray-600 shrink-0 transition-transform duration-150 ${isExpanded ? "rotate-180 text-brand-green" : ""}`}
                      />
                    </button>

                    {/* Expanded section below list item */}
                    {isExpanded && (
                      <div className="bg-brand-dark-light border border-brand-green/20 border-t-0 rounded-b-lg p-4 -mt-0.5">
                        {drill.video ? (
                          <div className="flex flex-col gap-3">
                            <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-lg overflow-hidden bg-black">
                              <video
                                key={drill.video}
                                controls
                                poster={drill.cover}
                                className="w-full h-full object-contain"
                                preload="metadata"
                              >
                                <source src={drill.video} type="video/mp4" />
                              </video>
                            </div>
                            <div className="flex items-center justify-between max-w-2xl mx-auto w-full">
                              <div>
                                <h4 className="text-white font-medium text-[13px]">{drill.title}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                  {drill.categories.map((cat) => (
                                    <span key={cat} className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${categoryMeta[cat].color}`}>
                                      {categoryMeta[cat].label}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFullscreenVideo({ src: drill.video!, title: drill.title });
                                }}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-brand-green/10 text-brand-green rounded-lg text-[13px] font-medium hover:bg-brand-green/20 transition-colors duration-150"
                              >
                                <Maximize2 size={13} />
                                Expand
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center py-8 text-gray-600 text-[13px]">
                            <Play size={16} className="mr-2 opacity-40" />
                            Video coming soon
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {fullscreenVideo && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setFullscreenVideo(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-150 z-10"
          >
            <X size={24} />
          </button>
          <div className="w-full max-w-5xl mx-4 aspect-video">
            <video
              key={fullscreenVideo.src}
              controls
              autoPlay
              className="w-full h-full rounded-lg object-contain"
            >
              <source src={fullscreenVideo.src} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
