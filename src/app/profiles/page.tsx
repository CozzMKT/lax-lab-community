"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, X, Check } from "lucide-react";

const profiles = [
  {
    id: "parent",
    name: "John Doe",
    initials: "JD",
    color: "bg-brand-green",
    type: "Parent",
    rank: "All-Star",
    xp: 1820,
  },
  {
    id: "kid1",
    name: "John Jr.",
    initials: "JD",
    color: "bg-blue-500",
    type: "Athlete",
    rank: "Varsity",
    xp: 920,
  },
];

export default function ProfilesPage() {
  const [editing, setEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-10">
        <Image
          src="/icon-light.png"
          alt="Lax Lab"
          width={48}
          height={48}
          style={{ width: 48, height: "auto" }}
        />
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Who&apos;s training?</h1>
      <p className="text-[15px] text-gray-500 mb-10">Select a profile to continue</p>

      {/* Profiles Grid */}
      <div className="flex items-center justify-center gap-6 mb-10">
        {profiles.map((profile) => (
          <Link
            key={profile.id}
            href="/dashboard"
            className="group text-center"
          >
            <div className={`relative w-28 h-28 rounded-lg ${profile.color} flex items-center justify-center text-3xl font-bold mb-3 border-2 border-transparent group-hover:border-white transition-all duration-150 ${
              editing ? "" : "group-hover:scale-105"
            }`}
            style={{ color: profile.color === "bg-brand-green" ? "#1a1d21" : "#ffffff" }}
            >
              <span className={profile.color === "bg-brand-green" ? "text-brand-dark" : "text-white"}>
                {profile.initials}
              </span>
              {editing && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <Pencil size={24} className="text-white" />
                </div>
              )}
            </div>
            <p className="text-[15px] text-gray-400 group-hover:text-white font-medium transition-colors duration-150">
              {profile.name}
            </p>
            <p className="text-2xs text-gray-600 mt-0.5">
              {profile.type === "Parent" ? (
                <span className="text-yellow-400">{profile.rank} · {profile.xp.toLocaleString()} XP</span>
              ) : (
                <span className="text-purple-400">{profile.rank} · {profile.xp.toLocaleString()} XP</span>
              )}
            </p>
          </Link>
        ))}

        {/* Add Profile */}
        <button
          onClick={() => setShowAddModal(true)}
          className="group text-center"
        >
          <div className="w-28 h-28 rounded-lg bg-brand-dark-light border-2 border-brand-dark-border flex items-center justify-center mb-3 group-hover:border-gray-500 group-hover:scale-105 transition-all duration-150">
            <Plus size={32} className="text-gray-600 group-hover:text-gray-300 transition-colors duration-150" />
          </div>
          <p className="text-[15px] text-gray-600 group-hover:text-gray-400 font-medium transition-colors duration-150">
            Add Profile
          </p>
        </button>
      </div>

      {/* Manage Profiles */}
      <button
        onClick={() => setEditing(!editing)}
        className={`text-[13px] font-medium px-5 py-2 rounded border transition-colors duration-150 ${
          editing
            ? "bg-white text-brand-dark border-white"
            : "text-gray-400 border-gray-600 hover:text-white hover:border-white"
        }`}
      >
        {editing ? "Done" : "Manage Profiles"}
      </button>

      {/* Add Profile Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-brand-dark-light border border-brand-dark-border rounded-xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Add Profile</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-white transition-colors duration-150">
                <X size={18} />
              </button>
            </div>

            <p className="text-[13px] text-gray-500 mb-4">
              Create a profile for another athlete in your household. Each profile gets its own progress, XP, and personalized training.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-2xs font-medium text-gray-500 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Athlete name"
                  className="w-full bg-brand-dark border border-brand-dark-border rounded-lg px-3 py-2 text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-brand-green/50"
                />
              </div>

              <div>
                <label className="block text-2xs font-medium text-gray-500 mb-1">Profile Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-brand-dark border border-brand-dark-border rounded-lg p-3 text-center hover:border-brand-green/30 transition-colors duration-150">
                    <p className="text-[13px] font-medium text-white">Athlete</p>
                    <p className="text-2xs text-gray-600">For players</p>
                  </button>
                  <button className="bg-brand-dark border border-brand-dark-border rounded-lg p-3 text-center hover:border-brand-green/30 transition-colors duration-150">
                    <p className="text-[13px] font-medium text-white">Parent</p>
                    <p className="text-2xs text-gray-600">For parents</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-2xs font-medium text-gray-500 mb-1">Position</label>
                <select className="w-full bg-brand-dark border border-brand-dark-border rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-brand-green/50">
                  <option>Attack</option>
                  <option>Midfield</option>
                  <option>Defense</option>
                  <option>Goalie</option>
                  <option>FOGO</option>
                </select>
              </div>

              <div>
                <label className="block text-2xs font-medium text-gray-500 mb-1">Avatar Color</label>
                <div className="flex gap-2">
                  {["bg-brand-green", "bg-blue-500", "bg-purple-500", "bg-orange-500", "bg-red-500", "bg-yellow-500"].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-lg ${color} hover:scale-110 transition-transform duration-150`}
                    />
                  ))}
                </div>
              </div>

              <button className="w-full bg-brand-green hover:bg-brand-green-hover text-brand-dark font-bold text-[13px] py-2.5 rounded-lg transition-colors duration-150 mt-2">
                Create Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
