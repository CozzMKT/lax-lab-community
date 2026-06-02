"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
  LogOut,
  Camera,
  Check,
  ChevronRight,
} from "lucide-react";

const tabs = [
  { id: "profile", name: "Profile", icon: User },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "subscription", name: "Subscription", icon: CreditCard },
  { id: "privacy", name: "Privacy", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex h-full pt-16">
      {/* Settings Sidebar */}
      <div className="w-52 border-r border-brand-dark-border bg-brand-dark shrink-0">
        <div className="p-3.5 border-b border-brand-dark-border">
          <div className="flex items-center gap-2">
            <Settings size={14} className="text-brand-green" />
            <h2 className="font-semibold text-white text-[13px]">Settings</h2>
          </div>
        </div>
        <div className="p-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2 px-2.5 py-[5px] rounded text-[13px] transition-colors duration-150 ${
                activeTab === tab.id
                  ? "bg-white/[0.06] text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]"
              }`}
            >
              <tab.icon size={14} className={activeTab === tab.id ? "text-brand-green" : ""} />
              {tab.name}
            </button>
          ))}

          <div className="border-t border-brand-dark-border mt-2.5 pt-2.5">
            <button className="w-full flex items-center gap-2 px-2.5 py-[5px] rounded text-[13px] text-red-400 hover:bg-red-400/10 transition-colors duration-150">
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "profile" && (
          <div className="max-w-2xl px-6 py-5 space-y-5">
            <div>
              <h1 className="text-sm font-bold text-white mb-0.5">Profile Settings</h1>
              <p className="text-[13px] text-gray-500">Manage your profile information</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-brand-green flex items-center justify-center text-brand-dark text-xl font-bold">
                  JD
                </div>
                <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-brand-dark-light border border-brand-dark-border flex items-center justify-center hover:bg-white/[0.06] transition-colors duration-150">
                  <Camera size={10} className="text-gray-400" />
                </button>
              </div>
              <div>
                <p className="text-[13px] font-medium text-white">John Doe</p>
                <p className="text-2xs text-gray-600">Elite Member since March 2026</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-2xs font-medium text-gray-500 mb-1">First Name</label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full bg-brand-dark-light border border-brand-dark-border rounded px-3 py-1.5 text-[13px] text-white focus:outline-none focus:border-brand-green/50"
                  />
                </div>
                <div>
                  <label className="block text-2xs font-medium text-gray-500 mb-1">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full bg-brand-dark-light border border-brand-dark-border rounded px-3 py-1.5 text-[13px] text-white focus:outline-none focus:border-brand-green/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-2xs font-medium text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full bg-brand-dark-light border border-brand-dark-border rounded px-3 py-1.5 text-[13px] text-white focus:outline-none focus:border-brand-green/50"
                />
              </div>

              <div>
                <label className="block text-2xs font-medium text-gray-500 mb-1">Position</label>
                <select className="w-full bg-brand-dark-light border border-brand-dark-border rounded px-3 py-1.5 text-[13px] text-white focus:outline-none focus:border-brand-green/50">
                  <option>Attack</option>
                  <option>Midfield</option>
                  <option>Defense</option>
                  <option>Goalie</option>
                  <option>FOGO</option>
                </select>
              </div>

              <div>
                <label className="block text-2xs font-medium text-gray-500 mb-1">Graduation Year</label>
                <select className="w-full bg-brand-dark-light border border-brand-dark-border rounded px-3 py-1.5 text-[13px] text-white focus:outline-none focus:border-brand-green/50">
                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>
                  <option>2029</option>
                  <option>2030</option>
                </select>
              </div>

              <div>
                <label className="block text-2xs font-medium text-gray-500 mb-1">Bio</label>
                <textarea
                  rows={3}
                  defaultValue="Junior attackman from NJ. Working to play D1 lacrosse."
                  className="w-full bg-brand-dark-light border border-brand-dark-border rounded px-3 py-1.5 text-[13px] text-white focus:outline-none focus:border-brand-green/50 resize-none"
                />
              </div>
            </div>

            <button className="bg-brand-green hover:bg-brand-green-hover text-brand-dark font-semibold text-[13px] px-4 py-2 rounded-lg transition-colors duration-150">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="max-w-2xl px-6 py-5 space-y-5">
            <div>
              <h1 className="text-sm font-bold text-white mb-0.5">Notification Settings</h1>
              <p className="text-[13px] text-gray-500">Control how you receive notifications</p>
            </div>

            <div className="space-y-2">
              {[
                { title: "Live coaching call reminders", desc: "Get notified 30 min before each webinar", enabled: true },
                { title: "New drill uploads", desc: "When a new drill is added to the library", enabled: true },
                { title: "Drill of the Week", desc: "Weekly featured drill from Jules", enabled: true },
                { title: "Direct messages", desc: "When someone sends you a message", enabled: true },
                { title: "Channel mentions", desc: "When someone mentions you in a channel", enabled: true },
                { title: "Community announcements", desc: "Important updates from the Lax Lab team", enabled: true },
                { title: "Challenge reminders", desc: "Weekly challenge updates", enabled: false },
              ].map((notif, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-brand-dark-light border border-brand-dark-border rounded-lg p-3.5"
                >
                  <div>
                    <h3 className="text-[13px] font-medium text-white">{notif.title}</h3>
                    <p className="text-2xs text-gray-600 mt-0.5">{notif.desc}</p>
                  </div>
                  <button
                    className={`w-9 h-5 rounded-full transition-colors duration-150 relative ${
                      notif.enabled ? "bg-brand-green" : "bg-brand-dark-border"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-150 ${
                        notif.enabled ? "left-[18px]" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "subscription" && (
          <div className="max-w-2xl px-6 py-5 space-y-5">
            <div>
              <h1 className="text-sm font-bold text-white mb-0.5">Subscription</h1>
              <p className="text-[13px] text-gray-500">Manage your Lax Lab membership</p>
            </div>

            <div className="bg-brand-dark-light border border-brand-green/20 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-[13px]">Elite Digital Coaching</h3>
                    <span className="text-[9px] bg-brand-green/10 text-brand-green px-1.5 py-0.5 rounded font-medium">
                      Active
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-500 mt-0.5">$149/month</p>
                </div>
              </div>

              <div className="space-y-1.5 mb-3">
                {[
                  "Access to ALL digital programs",
                  "Full drill library (50+ drills)",
                  "D1 Recruiting Roadmap included",
                  "Biweekly live coaching calls",
                  "Private community access",
                  "24-hour coach response time",
                  "5-10% off in-person camps",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Check size={12} className="text-brand-green shrink-0" />
                    <span className="text-[13px] text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-dark-border pt-3 flex items-center justify-between">
                <div>
                  <p className="text-2xs text-gray-600">Next billing date</p>
                  <p className="text-[13px] text-white font-medium">April 18, 2026</p>
                </div>
                <button className="text-2xs text-gray-500 hover:text-gray-300 transition-colors duration-150">
                  Manage Billing
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="max-w-2xl px-6 py-5 space-y-5">
            <div>
              <h1 className="text-sm font-bold text-white mb-0.5">Privacy Settings</h1>
              <p className="text-[13px] text-gray-500">Control your privacy preferences</p>
            </div>

            <div className="space-y-2">
              {[
                { title: "Show online status", desc: "Let others see when you're online", enabled: true },
                { title: "Allow direct messages", desc: "Let community members message you", enabled: true },
                { title: "Show profile in member directory", desc: "Let others find you in the community", enabled: true },
                { title: "Show progress publicly", desc: "Share your program progress with the community", enabled: false },
              ].map((setting, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-brand-dark-light border border-brand-dark-border rounded-lg p-3.5"
                >
                  <div>
                    <h3 className="text-[13px] font-medium text-white">{setting.title}</h3>
                    <p className="text-2xs text-gray-600 mt-0.5">{setting.desc}</p>
                  </div>
                  <button
                    className={`w-9 h-5 rounded-full transition-colors duration-150 relative ${
                      setting.enabled ? "bg-brand-green" : "bg-brand-dark-border"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-150 ${
                        setting.enabled ? "left-[18px]" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-dark-border pt-5">
              <h3 className="text-[13px] font-medium text-white mb-0.5">Change Password</h3>
              <p className="text-2xs text-gray-600 mb-2.5">Update your account password</p>
              <div className="space-y-2 max-w-sm">
                <input
                  type="password"
                  placeholder="Current password"
                  className="w-full bg-brand-dark-light border border-brand-dark-border rounded px-3 py-1.5 text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-brand-green/50"
                />
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full bg-brand-dark-light border border-brand-dark-border rounded px-3 py-1.5 text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-brand-green/50"
                />
                <button className="bg-brand-green hover:bg-brand-green-hover text-brand-dark font-semibold text-[13px] px-4 py-2 rounded-lg transition-colors duration-150">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
