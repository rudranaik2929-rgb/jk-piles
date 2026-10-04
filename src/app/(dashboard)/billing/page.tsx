"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { bills, projects } from "@/lib/mock-data";
import { formatINR, formatDate } from "@/lib/utils";
import { BILL_STATUS_COLORS } from "@/lib/constants";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, IndianRupee, TrendingUp, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BillingPage() {
  const [isNewBillOpen, setIsNewBillOpen] = useState(false);

  const totalBilled = bills.reduce((sum, b) => sum + b.grossAmount, 0);
  const totalReceived = bills.reduce((sum, b) => sum + (b.grossAmount - b.outstanding), 0);
  const totalOutstanding = bills.reduce((sum, b) => sum + b.outstanding, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewBillOpen(false);
    toast.add({ title: "Success", description: "Bill created successfully.", type: "success" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={isNewBillOpen} onOpenChange={setIsNewBillOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Bill</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="project">Project</Label>
              <select id="project" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="" disabled>Select Project</option>
                <option value="p1">Metro Line 3</option>
                <option value="p2">River Bridge</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="billType">Bill Type</Label>
              <select id="billType" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="" disabled>Select Bill Type</option>
                <option value="RA">RA Bill</option>
                <option value="Final">Final Bill</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input id="amount" type="number" placeholder="Enter amount" required />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Create Bill</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Billing & Measurement"
        description="RA bills, running accounts, and measurement books"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsNewBillOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create New Bill
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText size={24} />
            </div>
            <div>
              <span className="text-sm text-slate-500">Total Billed</span>
              <p className="text-xl font-bold text-slate-900">{formatINR(totalBilled)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <span className="text-sm text-slate-500">Total Received</span>
              <p className="text-xl font-bold text-emerald-700">{formatINR(totalReceived)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle size={24} />
            </div>
            <div>
              <span className="text-sm text-slate-500">Outstanding</span>
              <p className="text-xl font-bold text-rose-600">{formatINR(totalOutstanding)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg">All Bills</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Bill No.</th>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Gross Amount</th>
                  <th className="px-6 py-4 font-medium text-right">GST</th>
                  <th className="px-6 py-4 font-medium text-right">TDS</th>
                  <th className="px-6 py-4 font-medium text-right">Net Payable</th>
                  <th className="px-6 py-4 font-medium text-right">Outstanding</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bills.map(bill => {
                  const project = projects.find(p => p.id === bill.projectId);
                  return (
                    <tr key={bill.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-blue-600">{bill.billNumber}</td>
                      <td className="px-6 py-4 text-slate-700">{project?.name || bill.projectId}</td>
                      <td className="px-6 py-4 text-slate-500">{formatDate(bill.billDate)}</td>
                      <td className="px-6 py-4 text-right font-medium">{formatINR(bill.grossAmount)}</td>
                      <td className="px-6 py-4 text-right text-slate-500">{formatINR(bill.cgst + bill.sgst)}</td>
                      <td className="px-6 py-4 text-right text-slate-500">{formatINR(bill.tds)}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">{formatINR(bill.netPayable)}</td>
                      <td className="px-6 py-4 text-right font-medium text-rose-600">{formatINR(bill.outstanding)}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={BILL_STATUS_COLORS[bill.paymentStatus] || "bg-slate-50 text-slate-600"}>
                          {bill.paymentStatus.replace("_", " ").toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col divide-y divide-slate-100">
            {bills.map(bill => {
              const project = projects.find(p => p.id === bill.projectId);
              return (
                <div key={bill.id} className="p-4 flex flex-col gap-3 active:bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-blue-600 text-lg">{bill.billNumber}</span>
                      <div className="text-sm text-slate-500 mt-0.5">{project?.name || bill.projectId}</div>
                    </div>
                    <Badge variant="outline" className={BILL_STATUS_COLORS[bill.paymentStatus] || "bg-slate-50 text-slate-600"}>
                      {bill.paymentStatus.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-400">{formatDate(bill.billDate)}</div>
                  <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg text-sm">
                    <div>
                      <span className="text-slate-500 text-xs block">Gross Amount</span>
                      <span className="font-bold text-slate-900">{formatINR(bill.grossAmount)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block">Net Payable</span>
                      <span className="font-bold text-slate-900">{formatINR(bill.netPayable)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block">GST</span>
                      <span className="font-medium text-slate-600">{formatINR(bill.cgst + bill.sgst)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block">TDS</span>
                      <span className="font-medium text-slate-600">{formatINR(bill.tds)}</span>
                    </div>
                  </div>
                  {bill.outstanding > 0 && (
                    <div className="flex items-center justify-between bg-rose-50 px-3 py-2 rounded-lg">
                      <span className="text-xs text-rose-600 font-medium">Outstanding</span>
                      <span className="font-bold text-rose-700">{formatINR(bill.outstanding)}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
