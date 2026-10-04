"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function NewBillPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.add({ title: "Success", description: "Bill created successfully.", type: "success" });
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Create New Bill"
        description="Generate an invoice for clients based on completed work."
      />
      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="client">Client</Label>
              <select id="client" className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm" required>
                <option value="">Select Client</option>
                <option value="1">L&T Construction</option>
                <option value="2">Tata Projects</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Project</Label>
              <select id="project" className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm" required>
                <option value="">Select Project</option>
                <option value="1">Metro Pillar Construction</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input id="amount" type="number" placeholder="0.00" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Invoice Date</Label>
                <Input id="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <textarea id="desc" className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm" placeholder="Details of piling work completed..." required></textarea>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">Generate Invoice</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
