"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { vendors, purchaseOrders } from "@/lib/mock-data";
import { formatINR, formatDate } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart, Phone, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VendorsPage() {
  const [isNewPOOpen, setIsNewPOOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewPOOpen(false);
    toast.add({ title: "Success", description: "Purchase Order created successfully.", type: "success" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Dialog open={isNewPOOpen} onOpenChange={setIsNewPOOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Purchase Order</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="vendor">Vendor</Label>
              <select id="vendor" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required>
                <option value="" disabled>Select Vendor</option>
                <option value="v1">UltraTech Cement</option>
                <option value="v2">Jindal Steel</option>
                <option value="v3">Local Hardware</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Project (Optional)</Label>
              <select id="project" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="">None / General Inventory</option>
                <option value="p1">Metro Line 3</option>
                <option value="p2">River Bridge</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Total Amount (₹)</Label>
              <Input id="amount" type="number" placeholder="Estimated amount" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expectedDate">Expected Delivery</Label>
              <Input id="expectedDate" type="date" required />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Create PO</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Purchase & Vendors"
        description="Manage vendors, purchase orders, and material procurement"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsNewPOOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Purchase Order
          </Button>
        }
      />

      <Tabs defaultValue="vendors">
        <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent p-0 rounded-none h-auto">
          <TabsTrigger value="vendors" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent px-4 py-3">Vendors ({vendors.length})</TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none border-b-2 border-transparent px-4 py-3">Purchase Orders ({purchaseOrders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="vendors" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {vendors.map(vendor => (
              <Card key={vendor.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{vendor.name}</h3>
                      <p className="text-sm text-slate-500">{vendor.category}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-slate-500">
                    <div className="flex items-center gap-2"><Phone size={14} />{vendor.phone}</div>
                    <div className="flex items-center gap-2"><MapPin size={14} />{vendor.address}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-xs text-slate-500">Total Orders</span>
                      <p className="font-semibold text-slate-900">{formatINR(purchaseOrders.filter(po => po.vendorId === vendor.id).reduce((sum, po) => sum + po.totalAmount, 0))}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500">Outstanding</span>
                      <p className="font-semibold text-rose-600">{formatINR(vendor.outstanding)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="pt-6">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-4 font-medium">PO Number</th>
                      <th className="px-6 py-4 font-medium">Vendor</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Items</th>
                      <th className="px-6 py-4 font-medium text-right">Amount</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {purchaseOrders.map(po => (
                      <tr key={po.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-blue-600">{po.id.toUpperCase()}</td>
                        <td className="px-6 py-4 text-slate-700">{po.vendorName}</td>
                        <td className="px-6 py-4 text-slate-500">{formatDate(po.date)}</td>
                        <td className="px-6 py-4 text-slate-600">{po.items}</td>
                        <td className="px-6 py-4 text-right font-bold">{formatINR(po.totalAmount)}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={
                            po.paymentStatus === "paid" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            po.paymentStatus === "partial" ? "bg-blue-50 text-blue-700 border-blue-200" :
                            po.paymentStatus === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                            "bg-slate-50 text-slate-600 border-slate-200"
                          }>
                            {po.paymentStatus.replace("_", " ").toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Layout */}
              <div className="md:hidden flex flex-col divide-y divide-slate-100">
                {purchaseOrders.map(po => (
                  <div key={po.id} className="p-4 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-blue-600">{po.id.toUpperCase()}</span>
                        <div className="text-sm text-slate-700 font-medium mt-0.5">{po.vendorName}</div>
                      </div>
                      <Badge variant="outline" className={
                        po.paymentStatus === "paid" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        po.paymentStatus === "partial" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        po.paymentStatus === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-slate-50 text-slate-600 border-slate-200"
                      }>
                        {po.paymentStatus.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-400">{formatDate(po.date)}</div>
                    <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg">
                      <div>
                        <span className="text-xs text-slate-500 block">Items</span>
                        <span className="text-sm font-medium text-slate-700">{po.items}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500 block">Amount</span>
                        <span className="font-bold text-slate-900">{formatINR(po.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
