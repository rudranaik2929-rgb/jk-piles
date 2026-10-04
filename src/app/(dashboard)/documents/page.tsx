"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { documents, projects } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Download, Upload } from "lucide-react";
import { formatDate, exportToCSV } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";

export default function DocumentsPage() {
  const handleDownload = (doc: any) => {
    // Simulated download by exporting doc info to CSV
    exportToCSV([doc], `Document_Info_${doc.name}`);
    toast.add({ title: "Success", description: `${doc.name} downloaded successfully.`, type: "success" });
  };
  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Documents"
        description="Manage all company and project documents"
        action={
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="mr-2 h-4 w-4" /> Upload Document
          </Button>
        }
      />
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Document Name</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Size</th>
                  <th className="px-6 py-4 font-medium">Uploaded By</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-blue-500" />
                        {doc.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="capitalize">{doc.type.replace("_", " ")}</Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{doc.projectName || "General"}</td>
                    <td className="px-6 py-4 text-slate-500">{doc.fileSize}</td>
                    <td className="px-6 py-4 text-slate-600">{doc.uploadedByName}</td>
                    <td className="px-6 py-4 text-slate-500">{formatDate(doc.uploadedAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => handleDownload(doc)}>
                        <Download size={16} />
                      </Button>
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
