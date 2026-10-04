"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dieselLogs, machines } from "@/lib/mock-data";
import { formatDate, formatINR } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Fuel, Droplet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

export default function DieselPage() {
  const [isAddDieselOpen, setIsAddDieselOpen] = useState(false);

  const totalDiesel = dieselLogs.reduce((sum, d) => sum + d.dieselUsed, 0);
  const totalCost = dieselLogs.reduce((sum, d) => sum + d.totalCost, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddDieselOpen(false);
    toast.add({ title: "Success", description: "Diesel entry added successfully.", type: "success" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={isAddDieselOpen} onOpenChange={setIsAddDieselOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Diesel Entry</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required />
            </div>
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
              <Label htmlFor="quantity">Quantity (Liters)</Label>
              <Input id="quantity" type="number" step="0.1" placeholder="E.g. 50" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rate">Rate per Liter (₹)</Label>
              <Input id="rate" type="number" step="0.1" placeholder="E.g. 90.5" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="meter">Meter Reading</Label>
              <Input id="meter" type="number" placeholder="Optional" />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Add Entry</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Diesel / Fuel"
        description="Track diesel consumption across all machines and projects"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddDieselOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Diesel Entry
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Droplet size={24} /></div>
            <div><span className="text-sm text-slate-500">Total Consumed</span><p className="text-xl font-bold text-slate-900">{totalDiesel.toLocaleString()} L</p></div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600"><Fuel size={24} /></div>
            <div><span className="text-sm text-slate-500">Total Cost</span><p className="text-xl font-bold text-slate-900">{formatINR(totalCost)}</p></div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Fuel size={24} /></div>
            <div><span className="text-sm text-slate-500">Entries</span><p className="text-xl font-bold text-slate-900">{dieselLogs.length}</p></div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg">Diesel Log</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Machine</th>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium text-center">Qty (L)</th>
                  <th className="px-6 py-4 font-medium text-right">Rate</th>
                  <th className="px-6 py-4 font-medium text-right">Total Cost</th>
                  <th className="px-6 py-4 font-medium">Filled By</th>
                  <th className="px-6 py-4 font-medium text-center">Meter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dieselLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-slate-500">{formatDate(log.date)}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{log.machineName}</td>
                    <td className="px-6 py-4 text-slate-600">{log.projectName || "-"}</td>
                    <td className="px-6 py-4 text-center font-bold text-amber-700">{log.dieselUsed}</td>
                    <td className="px-6 py-4 text-right text-slate-500">₹{log.rate}/L</td>
                    <td className="px-6 py-4 text-right font-bold">{formatINR(log.totalCost)}</td>
                    <td className="px-6 py-4 text-slate-600">{log.enteredBy}</td>
                    <td className="px-6 py-4 text-center text-slate-500">{log.machineHours || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col divide-y divide-slate-100">
            {dieselLogs.map(log => (
              <div key={log.id} className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-lg">{log.machineName}</span>
                  <span className="font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md text-sm">{log.dieselUsed} L</span>
                </div>
                <div className="text-sm text-slate-500">
                  <div>{log.projectName || "General site"}</div>
                  <div className="mt-0.5">{formatDate(log.date)}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm bg-slate-50 p-2 rounded-md">
                  <div>
                    <span className="text-slate-500 text-xs block">Filled By</span>
                    <span className="font-medium">{log.enteredBy}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Meter Reading</span>
                    <span className="font-medium">{log.machineHours || "-"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Rate</span>
                    <span className="font-medium">₹{log.rate}/L</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 text-xs block">Total Cost</span>
                    <span className="font-bold text-slate-900">{formatINR(log.totalCost)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
