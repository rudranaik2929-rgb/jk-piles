"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.add({ title: "Success", description: "Project created successfully.", type: "success" });
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="New Project"
        description="Initialize a new piling project."
      />
      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input id="name" placeholder="e.g. Phase 3 Flyover" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client">Client</Label>
              <select id="client" className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm" required>
                <option value="">Select Client</option>
                <option value="1">L&T Construction</option>
                <option value="2">Tata Projects</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="totalPiles">Total Piles (Target)</Label>
                <Input id="totalPiles" type="number" placeholder="e.g. 500" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget">Estimated Budget (₹)</Label>
                <Input id="budget" type="number" placeholder="0" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Site Location</Label>
              <Input id="location" placeholder="City, State" required />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Create Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
