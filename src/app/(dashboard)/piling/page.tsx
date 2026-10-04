"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { pileRecords, projects } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { PILE_STATUS_COLORS } from "@/lib/constants";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

export default function PilingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddPileOpen, setIsAddPileOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddPileOpen(false);
    toast.add({ title: "Success", description: "Pile record added successfully.", type: "success" });
  };

  const filtered = pileRecords.filter(p => {
    const matchSearch = p.pileNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.machineName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusCounts = {
    all: pileRecords.length,
    completed: pileRecords.filter(p => p.status === "completed").length,
    in_progress: pileRecords.filter(p => p.status === "in_progress").length,
    pending: pileRecords.filter(p => p.status === "pending").length,
  };

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={isAddPileOpen} onOpenChange={setIsAddPileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Pile Record</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Project</Label>
              <select id="project" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="" disabled>Select Project</option>
                <option value="p1">Metro Line 3</option>
                <option value="p2">River Bridge</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pileNumber">Pile Number</Label>
              <Input id="pileNumber" placeholder="E.g. P-124" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="depth">Depth (meters)</Label>
              <Input id="depth" type="number" step="0.1" placeholder="E.g. 15.5" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="diameter">Diameter (mm)</Label>
              <Input id="diameter" type="number" placeholder="E.g. 600" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select id="status" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="completed">Completed</option>
                <option value="drilling">Drilling</option>
                <option value="concreting">Concreting</option>
                <option value="testing">Testing</option>
              </select>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Add Record</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Piling / Work Register"
        description="Track all pile drilling work across all projects"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddPileOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Pile Record
          </Button>
        }
      />

      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(["all", "completed", "in_progress", "pending"] as const).map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-lg border p-4 text-left transition-all ${
              statusFilter === status 
                ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" 
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-sm text-slate-500 capitalize">{status.replace("_", " ")}</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">{statusCounts[status]}</p>
          </button>
        ))}
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search pile number or machine..." className="pl-9" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Pile No.</th>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-center">Depth (m)</th>
                  <th className="px-6 py-4 font-medium text-center">Dia (mm)</th>
                  <th className="px-6 py-4 font-medium">Machine</th>
                  <th className="px-6 py-4 font-medium">Operator</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.slice(0, 25).map(pile => {
                  const project = projects.find(pr => pr.id === pile.projectId);
                  return (
                    <tr key={pile.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-blue-600">{pile.pileNumber}</td>
                      <td className="px-6 py-4">
                        <Link href={`/projects/${pile.projectId}`} className="text-slate-700 hover:text-blue-600 hover:underline">
                          {project?.name || pile.projectId}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{pile.date ? formatDate(pile.date) : "-"}</td>
                      <td className="px-6 py-4 text-center font-medium">{pile.depth || "-"}</td>
                      <td className="px-6 py-4 text-center">{pile.diameter}</td>
                      <td className="px-6 py-4 text-slate-600">{pile.machineName || "-"}</td>
                      <td className="px-6 py-4 text-slate-600">{pile.operatorName || "-"}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={PILE_STATUS_COLORS[pile.status]}>
                          {pile.status.replace("_", " ")}
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
            {filtered.slice(0, 25).map(pile => {
              const project = projects.find(pr => pr.id === pile.projectId);
              return (
                <div key={pile.id} className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-600 text-lg">{pile.pileNumber}</span>
                    <Badge variant="outline" className={PILE_STATUS_COLORS[pile.status]}>
                      {pile.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <Link href={`/projects/${pile.projectId}`} className="font-medium text-slate-900 hover:text-blue-600 hover:underline">
                      {project?.name || pile.projectId}
                    </Link>
                    <div className="text-slate-500 mt-0.5">{pile.date ? formatDate(pile.date) : "No date"}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm bg-slate-50 p-2 rounded-md">
                    <div>
                      <span className="text-slate-500 text-xs block">Depth</span>
                      <span className="font-medium">{pile.depth || "-"} m</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block">Diameter</span>
                      <span className="font-medium">{pile.diameter} mm</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500 text-xs block">Machine / Operator</span>
                      <span className="font-medium">{pile.machineName || "-"} ({pile.operatorName || "-"})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
            Showing {Math.min(filtered.length, 25)} of {filtered.length} records
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
