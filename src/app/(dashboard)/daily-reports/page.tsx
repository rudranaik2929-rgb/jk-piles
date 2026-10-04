"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dailyReports, projects } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Users, Droplet, Wrench } from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DailyReportsPage() {
  const [isNewReportOpen, setIsNewReportOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewReportOpen(false);
    toast.add({ title: "Success", description: "Daily report created successfully.", type: "success" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={isNewReportOpen} onOpenChange={setIsNewReportOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Daily Report</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Project</Label>
              <select id="project" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" required>
                <option value="" disabled>Select Project</option>
                <option value="p1">Metro Line 3</option>
                <option value="p2">River Bridge</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="supervisor">Supervisor</Label>
              <Input id="supervisor" placeholder="Supervisor Name" required />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Create Report</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Daily Site Reports"
        description="Daily progress reports submitted by site supervisors"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsNewReportOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Daily Report
          </Button>
        }
      />

      <div className="grid gap-4">
        {dailyReports.map(report => {
          const project = projects.find(p => p.id === report.projectId);
          return (
            <Card key={report.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{formatDate(report.date)}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">
                        <Link href={`/projects/${report.projectId}`} className="text-blue-600 hover:underline">
                          {project?.name || "Unknown Project"}
                        </Link>
                        {" · "}Submitted by {report.supervisorName}
                      </p>
                    </div>
                    <Badge variant="outline" className={
                      report.status === "reviewed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      report.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-blue-50 text-blue-700 border-blue-200"
                    }>
                      {report.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        <FileText size={18} />
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block">Piles Done</span>
                        <span className="font-bold text-slate-900">{report.pilesCompleted}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                        <Users size={18} />
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block">Labour</span>
                        <span className="font-bold text-slate-900">{report.labourCount}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                        <Droplet size={18} />
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block">Diesel</span>
                        <span className="font-bold text-slate-900">{report.dieselUsed} L</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-600">
                        <Wrench size={18} />
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block">Machines</span>
                        <span className="font-bold text-slate-900">{report.machineryUsed.length}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-slate-700 mb-1">Work Completed</h5>
                    <p className="text-sm text-slate-600 bg-white border border-slate-100 p-3 rounded-lg">{report.workCompleted}</p>
                  </div>
                  {report.problems && (
                    <div>
                      <h5 className="text-sm font-medium text-red-700 mb-1">Issues / Delays</h5>
                      <p className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg">{report.problems}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
