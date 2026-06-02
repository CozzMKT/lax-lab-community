"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  ChevronDown,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  Lock,
  ArrowRight,
  DollarSign,
  X,
} from "lucide-react";

type Camp = {
  id: string;
  title: string;
  location: string;
  state: string;
  date: string;
  time: string;
  coach: string;
  ageGroup: string;
  gender: string;
  position: string;
  spotsTotal: number;
  spotsTaken: number;
  price: number;
  rating: number;
  status: "open" | "limited" | "waitlist" | "closed" | "invite-only";
  description: string;
  memberDiscount: boolean;
  tags: string[];
};

const camps: Camp[] = [
  { id: "1", title: "Elite Offensive Skills Clinic", location: "Ridgefield, CT", state: "CT", date: "April 12, 2026", time: "9:00 AM - 12:00 PM", coach: "Jules Heningburg", ageGroup: "High School", gender: "Boys", position: "Attack / Midfield", spotsTotal: 30, spotsTaken: 24, price: 125, rating: 5, status: "limited", description: "Intensive 3-hour clinic focused on dodging, shooting, and finishing. Work directly with Jules Heningburg on D1-level offensive techniques.", memberDiscount: true, tags: ["Shooting", "Dodging", "1v1"] },
  { id: "2", title: "High School Conditioning Camp", location: "Patterson, NY", state: "NY", date: "April 19, 2026", time: "8:00 AM - 2:00 PM", coach: "Coach Mike", ageGroup: "High School", gender: "Boys", position: "All Positions", spotsTotal: 50, spotsTaken: 31, price: 175, rating: 4, status: "open", description: "Full-day conditioning and skills camp. Get game-ready with speed, agility, and lacrosse-specific fitness training.", memberDiscount: true, tags: ["Conditioning", "Speed", "Agility"] },
  { id: "3", title: "Boys Faceoff Academy", location: "Boston, MA", state: "MA", date: "April 26, 2026", time: "10:00 AM - 1:00 PM", coach: "Jules Heningburg", ageGroup: "Grades 6-8", gender: "Boys", position: "FOGO", spotsTotal: 20, spotsTaken: 20, price: 100, rating: 5, status: "waitlist", description: "Specialized faceoff training for young athletes. Master clamp, plunger, and counter moves from elite FOGO specialists.", memberDiscount: false, tags: ["Faceoffs", "Specialty"] },
  { id: "4", title: "Girls Offensive Clinic", location: "East Rutherford, NJ", state: "NJ", date: "May 3, 2026", time: "9:00 AM - 12:00 PM", coach: "Coach Sarah", ageGroup: "High School", gender: "Girls", position: "Attack / Midfield", spotsTotal: 25, spotsTaken: 8, price: 125, rating: 5, status: "open", description: "Girls-only offensive skills clinic covering shooting mechanics, cutting, and draw controls. All skill levels welcome.", memberDiscount: true, tags: ["Girls", "Shooting", "Draws"] },
  { id: "5", title: "D1 Prospect Showcase", location: "Princeton, NJ", state: "NJ", date: "May 10, 2026", time: "8:00 AM - 4:00 PM", coach: "Jules Heningburg + Guest Coaches", ageGroup: "High School", gender: "Boys", position: "All Positions", spotsTotal: 80, spotsTaken: 62, price: 295, rating: 5, status: "invite-only", description: "Premier showcase event with college coaches in attendance. Compete in game situations and get evaluated by D1 staff. Invite only — request access below.", memberDiscount: true, tags: ["Showcase", "Recruiting", "D1 Coaches"] },
  { id: "6", title: "Youth Stick Skills Camp", location: "Stamford, CT", state: "CT", date: "May 17, 2026", time: "10:00 AM - 12:00 PM", coach: "Coach Mike", ageGroup: "Grades 3-5", gender: "Boys", position: "All Positions", spotsTotal: 40, spotsTaken: 12, price: 75, rating: 4, status: "open", description: "Beginner-friendly camp focused on catching, throwing, ground balls, and basic game play. Perfect for kids just getting started.", memberDiscount: true, tags: ["Youth", "Fundamentals", "Beginner"] },
  { id: "7", title: "Defensive Masterclass", location: "White Plains, NY", state: "NY", date: "May 24, 2026", time: "9:00 AM - 12:00 PM", coach: "Jules Heningburg", ageGroup: "High School", gender: "Boys", position: "Defense / LSM", spotsTotal: 25, spotsTaken: 25, price: 125, rating: 5, status: "closed", description: "Advanced defensive techniques — footwork, body positioning, stick checks, and team defense concepts. For experienced defensemen only.", memberDiscount: true, tags: ["Defense", "Footwork", "Advanced"] },
  { id: "8", title: "Summer Elite Training Week", location: "Ridgefield, CT", state: "CT", date: "June 15-19, 2026", time: "9:00 AM - 3:00 PM", coach: "Jules Heningburg + Full Staff", ageGroup: "High School", gender: "Boys", position: "All Positions", spotsTotal: 60, spotsTaken: 38, price: 495, rating: 5, status: "open", description: "5-day intensive training experience. Full position-specific training, film study, recruiting prep, and competitive play. The ultimate summer lacrosse camp.", memberDiscount: true, tags: ["5-Day Camp", "All Positions", "Film Study", "Recruiting"] },
];

function StatusBadge({ status }: { status: Camp["status"] }) {
  const styles = {
    open: "bg-brand-green/10 text-brand-green border-brand-green/20",
    limited: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    waitlist: "bg-orange-400/10 text-orange-400 border-orange-400/20",
    closed: "bg-red-400/10 text-red-400 border-red-400/20",
    "invite-only": "bg-purple-400/10 text-purple-400 border-purple-400/20",
  };
  const labels = {
    open: "Open",
    limited: "Limited Spots",
    waitlist: "Waitlist",
    closed: "Sold Out",
    "invite-only": "Invite Only",
  };

  return (
    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={9} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
      ))}
    </div>
  );
}

export default function CampsPage() {
  const [search, setSearch] = useState("");
  const [filterPosition, setFilterPosition] = useState("All");
  const [filterGender, setFilterGender] = useState("All");
  const [filterAge, setFilterAge] = useState("All");
  const [filterState, setFilterState] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);

  const filtered = camps.filter((camp) => {
    if (search && !camp.title.toLowerCase().includes(search.toLowerCase()) && !camp.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterPosition !== "All" && !camp.position.includes(filterPosition)) return false;
    if (filterGender !== "All" && camp.gender !== filterGender) return false;
    if (filterAge !== "All" && camp.ageGroup !== filterAge) return false;
    if (filterState !== "All" && camp.state !== filterState) return false;
    if (filterStatus !== "All" && camp.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="h-full overflow-y-auto pt-16">
      {/* Header */}
      <div className="px-6 py-4 border-b border-brand-dark-border">
        <div className="flex items-center gap-2 mb-0.5">
          <MapPin size={18} className="text-brand-green" />
          <h1 className="text-lg font-bold text-white">Camps & Clinics</h1>
        </div>
        <p className="text-[13px] text-gray-500">
          Browse and register for in-person training sessions, camps, showcases, and clinics
        </p>
      </div>

      {/* Filters Bar */}
      <div className="px-6 py-3 border-b border-brand-dark-border bg-brand-dark-light/50">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Search camps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-brand-dark border border-brand-dark-border rounded pl-8 pr-3 py-1.5 text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-brand-green/50"
            />
          </div>

          {[
            { label: "Position", value: filterPosition, setter: setFilterPosition, options: ["All", "Attack", "Midfield", "Defense", "FOGO", "Goalie"] },
            { label: "Gender", value: filterGender, setter: setFilterGender, options: ["All", "Boys", "Girls"] },
            { label: "Age", value: filterAge, setter: setFilterAge, options: ["All", "Grades 3-5", "Grades 6-8", "High School"] },
            { label: "State", value: filterState, setter: setFilterState, options: ["All", "CT", "NY", "NJ", "MA"] },
            { label: "Status", value: filterStatus, setter: setFilterStatus, options: ["All", "open", "limited", "waitlist", "invite-only"] },
          ].map((filter) => (
            <div key={filter.label} className="relative">
              <select
                value={filter.value}
                onChange={(e) => filter.setter(e.target.value)}
                className="bg-brand-dark border border-brand-dark-border rounded px-2.5 py-1.5 text-2xs text-gray-300 appearance-none pr-7 focus:outline-none focus:border-brand-green/50"
              >
                {filter.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === "All" ? `${filter.label}: All` : opt.charAt(0).toUpperCase() + opt.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
              <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          ))}

          <span className="text-2xs text-gray-600 ml-auto">{filtered.length} events</span>
        </div>
      </div>

      {/* Camp Cards Grid */}
      <div className="px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((camp) => {
            const spotsLeft = camp.spotsTotal - camp.spotsTaken;
            const pctFull = (camp.spotsTaken / camp.spotsTotal) * 100;

            return (
              <div
                key={camp.id}
                className={`bg-brand-dark-light border rounded-lg overflow-hidden transition-all duration-150 hover:bg-white/[0.03] cursor-pointer ${
                  camp.status === "closed" ? "border-brand-dark-border opacity-60" : "border-brand-dark-border"
                }`}
                onClick={() => setSelectedCamp(camp)}
              >
                <div className="p-4">
                  {/* Status + Rating */}
                  <div className="flex items-center justify-between mb-2.5">
                    <StatusBadge status={camp.status} />
                    <StarRating rating={camp.rating} />
                  </div>

                  <h3 className="font-bold text-white text-[13px] mb-1">{camp.title}</h3>

                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-1.5 text-2xs text-gray-400">
                      <MapPin size={10} className="text-gray-600 shrink-0" />
                      {camp.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-2xs text-gray-400">
                      <Calendar size={10} className="text-gray-600 shrink-0" />
                      {camp.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-2xs text-gray-400">
                      <Clock size={10} className="text-gray-600 shrink-0" />
                      {camp.time}
                    </div>
                    <div className="flex items-center gap-1.5 text-2xs text-gray-400">
                      <Users size={10} className="text-gray-600 shrink-0" />
                      {camp.coach}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="text-[9px] bg-brand-dark rounded px-1.5 py-0.5 text-gray-500 border border-brand-dark-border">
                      {camp.ageGroup}
                    </span>
                    <span className="text-[9px] bg-brand-dark rounded px-1.5 py-0.5 text-gray-500 border border-brand-dark-border">
                      {camp.gender}
                    </span>
                    <span className="text-[9px] bg-brand-dark rounded px-1.5 py-0.5 text-gray-500 border border-brand-dark-border">
                      {camp.position}
                    </span>
                  </div>

                  {/* Capacity Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[9px] mb-0.5">
                      <span className="text-gray-600">{camp.spotsTaken}/{camp.spotsTotal} spots filled</span>
                      <span className={spotsLeft <= 5 && spotsLeft > 0 ? "text-yellow-400 font-medium" : spotsLeft === 0 ? "text-red-400" : "text-gray-600"}>
                        {spotsLeft > 0 ? `${spotsLeft} left` : "Full"}
                      </span>
                    </div>
                    <div className="h-1 bg-brand-dark-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          pctFull >= 90 ? "bg-red-400" : pctFull >= 70 ? "bg-yellow-400" : "bg-brand-green"
                        }`}
                        style={{ width: `${pctFull}%` }}
                      />
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-white">${camp.price}</span>
                      {camp.memberDiscount && (
                        <span className="text-[9px] text-brand-green ml-1 font-medium">
                          Member: ${Math.round(camp.price * 0.9)}
                        </span>
                      )}
                    </div>

                    {camp.status === "open" || camp.status === "limited" ? (
                      <button className="bg-brand-green hover:bg-brand-green-hover text-brand-dark font-bold text-2xs px-3 py-1.5 rounded transition-colors duration-150">
                        Register
                      </button>
                    ) : camp.status === "waitlist" ? (
                      <button className="bg-orange-400 hover:bg-orange-500 text-brand-dark font-bold text-2xs px-3 py-1.5 rounded transition-colors duration-150">
                        Join Waitlist
                      </button>
                    ) : camp.status === "invite-only" ? (
                      <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold text-2xs px-3 py-1.5 rounded transition-colors duration-150">
                        Request Access
                      </button>
                    ) : (
                      <button className="bg-brand-dark-border text-gray-500 font-bold text-2xs px-3 py-1.5 rounded cursor-not-allowed">
                        Sold Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Camp Detail Modal */}
      {selectedCamp && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCamp(null)}>
          <div className="bg-brand-dark-light border border-brand-dark-border rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-brand-dark-border">
              <div className="flex items-start justify-between">
                <div>
                  <StatusBadge status={selectedCamp.status} />
                  <h2 className="text-sm font-bold text-white mt-2">{selectedCamp.title}</h2>
                </div>
                <button onClick={() => setSelectedCamp(null)} className="text-gray-500 hover:text-white transition-colors duration-150">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-[13px] text-gray-300">{selectedCamp.description}</p>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: MapPin, label: "Location", value: selectedCamp.location },
                  { icon: Calendar, label: "Date", value: selectedCamp.date },
                  { icon: Clock, label: "Time", value: selectedCamp.time },
                  { icon: Users, label: "Coach", value: selectedCamp.coach },
                ].map((detail, i) => (
                  <div key={i} className="bg-brand-dark rounded-lg p-2.5">
                    <div className="flex items-center gap-1 mb-0.5">
                      <detail.icon size={10} className="text-brand-green" />
                      <span className="text-[9px] text-gray-600 uppercase tracking-wider">{detail.label}</span>
                    </div>
                    <p className="text-[13px] text-white font-medium">{detail.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1">
                {selectedCamp.tags.map((tag) => (
                  <span key={tag} className="text-2xs bg-brand-green/10 text-brand-green rounded px-2 py-0.5 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bg-brand-dark rounded-lg p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xs text-gray-500">Spots</span>
                  <span className="text-[13px] font-medium text-white">
                    {selectedCamp.spotsTaken}/{selectedCamp.spotsTotal}
                  </span>
                </div>
                <div className="h-1.5 bg-brand-dark-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-green rounded-full"
                    style={{ width: `${(selectedCamp.spotsTaken / selectedCamp.spotsTotal) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-brand-dark rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-2xs text-gray-600">Price</p>
                  <p className="text-lg font-bold text-white">${selectedCamp.price}</p>
                  {selectedCamp.memberDiscount && (
                    <p className="text-2xs text-brand-green">
                      Elite members get 10% off: ${Math.round(selectedCamp.price * 0.9)}
                    </p>
                  )}
                </div>
                <StarRating rating={selectedCamp.rating} />
              </div>
            </div>

            <div className="p-5 border-t border-brand-dark-border">
              {selectedCamp.status === "open" || selectedCamp.status === "limited" ? (
                <button className="w-full bg-brand-green hover:bg-brand-green-hover text-brand-dark font-bold text-[13px] py-2.5 rounded-lg transition-colors duration-150">
                  Reserve Your Spot — ${selectedCamp.memberDiscount ? Math.round(selectedCamp.price * 0.9) : selectedCamp.price}
                </button>
              ) : selectedCamp.status === "waitlist" ? (
                <button className="w-full bg-orange-400 hover:bg-orange-500 text-brand-dark font-bold text-[13px] py-2.5 rounded-lg transition-colors duration-150">
                  Join the Waitlist
                </button>
              ) : selectedCamp.status === "invite-only" ? (
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold text-[13px] py-2.5 rounded-lg transition-colors duration-150">
                  Request Access
                </button>
              ) : (
                <button className="w-full bg-brand-dark-border text-gray-500 font-bold text-[13px] py-2.5 rounded-lg cursor-not-allowed">
                  This Event is Sold Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
