"use client";

import { useState } from "react";
import { MessageSquare, Search, Send, Paperclip, Smile, Phone, Video, MoreHorizontal } from "lucide-react";

const conversations = [
  { id: 1, name: "Jules Heningburg", initials: "JH", role: "Head Coach", lastMessage: "Great progress on your dodge! Keep working on that first step.", time: "2h ago", unread: 1, online: true },
  { id: 2, name: "Coach Mike", initials: "CM", role: "Assistant Coach", lastMessage: "I'll review your film tonight and send feedback", time: "5h ago", unread: 0, online: true },
  { id: 3, name: "Ryan S.", initials: "RS", lastMessage: "Yeah I'm on week 4 too! Want to compare progress?", time: "1d ago", unread: 2, online: false },
  { id: 4, name: "Alex R.", initials: "AR", lastMessage: "Thanks for the tip on the roll dodge 🔥", time: "2d ago", unread: 0, online: false },
  { id: 5, name: "Marcus T.", initials: "MT", lastMessage: "Hey! Nice to meet you in the community", time: "3d ago", unread: 0, online: true },
];

const sampleChat = [
  { id: 1, sender: "Jules Heningburg", initials: "JH", isMe: false, time: "Yesterday at 4:30 PM", content: "Hey! Saw your film review post. Your split dodge is looking way better than last month." },
  { id: 2, sender: "You", initials: "JD", isMe: true, time: "Yesterday at 4:45 PM", content: "Thanks Jules! I've been doing the drills from the 1-month program every day. The footwork section really helped." },
  { id: 3, sender: "Jules Heningburg", initials: "JH", isMe: false, time: "Yesterday at 5:00 PM", content: "Love to hear it. One thing I noticed — your first step on the split dodge is still a bit wide. Try keeping it tighter, more under your body. That'll help you stay balanced and accelerate through the dodge." },
  { id: 4, sender: "You", initials: "JD", isMe: true, time: "Yesterday at 5:15 PM", content: "That makes a lot of sense. I feel like I'm losing speed right at the switch sometimes. I'll film it again tonight with the tighter first step." },
  { id: 5, sender: "Jules Heningburg", initials: "JH", isMe: false, time: "Today at 10:00 AM", content: "Great progress on your dodge! Keep working on that first step. Send me another clip when you get a chance and I'll give you more feedback. Also don't forget — live call on April 1st, I'm going deep on 1v1 situations which will be perfect for what you're working on." },
];

export default function MessagesPage() {
  const [selectedConvo, setSelectedConvo] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-full pt-16">
      {/* Conversations List */}
      <div className="w-68 border-r border-brand-dark-border bg-brand-dark shrink-0 flex flex-col" style={{ width: 272 }}>
        <div className="p-3.5 border-b border-brand-dark-border">
          <div className="flex items-center gap-2 mb-2.5">
            <MessageSquare size={14} className="text-brand-green" />
            <h2 className="font-semibold text-white text-[13px]">Messages</h2>
          </div>
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-brand-dark-light border border-brand-dark-border rounded pl-7 pr-3 py-1.5 text-2xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-brand-green/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((convo, i) => (
            <button
              key={convo.id}
              onClick={() => setSelectedConvo(i)}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left transition-colors duration-150 ${
                selectedConvo === i
                  ? "bg-white/[0.06]"
                  : "hover:bg-white/[0.03]"
              }`}
            >
              <div className="relative shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-2xs font-bold ${
                    convo.role
                      ? "bg-brand-green text-brand-dark"
                      : "bg-brand-dark-light text-gray-300"
                  }`}
                >
                  {convo.initials}
                </div>
                {convo.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-green rounded-full border-2 border-brand-dark" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-white truncate">
                    {convo.name}
                  </span>
                  <span className="text-[9px] text-gray-600 shrink-0">{convo.time}</span>
                </div>
                <p className="text-2xs text-gray-500 truncate mt-0.5">{convo.lastMessage}</p>
              </div>
              {convo.unread > 0 && (
                <span className="bg-brand-green text-brand-dark text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shrink-0">
                  {convo.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="px-5 h-12 border-b border-brand-dark-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center text-brand-dark text-2xs font-bold">
                {conversations[selectedConvo].initials}
              </div>
              {conversations[selectedConvo].online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-brand-green rounded-full border-2 border-brand-dark-light" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white text-[13px] leading-tight">
                {conversations[selectedConvo].name}
              </h3>
              <p className="text-2xs text-gray-600">
                {conversations[selectedConvo].online ? "Online" : "Offline"}{" "}
                {conversations[selectedConvo].role && `· ${conversations[selectedConvo].role}`}
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
            <button className="p-1.5 text-gray-500 hover:text-white rounded hover:bg-white/[0.06] transition-colors duration-150">
              <MoreHorizontal size={14} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
          {sampleChat.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.isMe ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-2xs font-bold ${
                  msg.isMe
                    ? "bg-brand-dark-light text-gray-300"
                    : "bg-brand-green text-brand-dark"
                }`}
              >
                {msg.initials}
              </div>
              <div className={`max-w-md ${msg.isMe ? "text-right" : ""}`}>
                <div className={`flex items-center gap-1.5 mb-0.5 ${msg.isMe ? "justify-end" : ""}`}>
                  <span className="text-2xs font-medium text-gray-500">{msg.sender}</span>
                  <span className="text-[9px] text-gray-600">{msg.time}</span>
                </div>
                <div
                  className={`inline-block rounded-xl px-3.5 py-2 text-[13px] leading-relaxed ${
                    msg.isMe
                      ? "bg-brand-green text-brand-dark rounded-tr-sm"
                      : "bg-brand-dark-light border border-brand-dark-border text-gray-200 rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-5 py-3 border-t border-brand-dark-border">
          <div className="bg-brand-dark-light border border-brand-dark-border rounded-lg flex items-end">
            <button className="p-2.5 text-gray-500 hover:text-gray-300 transition-colors duration-150">
              <Paperclip size={16} />
            </button>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message ${conversations[selectedConvo].name}...`}
              rows={1}
              className="flex-1 bg-transparent py-2.5 px-1 text-[13px] text-white placeholder-gray-600 focus:outline-none resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  setMessage("");
                }
              }}
            />
            <button className="p-2.5 text-gray-500 hover:text-gray-300 transition-colors duration-150">
              <Smile size={16} />
            </button>
            <button
              className={`p-2.5 transition-colors duration-150 ${
                message.trim()
                  ? "text-brand-green hover:text-brand-green-hover"
                  : "text-gray-600"
              }`}
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-[9px] text-gray-600 mt-1 px-1">
            24-hour response time guaranteed from coaches
          </p>
        </div>
      </div>
    </div>
  );
}
