"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function NewLabourAttendancePage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.add({ title: "Success", description: "Attendance recorded successfully.", type: "success" });
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Record Attendance"
        description="Mark daily attendance for site workers."
      />
      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="project">Site / Project</Label>
              <select id="project" className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm" required>
                <option value="">Select Project</option>
                <option value="1">Metro Pillar Construction</option>
                <option value="2">Highway Bridge Extension</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="supervisor">Supervisor</Label>
                <Input id="supervisor" placeholder="Supervisor Name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="skilled">Skilled Labour Count</Label>
                <Input id="skilled" type="number" defaultValue="0" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unskilled">Unskilled Labour Count</Label>
                <Input id="unskilled" type="number" defaultValue="0" required />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">Submit Attendance</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
