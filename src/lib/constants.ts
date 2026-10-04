import { UserRole } from "./types";
import {
  LayoutDashboard, Building2, FolderKanban, Layers, ClipboardList,
  FileText, Package, Wrench, Truck, Fuel, Settings2, Users,
  IndianRupee, ShoppingCart, CreditCard, FolderOpen, Bell,
  BarChart3, Settings, HardHat
} from "lucide-react";

export const APP_NAME = "J.K. PILE & CONSTRUCTION";
export const APP_TAGLINE = "Construction Operations Management System";
export const POWERED_BY = "Powered by Zenoflow";

// Navigation items grouped by category
export interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  roles: UserRole[];
  badge?: number;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Operations",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["owner", "admin", "project_manager", "site_supervisor", "store_keeper", "machine_operator", "accounts", "employee"] },
      { label: "Projects", href: "/projects", icon: FolderKanban, roles: ["owner", "admin", "project_manager", "site_supervisor"] },
      { label: "Piling / Work Register", href: "/piling", icon: Layers, roles: ["owner", "admin", "project_manager", "site_supervisor", "employee"] },
      { label: "Daily Site Reports", href: "/daily-reports", icon: ClipboardList, roles: ["owner", "admin", "project_manager", "site_supervisor", "employee"] },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Billing & Measurement", href: "/billing", icon: FileText, roles: ["owner", "admin", "accounts"] },
      { label: "Client & Payments", href: "/clients", icon: CreditCard, roles: ["owner", "admin", "accounts"] },
      { label: "Expenses", href: "/expenses", icon: IndianRupee, roles: ["owner", "admin", "accounts", "project_manager"] },
      { label: "Purchase & Vendors", href: "/vendors", icon: ShoppingCart, roles: ["owner", "admin", "accounts", "store_keeper"] },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Inventory & Stores", href: "/inventory", icon: Package, roles: ["owner", "admin", "store_keeper", "project_manager"] },
      { label: "Tools & Assets", href: "/tools", icon: Wrench, roles: ["owner", "admin", "store_keeper"] },
      { label: "Machinery & Fleet", href: "/machinery", icon: Truck, roles: ["owner", "admin", "project_manager", "machine_operator"] },
      { label: "Diesel / Fuel", href: "/diesel", icon: Fuel, roles: ["owner", "admin", "project_manager", "site_supervisor", "machine_operator", "employee"] },
      { label: "Maintenance", href: "/maintenance", icon: Settings2, roles: ["owner", "admin", "machine_operator"] },
      { label: "Labour & Attendance", href: "/labour", icon: HardHat, roles: ["owner", "admin", "project_manager", "site_supervisor", "employee"] },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "Documents", href: "/documents", icon: FolderOpen, roles: ["owner", "admin", "project_manager", "accounts"] },
      { label: "Notifications", href: "/notifications", icon: Bell, roles: ["owner", "admin", "project_manager", "site_supervisor", "store_keeper", "machine_operator", "accounts", "employee"] },
      { label: "Reports & Analytics", href: "/reports", icon: BarChart3, roles: ["owner", "admin", "project_manager", "accounts"] },
      { label: "Company & Users", href: "/company", icon: Building2, roles: ["owner", "admin"] },
      { label: "Settings", href: "/settings", icon: Settings, roles: ["owner", "admin"] },
    ],
  },
];

// Role-based permissions
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  owner: ["*"],
  admin: ["dashboard", "projects", "piling", "daily-reports", "billing", "clients", "expenses", "vendors", "inventory", "tools", "machinery", "diesel", "maintenance", "labour", "documents", "notifications", "reports", "company", "settings"],
  project_manager: ["dashboard", "projects", "piling", "daily-reports", "expenses", "inventory", "machinery", "diesel", "labour", "documents", "notifications", "reports"],
  site_supervisor: ["dashboard", "projects", "piling", "daily-reports", "diesel", "labour", "notifications"],
  store_keeper: ["dashboard", "inventory", "tools", "vendors", "notifications"],
  machine_operator: ["dashboard", "machinery", "diesel", "maintenance", "notifications"],
  accounts: ["dashboard", "billing", "clients", "expenses", "vendors", "documents", "notifications", "reports"],
  employee: ["dashboard", "piling", "daily-reports", "diesel", "labour", "notifications"],
};

// Demo credentials
export const DEMO_USERS = [
  { role: "owner" as UserRole, name: "Jayesh Kumar", email: "jayesh@jkpile.in", userId: "u1" },
  { role: "admin" as UserRole, name: "Priya Sharma", email: "priya@jkpile.in", userId: "u2" },
  { role: "project_manager" as UserRole, name: "Rajesh Patel", email: "rajesh@jkpile.in", userId: "u3" },
  { role: "site_supervisor" as UserRole, name: "Rahul Singh", email: "rahul@jkpile.in", userId: "u5" },
  { role: "store_keeper" as UserRole, name: "Deepak Gupta", email: "deepak@jkpile.in", userId: "u7" },
  { role: "machine_operator" as UserRole, name: "Manoj Tiwari", email: "manoj@jkpile.in", userId: "u8" },
  { role: "accounts" as UserRole, name: "Neha Joshi", email: "neha@jkpile.in", userId: "u10" },
  { role: "employee" as UserRole, name: "Ravi Kumar", email: "ravi@jkpile.in", userId: "u11" },
];

// Status color mappings
export const PROJECT_STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
  on_hold: "bg-amber-50 text-amber-700 border-amber-200",
  upcoming: "bg-slate-50 text-slate-600 border-slate-200",
};

export const PILE_STATUS_COLORS: Record<string, string> = {
  pending: "bg-slate-50 text-slate-600 border-slate-200",
  in_progress: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

export const BILL_STATUS_COLORS: Record<string, string> = {
  draft: "bg-slate-50 text-slate-600 border-slate-200",
  submitted: "bg-blue-50 text-blue-700 border-blue-200",
  partially_paid: "bg-amber-50 text-amber-700 border-amber-200",
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  overdue: "bg-red-50 text-red-700 border-red-200",
};

export const MACHINE_STATUS_COLORS: Record<string, string> = {
  working: "bg-emerald-50 text-emerald-700 border-emerald-200",
  idle: "bg-slate-50 text-slate-600 border-slate-200",
  under_maintenance: "bg-amber-50 text-amber-700 border-amber-200",
  breakdown: "bg-red-50 text-red-700 border-red-200",
};

export const ASSET_STATUS_COLORS: Record<string, string> = {
  available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  issued: "bg-blue-50 text-blue-700 border-blue-200",
  under_repair: "bg-amber-50 text-amber-700 border-amber-200",
  lost: "bg-red-50 text-red-700 border-red-200",
  damaged: "bg-orange-50 text-orange-700 border-orange-200",
};
