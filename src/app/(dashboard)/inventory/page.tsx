"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { inventoryItems, stockTransactions } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InventoryPage() {
  const [isStockEntryOpen, setIsStockEntryOpen] = useState(false);
  const lowStock = inventoryItems.filter(i => i.currentStock <= i.minimumStock);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsStockEntryOpen(false);
    toast.add({ title: "Success", description: "Stock entry saved successfully.", type: "success" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={isStockEntryOpen} onOpenChange={setIsStockEntryOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Stock Entry</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="entryType">Entry Type</Label>
              <select id="entryType" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="in">Stock In (Purchase)</option>
                <option value="out">Stock Out (Issue)</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="item">Item</Label>
              <select id="item" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="" disabled>Select Item</option>
                <option value="i1">Cement (Bags)</option>
                <option value="i2">Steel TMT (MT)</option>
                <option value="i3">Bentonite (Bags)</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" placeholder="Enter quantity" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reference">Reference / Remarks</Label>
              <Input id="reference" placeholder="PO number, issue slip, etc." />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Entry</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Inventory & Stores"
        description="Track stock levels, issue materials, and manage stores"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsStockEntryOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Stock Entry
          </Button>
        }
      />

      {lowStock.length > 0 && (
        <Card className="border-orange-200 bg-orange-50/30 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="text-orange-600 h-5 w-5 shrink-0" />
            <span className="text-sm text-orange-800">
              <strong>{lowStock.length} items</strong> are below minimum stock level and need restocking.
            </span>
          </CardContent>
        </Card>
      )}

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg">Stock Register</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Item Name</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Location</th>
                  <th className="px-6 py-4 font-medium text-center">Current Stock</th>
                  <th className="px-6 py-4 font-medium text-center">Min Level</th>
                  <th className="px-6 py-4 font-medium text-center">Unit</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inventoryItems.map(item => {
                  const isLow = item.currentStock <= item.minimumStock;
                  return (
                    <tr key={item.id} className={`hover:bg-slate-50/50 transition-colors ${isLow ? "bg-orange-50/30" : ""}`}>
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        <div className="flex items-center gap-2">
                          <Package size={16} className="text-slate-400" />
                          {item.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{item.category}</td>
                      <td className="px-6 py-4 text-slate-600">{item.location}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-bold ${isLow ? "text-orange-600" : "text-slate-900"}`}>
                          {item.currentStock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-slate-500">{item.minimumStock}</td>
                      <td className="px-6 py-4 text-center text-slate-500">{item.unit}</td>
                      <td className="px-6 py-4">
                        {isLow ? (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">LOW STOCK</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">OK</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col divide-y divide-slate-100">
            {inventoryItems.map(item => {
              const isLow = item.currentStock <= item.minimumStock;
              return (
                <div key={item.id} className={`p-4 flex flex-col gap-2.5 ${isLow ? "bg-orange-50/20" : ""}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package size={18} className="text-slate-400" />
                      <span className="font-bold text-slate-900">{item.name}</span>
                    </div>
                    {isLow ? (
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">LOW STOCK</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">OK</Badge>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">{item.category} · {item.location}</div>
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-md text-sm">
                    <div>
                      <span className="text-slate-500 text-xs block">Stock</span>
                      <span className={`font-bold ${isLow ? "text-orange-600" : "text-slate-900"}`}>{item.currentStock} {item.unit}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block">Min Level</span>
                      <span className="font-medium">{item.minimumStock} {item.unit}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block">Unit</span>
                      <span className="font-medium">{item.unit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg">Recent Stock Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Item</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium text-center">Qty</th>
                  <th className="px-6 py-4 font-medium">Issued To / Received From</th>
                  <th className="px-6 py-4 font-medium">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stockTransactions.map(txn => (
                  <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-slate-500">{formatDate(txn.date)}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{txn.itemName}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {txn.type === "stock_out" ? (
                          <ArrowUpRight size={16} className="text-rose-500" />
                        ) : (
                          <ArrowDownRight size={16} className="text-emerald-500" />
                        )}
                        <span className={txn.type === "stock_out" ? "text-rose-600" : "text-emerald-600"}>
                          {txn.type.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-bold">{txn.quantity}</td>
                    <td className="px-6 py-4 text-slate-600">{txn.employeeName || "-"}</td>
                    <td className="px-6 py-4 text-slate-500">{txn.remarks || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col divide-y divide-slate-100">
            {stockTransactions.map(txn => (
              <div key={txn.id} className="p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{txn.itemName}</span>
                  <div className="flex items-center gap-1">
                    {txn.type === "stock_out" ? (
                      <ArrowUpRight size={14} className="text-rose-500" />
                    ) : (
                      <ArrowDownRight size={14} className="text-emerald-500" />
                    )}
                    <span className={`text-xs font-semibold ${txn.type === "stock_out" ? "text-rose-600" : "text-emerald-600"}`}>
                      {txn.type === "stock_out" ? "OUT" : "IN"} · {txn.quantity}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-500">{formatDate(txn.date)}</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{txn.employeeName || "-"}</span>
                  {txn.remarks && <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">{txn.remarks}</span>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
