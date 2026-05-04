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
  shareCapital: string;
  manager: string;
  registeredOffice: string;
  taxStatus: Record<Locale, string>;
  corporatePurpose: Record<Locale, string>;
  financialYear: Record<Locale, string>;
  accountsApproval: Record<Locale, string>;
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
  language: Locale;
  description: string;
  path: string;
};

export type Translations = Record<Locale, Record<string, string>>;
