// ===== USER & AUTH =====
export type UserRole =
  | "owner"
  | "admin"
  | "project_manager"
  | "site_supervisor"
  | "store_keeper"
  | "machine_operator"
  | "accounts"
  | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  designation?: string;
  assignedProjects?: string[];
  isActive: boolean;
  joinDate: string;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  owner: "Owner",
  admin: "Admin",
  project_manager: "Project Manager",
  site_supervisor: "Site Supervisor",
  store_keeper: "Store Keeper",
  machine_operator: "Machine Operator",
  accounts: "Accounts",
  employee: "Employee",
};

// ===== PROJECT =====
export type ProjectStatus = "active" | "completed" | "on_hold" | "upcoming";

export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  location: string;
  startDate: string;
  endDate?: string;
  totalPiles: number;
  completedPiles: number;
  pendingPiles: number;
  inProgressPiles: number;
  projectValue: number;
  billedAmount: number;
  receivedAmount: number;
  outstandingAmount: number;
  status: ProjectStatus;
  description?: string;
  siteAddress?: string;
  assignedManager?: string;
  assignedSupervisor?: string;
}

// ===== PILE =====
export type PileStatus = "pending" | "in_progress" | "completed" | "rejected";

export interface PileRecord {
  id: string;
  pileNumber: string;
  projectId: string;
  projectName: string;
  date: string;
  status: PileStatus;
  depth: number;
  diameter: number;
  machineId?: string;
  machineName?: string;
  operatorId?: string;
  operatorName?: string;
  startTime?: string;
  endTime?: string;
  remarks?: string;
  photos?: string[];
  enteredBy: string;
  enteredByName: string;
  createdAt: string;
}

// ===== DAILY REPORT =====
export interface DailyReport {
  id: string;
  date: string;
  projectId: string;
  projectName: string;
  supervisorId: string;
  supervisorName: string;
  workCompleted: string;
  pilesCompleted: number;
  totalPiles: number;
  pendingPiles: number;
  labourCount: number;
  machineryUsed: string[];
  dieselUsed: number;
  materialsUsed: string;
  problems?: string;
  remarks?: string;
  photos?: string[];
  submittedBy: string;
  submittedByName: string;
  submittedAt: string;
  status: "submitted" | "pending" | "reviewed";
}

// ===== BILLING =====
export type BillStatus = "draft" | "submitted" | "partially_paid" | "paid" | "overdue";

export interface Bill {
  id: string;
  billNumber: string;
  billDate: string;
  clientId: string;
  clientName: string;
  projectId: string;
  projectName: string;
  basicAmount: number;
  cgst: number;
  sgst: number;
  grossAmount: number;
  tds: number;
  retention: number;
  netPayable: number;
  totalPaid: number;
  outstanding: number;
  paymentStatus: BillStatus;
  remarks?: string;
  payments: Payment[];
  createdAt: string;
}

export interface Payment {
  id: string;
  billId: string;
  paymentDate: string;
  amount: number;
  paymentMode: "cash" | "cheque" | "neft" | "rtgs" | "upi" | "other";
  referenceNumber?: string;
  remarks?: string;
}

// ===== INVENTORY =====
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  openingStock: number;
  received: number;
  issued: number;
  currentStock: number;
  minimumStock: number;
  location?: string;
  supplier?: string;
  lastUpdated: string;
}

export interface StockTransaction {
  id: string;
  date: string;
  itemId: string;
  itemName: string;
  quantity: number;
  projectId?: string;
  projectName?: string;
  employeeId?: string;
  employeeName?: string;
  type: "stock_in" | "stock_out" | "adjustment";
  remarks?: string;
  createdAt: string;
}

// ===== TOOLS & ASSETS =====
export type AssetStatus = "available" | "issued" | "under_repair" | "lost" | "damaged";

export interface Asset {
  id: string;
  assetId: string;
  name: string;
  category: string;
  condition: string;
  currentLocation: string;
  assignedTo?: string;
  assignedToName?: string;
  projectId?: string;
  projectName?: string;
  issueDate?: string;
  expectedReturn?: string;
  status: AssetStatus;
}

// ===== MACHINERY =====
export type MachineStatus = "working" | "idle" | "under_maintenance" | "breakdown";

export interface Machine {
  id: string;
  machineId: string;
  name: string;
  type: string;
  model: string;
  registrationNumber?: string;
  currentProjectId?: string;
  currentProjectName?: string;
  operatorId?: string;
  operatorName?: string;
  status: MachineStatus;
  hourMeter: number;
  lastMaintenance?: string;
  nextMaintenance?: string;
}

// ===== DIESEL / FUEL =====
export interface DieselLog {
  id: string;
  date: string;
  projectId: string;
  projectName: string;
  machineId: string;
  machineName: string;
  operatorId?: string;
  operatorName?: string;
  openingStock: number;
  dieselReceived: number;
  dieselUsed: number;
  closingStock: number;
  machineHours: number;
  rate: number;
  totalCost: number;
  dieselPerHour?: number;
  remarks?: string;
  enteredBy: string;
  createdAt: string;
}

// ===== MAINTENANCE =====
export type MaintenanceStatus = "scheduled" | "in_progress" | "completed" | "overdue";

export interface MaintenanceRecord {
  id: string;
  machineId: string;
  machineName: string;
  maintenanceType: "preventive" | "corrective" | "emergency";
  date: string;
  description: string;
  cost: number;
  vendor?: string;
  partsUsed?: string;
  nextServiceDate?: string;
  status: MaintenanceStatus;
  invoiceDocument?: string;
}

// ===== LABOUR =====
export interface LabourAttendance {
  id: string;
  employeeId: string;
  employeeName: string;
  role: string;
  projectId: string;
  projectName: string;
  date: string;
  attendance: "present" | "absent" | "half_day" | "leave";
  shift: "day" | "night";
  hours: number;
  overtime: number;
  remarks?: string;
}

// ===== EXPENSES =====
export type ExpenseCategory =
  | "diesel"
  | "material"
  | "labour"
  | "machinery"
  | "repair"
  | "transport"
  | "site_expense"
  | "office_expense"
  | "other";

export interface Expense {
  id: string;
  date: string;
  projectId?: string;
  projectName?: string;
  category: ExpenseCategory;
  vendor?: string;
  description: string;
  basicAmount: number;
  gst: number;
  totalAmount: number;
  paymentStatus: "paid" | "pending" | "partial";
  paymentMode?: string;
  receipt?: string;
  enteredBy: string;
  enteredByName: string;
  createdAt: string;
}

// ===== VENDOR =====
export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email?: string;
  address: string;
  gstNumber?: string;
  category: string;
  outstanding: number;
}

export interface PurchaseOrder {
  id: string;
  vendorId: string;
  vendorName: string;
  date: string;
  projectId?: string;
  projectName?: string;
  items: string;
  quantity: number;
  amount: number;
  gst: number;
  totalAmount: number;
  paymentStatus: "paid" | "pending" | "partial";
  document?: string;
}

// ===== CLIENT =====
export interface Client {
  id: string;
  name: string;
  company: string;
  phone: string;
  email?: string;
  address: string;
  gstNumber?: string;
  projects: string[];
  totalBilled: number;
  totalReceived: number;
  outstanding: number;
}

// ===== DOCUMENT =====
export type DocumentType =
  | "bill"
  | "receipt"
  | "site_photo"
  | "agreement"
  | "work_order"
  | "test_report"
  | "machine_document"
  | "other";

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  fileUrl: string;
  fileSize: string;
  projectId?: string;
  projectName?: string;
  clientId?: string;
  billId?: string;
  machineId?: string;
  employeeId?: string;
  uploadedBy: string;
  uploadedByName: string;
  uploadedAt: string;
  tags?: string[];
}

// ===== NOTIFICATION =====
export type NotificationType =
  | "low_stock"
  | "bill_overdue"
  | "payment_received"
  | "maintenance_due"
  | "report_pending"
  | "tool_not_returned"
  | "diesel_alert"
  | "project_milestone"
  | "general";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

// ===== ACTIVITY =====
export interface Activity {
  id: string;
  message: string;
  type: "pile" | "stock" | "payment" | "diesel" | "report" | "expense" | "maintenance" | "general";
  timestamp: string;
  userId?: string;
  userName?: string;
}
