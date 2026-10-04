const fs = require('fs');
const path = require('path');

const paths = [
  "projects", "piling", "piling/new", "daily-reports", "billing", 
  "billing/new", "clients", "expenses", "vendors", "inventory", 
  "tools", "machinery", "diesel", "diesel/new", "maintenance", 
  "labour", "labour/new", "documents", "notifications", "reports", 
  "company", "settings"
];

const basePath = path.join(__dirname, 'src', 'app', '(dashboard)');

for (const p of paths) {
  const dirPath = path.join(basePath, p);
  fs.mkdirSync(dirPath, { recursive: true });
  
  const moduleName = p.split('/')[0].toUpperCase();
  
  const content = `"use client";

import { PageHeader } from "@/components/layout/PageHeader";

export default function Page() {
  return (
    <div>
      <PageHeader 
        title="${moduleName} MODULE"
        description="This module is currently under construction for the demo."
      />
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
        <p className="text-slate-500">Coming Soon</p>
      </div>
    </div>
  );
}
`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
}

console.log("Placeholder pages created.");
