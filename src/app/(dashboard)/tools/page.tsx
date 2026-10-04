"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { assets } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { ASSET_STATUS_COLORS } from "@/lib/constants";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Wrench } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ToolsPage() {
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);

  const statusCounts = {
    available: assets.filter(a => a.status === "available").length,
    issued: assets.filter(a => a.status === "issued").length,
    under_repair: assets.filter(a => a.status === "under_repair").length,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddAssetOpen(false);
    toast.add({ title: "Success", description: "Asset added successfully.", type: "success" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={isAddAssetOpen} onOpenChange={setIsAddAssetOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="assetName">Asset Name</Label>
              <Input id="assetName" placeholder="E.g. Heavy Duty Drill" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <select id="category" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="" disabled>Select Category</option>
                <option value="Tools">Tools</option>
                <option value="Equipment">Equipment</option>
                <option value="Safety">Safety Gear</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input id="serialNumber" placeholder="Optional" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Initial Status</Label>
              <select id="status" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="available">Available</option>
                <option value="issued">Issued</option>
                <option value="under_repair">Under Repair</option>
              </select>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Add Asset</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Tools & Assets"
        description="Track tools, equipment and company assets"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddAssetOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Asset
          </Button>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-emerald-200 bg-emerald-50/30 shadow-sm">
          <CardContent className="p-5 text-center">
            <span className="text-sm text-emerald-600">Available</span>
            <p className="text-3xl font-bold text-emerald-700">{statusCounts.available}</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50/30 shadow-sm">
          <CardContent className="p-5 text-center">
            <span className="text-sm text-blue-600">Issued</span>
            <p className="text-3xl font-bold text-blue-700">{statusCounts.issued}</p>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/30 shadow-sm">
          <CardContent className="p-5 text-center">
            <span className="text-sm text-amber-600">Under Repair</span>
            <p className="text-3xl font-bold text-amber-700">{statusCounts.under_repair}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Asset Name</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium text-center">Condition</th>
                  <th className="px-6 py-4 font-medium">Location</th>
                  <th className="px-6 py-4 font-medium">Assigned To</th>
                  <th className="px-6 py-4 font-medium">Issue Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assets.map(asset => (
                  <tr key={asset.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Wrench size={16} className="text-slate-400" />
                        {asset.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{asset.category}</td>
                    <td className="px-6 py-4 text-center font-medium capitalize">{asset.condition}</td>
                    <td className="px-6 py-4 text-slate-600">{asset.currentLocation}</td>
                    <td className="px-6 py-4 text-slate-600">{asset.assignedToName || "-"}</td>
                    <td className="px-6 py-4 text-slate-500">{asset.issueDate ? formatDate(asset.issueDate) : "-"}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={ASSET_STATUS_COLORS[asset.status]}>
                        {asset.status.replace("_", " ").toUpperCase()}
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
