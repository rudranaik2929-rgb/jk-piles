"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { maintenanceRecords, machines } from "@/lib/mock-data";
import { formatINR, formatDate } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Settings2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MaintenancePage() {
  const [isLogMaintenanceOpen, setIsLogMaintenanceOpen] = useState(false);
  const pending = maintenanceRecords.filter(m => m.status === "scheduled" || m.status === "in_progress");
  const completed = maintenanceRecords.filter(m => m.status === "completed");
  const totalCost = maintenanceRecords.reduce((sum, m) => sum + m.cost, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogMaintenanceOpen(false);
    toast.add({ title: "Success", description: "Maintenance record saved successfully.", type: "success" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={isLogMaintenanceOpen} onOpenChange={setIsLogMaintenanceOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log Maintenance / Repair</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="machine">Machine</Label>
              <select id="machine" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="" disabled>Select Machine</option>
                <option value="m1">Rig 1</option>
                <option value="m2">Rig 2</option>
                <option value="m3">JCB-01</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Maintenance Type</Label>
              <select id="type" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="preventive">Preventive</option>
                <option value="repair">Repair</option>
                <option value="emergency">Emergency Breakdown</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Issue details..." required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cost">Estimated Cost (₹)</Label>
              <Input id="cost" type="number" placeholder="Enter cost" required />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Record</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Maintenance"
        description="Track machine maintenance schedules and repair logs"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsLogMaintenanceOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Log Maintenance
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-amber-200 bg-amber-50/30 shadow-sm">
          <CardContent className="p-5 flex items-center gap-3">
            <AlertTriangle className="text-amber-600" size={24} />
            <div><span className="text-sm text-amber-600">Pending / In Progress</span><p className="text-2xl font-bold text-amber-700">{pending.length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/30 shadow-sm">
          <CardContent className="p-5 flex items-center gap-3">
            <CheckCircle2 className="text-emerald-600" size={24} />
            <div><span className="text-sm text-emerald-600">Completed</span><p className="text-2xl font-bold text-emerald-700">{completed.length}</p></div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center gap-3">
            <Settings2 className="text-slate-500" size={24} />
            <div><span className="text-sm text-slate-500">Total Cost</span><p className="text-2xl font-bold text-slate-900">{formatINR(totalCost)}</p></div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Machine</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium text-right">Cost</th>
                  <th className="px-6 py-4 font-medium">Technician</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {maintenanceRecords.map(record => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{record.machineName}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={record.maintenanceType === "emergency" ? "bg-red-50 text-red-700 border-red-200" : "bg-blue-50 text-blue-700 border-blue-200"}>
                        {record.maintenanceType.replace("_", " ").toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{formatDate(record.date)}</td>
                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{record.description}</td>
                    <td className="px-6 py-4 text-right font-bold">{formatINR(record.cost)}</td>
                    <td className="px-6 py-4 text-slate-600">{record.vendor || "-"}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={
                        record.status === "completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        record.status === "in_progress" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        "bg-amber-50 text-amber-700 border-amber-200"
                      }>
                        {record.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
