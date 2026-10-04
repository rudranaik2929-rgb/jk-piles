"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { clients } from "@/lib/mock-data";
import { formatINR } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Phone, Mail } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ClientsPage() {
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const totalOutstanding = clients.reduce((sum, c) => sum + c.outstanding, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddClientOpen(false);
    toast.add({ title: "Success", description: "Client added successfully.", type: "success" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input id="clientName" placeholder="E.g. L&T Construction" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input id="contactPerson" placeholder="Name of point of contact" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="contact@example.com" />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Add Client</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Client & Payments"
        description="Manage client relationships and track payments"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddClientOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Client
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {clients.map(client => (
          <Card key={client.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Building2 size={22} />
                </div>
                {client.outstanding > 0 ? (
                  <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                    O/S: {formatINR(client.outstanding)}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Cleared
                  </Badge>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{client.company}</h3>
                <p className="text-sm text-slate-500">{client.name}</p>
              </div>
              <div className="flex flex-col gap-1 text-sm text-slate-500">
                <div className="flex items-center gap-2"><Phone size={14} />{client.phone}</div>
                <div className="flex items-center gap-2"><Mail size={14} />{client.email}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div>
                  <span className="text-xs text-slate-500">Total Billed</span>
                  <p className="font-semibold text-slate-900">{formatINR(client.totalBilled)}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Received</span>
                  <p className="font-semibold text-emerald-700">{formatINR(client.totalReceived)}</p>
                </div>
              </div>
              <div className="text-xs text-slate-400">GST: {client.gstNumber}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
