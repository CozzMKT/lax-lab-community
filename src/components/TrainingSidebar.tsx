"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, BookOpen } from "lucide-react";

const navItems = [
  { label: "Drill Library", href: "/drills", icon: Dumbbell },
  { label: "Programs", href: "/programs", icon: BookOpen },
];

export default function TrainingSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-48 overflow-y-auto bg-brand-dark border-r border-brand-dark-border">
      <p className="text-2xs text-gray-600 uppercase tracking-wider font-medium px-3 mb-1 mt-3">
        Training
      </p>

      <nav className="flex flex-col gap-0.5 px-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded text-[13px] font-medium transition-colors duration-150 ${
                isActive
                  ? "text-white bg-white/[0.08]"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
