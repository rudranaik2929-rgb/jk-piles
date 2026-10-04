"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { expenses, projects } from "@/lib/mock-data";
import { formatINR, formatDate } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, IndianRupee } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ExpensesPage() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.totalAmount, 0);
  const categories = [...new Set(expenses.map(e => e.category))];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddExpenseOpen(false);
    toast.add({ title: "Success", description: "Expense added successfully.", type: "success" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Project / Site</Label>
              <select id="project" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="" disabled>Select Project</option>
                <option value="p1">Metro Line 3</option>
                <option value="p2">River Bridge</option>
                <option value="office">Head Office</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <select id="category" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="" disabled>Select Category</option>
                <option value="Material">Material</option>
                <option value="Fuel">Fuel</option>
                <option value="Labour">Labour</option>
                <option value="Office">Office</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input id="amount" type="number" placeholder="Enter amount" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Brief description of the expense" required />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Add Expense</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Expenses"
        description="Track all project and company expenses"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddExpenseOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <span className="text-sm text-slate-500">Total Expenses</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">{formatINR(totalExpenses)}</p>
          </CardContent>
        </Card>
        {categories.slice(0, 3).map(cat => {
          const catTotal = expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.totalAmount, 0);
          return (
            <Card key={cat} className="border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <span className="text-sm text-slate-500 capitalize">{cat}</span>
                <p className="text-2xl font-bold text-slate-900 mt-1">{formatINR(catTotal)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium text-right">Amount</th>
                  <th className="px-6 py-4 font-medium">Approved By</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenses.map(exp => {
                  const project = projects.find(p => p.id === exp.projectId);
                  return (
                    <tr key={exp.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-slate-500">{formatDate(exp.date)}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{exp.description}</td>
                      <td className="px-6 py-4"><Badge variant="outline" className="capitalize">{exp.category}</Badge></td>
                      <td className="px-6 py-4 text-slate-600">{project?.name || "General"}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">{formatINR(exp.totalAmount)}</td>
                      <td className="px-6 py-4 text-slate-600">{exp.enteredByName || "-"}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={
                          exp.paymentStatus === "paid" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          exp.paymentStatus === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-blue-50 text-blue-700 border-blue-200"
                        }>
                          {exp.paymentStatus.toUpperCase()}
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
            {expenses.map(exp => {
              const project = projects.find(p => p.id === exp.projectId);
              return (
                <div key={exp.id} className="p-4 flex flex-col gap-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 truncate">{exp.description}</h4>
                      <div className="text-xs text-slate-500 mt-0.5">{project?.name || "General"} · {formatDate(exp.date)}</div>
                    </div>
                    <span className="font-bold text-slate-900 text-lg whitespace-nowrap">{formatINR(exp.totalAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize text-xs">{exp.category}</Badge>
                      <Badge variant="outline" className={
                        exp.paymentStatus === "paid" ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-xs" :
                        exp.paymentStatus === "pending" ? "bg-amber-50 text-amber-700 border-amber-200 text-xs" :
                        "bg-blue-50 text-blue-700 border-blue-200 text-xs"
                      }>
                        {exp.paymentStatus.toUpperCase()}
                      </Badge>
                    </div>
                    {exp.enteredByName && <span className="text-xs text-slate-400">by {exp.enteredByName}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
