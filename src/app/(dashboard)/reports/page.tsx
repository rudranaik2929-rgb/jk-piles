"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";
import { exportToCSV } from "@/lib/utils";
import { dailyReports, expenses, projects, bills } from "@/lib/mock-data";
import { toast } from "@/components/ui/toast";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

const revenueData = [
  { name: 'Jan', revenue: 40, expenses: 24 },
  { name: 'Feb', revenue: 30, expenses: 13 },
  { name: 'Mar', revenue: 45, expenses: 28 },
  { name: 'Apr', revenue: 27, expenses: 39 },
  { name: 'May', revenue: 58, expenses: 48 },
  { name: 'Jun', revenue: 63, expenses: 38 },
  { name: 'Jul', revenue: 74, expenses: 43 },
];

const projectData = [
  { name: 'Completed', value: 12 },
  { name: 'In Progress', value: 3 },
  { name: 'On Hold', value: 1 },
];
const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

export default function ReportsPage() {
  const handleExport = (type: "daily" | "financial") => {
    if (type === "daily") {
      exportToCSV(dailyReports, `Daily_Reports_${new Date().toISOString().split('T')[0]}`);
      toast.add({ title: "Success", description: "Daily reports exported successfully.", type: "success" });
    } else {
      exportToCSV(expenses, `Expenses_Report_${new Date().toISOString().split('T')[0]}`);
      toast.add({ title: "Success", description: "Financial reports exported successfully.", type: "success" });
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Reports & Analytics"
        description="Comprehensive overview of company performance"
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => handleExport("daily")}>
              <Download className="mr-2 h-4 w-4" /> Daily Report CSV
            </Button>
            <Button variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50" onClick={() => handleExport("financial")}>
              <Download className="mr-2 h-4 w-4" /> Financials CSV
            </Button>
          </div>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
              <h4 className="text-2xl font-bold text-slate-900">₹4.2 Cr</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Active Projects</p>
              <h4 className="text-2xl font-bold text-slate-900">3</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
              <BarChart3 size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Piles Completed</p>
              <h4 className="text-2xl font-bold text-slate-900">245</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
              <PieChart size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Equipment Utilization</p>
              <h4 className="text-2xl font-bold text-slate-900">82%</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Revenue vs Expenses (YTD in Lakhs)</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-4 pb-10">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={revenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Project Completion Status</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-4 pb-10">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={projectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
