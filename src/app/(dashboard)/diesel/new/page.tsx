"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function NewDieselEntryPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.add({ title: "Success", description: "Diesel entry added successfully.", type: "success" });
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Add Diesel Entry"
        description="Log diesel consumption for machinery."
      />
      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="machinery">Machinery / Vehicle</Label>
              <select id="machinery" className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm" required>
                <option value="">Select Equipment</option>
                <option value="1">Rig MAIT HR 130</option>
                <option value="2">JCB Excavator</option>
                <option value="3">Diesel Generator 125KVA</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity (Liters)</Label>
                <Input id="quantity" type="number" placeholder="e.g. 50" required step="0.1" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Total Amount (₹)</Label>
                <Input id="amount" type="number" placeholder="e.g. 4500" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date of Fill</Label>
              <Input id="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700">Save Entry</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
