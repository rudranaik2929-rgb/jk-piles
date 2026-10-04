"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { notifications } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, CheckCircle2, Package, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Notifications"
        description="View all your alerts and updates"
        action={
          <Button variant="outline">
            Mark all as read
          </Button>
        }
      />
      <Card className="border-slate-200 shadow-sm max-w-3xl">
        <CardContent className="p-0">
          <div className="flex flex-col divide-y divide-slate-100">
            {notifications.map(notif => {
              const Icon = notif.type === "low_stock" ? Package : 
                           notif.type === "payment_received" ? CheckCircle2 : AlertCircle;
              
              return (
                <div key={notif.id} className={cn("flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors", !notif.read && "bg-blue-50/50")}>
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    notif.type === "low_stock" ? "bg-amber-100 text-amber-600" :
                    notif.type === "payment_received" ? "bg-emerald-100 text-emerald-600" :
                    "bg-blue-100 text-blue-600"
                  )}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className={cn("text-sm font-medium", !notif.read ? "text-slate-900" : "text-slate-700")}>
                      {notif.title}
                    </p>
                    <p className="text-sm text-slate-500">{notif.message}</p>
                    <p className="text-xs text-slate-400 mt-2">{new Date(notif.createdAt).toLocaleString()}</p>
                  </div>
                  {!notif.read && (
                    <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
