"use client";

import { use } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects, pileRecords, dailyReports, bills, expenses, users } from "@/lib/mock-data";
import { formatINR, formatDate, calculatePercentage } from "@/lib/utils";
import { PROJECT_STATUS_COLORS, PILE_STATUS_COLORS } from "@/lib/constants";
import { 
  Building2, MapPin, Calendar, Users, 
  Layers, HardHat, FileText, ArrowLeft,
  CheckCircle2, Clock, AlertCircle, Plus
} from "lucide-react";
import { toast } from "@/components/ui/toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;
  const project = projects.find((p) => p.id === projectId);
  
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditProjectOpen(false);
    toast.add({ title: "Success", description: "Project updated successfully.", type: "success" });
  };

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Project Not Found</h2>
        <p className="text-slate-500 mb-6">The project you are looking for does not exist.</p>
        <Link href="/projects" className={buttonVariants()}>Back to Projects</Link>
      </div>
    );
  }

  const projectPiles = pileRecords.filter(p => p.projectId === project.id);
  const projectReports = dailyReports.filter(r => r.projectId === project.id);
  const projectBills = bills.filter(b => b.projectId === project.id);
  const projectExpenses = expenses.filter(e => e.projectId === project.id);
  
  const progress = calculatePercentage(project.completedPiles, project.totalPiles);
  const manager = users.find(u => u.id === project.assignedManager);
  const supervisor = users.find(u => u.id === project.assignedSupervisor);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <Dialog open={isEditProjectOpen} onOpenChange={setIsEditProjectOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Project Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" defaultValue={project.name} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select id="status" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" defaultValue={project.status} required>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue={project.location} required />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-2">
        <Link href="/projects" className={buttonVariants({ variant: "ghost", size: "sm", className: "text-slate-500" })}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Projects
        </Link>
      </div>
      
      <PageHeader 
        title={project.name}
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditProjectOpen(true)}>Edit Project</Button>
            <Link href="/piling/new" className={buttonVariants({ className: "bg-blue-600 hover:bg-blue-700" })}>Add Pile Work</Link>
          </div>
        }
      />

      {/* Project Snapshot Header */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-blue-900 px-6 py-8 text-white relative">
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-blue-800 to-transparent opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-4">
              <Badge className={`w-fit ${PROJECT_STATUS_COLORS[project.status]} bg-white/10 text-white border-white/20 hover:bg-white/20`}>
                {project.status.replace("_", " ").toUpperCase()}
              </Badge>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-blue-100">
                  <Building2 size={16} />
                  <span>{project.clientName}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <MapPin size={16} />
                  <span>{project.siteAddress || project.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 min-w-[250px]">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Project Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-blue-950">
                <div 
                  className="h-full bg-emerald-400 rounded-full" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <div className="flex justify-between text-xs text-blue-200">
                <span>{project.completedPiles} Completed</span>
                <span>{project.totalPiles} Total</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 bg-white">
          <div className="p-4 flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Project Value</span>
            <span className="text-lg font-bold text-slate-900">{formatINR(project.projectValue)}</span>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Billed Amount</span>
            <span className="text-lg font-bold text-blue-600">{formatINR(project.billedAmount)}</span>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Outstanding</span>
            <span className="text-lg font-bold text-rose-600">{formatINR(project.outstandingAmount)}</span>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Start Date</span>
            <span className="text-lg font-bold text-slate-700">{formatDate(project.startDate)}</span>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent p-0 rounded-none h-auto overflow-x-auto flex-nowrap">
          <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent px-4 py-3">Overview</TabsTrigger>
          <TabsTrigger value="piles" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent px-4 py-3">Pile Register</TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent px-4 py-3">Daily Reports</TabsTrigger>
          <TabsTrigger value="finance" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent px-4 py-3">Finance</TabsTrigger>
        </TabsList>
        
        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Col */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-slate-500 mb-1">Description</h4>
                    <p className="text-sm text-slate-900">{project.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 mb-1">Project Manager</h4>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-medium">{manager?.name || "Not Assigned"}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 mb-1">Site Supervisor</h4>
                      <div className="flex items-center gap-2">
                        <HardHat className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-medium">{supervisor?.name || "Not Assigned"}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Recent Piles</CardTitle>
                  <Link href={`/projects/${project.id}?tab=piles`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                    View All
                  </Link>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="px-6 py-3 font-medium text-left">Pile No.</th>
                        <th className="px-6 py-3 font-medium text-left">Date</th>
                        <th className="px-6 py-3 font-medium text-center">Depth</th>
                        <th className="px-6 py-3 font-medium text-left">Machine</th>
                        <th className="px-6 py-3 font-medium text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {projectPiles.slice(0, 5).map(pile => (
                        <tr key={pile.id}>
                          <td className="px-6 py-3 font-medium">{pile.pileNumber}</td>
                          <td className="px-6 py-3">{pile.date ? formatDate(pile.date) : '-'}</td>
                          <td className="px-6 py-3 text-center">{pile.depth ? `${pile.depth}m` : '-'}</td>
                          <td className="px-6 py-3">{pile.machineName || '-'}</td>
                          <td className="px-6 py-3">
                            <Badge variant="outline" className={PILE_STATUS_COLORS[pile.status]}>
                              {pile.status.replace("_", " ")}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            {/* Right Col */}
            <div className="flex flex-col gap-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Pile Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        <span className="font-medium text-emerald-900">Completed</span>
                      </div>
                      <span className="font-bold text-emerald-700 text-lg">{project.completedPiles}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">In Progress</span>
                      </div>
                      <span className="font-bold text-blue-700 text-lg">{project.inProgressPiles}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-slate-500" />
                        <span className="font-medium text-slate-700">Pending</span>
                      </div>
                      <span className="font-bold text-slate-700 text-lg">{project.pendingPiles}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* PILES TAB */}
        <TabsContent value="piles" className="pt-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Pile Register</CardTitle>
              <Link href="/piling/new" className={buttonVariants({ size: "sm" })}><Plus className="mr-2 h-4 w-4" /> Add Record</Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 font-medium">Pile No.</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium text-center">Depth (m)</th>
                      <th className="px-6 py-4 font-medium text-center">Dia (mm)</th>
                      <th className="px-6 py-4 font-medium">Machine</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {projectPiles.slice(0, 15).map(pile => (
                      <tr key={pile.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 font-medium text-slate-900">{pile.pileNumber}</td>
                        <td className="px-6 py-4 text-slate-500">{pile.date ? formatDate(pile.date) : '-'}</td>
                        <td className="px-6 py-4 text-center font-medium">{pile.depth || '-'}</td>
                        <td className="px-6 py-4 text-center">{pile.diameter}</td>
                        <td className="px-6 py-4 text-slate-600">{pile.machineName || '-'}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={PILE_STATUS_COLORS[pile.status]}>
                            {pile.status.replace("_", " ")}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* REPORTS TAB */}
        <TabsContent value="reports" className="pt-6">
          <div className="grid gap-4">
            {projectReports.map(report => (
              <Card key={report.id} className="border-slate-200 shadow-sm">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg text-slate-900">{formatDate(report.date)}</h4>
                      <p className="text-sm text-slate-500 mt-1">Submitted by {report.supervisorName}</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">{report.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500">Piles Completed</span>
                      <span className="font-bold text-slate-900">{report.pilesCompleted}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500">Labour Count</span>
                      <span className="font-bold text-slate-900">{report.labourCount}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500">Diesel Used</span>
                      <span className="font-bold text-slate-900">{report.dieselUsed} L</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500">Machinery</span>
                      <span className="font-bold text-slate-900">{report.machineryUsed.length}</span>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-1">Work Completed</h5>
                    <p className="text-sm text-slate-700 bg-white border border-slate-100 p-3 rounded">{report.workCompleted}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FINANCE TAB */}
        <TabsContent value="finance" className="pt-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Billing Register</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 font-medium">Bill No.</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium text-right">Gross Amount</th>
                      <th className="px-6 py-4 font-medium text-right">Net Payable</th>
                      <th className="px-6 py-4 font-medium text-right">Outstanding</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {projectBills.map(bill => (
                      <tr key={bill.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 font-medium text-slate-900">{bill.billNumber}</td>
                        <td className="px-6 py-4 text-slate-500">{formatDate(bill.billDate)}</td>
                        <td className="px-6 py-4 text-right">{formatINR(bill.grossAmount)}</td>
                        <td className="px-6 py-4 text-right font-medium">{formatINR(bill.netPayable)}</td>
                        <td className="px-6 py-4 text-right font-medium text-rose-600">{formatINR(bill.outstanding)}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={
                            bill.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            bill.paymentStatus === 'partially_paid' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }>
                            {bill.paymentStatus.replace("_", " ").toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
