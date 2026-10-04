"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/mock-data";
import { formatINRCompact, formatDateShort } from "@/lib/utils";
import { PROJECT_STATUS_COLORS } from "@/lib/constants";
import { Search, Plus, Filter, MoreHorizontal, Eye, Building2, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewProjectOpen(false);
    toast.add({ title: "Success", description: "Project created successfully.", type: "success" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" placeholder="E.g. Metro Line 3 Extension" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client">Client</Label>
              <select id="client" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="" disabled>Select Client</option>
                <option value="c1">L&T Construction</option>
                <option value="c2">Tata Projects</option>
                <option value="c3">Afcons Infrastructure</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="City, Area" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalPiles">Total Piles (Target)</Label>
              <Input id="totalPiles" type="number" placeholder="Enter target quantity" required />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Create Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PageHeader 
        title="Projects"
        description="Manage all construction and piling projects"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsNewProjectOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        }
      />

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search projects or clients..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => toast.add({ title: "Filters Applied", description: "Project list has been filtered.", type: "success" })}>
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Project Name</th>
                  <th className="px-6 py-4 font-medium">Client / Location</th>
                  <th className="px-6 py-4 font-medium">Progress</th>
                  <th className="px-6 py-4 font-medium text-right">Piles</th>
                  <th className="px-6 py-4 font-medium text-right">Value / Outstanding</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map((project) => {
                  const progress = Math.round((project.completedPiles / project.totalPiles) * 100) || 0;
                  
                  return (
                    <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/projects/${project.id}`} className="font-semibold text-blue-600 hover:underline">
                          {project.name}
                        </Link>
                        <div className="mt-1 text-xs text-slate-500">
                          Started: {formatDateShort(project.startDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center text-slate-700">
                            <Building2 className="mr-1.5 h-3 w-3 text-slate-400" />
                            {project.clientName}
                          </div>
                          <div className="flex items-center text-xs text-slate-500">
                            <MapPin className="mr-1.5 h-3 w-3" />
                            {project.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex w-full max-w-[150px] items-center gap-3">
                          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div 
                              className="h-full bg-blue-600 rounded-full" 
                              style={{ width: `${progress}%` }} 
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-700">{progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">{project.completedPiles}</span>
                          <span className="text-xs text-slate-500">of {project.totalPiles} total</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">{formatINRCompact(project.projectValue)}</span>
                          {project.outstandingAmount > 0 ? (
                            <span className="text-xs font-medium text-rose-600">
                              O/S: {formatINRCompact(project.outstandingAmount)}
                            </span>
                          ) : (
                            <span className="text-xs text-emerald-600">Cleared</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={PROJECT_STATUS_COLORS[project.status]}>
                          {project.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100 outline-none p-0 border-none bg-transparent">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link href={`/projects/${project.id}`} className="flex items-center w-full">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredProjects.length === 0 && (
            <div className="flex h-32 items-center justify-center text-slate-500">
              No projects found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
