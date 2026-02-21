export type Urgency = "High" | "Medium" | "Low";
export type InvoiceStatus = "inbox" | "scheduled" | "paid" | "blocked" | "contest" | "inquire";
export type DocumentType = "pdf" | "inline" | "link";
export type SupplierStatus = "Top" | "Regular" | "Periodical" | "Known" | "Unknown" | "Caution";
export type ValueCaution = "Consistent" | "Regular" | "Review" | "Suspicious" | "Caution";

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  location?: string;
  status: SupplierStatus;
}

export interface Invoice {
  id: string;
  vendor: Vendor;
  purpose: string;
  value: number;
  dateReceived: string;
  dateDue: string;
  urgency: Urgency;
  status: InvoiceStatus;
  documentType: DocumentType;
  body: string;
  read: boolean;
  starred: boolean;
  valueCaution: ValueCaution;
}

export const mockInvoices: Invoice[] = [
  {
    id: "inv-1",
    vendor: {
      id: "v1",
      name: "Hubstaff",
      logo: "https://logo.clearbit.com/hubstaff.com",
      location: "San Francisco, CA",
      status: "Regular",
    },
    purpose: "Monthly Team Time Tracking & Payroll",
    value: 450.0,
    dateReceived: "10:10 AM",
    dateDue: "Feb 28",
    urgency: "High",
    status: "inbox",
    documentType: "inline",
    body: "<h1>Invoice #40291</h1><p>Your monthly subscription for Hubstaff is due.</p>",
    read: false,
    starred: true,
    valueCaution: "Consistent",
  },
  {
    id: "inv-2",
    vendor: {
      id: "v2",
      name: "Superhuman",
      logo: "https://logo.clearbit.com/superhuman.com",
      location: "San Francisco, CA",
      status: "Periodical",
    },
    purpose: "Annual Enterprise License",
    value: 3600.0,
    dateReceived: "9:07 AM",
    dateDue: "Mar 01",
    urgency: "Medium",
    status: "inbox",
    documentType: "pdf",
    body: "Please find attached the invoice for the Superhuman annual enterprise license for your team of 10.",
    read: true,
    starred: false,
    valueCaution: "Regular",
  },
  {
    id: "inv-3",
    vendor: {
      id: "v3",
      name: "Polsia",
      logo: "https://logo.clearbit.com/stripe.com", // dummy logo
      location: "Austin, TX",
      status: "Top",
    },
    purpose: "Q1 Consulting Retainer",
    value: 12500.0,
    dateReceived: "8:23 AM",
    dateDue: "Feb 25",
    urgency: "High",
    status: "inbox",
    documentType: "pdf",
    body: "Invoice for white-label AI consulting services provided in Q1.",
    read: false,
    starred: false,
    valueCaution: "Review",
  },
  {
    id: "inv-4",
    vendor: {
      id: "v4",
      name: "Notion",
      logo: "https://logo.clearbit.com/notion.so",
      location: "San Francisco, CA",
      status: "Known",
    },
    purpose: "Workspace Plus - 15 Seats",
    value: 300.0,
    dateReceived: "Yesterday",
    dateDue: "Mar 10",
    urgency: "Low",
    status: "inbox",
    documentType: "inline",
    body: "Your Notion Workspace Plus subscription will renew next month.",
    read: true,
    starred: false,
    valueCaution: "Consistent",
  },
  {
    id: "inv-5",
    vendor: {
      id: "v5",
      name: "AWS",
      logo: "https://logo.clearbit.com/aws.amazon.com",
      location: "Seattle, WA",
      status: "Caution",
    },
    purpose: "Cloud Infrastructure Usage - Jan",
    value: 840.50,
    dateReceived: "Feb 18",
    dateDue: "Feb 20",
    urgency: "High",
    status: "blocked",
    documentType: "pdf",
    body: "We need more information regarding the EC2 instance spike on Jan 14th before approving this payment.",
    read: true,
    starred: true,
    valueCaution: "Caution",
  },
];