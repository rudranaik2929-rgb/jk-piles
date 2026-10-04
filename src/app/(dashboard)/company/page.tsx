"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { users } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, User as UserIcon, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ROLE_LABELS } from "@/lib/types";
import { exportToCSV } from "@/lib/utils";
import { toast } from "@/components/ui/toast";

export default function CompanyPage() {
  const handleExport = () => {
    exportToCSV(users, `Employee_Directory_${new Date().toISOString().split('T')[0]}`);
    toast.add({ title: "Success", description: "Employee directory exported successfully.", type: "success" });
  };
  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Company & Users"
        description="Manage company employees and access control"
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="text-slate-600 border-slate-200 hover:bg-slate-50" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>
        }
      />
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Phone</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                        {ROLE_LABELS[user.role] || user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div>
                        <p className="font-medium">{user.department}</p>
                        <p className="text-xs text-slate-500">{user.designation}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.phone}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={user.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-600"}>
                        {user.isActive ? "Active" : "Inactive"}
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
