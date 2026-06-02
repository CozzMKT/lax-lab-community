"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Hash,
  Megaphone,
  Trophy,
  Video,
  Zap,
  Send,
  Paperclip,
  Smile,
  Pin,
  Users,
  Bell,
  Search,
  MessageSquare,
  Phone,
  MoreHorizontal,
  X,
  Plus,
  ChevronDown,
} from "lucide-react";

/* ───────── channel & DM data ───────── */

const channels = [
  { id: "general", label: "general", icon: Hash, description: "Hang out and chat with the Lax Lab community" },
  { id: "announcements", label: "announcements", icon: Megaphone, description: "Official updates from Jules and the Lax Lab team" },
  { id: "wins", label: "wins", icon: Trophy, description: "Celebrate your victories — on and off the field" },
  { id: "webinar", label: "webinar", icon: Video, description: "Live webinar replays, Q&A, and upcoming session info" },
] as const;

type ChannelId = (typeof channels)[number]["id"];

const dmContacts = [
  { id: "jules", name: "Coach Heningburg", initials: "JH", role: "Head Coach", online: true },
  { id: "bodie", name: "Coach Bodie", initials: "CB", role: "Assistant Coach", online: true },
  { id: "ryan", name: "Ryan S.", initials: "RS", online: false },
  { id: "alex", name: "Alex R.", initials: "AR", online: false },
];

interface Message {
  id: number;
  user: string;
  initials: string;
  role?: string;
  time: string;
  content: string;
  reactions: { emoji: string; count: number; reacted: boolean }[];
  pinned?: boolean;
  isMe?: boolean;
}

const EMOJI_OPTIONS = ["🔥", "💪", "🥍", "🎯", "👏", "🙏", "❤️", "😂", "👀", "🎉"];

const channelMessages: Record<string, Message[]> = {
  general: [
    { id: 1, user: "Marcus T.", initials: "MT", time: "Today at 3:45 PM", content: "Hey everyone! Just joined today. I'm a junior attackman in New Jersey. Pumped to be here!", reactions: [{ emoji: "👋", count: 7, reacted: false }, { emoji: "🔥", count: 3, reacted: false }] },
    { id: 2, user: "Ryan S.", initials: "RS", time: "Today at 2:30 PM", content: "Anyone else working through the Offensive Skills Foundation? I'm on week 4 and my split dodge is already way smoother.", reactions: [{ emoji: "💪", count: 5, reacted: false }] },
    { id: 3, user: "Coach Mike", initials: "CM", role: "Assistant Coach", time: "Today at 1:15 PM", content: "Great to see all the activity in here. Keep grinding! Remember — the guys who put in wall ball reps when nobody's watching are the ones who make the roster.", reactions: [{ emoji: "🎯", count: 14, reacted: false }, { emoji: "🙏", count: 6, reacted: false }] },
    { id: 4, user: "Alex R.", initials: "AR", time: "Today at 11:00 AM", content: "Just finished the shooting drill from this week's Drill of the Week. Filmed it — gonna post in #film-review for feedback!", reactions: [] },
    { id: 5, user: "Jake P.", initials: "JP", time: "Yesterday at 9:30 PM", content: "Who else is going to the live call this Thursday? Can't wait to pick Jules' brain on reading defenses.", reactions: [{ emoji: "🙋", count: 19, reacted: false }] },
  ],
  announcements: [
    { id: 1, user: "Jules Heningburg", initials: "JH", role: "Head Coach", time: "Today at 2:15 PM", content: "Welcome to Lax Lab Elite! Excited to have everyone here. Quick reminders:\n\n1. Our first live coaching call is this Thursday at 7PM EST\n2. Check out the Drill Library — we just added 26 drills with video breakdowns\n3. Drop your intro in #general so we can all get to know each other\n\nLet's get to work!", reactions: [{ emoji: "🔥", count: 24, reacted: false }, { emoji: "🥍", count: 18, reacted: false }, { emoji: "💪", count: 12, reacted: false }], pinned: true },
    { id: 2, user: "Jules Heningburg", initials: "JH", role: "Head Coach", time: "Yesterday at 10:30 AM", content: "🏆 DRILL OF THE WEEK: Split Dodge to Quick Stick Finish\n\nThis is one of my go-to moves from my time at Rutgers. Head to the Drill Library to watch the full breakdown. Practice this 50 times on each hand this week.\n\nDrop a 🎯 when you've completed it!", reactions: [{ emoji: "🎯", count: 31, reacted: false }, { emoji: "👏", count: 8, reacted: false }] },
    { id: 3, user: "Jules Heningburg", initials: "JH", role: "Head Coach", time: "Mar 15 at 4:00 PM", content: "📅 UPCOMING: Live Coaching Call — Thursday at 7PM EST\n\nTopics:\n• How to dominate in 1v1 situations\n• Reading the defense pre-dodge\n• Q&A session\n\nZoom link will be posted 30 min before. See you there!", reactions: [{ emoji: "✅", count: 42, reacted: false }] },
  ],
  wins: [
    { id: 1, user: "Brandon K.", initials: "BK", time: "Today at 4:00 PM", content: "Just got my first D1 offer from UMass! The recruiting roadmap was a game changer — knowing when to email and what to say made all the difference. Thank you Jules and the Lax Lab team!! 🎉", reactions: [{ emoji: "🎉", count: 45, reacted: false }, { emoji: "🔥", count: 32, reacted: false }, { emoji: "🥍", count: 28, reacted: false }] },
    { id: 2, user: "Tyler M.", initials: "TM", time: "Yesterday at 6:00 PM", content: "4 goals and 2 assists today! That roll dodge series from the drill library is LETHAL. Defenders had no answer 😤", reactions: [{ emoji: "🔥", count: 16, reacted: false }, { emoji: "💪", count: 9, reacted: false }] },
    { id: 3, user: "Sarah L.", initials: "SL", time: "2 days ago", content: "My son just made the varsity A team as a sophomore! The footwork drills and the consistency of the daily schedule made such a difference. Grateful for this community 🙏", reactions: [{ emoji: "🎉", count: 21, reacted: false }, { emoji: "❤️", count: 14, reacted: false }] },
  ],
  webinar: [
    { id: 1, user: "Jules Heningburg", initials: "JH", role: "Head Coach", time: "Today at 9:00 AM", content: "🎥 WEBINAR REPLAY: \"Reading the Defense Pre-Dodge\" is now available.\n\nKey takeaways:\n• Always scan before you catch\n• Identify the slide package before your first dodge\n• Use head fakes to manipulate the adjacent defender\n\nWatch the replay in the Programs section under the Offensive Skills Foundation.", reactions: [{ emoji: "🔥", count: 18, reacted: false }, { emoji: "🎯", count: 12, reacted: false }], pinned: true },
    { id: 2, user: "Jules Heningburg", initials: "JH", role: "Head Coach", time: "Yesterday at 3:00 PM", content: "📅 NEXT LIVE WEBINAR: Thursday at 7PM EST\n\nTopic: \"1v1 Dodging Masterclass — Beating Any Defender\"\n\nI'll break down the exact techniques I used in the PLL to beat top defenders. Bring your questions!", reactions: [{ emoji: "🙋", count: 34, reacted: false }] },
  ],
};

const dmMessages: Record<string, Message[]> = {
  jules: [
    { id: 1, user: "Coach Heningburg", initials: "JH", time: "Yesterday at 4:30 PM", content: "Hey! Saw your film review post. Your split dodge is looking way better than last month.", reactions: [] },
    { id: 2, user: "You", initials: "JD", isMe: true, time: "Yesterday at 4:45 PM", content: "Thanks Jules! I've been doing the drills from the Offensive Skills Foundation every day. The footwork section really helped.", reactions: [] },
    { id: 3, user: "Coach Heningburg", initials: "JH", time: "Yesterday at 5:00 PM", content: "Love to hear it. One thing I noticed — your first step on the split dodge is still a bit wide. Try keeping it tighter, more under your body. That'll help you stay balanced and accelerate through the dodge.", reactions: [] },
    { id: 4, user: "You", initials: "JD", isMe: true, time: "Yesterday at 5:15 PM", content: "That makes a lot of sense. I feel like I'm losing speed right at the switch sometimes. I'll film it again tonight with the tighter first step.", reactions: [] },
    { id: 5, user: "Coach Heningburg", initials: "JH", time: "Today at 10:00 AM", content: "Great progress on your dodge! Keep working on that first step. Send me another clip when you get a chance. Also don't forget — live webinar Thursday, I'm going deep on 1v1 situations which will be perfect for what you're working on.", reactions: [] },
  ],
  bodie: [
    { id: 1, user: "Coach Bodie", initials: "CB", time: "2 days ago at 3:00 PM", content: "Hey! Just wanted to check in on your progress with the conditioning program. How are you feeling?", reactions: [] },
    { id: 2, user: "You", initials: "JD", isMe: true, time: "2 days ago at 3:30 PM", content: "Feeling great coach! The agility work has been tough but I can already feel a difference in my lateral movement.", reactions: [] },
    { id: 3, user: "Coach Bodie", initials: "CB", time: "2 days ago at 4:00 PM", content: "That's what I like to hear. Make sure you're getting enough recovery between sessions. Sleep and nutrition are just as important as the training itself.", reactions: [] },
  ],
  ryan: [
    { id: 1, user: "Ryan S.", initials: "RS", time: "Yesterday at 2:00 PM", content: "Hey! Saw your post about week 4. I'm on the same schedule — want to compare progress and keep each other accountable?", reactions: [] },
    { id: 2, user: "You", initials: "JD", isMe: true, time: "Yesterday at 2:30 PM", content: "Yeah for sure! I'm filming all my reps. What position do you play?", reactions: [] },
  ],
  alex: [
    { id: 1, user: "Alex R.", initials: "AR", time: "3 days ago", content: "Thanks for the tip on the roll dodge 🔥 Tried it today and it worked perfectly.", reactions: [] },
    { id: 2, user: "You", initials: "JD", isMe: true, time: "3 days ago", content: "No problem! That's straight from Jules' drill breakdown. The key is the shoulder fake before you commit.", reactions: [] },
  ],
};

/* ───────── component ───────── */

export default function CommunityPage() {
  const params = useParams();
  const router = useRouter();
  const channelId = params.channelId as string;

  const [activeView, setActiveView] = useState<{ type: "channel"; id: string } | { type: "dm"; id: string }>(
    { type: "channel", id: channelId }
  );
  const [allChannelMessages, setAllChannelMessages] = useState(channelMessages);
  const [allDmMessages, setAllDmMessages] = useState(dmMessages);
  const [message, setMessage] = useState("");
  const [emojiPickerMsg, setEmojiPickerMsg] = useState<number | null>(null);
  const [channelsExpanded, setChannelsExpanded] = useState(true);
  const [dmsExpanded, setDmsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  // Sync URL → activeView
  useEffect(() => {
    if (channelId && channels.some((c) => c.id === channelId)) {
      setActiveView({ type: "channel", id: channelId });
    }
  }, [channelId]);

  // Close emoji picker on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setEmojiPickerMsg(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allChannelMessages, allDmMessages, activeView]);

  const currentMessages = activeView.type === "channel"
    ? allChannelMessages[activeView.id] || []
    : allDmMessages[activeView.id] || [];

  const switchTo = useCallback((type: "channel" | "dm", id: string) => {
    setActiveView({ type, id });
    setEmojiPickerMsg(null);
    if (type === "channel") {
      router.replace(`/channels/${id}`, { scroll: false });
    }
  }, [router]);

  /* ── actions ── */

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      user: "You",
      initials: "JD",
      isMe: activeView.type === "dm",
      time: "Just now",
      content: message.trim(),
      reactions: [],
    };
    if (activeView.type === "channel") {
      setAllChannelMessages((prev) => ({
        ...prev,
        [activeView.id]: [...(prev[activeView.id] || []), newMsg],
      }));
    } else {
      setAllDmMessages((prev) => ({
        ...prev,
        [activeView.id]: [...(prev[activeView.id] || []), newMsg],
      }));
    }
    setMessage("");
  };

  const toggleReaction = (msgId: number, emoji: string) => {
    const update = (msgs: Message[]) =>
      msgs.map((m) => {
        if (m.id !== msgId) return m;
        const existing = m.reactions.find((r) => r.emoji === emoji);
        if (existing) {
          if (existing.reacted) {
            return {
              ...m,
              reactions: m.reactions
                .map((r) => (r.emoji === emoji ? { ...r, count: r.count - 1, reacted: false } : r))
                .filter((r) => r.count > 0),
            };
          }
          return {
            ...m,
            reactions: m.reactions.map((r) =>
              r.emoji === emoji ? { ...r, count: r.count + 1, reacted: true } : r
            ),
          };
        }
        return { ...m, reactions: [...m.reactions, { emoji, count: 1, reacted: true }] };
      });

    if (activeView.type === "channel") {
      setAllChannelMessages((prev) => ({ ...prev, [activeView.id]: update(prev[activeView.id] || []) }));
    } else {
      setAllDmMessages((prev) => ({ ...prev, [activeView.id]: update(prev[activeView.id] || []) }));
    }
    setEmojiPickerMsg(null);
  };

  /* ── sidebar info ── */

  const activeChannel = channels.find((c) => c.id === activeView.id);
  const activeDm = dmContacts.find((c) => c.id === activeView.id);
  const isDm = activeView.type === "dm";

  return (
    <div className="flex h-screen pt-16">
      {/* ── Sidebar ── */}
      <div className="w-56 border-r border-brand-dark-border bg-brand-dark shrink-0 flex flex-col overflow-y-auto">
        {/* Search */}
        <div className="p-3 border-b border-brand-dark-border">
          <div className="relative">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-brand-dark-light border border-brand-dark-border rounded pl-7 pr-3 py-1.5 text-2xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-brand-green/50"
            />
          </div>
        </div>

        {/* Channels */}
        <div className="px-2 pt-3">
          <button
            onClick={() => setChannelsExpanded(!channelsExpanded)}
            className="flex items-center gap-1 px-1.5 mb-1 text-[10px] text-gray-500 uppercase tracking-wider font-semibold hover:text-gray-300 transition-colors duration-150 w-full"
          >
            <ChevronDown size={10} className={`transition-transform duration-150 ${channelsExpanded ? "" : "-rotate-90"}`} />
            Channels
          </button>
          {channelsExpanded && channels.map((ch) => {
            const Icon = ch.icon;
            const isActive = activeView.type === "channel" && activeView.id === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => switchTo("channel", ch.id)}
                className={`w-full flex items-center gap-2 px-2.5 py-[5px] rounded text-[13px] transition-colors duration-150 ${
                  isActive
                    ? "bg-white/[0.08] text-white font-medium"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Icon size={14} className="shrink-0 opacity-60" />
                {ch.label}
              </button>
            );
          })}
        </div>

        {/* DMs */}
        <div className="px-2 pt-4">
          <button
            onClick={() => setDmsExpanded(!dmsExpanded)}
            className="flex items-center gap-1 px-1.5 mb-1 text-[10px] text-gray-500 uppercase tracking-wider font-semibold hover:text-gray-300 transition-colors duration-150 w-full"
          >
            <ChevronDown size={10} className={`transition-transform duration-150 ${dmsExpanded ? "" : "-rotate-90"}`} />
            Messages
          </button>
          {dmsExpanded && dmContacts.map((dm) => {
            const isActive = activeView.type === "dm" && activeView.id === dm.id;
            return (
              <button
                key={dm.id}
                onClick={() => switchTo("dm", dm.id)}
                className={`w-full flex items-center gap-2 px-2.5 py-[5px] rounded text-[13px] transition-colors duration-150 ${
                  isActive
                    ? "bg-white/[0.08] text-white font-medium"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <div className="relative shrink-0">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                    dm.role ? "bg-brand-green text-brand-dark" : "bg-brand-dark-light text-gray-300 border border-brand-dark-border"
                  }`}>
                    {dm.initials}
                  </div>
                  {dm.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-brand-green rounded-full border-[1.5px] border-brand-dark" />
                  )}
                </div>
                <span className="truncate">{dm.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Chat Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="px-5 h-12 border-b border-brand-dark-border flex items-center justify-between shrink-0">
          {isDm && activeDm ? (
            <>
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-2xs font-bold ${
                    activeDm.role ? "bg-brand-green text-brand-dark" : "bg-brand-dark-light text-gray-300"
                  }`}>
                    {activeDm.initials}
                  </div>
                  {activeDm.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-brand-green rounded-full border-2 border-brand-dark-light" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-[13px] leading-tight">{activeDm.name}</h3>
                  <p className="text-2xs text-gray-600">
                    {activeDm.online ? "Online" : "Offline"}
                    {activeDm.role && ` · ${activeDm.role}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 text-gray-500 hover:text-white rounded hover:bg-white/[0.06] transition-colors duration-150">
                  <Phone size={14} />
                </button>
                <button className="p-1.5 text-gray-500 hover:text-white rounded hover:bg-white/[0.06] transition-colors duration-150">
                  <Video size={14} />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                {activeChannel && <activeChannel.icon size={16} className="text-gray-500" />}
                <h2 className="font-semibold text-white text-[13px]">{activeView.id}</h2>
                <div className="w-px h-3.5 bg-brand-dark-border mx-1" />
                <p className="text-2xs text-gray-500 truncate">{activeChannel?.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-500 hover:text-gray-300 transition-colors duration-150 p-1"><Pin size={14} /></button>
                <button className="text-gray-500 hover:text-gray-300 transition-colors duration-150 p-1"><Bell size={14} /></button>
                <button className="text-gray-500 hover:text-gray-300 transition-colors duration-150 p-1"><Users size={14} /></button>
              </div>
            </>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-0.5">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`group relative py-1.5 px-3 -mx-3 rounded hover:bg-white/[0.03] transition-colors duration-150 ${
                msg.pinned ? "border-l-2 border-brand-green pl-3.5" : ""
              } ${isDm && msg.isMe ? "flex justify-end" : ""}`}
            >
              {isDm && msg.isMe ? (
                /* DM "my" message bubble */
                <div className="flex gap-2.5 flex-row-reverse max-w-md">
                  <div className="w-7 h-7 rounded-full shrink-0 bg-brand-dark-light flex items-center justify-center text-2xs font-bold text-gray-300">
                    {msg.initials}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end mb-0.5">
                      <span className="text-2xs font-medium text-gray-500">{msg.user}</span>
                      <span className="text-[9px] text-gray-600">{msg.time}</span>
                    </div>
                    <div className="inline-block rounded-xl rounded-tr-sm px-3.5 py-2 text-[13px] leading-relaxed bg-brand-green text-brand-dark">
                      {msg.content}
                    </div>
                    {msg.reactions.length > 0 && (
                      <div className="flex gap-1 mt-1.5 justify-end flex-wrap">
                        {msg.reactions.map((r, i) => (
                          <button
                            key={i}
                            onClick={() => toggleReaction(msg.id, r.emoji)}
                            className={`flex items-center gap-1 border rounded-full px-2 py-0.5 text-2xs transition-colors duration-150 ${
                              r.reacted
                                ? "bg-brand-green/10 border-brand-green/30 text-brand-green"
                                : "bg-brand-dark border-brand-dark-border hover:border-brand-green/30"
                            }`}
                          >
                            <span>{r.emoji}</span>
                            <span className={r.reacted ? "text-brand-green" : "text-gray-400"}>{r.count}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Standard message / DM other person */
                <div className="flex gap-2.5">
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-2xs font-bold ${
                    msg.role ? "bg-brand-green text-brand-dark" : "bg-brand-dark-light text-gray-300"
                  }`}>
                    {msg.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-[13px] font-semibold ${msg.role ? "text-brand-green" : "text-white"}`}>{msg.user}</span>
                      {msg.role && (
                        <span className="text-[9px] bg-brand-green/10 text-brand-green px-1.5 py-0.5 rounded font-medium">{msg.role}</span>
                      )}
                      <span className="text-2xs text-gray-600">{msg.time}</span>
                      {msg.pinned && (
                        <span className="text-[9px] text-yellow-500 flex items-center gap-0.5"><Pin size={9} /> Pinned</span>
                      )}
                    </div>
                    {isDm ? (
                      <div className="inline-block rounded-xl rounded-tl-sm px-3.5 py-2 text-[13px] leading-relaxed bg-brand-dark-light border border-brand-dark-border text-gray-200 mt-0.5">
                        {msg.content}
                      </div>
                    ) : (
                      <div className="text-[13px] text-gray-300 mt-0.5 whitespace-pre-line leading-relaxed">{msg.content}</div>
                    )}

                    {/* Reactions row */}
                    <div className="flex gap-1 mt-1.5 flex-wrap items-center">
                      {msg.reactions.map((r, i) => (
                        <button
                          key={i}
                          onClick={() => toggleReaction(msg.id, r.emoji)}
                          className={`flex items-center gap-1 border rounded-full px-2 py-0.5 text-2xs transition-colors duration-150 ${
                            r.reacted
                              ? "bg-brand-green/10 border-brand-green/30 text-brand-green"
                              : "bg-brand-dark border-brand-dark-border hover:border-brand-green/30"
                          }`}
                        >
                          <span>{r.emoji}</span>
                          <span className={r.reacted ? "text-brand-green" : "text-gray-400"}>{r.count}</span>
                        </button>
                      ))}

                      {/* Add reaction button (visible on hover) */}
                      <div className="relative" ref={emojiPickerMsg === msg.id ? emojiRef : undefined}>
                        <button
                          onClick={() => setEmojiPickerMsg(emojiPickerMsg === msg.id ? null : msg.id)}
                          className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 border border-dashed border-brand-dark-border rounded-full px-1.5 py-0.5 text-2xs text-gray-600 hover:text-gray-400 hover:border-gray-500 transition-all duration-150"
                        >
                          <Smile size={11} />
                          <Plus size={9} />
                        </button>

                        {/* Emoji Picker */}
                        {emojiPickerMsg === msg.id && (
                          <div className="absolute left-0 bottom-full mb-1 bg-brand-dark-light border border-brand-dark-border rounded-lg shadow-xl shadow-black/40 p-2 flex gap-1 z-50">
                            {EMOJI_OPTIONS.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => toggleReaction(msg.id, emoji)}
                                className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/[0.08] transition-colors duration-150 text-sm"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="px-5 py-3 border-t border-brand-dark-border shrink-0">
          <div className="bg-brand-dark-light border border-brand-dark-border rounded-lg flex items-end">
            <button className="p-2.5 text-gray-500 hover:text-gray-300 transition-colors duration-150">
              <Paperclip size={16} />
            </button>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                isDm && activeDm
                  ? `Message ${activeDm.name}...`
                  : `Message #${activeView.id}`
              }
              rows={1}
              className="flex-1 bg-transparent py-2.5 px-1 text-[13px] text-white placeholder-gray-600 focus:outline-none resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button className="p-2.5 text-gray-500 hover:text-gray-300 transition-colors duration-150">
              <Smile size={16} />
            </button>
            <button
              onClick={handleSend}
              className={`p-2.5 transition-colors duration-150 ${
                message.trim() ? "text-brand-green hover:text-white" : "text-gray-600"
              }`}
            >
              <Send size={16} />
            </button>
          </div>
          {isDm && (
            <p className="text-[9px] text-gray-600 mt-1 px-1">24-hour response time guaranteed from coaches</p>
          )}
        </div>
      </div>
    </div>
  );
}
