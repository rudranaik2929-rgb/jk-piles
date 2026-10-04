"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { labourAttendance, users, projects } from "@/lib/mock-data";
import { formatDate, formatINR } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, HardHat, UserCheck, UserX, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

export default function LabourPage() {
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);

  const presentToday = labourAttendance.filter(a => a.attendance === "present" || a.attendance === "half_day");
  const absentToday = labourAttendance.filter(a => a.attendance === "absent");
  const totalWages = labourAttendance.reduce((sum, a) => sum + (a.hours * 50), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAttendanceOpen(false);
    toast.add({ title: "Success", description: "Attendance marked successfully.", type: "success" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={isAttendanceOpen} onOpenChange={setIsAttendanceOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mark Attendance</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="worker">Worker</Label>
              <select id="worker" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="" disabled>Select Worker</option>
                <option value="w1">Raju Bhai</option>
                <option value="w2">Sunil Kumar</option>
                <option value="w3">Amit Singh</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Project / Site</Label>
              <select id="project" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="p1">Metro Line 3</option>
                <option value="p2">River Bridge</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select id="status" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="present">Present (Full Day)</option>
                <option value="half_day">Half Day</option>
                <option value="absent">Absent</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="overtime">Overtime (Hours)</Label>
              <Input id="overtime" type="number" placeholder="Optional" />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Mark Attendance</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Labour & Attendance"
        description="Track worker attendance, wages, and labour allocation"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAttendanceOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Mark Attendance
          </Button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center gap-3">
            <HardHat className="text-blue-600" size={24} />
            <div><span className="text-xs text-slate-500">Total Records</span><p className="text-2xl font-bold text-slate-900">{labourAttendance.length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/30 shadow-sm">
          <CardContent className="p-5 flex items-center gap-3">
            <UserCheck className="text-emerald-600" size={24} />
            <div><span className="text-xs text-emerald-600">Present</span><p className="text-2xl font-bold text-emerald-700">{presentToday.length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/30 shadow-sm">
          <CardContent className="p-5 flex items-center gap-3">
            <UserX className="text-red-600" size={24} />
            <div><span className="text-xs text-red-600">Absent</span><p className="text-2xl font-bold text-red-700">{absentToday.length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center gap-3">
            <Clock className="text-slate-500" size={24} />
            <div><span className="text-xs text-slate-500">Total Wages</span><p className="text-2xl font-bold text-slate-900">{formatINR(totalWages)}</p></div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg">Attendance Register</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Worker</th>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium text-center">Hours</th>
                  <th className="px-6 py-4 font-medium text-right">Daily Wage</th>
                  <th className="px-6 py-4 font-medium text-right">OT</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {labourAttendance.map(att => {
                  const worker = users.find(u => u.id === att.employeeId);
                  const project = projects.find(p => p.id === att.projectId);
                  return (
                    <tr key={att.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-slate-500">{formatDate(att.date)}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{att.employeeName}</td>
                      <td className="px-6 py-4 text-slate-600">{project?.name || "-"}</td>
                      <td className="px-6 py-4 text-slate-600">{worker?.designation || "-"}</td>
                      <td className="px-6 py-4 text-center font-medium">{att.hours || "-"}</td>
                      <td className="px-6 py-4 text-right font-medium">{formatINR(att.hours * 50)}</td>
                      <td className="px-6 py-4 text-right text-slate-500">{att.overtime ? `${att.overtime}h` : "-"}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={
                          att.attendance === "present" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          att.attendance === "half_day" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-red-50 text-red-700 border-red-200"
                        }>
                          {att.attendance.replace("_", " ").toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col divide-y divide-slate-100">
            {labourAttendance.map(att => {
              const worker = users.find(u => u.id === att.employeeId);
              const project = projects.find(p => p.id === att.projectId);
              return (
                <div key={att.id} className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-lg">{att.employeeName}</span>
                    <Badge variant="outline" className={
                      att.attendance === "present" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      att.attendance === "half_day" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-red-50 text-red-700 border-red-200"
                    }>
                      {att.attendance.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-500">
                    <div>{project?.name || "General"} • {worker?.designation || "Worker"}</div>
                    <div className="mt-0.5">{formatDate(att.date)}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm bg-slate-50 p-2 rounded-md">
                    <div>
                      <span className="text-slate-500 text-xs block">Hours</span>
                      <span className="font-medium">{att.hours || "-"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block">OT</span>
                      <span className="font-medium">{att.overtime ? `${att.overtime}h` : "-"}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 text-xs block">Wage</span>
                      <span className="font-bold text-emerald-700">{formatINR(att.hours * 50)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
