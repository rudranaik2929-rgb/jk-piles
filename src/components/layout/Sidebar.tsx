"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { NAV_GROUPS, ROLE_PERMISSIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { HardHat } from "lucide-react";

export function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  const hasAccessToAll = userPermissions.includes("*");

  const hasAccess = (href: string) => {
    if (hasAccessToAll) return true;
    const path = href.replace("/", "");
    return userPermissions.includes(path);
  };

  return (
    <aside className={cn(
      "h-screen w-64 flex-col border-r border-slate-200 bg-white z-40",
      isMobile ? "flex" : "fixed hidden md:flex"
    )}>
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 px-6">
        <img src="/logo.svg" alt="J.K. Pile Logo" className="h-10 w-auto object-contain" />
        <span className="font-bold tracking-tight text-slate-900 leading-tight">J.K. PILE</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}>
        <nav className="flex flex-col gap-6">
          {NAV_GROUPS.map((group, i) => {
            const accessibleItems = group.items.filter(
              (item) => item.roles.includes(user.role) || hasAccess(item.href)
            );

            if (accessibleItems.length === 0) return null;

            return (
              <div key={i} className="flex flex-col gap-2">
                <span className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {group.label}
                </span>
                <div className="flex flex-col gap-1">
                  {accessibleItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                      >
                        <item.icon size={18} className={isActive ? "text-blue-600" : "text-slate-400"} />
                        {item.label}
                        {item.badge && (
                          <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-100 px-1.5 text-xs font-medium text-blue-700">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
      
      <div className="shrink-0 border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-sm font-medium text-slate-900">{user.name}</span>
            <span className="truncate text-xs text-slate-500">{user.role.replace("_", " ")}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
