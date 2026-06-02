"use client";

import {
  Calendar,
  Play,
  Video,
  Clock,
  ExternalLink,
  Users,
  ChevronRight,
  Download,
} from "lucide-react";

const upcomingCalls = [
  {
    title: "Jules Heningburg Webinar — 1v1 Domination",
    date: "April 1, 2026",
    time: "7:00 PM EST",
    host: "Jules Heningburg",
    topics: ["Dominating 1v1 situations", "Reading the defense pre-dodge", "Live Q&A"],
    isNext: true,
  },
  {
    title: "Jules Heningburg Webinar — Off-Ball Movement",
    date: "April 15, 2026",
    time: "7:00 PM EST",
    host: "Jules Heningburg",
    topics: ["Cutting and timing", "Creating space without the ball", "Live Q&A"],
    isNext: false,
  },
];

const pastRecordings = [
  { title: "Shooting Under Pressure — Live Breakdown", date: "March 15, 2026", duration: "47:32", viewers: 89 },
  { title: "College Recruiting Q&A with Jules", date: "March 1, 2026", duration: "52:18", viewers: 124 },
  { title: "Defensive Footwork Masterclass", date: "February 15, 2026", duration: "41:05", viewers: 76 },
  { title: "Advanced Dodging Combinations", date: "February 1, 2026", duration: "55:40", viewers: 102 },
  { title: "Game Film Breakdown — Reading Defenses", date: "January 15, 2026", duration: "48:22", viewers: 93 },
];

const guestSessions = [
  { title: "Quarterly Guest Session: College Prep with Coach Williams", date: "May 1, 2026", status: "Upcoming" },
];

export default function CoachingPage() {
  return (
    <div className="h-full overflow-y-auto pt-16">
      <div className="px-6 py-4 border-b border-brand-dark-border">
        <div className="flex items-center gap-2 mb-0.5">
          <Calendar size={18} className="text-brand-green" />
          <h1 className="text-lg font-bold text-white">Live Coaching</h1>
        </div>
        <p className="text-[13px] text-gray-500">
          Biweekly live webinars with Jules Heningburg — 1st and 15th of every month
        </p>
      </div>

      <div className="px-6 py-5 space-y-6">
        {/* Upcoming Calls */}
        <div>
          <h2 className="text-2xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Upcoming Calls
          </h2>
          <div className="space-y-3">
            {upcomingCalls.map((call, i) => (
              <div
                key={i}
                className={`bg-brand-dark-light border rounded-lg p-4 ${
                  call.isNext ? "border-brand-green/20" : "border-brand-dark-border"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    {call.isNext && (
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                        <span className="text-2xs font-medium text-brand-green uppercase tracking-wider">
                          Next Live Call
                        </span>
                      </div>
                    )}
                    <h3 className="font-semibold text-white text-[13px] mb-1">
                      {call.title}
                    </h3>
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="flex items-center gap-1 text-2xs text-gray-500">
                        <Calendar size={10} />
                        {call.date}
                      </span>
                      <span className="flex items-center gap-1 text-2xs text-gray-500">
                        <Clock size={10} />
                        {call.time}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-2xs text-gray-600 mb-1.5">Topics:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {call.topics.map((topic, ti) => (
                          <span
                            key={ti}
                            className="text-2xs bg-brand-dark border border-brand-dark-border rounded px-2 py-0.5 text-gray-500"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {call.isNext && (
                      <button className="inline-flex items-center gap-1.5 bg-brand-green hover:bg-brand-green-hover text-brand-dark font-semibold text-[13px] px-4 py-2 rounded-lg transition-colors duration-150">
                        <Video size={14} />
                        Join Zoom Call
                        <ExternalLink size={12} />
                      </button>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <div className="bg-brand-dark rounded-lg p-2.5 text-center border border-brand-dark-border">
                      <p className="text-xl font-bold text-white">
                        {call.date.split(" ")[1].replace(",", "")}
                      </p>
                      <p className="text-2xs text-gray-600">
                        {call.date.split(" ")[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Sessions */}
        <div>
          <h2 className="text-2xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Guest Expert Sessions
          </h2>
          {guestSessions.map((session, i) => (
            <div
              key={i}
              className="bg-brand-dark-light border border-brand-dark-border rounded-lg p-3.5 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Users size={16} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white text-[13px]">{session.title}</h3>
                <p className="text-2xs text-gray-600">{session.date}</p>
              </div>
              <span className="text-[9px] bg-purple-400/10 text-purple-400 px-1.5 py-0.5 rounded font-medium">
                {session.status}
              </span>
            </div>
          ))}
        </div>

        {/* Past Recordings */}
        <div>
          <h2 className="text-2xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Past Recordings
          </h2>
          <div className="space-y-1">
            {pastRecordings.map((rec, i) => (
              <button
                key={i}
                className="group w-full flex items-center gap-3 bg-brand-dark-light border border-brand-dark-border rounded-lg p-3 hover:bg-white/[0.03] transition-all duration-150 text-left"
              >
                <div className="w-10 h-10 bg-brand-dark rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand-green/10 transition-colors duration-150">
                  <Play size={16} className="text-gray-500 group-hover:text-brand-green transition-colors duration-150 ml-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white text-[13px] group-hover:text-brand-green transition-colors duration-150">
                    {rec.title}
                  </h3>
                  <p className="text-2xs text-gray-600 mt-0.5">{rec.date}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="flex items-center gap-1 text-2xs text-gray-600">
                    <Clock size={10} />
                    {rec.duration}
                  </span>
                  <span className="flex items-center gap-1 text-2xs text-gray-600">
                    <Users size={10} />
                    {rec.viewers}
                  </span>
                </div>
                <ChevronRight size={14} className="text-gray-600 group-hover:text-brand-green shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
