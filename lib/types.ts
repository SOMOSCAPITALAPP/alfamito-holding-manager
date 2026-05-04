export type Locale = "fr" | "pt";

export type UserRole = "admin" | "manager" | "viewer";

export type User = {
  email: string;
  name: string;
  role: UserRole;
  password: string;
};

export type Company = {
  name: string;
  legalForm: Record<Locale, string>;
  rcs: string;
  euid: string;
  shareCapital: string;
  manager: string;
  registeredOffice: string;
  taxNumber: string;
  nace: string;
  taxStatus: Record<Locale, string>;
  corporatePurpose: Record<Locale, string>;
  financialYear: Record<Locale, string>;
  accountsApproval: Record<Locale, string>;
  governanceStatus: Record<Locale, string>;
  latestFiledAccounts: Record<Locale, string>;
};

export type DocumentCategory =
  | "legal"
  | "tax"
  | "accounting"
  | "finance"
  | "bank"
  | "realEstate";

export type CompanyDocument = {
  id: string;
  title: string;
  category: DocumentCategory;
  date: string;
  language: string;
  description: string;
  path: string;
  priority?: "essential" | "important" | "archive";
  confidentiality?: "standard" | "confidential" | "restricted";
  analysis?: string;
  evidence?: string;
};

export type FinancialScheduleItem = {
  id: string;
  label: string;
  beneficiary: string;
  category: "fiduciary" | "tax" | "bank" | "loan" | "corporate";
  amount: number;
  currency: "EUR";
  dueDate: string;
  status: "upcoming" | "to_confirm" | "paid";
  recurrence: string;
  sourceDocumentId: string;
  note: string;
};

export type CentralisMail = {
  id: string;
  subject: string;
  from: string;
  date: string;
  status: string;
  deadline: string;
  summary: string;
  nextAction: string;
  relatedDocumentIds: string[];
};

export type LbrFiling = {
  depositNumber: string;
  date: string;
  type: string;
  detail: string;
  category: "legal" | "accounting";
  documentId: string | null;
  status: "present" | "to_download" | "no_document";
};

export type DocumentAudit = {
  summary: Record<Locale, string>;
  riskNote: Record<Locale, string>;
  essentialDocumentIds: string[];
  removeOrRestrictIds: string[];
};

export type Translations = Record<Locale, Record<string, string>>;
