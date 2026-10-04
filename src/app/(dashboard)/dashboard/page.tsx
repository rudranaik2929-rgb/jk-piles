"use client";

import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  dashboardSummary, 
  projects, 
  recentActivities,
  lowStockItems 
} from "@/lib/mock-data";
import { formatINRCompact, getGreeting, formatNumber, timeAgo } from "@/lib/utils";
import { 
  FolderKanban, Layers, CheckCircle2, AlertTriangle, 
  Droplet, Users, FileText, CreditCard, Plus, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { PROJECT_STATUS_COLORS } from "@/lib/constants";

export default function DashboardPage() {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title={`${getGreeting()}, ${user.name.split(' ')[0]}`}
        description="Here's what's happening across your company today."
        action={
          <div className="flex gap-2">
            <Link href="/daily-reports" className={buttonVariants({ variant: "outline", className: "hidden sm:flex" })}>
              <Plus className="mr-2 h-4 w-4" /> Daily Report
            </Link>
            <Link href="/piling" className={buttonVariants({ className: "bg-blue-600 hover:bg-blue-700" })}>
              <Plus className="mr-2 h-4 w-4" /> Add Pile Work
            </Link>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-200 shadow-sm transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-slate-500">Active Projects</span>
                <span className="text-2xl font-bold text-slate-900">{dashboardSummary.activeProjects}</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FolderKanban size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-slate-500">Today's Piles</span>
                <span className="text-2xl font-bold text-slate-900">{dashboardSummary.todayCompletedPiles} <span className="text-sm font-normal text-slate-500">completed</span></span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-slate-500">Total Piles Pending</span>
                <span className="text-2xl font-bold text-slate-900">{formatNumber(dashboardSummary.pendingPiles)}</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Layers size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm transition-all hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-slate-500">Outstanding Payments</span>
                <span className="text-2xl font-bold text-slate-900">{formatINRCompact(dashboardSummary.outstandingPayments)}</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <CreditCard size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          
          {/* Project Performance */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">Project Performance</CardTitle>
                <CardDescription>Overview of all active projects</CardDescription>
              </div>
              <Link href="/projects" className={buttonVariants({ variant: "ghost", size: "sm", className: "text-blue-600" })}>
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-500">
                      <th className="pb-3 font-medium">Project</th>
                      <th className="pb-3 font-medium">Progress</th>
                      <th className="pb-3 font-medium text-right">Piles</th>
                      <th className="pb-3 font-medium text-right">Outstanding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.filter(p => p.status === 'active').map(project => {
                      const progress = Math.round((project.completedPiles / project.totalPiles) * 100) || 0;
                      return (
                        <tr key={project.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                          <td className="py-3">
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-900">{project.name}</span>
                              <span className="text-xs text-slate-500">{project.clientName}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                                <div 
                                  className="h-full bg-blue-600 rounded-full" 
                                  style={{ width: `${progress}%` }} 
                                />
                              </div>
                              <span className="text-xs font-medium text-slate-700">{progress}%</span>
                            </div>
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-900">{project.completedPiles} <span className="text-slate-400 font-normal">/ {project.totalPiles}</span></span>
                            </div>
                          </td>
                          <td className="py-3 text-right font-medium text-rose-600">
                            {formatINRCompact(project.outstandingAmount)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alerts */}
          {lowStockItems.length > 0 && (
            <Card className="border-orange-200 shadow-sm bg-orange-50/30">
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-lg text-orange-900">Low Stock Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {lowStockItems.slice(0, 6).map(item => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border border-orange-100 bg-white p-3 shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900">{item.name}</span>
                        <span className="text-xs text-slate-500">{item.location}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-orange-600">{item.currentStock} {item.unit}</span>
                        <span className="text-[10px] text-slate-400">Min: {item.minimumStock}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        </div>

        {/* Right Column - Sidebar */}
        <div className="flex flex-col gap-6">
          
          {/* Quick Actions */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Link href="/piling/new" className={buttonVariants({ variant: "outline", className: "h-20 flex-col gap-2 bg-white hover:bg-slate-50 hover:text-blue-700" })}>
                  <Layers className="h-5 w-5 text-blue-600" />
                  <span>Add Pile</span>
              </Link>
              <Link href="/billing/new" className={buttonVariants({ variant: "outline", className: "h-20 flex-col gap-2 bg-white hover:bg-slate-50 hover:text-emerald-700" })}>
                  <FileText className="h-5 w-5 text-emerald-600" />
                  <span>Create Bill</span>
              </Link>
              <Link href="/diesel/new" className={buttonVariants({ variant: "outline", className: "h-20 flex-col gap-2 bg-white hover:bg-slate-50 hover:text-amber-700" })}>
                  <Droplet className="h-5 w-5 text-amber-600" />
                  <span>Diesel Entry</span>
              </Link>
              <Link href="/labour/new" className={buttonVariants({ variant: "outline", className: "h-20 flex-col gap-2 bg-white hover:bg-slate-50 hover:text-indigo-700" })}>
                  <Users className="h-5 w-5 text-indigo-600" />
                  <span>Attendance</span>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-slate-200 shadow-sm flex-1">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {recentActivities.slice(0, 6).map(activity => (
                  <div key={activity.id} className="flex gap-3 relative">
                    <div className="flex flex-col items-center">
                      <div className={`mt-0.5 flex h-2 w-2 rounded-full ${
                        activity.type === 'pile' ? 'bg-emerald-500' :
                        activity.type === 'payment' ? 'bg-blue-500' :
                        activity.type === 'expense' ? 'bg-rose-500' :
                        activity.type === 'maintenance' ? 'bg-amber-500' :
                        'bg-slate-400'
                      }`} />
                      <div className="w-px h-full bg-slate-200 absolute top-3 bottom-[-16px] left-[3px] last:hidden" />
                    </div>
                    <div className="flex flex-col pb-4">
                      <p className="text-sm text-slate-700 leading-snug">{activity.message}</p>
                      <span className="text-xs text-slate-400 mt-1">{timeAgo(activity.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
