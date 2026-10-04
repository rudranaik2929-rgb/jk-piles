import {
  User, Project, PileRecord, DailyReport, Bill, Payment,
  InventoryItem, StockTransaction, Asset, Machine, DieselLog,
  MaintenanceRecord, LabourAttendance, Expense, Vendor, PurchaseOrder,
  Client, Notification, Activity, Document,
} from "./types";

// ===== USERS =====
export const users: User[] = [
  { id: "u1", name: "Jayesh Kumar", email: "jayesh@jkpile.in", phone: "9876543210", role: "owner", department: "Management", designation: "Owner & MD", isActive: true, joinDate: "2015-01-01", assignedProjects: [] },
  { id: "u2", name: "Priya Sharma", email: "priya@jkpile.in", phone: "9876543211", role: "admin", department: "Administration", designation: "Office Admin", isActive: true, joinDate: "2018-03-15", assignedProjects: [] },
  { id: "u3", name: "Rajesh Patel", email: "rajesh@jkpile.in", phone: "9876543212", role: "project_manager", department: "Projects", designation: "Senior Project Manager", isActive: true, joinDate: "2019-06-01", assignedProjects: ["p1", "p2"] },
  { id: "u4", name: "Suresh Yadav", email: "suresh@jkpile.in", phone: "9876543213", role: "project_manager", department: "Projects", designation: "Project Manager", isActive: true, joinDate: "2020-02-10", assignedProjects: ["p3", "p4"] },
  { id: "u5", name: "Rahul Singh", email: "rahul@jkpile.in", phone: "9876543214", role: "site_supervisor", department: "Site Operations", designation: "Site Supervisor", isActive: true, joinDate: "2020-08-20", assignedProjects: ["p1"] },
  { id: "u6", name: "Amit Verma", email: "amit@jkpile.in", phone: "9876543215", role: "site_supervisor", department: "Site Operations", designation: "Site Supervisor", isActive: true, joinDate: "2021-01-05", assignedProjects: ["p2"] },
  { id: "u7", name: "Deepak Gupta", email: "deepak@jkpile.in", phone: "9876543216", role: "store_keeper", department: "Stores", designation: "Store In-charge", isActive: true, joinDate: "2019-11-15", assignedProjects: [] },
  { id: "u8", name: "Manoj Tiwari", email: "manoj@jkpile.in", phone: "9876543217", role: "machine_operator", department: "Operations", designation: "Senior Operator", isActive: true, joinDate: "2018-07-20", assignedProjects: ["p1"] },
  { id: "u9", name: "Vikram Chauhan", email: "vikram@jkpile.in", phone: "9876543218", role: "machine_operator", department: "Operations", designation: "Operator", isActive: true, joinDate: "2020-04-12", assignedProjects: ["p2"] },
  { id: "u10", name: "Neha Joshi", email: "neha@jkpile.in", phone: "9876543219", role: "accounts", department: "Finance", designation: "Accounts Manager", isActive: true, joinDate: "2019-09-01", assignedProjects: [] },
  { id: "u11", name: "Ravi Kumar", email: "ravi@jkpile.in", phone: "9876543220", role: "employee", department: "Site Operations", designation: "Helper", isActive: true, joinDate: "2021-06-10", assignedProjects: ["p1"] },
  { id: "u12", name: "Sanjay Mishra", email: "sanjay@jkpile.in", phone: "9876543221", role: "employee", department: "Site Operations", designation: "Welder", isActive: true, joinDate: "2021-03-18", assignedProjects: ["p2"] },
  { id: "u13", name: "Dinesh Rawat", email: "dinesh@jkpile.in", phone: "9876543222", role: "site_supervisor", department: "Site Operations", designation: "Site Supervisor", isActive: true, joinDate: "2021-09-01", assignedProjects: ["p3"] },
  { id: "u14", name: "Arun Pandey", email: "arun@jkpile.in", phone: "9876543223", role: "machine_operator", department: "Operations", designation: "Crane Operator", isActive: true, joinDate: "2020-12-01", assignedProjects: ["p3"] },
  { id: "u15", name: "Kiran Desai", email: "kiran@jkpile.in", phone: "9876543224", role: "employee", department: "Site Operations", designation: "Fitter", isActive: true, joinDate: "2022-01-15", assignedProjects: ["p1"] },
  { id: "u16", name: "Mohan Reddy", email: "mohan@jkpile.in", phone: "9876543225", role: "employee", department: "Site Operations", designation: "Mason", isActive: true, joinDate: "2022-04-01", assignedProjects: ["p2"] },
  { id: "u17", name: "Prakash Jha", email: "prakash@jkpile.in", phone: "9876543226", role: "employee", department: "Transport", designation: "Driver", isActive: true, joinDate: "2021-08-10", assignedProjects: [] },
  { id: "u18", name: "Santosh Dubey", email: "santosh@jkpile.in", phone: "9876543227", role: "employee", department: "Site Operations", designation: "Rigger", isActive: true, joinDate: "2022-02-20", assignedProjects: ["p3"] },
];

// ===== CLIENTS =====
export const clients: Client[] = [
  { id: "c1", name: "Ashok Mehta", company: "ABC Infra Pvt. Ltd.", phone: "9898765432", email: "ashok@abcinfra.com", address: "Plot 12, Industrial Area, Ahmedabad, Gujarat", gstNumber: "24AABCA1234F1Z5", projects: ["p1"], totalBilled: 4250000, totalReceived: 2750000, outstanding: 1500000 },
  { id: "c2", name: "Ramesh Agarwal", company: "National Highway Authority", phone: "9898765433", email: "ramesh@nhai.gov.in", address: "NH Office, Sector 7, Gandhinagar, Gujarat", gstNumber: "24AABCN5678G2Z8", projects: ["p2"], totalBilled: 8750000, totalReceived: 6200000, outstanding: 2550000 },
  { id: "c3", name: "Sunil Jain", company: "Metro Rail Corporation", phone: "9898765434", email: "sunil@metrorail.in", address: "Metro Bhawan, Ring Road, Surat, Gujarat", gstNumber: "24AABCM9012H3Z1", projects: ["p3"], totalBilled: 12500000, totalReceived: 9500000, outstanding: 3000000 },
  { id: "c4", name: "Vijay Deshmukh", company: "Sunrise Developers", phone: "9898765435", email: "vijay@sunrise.in", address: "Tower B, Business Park, Vadodara, Gujarat", gstNumber: "24AABCS3456I4Z4", projects: ["p4"], totalBilled: 0, totalReceived: 0, outstanding: 0 },
];

// ===== PROJECTS =====
export const projects: Project[] = [
  {
    id: "p1", name: "ABC Infra - Flyover Foundation", clientId: "c1", clientName: "ABC Infra Pvt. Ltd.",
    location: "NH-48, Ahmedabad", startDate: "2026-03-15", endDate: "2026-12-31",
    totalPiles: 120, completedPiles: 78, pendingPiles: 38, inProgressPiles: 4,
    projectValue: 7500000, billedAmount: 4250000, receivedAmount: 2750000, outstandingAmount: 1500000,
    status: "active", description: "Foundation piling work for flyover at NH-48 junction",
    siteAddress: "NH-48 Junction, near Sanand Toll Plaza, Ahmedabad",
    assignedManager: "u3", assignedSupervisor: "u5",
  },
  {
    id: "p2", name: "NHAI Highway Bridge Piling", clientId: "c2", clientName: "National Highway Authority",
    location: "NH-8, Vadodara", startDate: "2026-01-10", endDate: "2026-09-30",
    totalPiles: 200, completedPiles: 165, pendingPiles: 30, inProgressPiles: 5,
    projectValue: 15000000, billedAmount: 8750000, receivedAmount: 6200000, outstandingAmount: 2550000,
    status: "active", description: "Bridge foundation piling work on NH-8 highway expansion",
    siteAddress: "NH-8 Bridge Site, Vadodara-Ahmedabad Expressway",
    assignedManager: "u3", assignedSupervisor: "u6",
  },
  {
    id: "p3", name: "Metro Station Foundation", clientId: "c3", clientName: "Metro Rail Corporation",
    location: "Ring Road, Surat", startDate: "2026-06-01", endDate: "2027-06-30",
    totalPiles: 350, completedPiles: 142, pendingPiles: 200, inProgressPiles: 8,
    projectValue: 25000000, billedAmount: 12500000, receivedAmount: 9500000, outstandingAmount: 3000000,
    status: "active", description: "Foundation piling for 3 metro stations on Ring Road corridor",
    siteAddress: "Metro Station Sites, Ring Road, Surat",
    assignedManager: "u4", assignedSupervisor: "u13",
  },
  {
    id: "p4", name: "Sunrise Tower Foundation", clientId: "c4", clientName: "Sunrise Developers",
    location: "Business Park, Vadodara", startDate: "2026-11-01",
    totalPiles: 80, completedPiles: 0, pendingPiles: 80, inProgressPiles: 0,
    projectValue: 6000000, billedAmount: 0, receivedAmount: 0, outstandingAmount: 0,
    status: "upcoming", description: "Foundation piling for 20-story commercial tower",
    siteAddress: "Plot 45, Business Park Phase 2, Vadodara",
    assignedManager: "u4",
  },
];

// ===== PILE RECORDS =====
function generatePileRecords(): PileRecord[] {
  const piles: PileRecord[] = [];
  const projectConfigs = [
    { projectId: "p1", projectName: "ABC Infra - Flyover Foundation", completed: 78, inProgress: 4, total: 120, machineId: "m1", machineName: "Piling Rig #01", operatorId: "u8", operatorName: "Manoj Tiwari", supervisor: "u5", supervisorName: "Rahul Singh" },
    { projectId: "p2", projectName: "NHAI Highway Bridge Piling", completed: 165, inProgress: 5, total: 200, machineId: "m2", machineName: "Piling Rig #02", operatorId: "u9", operatorName: "Vikram Chauhan", supervisor: "u6", supervisorName: "Amit Verma" },
    { projectId: "p3", projectName: "Metro Station Foundation", completed: 142, inProgress: 8, total: 350, machineId: "m1", machineName: "Piling Rig #01", operatorId: "u14", operatorName: "Arun Pandey", supervisor: "u13", supervisorName: "Dinesh Rawat" },
  ];

  let idCounter = 1;
  const today = new Date("2026-10-03");

  for (const config of projectConfigs) {
    // Completed piles
    for (let i = 1; i <= config.completed; i++) {
      const daysAgo = Math.floor(Math.random() * 180) + 1;
      const date = new Date(today);
      date.setDate(date.getDate() - daysAgo);
      const depth = 10 + Math.floor(Math.random() * 15);
      const diameter = [400, 500, 600, 800, 1000][Math.floor(Math.random() * 5)];

      piles.push({
        id: `pile-${idCounter++}`,
        pileNumber: `${config.projectId.toUpperCase()}-P${String(i).padStart(3, "0")}`,
        projectId: config.projectId,
        projectName: config.projectName,
        date: date.toISOString().split("T")[0],
        status: "completed",
        depth, diameter,
        machineId: config.machineId,
        machineName: config.machineName,
        operatorId: config.operatorId,
        operatorName: config.operatorName,
        startTime: "08:00", endTime: "14:30",
        remarks: i % 10 === 0 ? "Hard strata encountered" : undefined,
        enteredBy: config.supervisor,
        enteredByName: config.supervisorName,
        createdAt: date.toISOString(),
      });
    }

    // In-progress piles
    for (let i = config.completed + 1; i <= config.completed + config.inProgress; i++) {
      piles.push({
        id: `pile-${idCounter++}`,
        pileNumber: `${config.projectId.toUpperCase()}-P${String(i).padStart(3, "0")}`,
        projectId: config.projectId,
        projectName: config.projectName,
        date: today.toISOString().split("T")[0],
        status: "in_progress",
        depth: 10 + Math.floor(Math.random() * 15),
        diameter: [400, 500, 600, 800][Math.floor(Math.random() * 4)],
        machineId: config.machineId,
        machineName: config.machineName,
        operatorId: config.operatorId,
        operatorName: config.operatorName,
        startTime: "07:30",
        enteredBy: config.supervisor,
        enteredByName: config.supervisorName,
        createdAt: today.toISOString(),
      });
    }

    // Pending piles
    for (let i = config.completed + config.inProgress + 1; i <= config.total; i++) {
      piles.push({
        id: `pile-${idCounter++}`,
        pileNumber: `${config.projectId.toUpperCase()}-P${String(i).padStart(3, "0")}`,
        projectId: config.projectId,
        projectName: config.projectName,
        date: "",
        status: "pending",
        depth: 0,
        diameter: [400, 500, 600, 800][Math.floor(Math.random() * 4)],
        enteredBy: config.supervisor,
        enteredByName: config.supervisorName,
        createdAt: today.toISOString(),
      });
    }
  }

  return piles;
}

export const pileRecords: PileRecord[] = generatePileRecords();

// Recent piles for dashboard (last 20 completed ones)
export const recentPiles = pileRecords
  .filter(p => p.status === "completed")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 20);

// Today's completed piles
export const todayPiles = pileRecords.filter(
  p => p.date === "2026-10-03" && p.status === "completed"
);

// ===== DAILY REPORTS =====
export const dailyReports: DailyReport[] = [
  { id: "dr1", date: "2026-10-03", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", supervisorId: "u5", supervisorName: "Rahul Singh", workCompleted: "Completed 4 piles at Section B. Boring completed for P-079. Reinforcement cage placed for P-080 to P-082.", pilesCompleted: 4, totalPiles: 120, pendingPiles: 38, labourCount: 18, machineryUsed: ["Piling Rig #01", "Excavator #01"], dieselUsed: 180, materialsUsed: "Cement: 20 bags, TMT Bars: 2 tons, Cover Blocks: 100", problems: "Slight delay due to hard rock at 12m depth for P-079", remarks: "Work progressing well. Expected to complete Section B by next week.", submittedBy: "u5", submittedByName: "Rahul Singh", submittedAt: "2026-10-03T17:30:00", status: "submitted" },
  { id: "dr2", date: "2026-10-03", projectId: "p2", projectName: "NHAI Highway Bridge Piling", supervisorId: "u6", supervisorName: "Amit Verma", workCompleted: "Completed 6 piles at Pier P-12 location. All piles tested satisfactory. Mobilized equipment for next pier location.", pilesCompleted: 6, totalPiles: 200, pendingPiles: 30, labourCount: 22, machineryUsed: ["Piling Rig #02", "Crane #01"], dieselUsed: 220, materialsUsed: "Cement: 30 bags, TMT Bars: 3 tons, Cover Blocks: 150, Bentonite: 5 bags", remarks: "Ahead of schedule. Pier P-12 foundation complete.", submittedBy: "u6", submittedByName: "Amit Verma", submittedAt: "2026-10-03T18:00:00", status: "submitted" },
  { id: "dr3", date: "2026-10-03", projectId: "p3", projectName: "Metro Station Foundation", supervisorId: "u13", supervisorName: "Dinesh Rawat", workCompleted: "Completed 5 piles at Station 2. Cage lowering for P-143 to P-145 in progress. Site cleared for next batch.", pilesCompleted: 5, totalPiles: 350, pendingPiles: 200, labourCount: 25, machineryUsed: ["Piling Rig #01", "Excavator #01", "Generator #01"], dieselUsed: 250, materialsUsed: "Cement: 25 bags, TMT Bars: 2.5 tons, Cover Blocks: 120, Welding Rods: 15 kg", problems: "Water table high at Station 2. Additional dewatering needed.", remarks: "Requested additional pump for dewatering.", submittedBy: "u13", submittedByName: "Dinesh Rawat", submittedAt: "2026-10-03T17:45:00", status: "submitted" },
  { id: "dr4", date: "2026-10-02", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", supervisorId: "u5", supervisorName: "Rahul Singh", workCompleted: "Completed 3 piles at Section A. Ground improvement done at P-075 location.", pilesCompleted: 3, totalPiles: 120, pendingPiles: 42, labourCount: 16, machineryUsed: ["Piling Rig #01"], dieselUsed: 150, materialsUsed: "Cement: 15 bags, TMT Bars: 1.5 tons", remarks: "Section A nearing completion.", submittedBy: "u5", submittedByName: "Rahul Singh", submittedAt: "2026-10-02T17:30:00", status: "reviewed" },
  { id: "dr5", date: "2026-10-02", projectId: "p2", projectName: "NHAI Highway Bridge Piling", supervisorId: "u6", supervisorName: "Amit Verma", workCompleted: "Completed 5 piles at Pier P-11. Testing in progress.", pilesCompleted: 5, totalPiles: 200, pendingPiles: 35, labourCount: 20, machineryUsed: ["Piling Rig #02", "Crane #01"], dieselUsed: 200, materialsUsed: "Cement: 28 bags, TMT Bars: 2.8 tons", submittedBy: "u6", submittedByName: "Amit Verma", submittedAt: "2026-10-02T18:15:00", status: "reviewed" },
  { id: "dr6", date: "2026-10-02", projectId: "p3", projectName: "Metro Station Foundation", supervisorId: "u13", supervisorName: "Dinesh Rawat", workCompleted: "Completed 4 piles at Station 2. Reinforcement work ongoing.", pilesCompleted: 4, totalPiles: 350, pendingPiles: 205, labourCount: 24, machineryUsed: ["Piling Rig #01", "Excavator #01"], dieselUsed: 230, materialsUsed: "Cement: 22 bags, TMT Bars: 2.2 tons", submittedBy: "u13", submittedByName: "Dinesh Rawat", submittedAt: "2026-10-02T17:50:00", status: "reviewed" },
];

// ===== BILLS =====
export const bills: Bill[] = [
  {
    id: "b1", billNumber: "JK/2026-27/001", billDate: "2026-04-15", clientId: "c1", clientName: "ABC Infra Pvt. Ltd.", projectId: "p1", projectName: "ABC Infra - Flyover Foundation",
    basicAmount: 1200000, cgst: 108000, sgst: 108000, grossAmount: 1416000, tds: 24000, retention: 60000, netPayable: 1332000, totalPaid: 1332000, outstanding: 0, paymentStatus: "paid",
    remarks: "RA Bill 1 - First 30 piles completed",
    payments: [{ id: "pay1", billId: "b1", paymentDate: "2026-05-10", amount: 1332000, paymentMode: "neft", referenceNumber: "NEFT20260510001" }],
    createdAt: "2026-04-15T10:00:00",
  },
  {
    id: "b2", billNumber: "JK/2026-27/002", billDate: "2026-06-20", clientId: "c1", clientName: "ABC Infra Pvt. Ltd.", projectId: "p1", projectName: "ABC Infra - Flyover Foundation",
    basicAmount: 1500000, cgst: 135000, sgst: 135000, grossAmount: 1770000, tds: 30000, retention: 75000, netPayable: 1665000, totalPaid: 1000000, outstanding: 665000, paymentStatus: "partially_paid",
    remarks: "RA Bill 2 - Piles 31-60",
    payments: [{ id: "pay2", billId: "b2", paymentDate: "2026-07-15", amount: 1000000, paymentMode: "rtgs", referenceNumber: "RTGS20260715002" }],
    createdAt: "2026-06-20T10:00:00",
  },
  {
    id: "b3", billNumber: "JK/2026-27/003", billDate: "2026-08-10", clientId: "c1", clientName: "ABC Infra Pvt. Ltd.", projectId: "p1", projectName: "ABC Infra - Flyover Foundation",
    basicAmount: 900000, cgst: 81000, sgst: 81000, grossAmount: 1062000, tds: 18000, retention: 45000, netPayable: 999000, totalPaid: 0, outstanding: 999000, paymentStatus: "overdue",
    remarks: "RA Bill 3 - Piles 61-78",
    payments: [], createdAt: "2026-08-10T10:00:00",
  },
  {
    id: "b4", billNumber: "JK/2026-27/004", billDate: "2026-03-10", clientId: "c2", clientName: "National Highway Authority", projectId: "p2", projectName: "NHAI Highway Bridge Piling",
    basicAmount: 3000000, cgst: 270000, sgst: 270000, grossAmount: 3540000, tds: 60000, retention: 150000, netPayable: 3330000, totalPaid: 3330000, outstanding: 0, paymentStatus: "paid",
    remarks: "RA Bill 1 - First 80 piles",
    payments: [{ id: "pay3", billId: "b4", paymentDate: "2026-04-05", amount: 3330000, paymentMode: "neft", referenceNumber: "NEFT20260405003" }],
    createdAt: "2026-03-10T10:00:00",
  },
  {
    id: "b5", billNumber: "JK/2026-27/005", billDate: "2026-06-15", clientId: "c2", clientName: "National Highway Authority", projectId: "p2", projectName: "NHAI Highway Bridge Piling",
    basicAmount: 2500000, cgst: 225000, sgst: 225000, grossAmount: 2950000, tds: 50000, retention: 125000, netPayable: 2775000, totalPaid: 2775000, outstanding: 0, paymentStatus: "paid",
    remarks: "RA Bill 2 - Piles 81-130",
    payments: [{ id: "pay4", billId: "b5", paymentDate: "2026-07-10", amount: 2775000, paymentMode: "rtgs", referenceNumber: "RTGS20260710004" }],
    createdAt: "2026-06-15T10:00:00",
  },
  {
    id: "b6", billNumber: "JK/2026-27/006", billDate: "2026-09-01", clientId: "c2", clientName: "National Highway Authority", projectId: "p2", projectName: "NHAI Highway Bridge Piling",
    basicAmount: 1800000, cgst: 162000, sgst: 162000, grossAmount: 2124000, tds: 36000, retention: 90000, netPayable: 1998000, totalPaid: 0, outstanding: 1998000, paymentStatus: "submitted",
    remarks: "RA Bill 3 - Piles 131-165",
    payments: [], createdAt: "2026-09-01T10:00:00",
  },
  {
    id: "b7", billNumber: "JK/2026-27/007", billDate: "2026-07-20", clientId: "c3", clientName: "Metro Rail Corporation", projectId: "p3", projectName: "Metro Station Foundation",
    basicAmount: 5000000, cgst: 450000, sgst: 450000, grossAmount: 5900000, tds: 100000, retention: 250000, netPayable: 5550000, totalPaid: 5550000, outstanding: 0, paymentStatus: "paid",
    remarks: "RA Bill 1 - First 80 piles Station 1",
    payments: [{ id: "pay5", billId: "b7", paymentDate: "2026-08-15", amount: 5550000, paymentMode: "neft", referenceNumber: "NEFT20260815005" }],
    createdAt: "2026-07-20T10:00:00",
  },
  {
    id: "b8", billNumber: "JK/2026-27/008", billDate: "2026-09-15", clientId: "c3", clientName: "Metro Rail Corporation", projectId: "p3", projectName: "Metro Station Foundation",
    basicAmount: 4500000, cgst: 405000, sgst: 405000, grossAmount: 5310000, tds: 90000, retention: 225000, netPayable: 4995000, totalPaid: 3000000, outstanding: 1995000, paymentStatus: "partially_paid",
    remarks: "RA Bill 2 - Piles 81-142 Station 1 & 2",
    payments: [{ id: "pay6", billId: "b8", paymentDate: "2026-10-01", amount: 3000000, paymentMode: "rtgs", referenceNumber: "RTGS20261001006" }],
    createdAt: "2026-09-15T10:00:00",
  },
];

// ===== INVENTORY =====
export const inventoryItems: InventoryItem[] = [
  { id: "inv1", name: "Diesel", category: "Fuel", unit: "Litres", openingStock: 5000, received: 15000, issued: 17500, currentStock: 2500, minimumStock: 3000, location: "Main Store", supplier: "Indian Oil Corporation", lastUpdated: "2026-10-03" },
  { id: "inv2", name: "Cover Blocks", category: "Consumables", unit: "Nos", openingStock: 2000, received: 8000, issued: 8500, currentStock: 1500, minimumStock: 2000, location: "Site Store", supplier: "Shree Cement Products", lastUpdated: "2026-10-03" },
  { id: "inv3", name: "Engine Oil (15W40)", category: "Lubricants", unit: "Litres", openingStock: 200, received: 500, issued: 580, currentStock: 120, minimumStock: 150, location: "Main Store", supplier: "Castrol India", lastUpdated: "2026-10-02" },
  { id: "inv4", name: "Hydraulic Oil (68)", category: "Lubricants", unit: "Litres", openingStock: 300, received: 600, issued: 750, currentStock: 150, minimumStock: 200, location: "Main Store", supplier: "Gulf Oil", lastUpdated: "2026-10-02" },
  { id: "inv5", name: "Gear Oil (90)", category: "Lubricants", unit: "Litres", openingStock: 100, received: 200, issued: 210, currentStock: 90, minimumStock: 50, location: "Main Store", supplier: "Gulf Oil", lastUpdated: "2026-10-01" },
  { id: "inv6", name: "Bearing Grease", category: "Lubricants", unit: "Kg", openingStock: 50, received: 100, issued: 115, currentStock: 35, minimumStock: 30, location: "Main Store", supplier: "Castrol India", lastUpdated: "2026-10-01" },
  { id: "inv7", name: "Trimming Grease", category: "Lubricants", unit: "Kg", openingStock: 40, received: 80, issued: 95, currentStock: 25, minimumStock: 20, location: "Main Store", supplier: "Castrol India", lastUpdated: "2026-09-30" },
  { id: "inv8", name: "Welding Rod (3.15mm)", category: "Consumables", unit: "Kg", openingStock: 100, received: 300, issued: 340, currentStock: 60, minimumStock: 80, location: "Site Store", supplier: "ESAB India", lastUpdated: "2026-10-03" },
  { id: "inv9", name: "Bending Wire", category: "Consumables", unit: "Kg", openingStock: 200, received: 500, issued: 580, currentStock: 120, minimumStock: 150, location: "Site Store", supplier: "Tata Steel", lastUpdated: "2026-10-03" },
  { id: "inv10", name: "Auger Pin", category: "Spares", unit: "Nos", openingStock: 20, received: 40, issued: 45, currentStock: 15, minimumStock: 10, location: "Main Store", supplier: "Mait India", lastUpdated: "2026-10-02" },
  { id: "inv11", name: "TMT Bar (16mm)", category: "Materials", unit: "Tons", openingStock: 10, received: 50, issued: 48, currentStock: 12, minimumStock: 8, location: "Site Store", supplier: "Tata Steel", lastUpdated: "2026-10-03" },
  { id: "inv12", name: "Cement (OPC 53)", category: "Materials", unit: "Bags", openingStock: 200, received: 1000, issued: 950, currentStock: 250, minimumStock: 100, location: "Site Store", supplier: "UltraTech Cement", lastUpdated: "2026-10-03" },
  { id: "inv13", name: "Bentonite Powder", category: "Materials", unit: "Bags", openingStock: 50, received: 200, issued: 190, currentStock: 60, minimumStock: 40, location: "Site Store", supplier: "Ashapura Mines", lastUpdated: "2026-10-02" },
];

// ===== STOCK TRANSACTIONS =====
export const stockTransactions: StockTransaction[] = [
  { id: "st1", date: "2026-10-03", itemId: "inv8", itemName: "Welding Rod (3.15mm)", quantity: 20, projectId: "p1", projectName: "ABC Infra - Flyover Foundation", employeeId: "u7", employeeName: "Deepak Gupta", type: "stock_out", remarks: "Issued for cage fabrication", createdAt: "2026-10-03T09:00:00" },
  { id: "st2", date: "2026-10-03", itemId: "inv2", itemName: "Cover Blocks", quantity: 100, projectId: "p2", projectName: "NHAI Highway Bridge Piling", employeeId: "u7", employeeName: "Deepak Gupta", type: "stock_out", remarks: "Issued for pier P-12 piles", createdAt: "2026-10-03T09:30:00" },
  { id: "st3", date: "2026-10-03", itemId: "inv1", itemName: "Diesel", quantity: 500, projectId: "p1", projectName: "ABC Infra - Flyover Foundation", employeeId: "u7", employeeName: "Deepak Gupta", type: "stock_out", remarks: "Issued for Piling Rig #01", createdAt: "2026-10-03T07:00:00" },
  { id: "st4", date: "2026-10-02", itemId: "inv11", itemName: "TMT Bar (16mm)", quantity: 5, projectId: "p3", projectName: "Metro Station Foundation", employeeId: "u7", employeeName: "Deepak Gupta", type: "stock_out", remarks: "Issued for cage fabrication", createdAt: "2026-10-02T08:00:00" },
  { id: "st5", date: "2026-10-02", itemId: "inv12", itemName: "Cement (OPC 53)", quantity: 100, projectId: "p2", projectName: "NHAI Highway Bridge Piling", employeeId: "u7", employeeName: "Deepak Gupta", type: "stock_in", remarks: "Received from UltraTech", createdAt: "2026-10-02T10:00:00" },
  { id: "st6", date: "2026-10-01", itemId: "inv1", itemName: "Diesel", quantity: 2000, employeeId: "u7", employeeName: "Deepak Gupta", type: "stock_in", remarks: "Tanker delivery from IOC", createdAt: "2026-10-01T06:30:00" },
];

// ===== TOOLS & ASSETS =====
export const assets: Asset[] = [
  { id: "a1", assetId: "JK-TL-001", name: "Vibration Hammer", category: "Piling Equipment", condition: "Good", currentLocation: "Site - Ahmedabad", assignedTo: "u5", assignedToName: "Rahul Singh", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", issueDate: "2026-03-15", status: "issued" },
  { id: "a2", assetId: "JK-TL-002", name: "Concrete Vibrator", category: "Concrete Equipment", condition: "Good", currentLocation: "Site - Vadodara", assignedTo: "u6", assignedToName: "Amit Verma", projectId: "p2", projectName: "NHAI Highway Bridge Piling", issueDate: "2026-01-10", status: "issued" },
  { id: "a3", assetId: "JK-TL-003", name: "Welding Machine", category: "Welding Equipment", condition: "Good", currentLocation: "Main Workshop", status: "available" },
  { id: "a4", assetId: "JK-TL-004", name: "Total Station", category: "Survey Equipment", condition: "Good", currentLocation: "Site - Surat", assignedTo: "u13", assignedToName: "Dinesh Rawat", projectId: "p3", projectName: "Metro Station Foundation", issueDate: "2026-06-01", status: "issued" },
  { id: "a5", assetId: "JK-TL-005", name: "Theodolite", category: "Survey Equipment", condition: "Fair", currentLocation: "Workshop", status: "under_repair" },
  { id: "a6", assetId: "JK-TL-006", name: "Water Pump (5HP)", category: "Dewatering", condition: "Good", currentLocation: "Main Store", status: "available" },
  { id: "a7", assetId: "JK-TL-007", name: "Pile Integrity Tester", category: "Testing Equipment", condition: "Good", currentLocation: "Office", status: "available" },
  { id: "a8", assetId: "JK-TL-008", name: "Cutting Machine", category: "Cutting Equipment", condition: "Good", currentLocation: "Site - Surat", assignedTo: "u13", assignedToName: "Dinesh Rawat", projectId: "p3", projectName: "Metro Station Foundation", issueDate: "2026-06-15", status: "issued" },
  
  // Newly added permanent piling and construction tools
  { id: "a9", assetId: "JK-TL-009", name: "Tremie Pipe Set", category: "Concrete Equipment", condition: "Good", currentLocation: "Site - Vadodara", assignedTo: "u6", assignedToName: "Amit Verma", projectId: "p2", projectName: "NHAI Highway Bridge Piling", issueDate: "2026-02-10", status: "issued" },
  { id: "a10", assetId: "JK-TL-010", name: "Tremie Hopper", category: "Concrete Equipment", condition: "Fair", currentLocation: "Site - Ahmedabad", assignedTo: "u5", assignedToName: "Rahul Singh", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", issueDate: "2026-03-20", status: "issued" },
  { id: "a11", assetId: "JK-TL-011", name: "Rock Auger 600mm", category: "Drilling Tools", condition: "Good", currentLocation: "Main Store", status: "available" },
  { id: "a12", assetId: "JK-TL-012", name: "Soil Auger 800mm", category: "Drilling Tools", condition: "Good", currentLocation: "Site - Surat", assignedTo: "u13", assignedToName: "Dinesh Rawat", projectId: "p3", projectName: "Metro Station Foundation", issueDate: "2026-06-10", status: "issued" },
  { id: "a13", assetId: "JK-TL-013", name: "Core Barrel 600mm", category: "Drilling Tools", condition: "Good", currentLocation: "Main Store", status: "available" },
  { id: "a14", assetId: "JK-TL-014", name: "Cleaning Bucket 800mm", category: "Drilling Tools", condition: "Fair", currentLocation: "Site - Surat", assignedTo: "u13", assignedToName: "Dinesh Rawat", projectId: "p3", projectName: "Metro Station Foundation", issueDate: "2026-06-12", status: "issued" },
  { id: "a15", assetId: "JK-TL-015", name: "Bentonite Mixing Tank", category: "Slurry Equipment", condition: "Good", currentLocation: "Site - Ahmedabad", assignedTo: "u5", assignedToName: "Rahul Singh", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", issueDate: "2026-03-15", status: "issued" },
  { id: "a16", assetId: "JK-TL-016", name: "Slurry Pump", category: "Slurry Equipment", condition: "Good", currentLocation: "Main Workshop", status: "under_repair" },
  { id: "a17", assetId: "JK-TL-017", name: "Desander / Mud Cleaner", category: "Slurry Equipment", condition: "Good", currentLocation: "Main Store", status: "available" },
  { id: "a18", assetId: "JK-TL-018", name: "Steel Casing 600mm", category: "Casing", condition: "Fair", currentLocation: "Site - Ahmedabad", assignedTo: "u5", assignedToName: "Rahul Singh", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", issueDate: "2026-03-22", status: "issued" },
  { id: "a19", assetId: "JK-TL-019", name: "Casing Oscillator", category: "Casing Equipment", condition: "Good", currentLocation: "Main Store", status: "available" },
  { id: "a20", assetId: "JK-TL-020", name: "Heavy Drop Chisel", category: "Drilling Tools", condition: "Good", currentLocation: "Main Store", status: "available" },
];

// ===== MACHINERY =====
export const machines: Machine[] = [
  { id: "m1", machineId: "JK-PR-01", name: "Piling Rig #01", type: "Piling Rig", model: "Mait HR-180", registrationNumber: "GJ-01-AB-1234", currentProjectId: "p1", currentProjectName: "ABC Infra - Flyover Foundation", operatorId: "u8", operatorName: "Manoj Tiwari", status: "working", hourMeter: 4520, lastMaintenance: "2026-09-15", nextMaintenance: "2026-10-15" },
  { id: "m2", machineId: "JK-PR-02", name: "Piling Rig #02", type: "Piling Rig", model: "Bauer BG-20", registrationNumber: "GJ-01-CD-5678", currentProjectId: "p2", currentProjectName: "NHAI Highway Bridge Piling", operatorId: "u9", operatorName: "Vikram Chauhan", status: "working", hourMeter: 3890, lastMaintenance: "2026-09-20", nextMaintenance: "2026-10-20" },
  { id: "m3", machineId: "JK-EX-01", name: "Excavator #01", type: "Excavator", model: "JCB JS205", registrationNumber: "GJ-05-EF-9012", currentProjectId: "p1", currentProjectName: "ABC Infra - Flyover Foundation", status: "working", hourMeter: 6200, lastMaintenance: "2026-09-25", nextMaintenance: "2026-10-25" },
  { id: "m4", machineId: "JK-GN-01", name: "Generator #01", type: "Generator", model: "Kirloskar 125 KVA", currentProjectId: "p3", currentProjectName: "Metro Station Foundation", status: "working", hourMeter: 2100, lastMaintenance: "2026-09-10", nextMaintenance: "2026-10-10" },
  { id: "m5", machineId: "JK-CR-01", name: "Crane #01", type: "Crane", model: "ACE 14 Ton", registrationNumber: "GJ-06-GH-3456", currentProjectId: "p2", currentProjectName: "NHAI Highway Bridge Piling", operatorId: "u14", operatorName: "Arun Pandey", status: "working", hourMeter: 3450, lastMaintenance: "2026-09-28", nextMaintenance: "2026-10-28" },
];

// ===== DIESEL LOGS =====
export const dieselLogs: DieselLog[] = [
  { id: "dl1", date: "2026-10-03", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", machineId: "m1", machineName: "Piling Rig #01", operatorId: "u8", operatorName: "Manoj Tiwari", openingStock: 250, dieselReceived: 0, dieselUsed: 120, closingStock: 130, machineHours: 8, rate: 92, totalCost: 11040, dieselPerHour: 15, enteredBy: "u5", createdAt: "2026-10-03T17:00:00" },
  { id: "dl2", date: "2026-10-03", projectId: "p2", projectName: "NHAI Highway Bridge Piling", machineId: "m2", machineName: "Piling Rig #02", operatorId: "u9", operatorName: "Vikram Chauhan", openingStock: 300, dieselReceived: 0, dieselUsed: 140, closingStock: 160, machineHours: 9, rate: 92, totalCost: 12880, dieselPerHour: 15.56, enteredBy: "u6", createdAt: "2026-10-03T17:30:00" },
  { id: "dl3", date: "2026-10-03", projectId: "p3", projectName: "Metro Station Foundation", machineId: "m4", machineName: "Generator #01", openingStock: 100, dieselReceived: 200, dieselUsed: 80, closingStock: 220, machineHours: 10, rate: 92, totalCost: 7360, dieselPerHour: 8, enteredBy: "u13", createdAt: "2026-10-03T18:00:00" },
  { id: "dl4", date: "2026-10-03", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", machineId: "m3", machineName: "Excavator #01", openingStock: 80, dieselReceived: 100, dieselUsed: 60, closingStock: 120, machineHours: 6, rate: 92, totalCost: 5520, dieselPerHour: 10, enteredBy: "u5", createdAt: "2026-10-03T17:15:00" },
  { id: "dl5", date: "2026-10-02", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", machineId: "m1", machineName: "Piling Rig #01", operatorId: "u8", operatorName: "Manoj Tiwari", openingStock: 380, dieselReceived: 0, dieselUsed: 130, closingStock: 250, machineHours: 8.5, rate: 92, totalCost: 11960, dieselPerHour: 15.29, enteredBy: "u5", createdAt: "2026-10-02T17:00:00" },
  { id: "dl6", date: "2026-10-02", projectId: "p2", projectName: "NHAI Highway Bridge Piling", machineId: "m2", machineName: "Piling Rig #02", operatorId: "u9", operatorName: "Vikram Chauhan", openingStock: 420, dieselReceived: 0, dieselUsed: 120, closingStock: 300, machineHours: 8, rate: 92, totalCost: 11040, dieselPerHour: 15, enteredBy: "u6", createdAt: "2026-10-02T17:30:00" },
  { id: "dl7", date: "2026-10-02", projectId: "p3", projectName: "Metro Station Foundation", machineId: "m4", machineName: "Generator #01", openingStock: 150, dieselReceived: 0, dieselUsed: 50, closingStock: 100, machineHours: 8, rate: 92, totalCost: 4600, dieselPerHour: 6.25, enteredBy: "u13", createdAt: "2026-10-02T18:00:00" },
  { id: "dl8", date: "2026-10-02", projectId: "p2", projectName: "NHAI Highway Bridge Piling", machineId: "m5", machineName: "Crane #01", operatorId: "u14", operatorName: "Arun Pandey", openingStock: 200, dieselReceived: 0, dieselUsed: 80, closingStock: 120, machineHours: 7, rate: 92, totalCost: 7360, dieselPerHour: 11.43, enteredBy: "u6", createdAt: "2026-10-02T17:45:00" },
];

// ===== MAINTENANCE RECORDS =====
export const maintenanceRecords: MaintenanceRecord[] = [
  { id: "mt1", machineId: "m1", machineName: "Piling Rig #01", maintenanceType: "preventive", date: "2026-09-15", description: "Regular 500-hour service. Oil change, filter replacement, hydraulic system check.", cost: 45000, vendor: "Mait Service Center", partsUsed: "Engine Oil 20L, Hydraulic Filter, Air Filter, Fuel Filter", nextServiceDate: "2026-10-15", status: "completed" },
  { id: "mt2", machineId: "m2", machineName: "Piling Rig #02", maintenanceType: "preventive", date: "2026-09-20", description: "Regular service. Kelly bar inspection, rotary drive check.", cost: 55000, vendor: "Bauer Equipment", partsUsed: "Hydraulic Oil 40L, Kelly Bar Pins, Wear Plates", nextServiceDate: "2026-10-20", status: "completed" },
  { id: "mt3", machineId: "m3", machineName: "Excavator #01", maintenanceType: "corrective", date: "2026-09-25", description: "Hydraulic cylinder seal replacement. Boom cylinder leaking.", cost: 28000, vendor: "JCB Service", partsUsed: "Hydraulic Cylinder Seal Kit, Hydraulic Oil 20L", nextServiceDate: "2026-10-25", status: "completed" },
  { id: "mt4", machineId: "m4", machineName: "Generator #01", maintenanceType: "preventive", date: "2026-10-10", description: "Scheduled 200-hour service. Engine oil change, coolant check.", cost: 15000, vendor: "Kirloskar Service", partsUsed: "Engine Oil 10L, Oil Filter, Air Filter", status: "scheduled" },
  { id: "mt5", machineId: "m1", machineName: "Piling Rig #01", maintenanceType: "preventive", date: "2026-10-15", description: "Upcoming 500-hour service scheduled", cost: 0, nextServiceDate: "2026-10-15", status: "scheduled" },
  { id: "mt6", machineId: "m5", machineName: "Crane #01", maintenanceType: "preventive", date: "2026-10-05", description: "Wire rope inspection overdue. Safety inspection pending.", cost: 0, nextServiceDate: "2026-10-05", status: "overdue" },
];

// ===== LABOUR ATTENDANCE =====
export const labourAttendance: LabourAttendance[] = [
  // Today's attendance
  { id: "la1", employeeId: "u5", employeeName: "Rahul Singh", role: "Site Supervisor", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", date: "2026-10-03", attendance: "present", shift: "day", hours: 10, overtime: 2, remarks: "" },
  { id: "la2", employeeId: "u6", employeeName: "Amit Verma", role: "Site Supervisor", projectId: "p2", projectName: "NHAI Highway Bridge Piling", date: "2026-10-03", attendance: "present", shift: "day", hours: 10, overtime: 1, remarks: "" },
  { id: "la3", employeeId: "u8", employeeName: "Manoj Tiwari", role: "Senior Operator", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", date: "2026-10-03", attendance: "present", shift: "day", hours: 9, overtime: 1, remarks: "" },
  { id: "la4", employeeId: "u9", employeeName: "Vikram Chauhan", role: "Operator", projectId: "p2", projectName: "NHAI Highway Bridge Piling", date: "2026-10-03", attendance: "present", shift: "day", hours: 9, overtime: 0, remarks: "" },
  { id: "la5", employeeId: "u11", employeeName: "Ravi Kumar", role: "Helper", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", date: "2026-10-03", attendance: "present", shift: "day", hours: 8, overtime: 0, remarks: "" },
  { id: "la6", employeeId: "u12", employeeName: "Sanjay Mishra", role: "Welder", projectId: "p2", projectName: "NHAI Highway Bridge Piling", date: "2026-10-03", attendance: "present", shift: "day", hours: 9, overtime: 1, remarks: "" },
  { id: "la7", employeeId: "u13", employeeName: "Dinesh Rawat", role: "Site Supervisor", projectId: "p3", projectName: "Metro Station Foundation", date: "2026-10-03", attendance: "present", shift: "day", hours: 10, overtime: 2, remarks: "" },
  { id: "la8", employeeId: "u14", employeeName: "Arun Pandey", role: "Crane Operator", projectId: "p3", projectName: "Metro Station Foundation", date: "2026-10-03", attendance: "present", shift: "day", hours: 8, overtime: 0, remarks: "" },
  { id: "la9", employeeId: "u15", employeeName: "Kiran Desai", role: "Fitter", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", date: "2026-10-03", attendance: "present", shift: "day", hours: 8, overtime: 0, remarks: "" },
  { id: "la10", employeeId: "u16", employeeName: "Mohan Reddy", role: "Mason", projectId: "p2", projectName: "NHAI Highway Bridge Piling", date: "2026-10-03", attendance: "absent", shift: "day", hours: 0, overtime: 0, remarks: "Sick leave" },
  { id: "la11", employeeId: "u17", employeeName: "Prakash Jha", role: "Driver", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", date: "2026-10-03", attendance: "present", shift: "day", hours: 8, overtime: 0, remarks: "Material transport" },
  { id: "la12", employeeId: "u18", employeeName: "Santosh Dubey", role: "Rigger", projectId: "p3", projectName: "Metro Station Foundation", date: "2026-10-03", attendance: "present", shift: "day", hours: 9, overtime: 1, remarks: "" },
];

// ===== EXPENSES =====
export const expenses: Expense[] = [
  { id: "e1", date: "2026-10-03", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", category: "diesel", vendor: "Indian Oil Corporation", description: "Diesel for Piling Rig #01 and Excavator", basicAmount: 16560, gst: 0, totalAmount: 16560, paymentStatus: "paid", paymentMode: "cash", enteredBy: "u5", enteredByName: "Rahul Singh", createdAt: "2026-10-03T18:00:00" },
  { id: "e2", date: "2026-10-03", projectId: "p2", projectName: "NHAI Highway Bridge Piling", category: "diesel", vendor: "Indian Oil Corporation", description: "Diesel for Piling Rig #02 and Crane", basicAmount: 20240, gst: 0, totalAmount: 20240, paymentStatus: "paid", paymentMode: "cash", enteredBy: "u6", enteredByName: "Amit Verma", createdAt: "2026-10-03T18:00:00" },
  { id: "e3", date: "2026-10-02", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", category: "material", vendor: "UltraTech Cement", description: "Cement OPC 53 - 50 bags", basicAmount: 17500, gst: 3150, totalAmount: 20650, paymentStatus: "pending", enteredBy: "u7", enteredByName: "Deepak Gupta", createdAt: "2026-10-02T14:00:00" },
  { id: "e4", date: "2026-10-01", projectId: "p3", projectName: "Metro Station Foundation", category: "material", vendor: "Tata Steel", description: "TMT Bar 16mm - 5 Tons", basicAmount: 275000, gst: 49500, totalAmount: 324500, paymentStatus: "paid", paymentMode: "neft", enteredBy: "u10", enteredByName: "Neha Joshi", createdAt: "2026-10-01T11:00:00" },
  { id: "e5", date: "2026-09-30", projectId: "p2", projectName: "NHAI Highway Bridge Piling", category: "repair", vendor: "JCB Service Center", description: "Hydraulic hose replacement for Excavator", basicAmount: 8500, gst: 1530, totalAmount: 10030, paymentStatus: "paid", paymentMode: "upi", enteredBy: "u6", enteredByName: "Amit Verma", createdAt: "2026-09-30T16:00:00" },
  { id: "e6", date: "2026-09-28", category: "office_expense", description: "Office stationery and printer cartridges", basicAmount: 3500, gst: 630, totalAmount: 4130, paymentStatus: "paid", paymentMode: "cash", enteredBy: "u2", enteredByName: "Priya Sharma", createdAt: "2026-09-28T12:00:00" },
  { id: "e7", date: "2026-09-25", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", category: "transport", vendor: "Krishna Transport", description: "Crane mobilization charges", basicAmount: 45000, gst: 8100, totalAmount: 53100, paymentStatus: "paid", paymentMode: "neft", enteredBy: "u10", enteredByName: "Neha Joshi", createdAt: "2026-09-25T10:00:00" },
  { id: "e8", date: "2026-09-20", projectId: "p3", projectName: "Metro Station Foundation", category: "site_expense", description: "Site temporary shed construction", basicAmount: 85000, gst: 15300, totalAmount: 100300, paymentStatus: "paid", paymentMode: "cheque", enteredBy: "u10", enteredByName: "Neha Joshi", createdAt: "2026-09-20T14:00:00" },
];

// ===== VENDORS =====
export const vendors: Vendor[] = [
  { id: "v1", name: "Indian Oil Corporation", contactPerson: "Suresh Patel", phone: "9876001234", email: "dealer@iocl.com", address: "IOC Depot, Naroda, Ahmedabad", gstNumber: "24AAACI1234A1Z5", category: "Fuel", outstanding: 0 },
  { id: "v2", name: "UltraTech Cement", contactPerson: "Rakesh Shah", phone: "9876002345", email: "sales@ultratechcement.com", address: "Cement Godown, Odhav, Ahmedabad", gstNumber: "24AABCU5678B2Z8", category: "Materials", outstanding: 20650 },
  { id: "v3", name: "Tata Steel", contactPerson: "Mahesh Kumar", phone: "9876003456", email: "orders@tatasteel.com", address: "Steel Warehouse, GIDC, Vatva", gstNumber: "24AABCT9012C3Z1", category: "Materials", outstanding: 0 },
  { id: "v4", name: "Castrol India", contactPerson: "Deepak Jain", phone: "9876004567", email: "supply@castrol.com", address: "Industrial Estate, Sanand, Ahmedabad", gstNumber: "24AABCC3456D4Z4", category: "Lubricants", outstanding: 0 },
  { id: "v5", name: "JCB Service Center", contactPerson: "Vijay Sharma", phone: "9876005678", address: "NH-8 Service Road, Ahmedabad", gstNumber: "24AABCJ7890E5Z7", category: "Service", outstanding: 0 },
  { id: "v6", name: "Mait India (Service)", contactPerson: "Rohit Singh", phone: "9876006789", email: "service@maitindia.com", address: "Industrial Area Phase 2, Ahmedabad", gstNumber: "24AABCM1234F6Z0", category: "Equipment Service", outstanding: 0 },
  { id: "v7", name: "ESAB India", contactPerson: "Anil Gupta", phone: "9876007890", address: "Hardware Market, Kalupur, Ahmedabad", category: "Consumables", outstanding: 0 },
  { id: "v8", name: "Krishna Transport", contactPerson: "Ramesh Yadav", phone: "9876008901", address: "Transport Nagar, Ahmedabad", category: "Transport", outstanding: 0 },
];

// ===== PURCHASE ORDERS =====
export const purchaseOrders: PurchaseOrder[] = [
  { id: "po1", vendorId: "v2", vendorName: "UltraTech Cement", date: "2026-10-02", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", items: "Cement OPC 53 Grade", quantity: 50, amount: 17500, gst: 3150, totalAmount: 20650, paymentStatus: "pending" },
  { id: "po2", vendorId: "v3", vendorName: "Tata Steel", date: "2026-10-01", projectId: "p3", projectName: "Metro Station Foundation", items: "TMT Bar 16mm", quantity: 5, amount: 275000, gst: 49500, totalAmount: 324500, paymentStatus: "paid" },
  { id: "po3", vendorId: "v1", vendorName: "Indian Oil Corporation", date: "2026-10-01", items: "Diesel (HSD)", quantity: 2000, amount: 184000, gst: 0, totalAmount: 184000, paymentStatus: "paid" },
  { id: "po4", vendorId: "v4", vendorName: "Castrol India", date: "2026-09-28", items: "Engine Oil 15W40, Hydraulic Oil 68", quantity: 60, amount: 42000, gst: 7560, totalAmount: 49560, paymentStatus: "paid" },
];

// ===== DOCUMENTS =====
export const documents: Document[] = [
  { id: "d1", name: "ABC Infra Work Order", type: "work_order", fileUrl: "/documents/work-order-abc.pdf", fileSize: "2.4 MB", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", clientId: "c1", uploadedBy: "u2", uploadedByName: "Priya Sharma", uploadedAt: "2026-03-10T10:00:00", tags: ["work order", "abc infra"] },
  { id: "d2", name: "NHAI Contract Agreement", type: "agreement", fileUrl: "/documents/nhai-agreement.pdf", fileSize: "5.1 MB", projectId: "p2", projectName: "NHAI Highway Bridge Piling", clientId: "c2", uploadedBy: "u2", uploadedByName: "Priya Sharma", uploadedAt: "2026-01-05T10:00:00", tags: ["agreement", "nhai"] },
  { id: "d3", name: "Metro Rail Work Order", type: "work_order", fileUrl: "/documents/metro-work-order.pdf", fileSize: "3.8 MB", projectId: "p3", projectName: "Metro Station Foundation", clientId: "c3", uploadedBy: "u2", uploadedByName: "Priya Sharma", uploadedAt: "2026-05-28T10:00:00", tags: ["work order", "metro"] },
  { id: "d4", name: "Piling Rig #01 Registration", type: "machine_document", fileUrl: "/documents/rig01-rc.pdf", fileSize: "1.2 MB", machineId: "m1", uploadedBy: "u2", uploadedByName: "Priya Sharma", uploadedAt: "2026-01-15T10:00:00", tags: ["registration", "piling rig"] },
  { id: "d5", name: "Site Photo - Pile P-078 Completion", type: "site_photo", fileUrl: "/documents/pile-078.jpg", fileSize: "4.5 MB", projectId: "p1", projectName: "ABC Infra - Flyover Foundation", uploadedBy: "u5", uploadedByName: "Rahul Singh", uploadedAt: "2026-10-03T16:00:00", tags: ["site photo", "pile completion"] },
  { id: "d6", name: "Bill JK/2026-27/008", type: "bill", fileUrl: "/documents/bill-008.pdf", fileSize: "0.8 MB", projectId: "p3", projectName: "Metro Station Foundation", billId: "b8", uploadedBy: "u10", uploadedByName: "Neha Joshi", uploadedAt: "2026-09-15T12:00:00", tags: ["bill", "metro"] },
  { id: "d7", name: "Pile Integrity Test Report - P2", type: "test_report", fileUrl: "/documents/pit-report-p2.pdf", fileSize: "1.8 MB", projectId: "p2", projectName: "NHAI Highway Bridge Piling", uploadedBy: "u6", uploadedByName: "Amit Verma", uploadedAt: "2026-09-28T14:00:00", tags: ["test report", "integrity"] },
];

// ===== NOTIFICATIONS =====
export const notifications: Notification[] = [
  { id: "n1", type: "low_stock", title: "Low Stock Alert", message: "Engine Oil (15W40) stock is below minimum level. Current: 120L, Minimum: 150L", read: false, createdAt: "2026-10-03T10:00:00", link: "/inventory" },
  { id: "n2", type: "low_stock", title: "Low Stock Alert", message: "Hydraulic Oil (68) stock is low. Current: 150L, Minimum: 200L", read: false, createdAt: "2026-10-03T10:00:00", link: "/inventory" },
  { id: "n3", type: "low_stock", title: "Low Stock Alert", message: "Cover Blocks stock below minimum. Current: 1500, Minimum: 2000", read: false, createdAt: "2026-10-03T10:00:00", link: "/inventory" },
  { id: "n4", type: "low_stock", title: "Low Stock Alert", message: "Welding Rod (3.15mm) needs reorder. Current: 60 Kg, Minimum: 80 Kg", read: false, createdAt: "2026-10-03T10:00:00", link: "/inventory" },
  { id: "n5", type: "low_stock", title: "Low Stock Alert", message: "Bending Wire running low. Current: 120 Kg, Minimum: 150 Kg", read: false, createdAt: "2026-10-03T10:00:00", link: "/inventory" },
  { id: "n6", type: "bill_overdue", title: "Bill Overdue", message: "Bill JK/2026-27/003 for ABC Infra (₹9,99,000) is overdue since 08 Aug 2026", read: false, createdAt: "2026-10-03T09:00:00", link: "/billing" },
  { id: "n7", type: "payment_received", title: "Payment Received", message: "₹30,00,000 received from Metro Rail Corporation against Bill JK/2026-27/008", read: true, createdAt: "2026-10-01T14:00:00", link: "/clients" },
  { id: "n8", type: "maintenance_due", title: "Maintenance Due", message: "Crane #01 wire rope inspection is overdue. Last inspection: 28 Sep 2026", read: false, createdAt: "2026-10-03T08:00:00", link: "/maintenance" },
  { id: "n9", type: "maintenance_due", title: "Maintenance Scheduled", message: "Generator #01 scheduled service on 10 Oct 2026", read: true, createdAt: "2026-10-02T09:00:00", link: "/maintenance" },
  { id: "n10", type: "project_milestone", title: "Project Milestone", message: "NHAI Highway Bridge Piling has reached 82% pile completion!", read: true, createdAt: "2026-10-02T16:00:00", link: "/projects" },
  { id: "n11", type: "report_pending", title: "Daily Report Pending", message: "Daily site report for Sunrise Tower Foundation has not been submitted yet", read: false, createdAt: "2026-10-03T19:00:00" },
  { id: "n12", type: "diesel_alert", title: "Diesel Stock Low", message: "Main diesel storage is below minimum level. Current: 2,500L, Minimum: 3,000L", read: false, createdAt: "2026-10-03T07:00:00", link: "/diesel" },
];

// ===== RECENT ACTIVITY =====
export const recentActivities: Activity[] = [
  { id: "act1", message: "Rahul Singh added 4 completed piles at ABC Infra project", type: "pile", timestamp: "2026-10-03T17:30:00", userId: "u5", userName: "Rahul Singh" },
  { id: "act2", message: "Amit Verma added 6 completed piles at NHAI Highway project", type: "pile", timestamp: "2026-10-03T18:00:00", userId: "u6", userName: "Amit Verma" },
  { id: "act3", message: "Deepak Gupta issued 20 kg Welding Rods to ABC Infra site", type: "stock", timestamp: "2026-10-03T09:00:00", userId: "u7", userName: "Deepak Gupta" },
  { id: "act4", message: "₹30,00,000 payment received from Metro Rail Corporation", type: "payment", timestamp: "2026-10-01T14:00:00" },
  { id: "act5", message: "Diesel entry added for Piling Rig #01 - 120L consumed", type: "diesel", timestamp: "2026-10-03T17:00:00", userId: "u5", userName: "Rahul Singh" },
  { id: "act6", message: "Daily report submitted for NHAI Highway Bridge Piling", type: "report", timestamp: "2026-10-03T18:00:00", userId: "u6", userName: "Amit Verma" },
  { id: "act7", message: "Dinesh Rawat added 5 completed piles at Metro Station", type: "pile", timestamp: "2026-10-03T17:45:00", userId: "u13", userName: "Dinesh Rawat" },
  { id: "act8", message: "Neha Joshi recorded expense ₹3,24,500 for TMT Bars", type: "expense", timestamp: "2026-10-01T11:00:00", userId: "u10", userName: "Neha Joshi" },
  { id: "act9", message: "Crane #01 maintenance overdue - wire rope inspection pending", type: "maintenance", timestamp: "2026-10-03T08:00:00" },
  { id: "act10", message: "Daily report submitted for Metro Station Foundation", type: "report", timestamp: "2026-10-03T17:45:00", userId: "u13", userName: "Dinesh Rawat" },
];

// ===== DASHBOARD SUMMARY DATA =====
export const dashboardSummary = {
  activeProjects: projects.filter(p => p.status === "active").length,
  totalPiles: projects.reduce((sum, p) => sum + p.totalPiles, 0),
  todayCompletedPiles: 15,
  pendingPiles: projects.reduce((sum, p) => sum + p.pendingPiles, 0),
  todayDieselConsumption: dieselLogs.filter(d => d.date === "2026-10-03").reduce((sum, d) => sum + d.dieselUsed, 0),
  labourPresent: labourAttendance.filter(la => la.date === "2026-10-03" && la.attendance === "present").length,
  pendingBills: bills.filter(b => b.paymentStatus === "submitted" || b.paymentStatus === "overdue").length,
  outstandingPayments: bills.reduce((sum, b) => sum + b.outstanding, 0),
  totalBilled: bills.reduce((sum, b) => sum + b.grossAmount, 0),
  totalReceived: bills.reduce((sum, b) => sum + b.totalPaid, 0),
};

// ===== PILE COMPLETION CHART DATA =====
export const pileCompletionChartData = [
  { date: "Apr", completed: 25 },
  { date: "May", completed: 45 },
  { date: "Jun", completed: 52 },
  { date: "Jul", completed: 68 },
  { date: "Aug", completed: 72 },
  { date: "Sep", completed: 85 },
  { date: "Oct", completed: 38 },
];

// ===== DIESEL CHART DATA =====
export const dieselChartData = [
  { name: "Piling Rig #01", consumption: 120, project: "ABC Infra" },
  { name: "Piling Rig #02", consumption: 140, project: "NHAI Highway" },
  { name: "Excavator #01", consumption: 60, project: "ABC Infra" },
  { name: "Generator #01", consumption: 80, project: "Metro Station" },
  { name: "Crane #01", consumption: 80, project: "NHAI Highway" },
];

// ===== LOW STOCK ITEMS =====
export const lowStockItems = inventoryItems.filter(
  item => item.currentStock <= item.minimumStock
);
