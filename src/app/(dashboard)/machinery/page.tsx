"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { machines } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { MACHINE_STATUS_COLORS } from "@/lib/constants";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Truck, Fuel, MapPin, Gauge } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MachineryPage() {
  const [isAddMachineOpen, setIsAddMachineOpen] = useState(false);

  const statusCounts = {
    working: machines.filter(m => m.status === "working").length,
    idle: machines.filter(m => m.status === "idle").length,
    under_maintenance: machines.filter(m => m.status === "under_maintenance").length,
    breakdown: machines.filter(m => m.status === "breakdown").length,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddMachineOpen(false);
    toast.add({ title: "Success", description: "Machine added successfully.", type: "success" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={isAddMachineOpen} onOpenChange={setIsAddMachineOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Machine</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="machineName">Machine Name / Number</Label>
              <Input id="machineName" placeholder="E.g. JCB-01" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Machine Type</Label>
              <select id="type" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="" disabled>Select Type</option>
                <option value="Rig">Piling Rig</option>
                <option value="Crane">Crane</option>
                <option value="JCB">JCB</option>
                <option value="Truck">Truck/Dumper</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="operator">Assigned Operator</Label>
              <Input id="operator" placeholder="Operator Name" />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Add Machine</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Machinery & Fleet"
        description="Monitor all piling rigs, cranes, JCBs, and vehicles"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddMachineOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Machine
          </Button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-emerald-200 bg-emerald-50/30 shadow-sm"><CardContent className="p-5 text-center"><span className="text-sm text-emerald-600">Working</span><p className="text-3xl font-bold text-emerald-700">{statusCounts.working}</p></CardContent></Card>
        <Card className="border-slate-200 shadow-sm"><CardContent className="p-5 text-center"><span className="text-sm text-slate-500">Idle</span><p className="text-3xl font-bold text-slate-600">{statusCounts.idle}</p></CardContent></Card>
        <Card className="border-amber-200 bg-amber-50/30 shadow-sm"><CardContent className="p-5 text-center"><span className="text-sm text-amber-600">Maintenance</span><p className="text-3xl font-bold text-amber-700">{statusCounts.under_maintenance}</p></CardContent></Card>
        <Card className="border-red-200 bg-red-50/30 shadow-sm"><CardContent className="p-5 text-center"><span className="text-sm text-red-600">Breakdown</span><p className="text-3xl font-bold text-red-700">{statusCounts.breakdown}</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {machines.map(machine => (
          <Card key={machine.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Truck size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{machine.name}</h3>
                    <p className="text-xs text-slate-500">{machine.registrationNumber}</p>
                  </div>
                </div>
                <Badge variant="outline" className={MACHINE_STATUS_COLORS[machine.status]}>
                  {machine.status.replace("_", " ").toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Gauge size={14} className="text-slate-400" />
                  <span>{machine.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin size={14} className="text-slate-400" />
                  <span>{machine.currentProjectName || "Yard"}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-100">
                <div>
                  <span className="text-xs text-slate-500">Operator</span>
                  <p className="text-sm font-medium text-slate-900">{machine.operatorName || "-"}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Hours</span>
                  <p className="text-sm font-medium text-slate-900">{machine.hourMeter}h</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Last Service</span>
                  <p className="text-sm font-medium text-slate-900">{machine.lastMaintenance ? formatDate(machine.lastMaintenance) : "-"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
