import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { InvoiceList } from "@/components/invoices/InvoiceList";
import { InvoiceDetail } from "@/components/invoices/InvoiceDetail";
import { type Invoice, type InvoiceStatus, mockInvoices } from "@/lib/mock-data";

export default function Home() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [activeFolder, setActiveFolder] = useState<InvoiceStatus>("inbox");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    invoices[0]?.id || null
  );

  const filteredInvoices = invoices.filter(
    (inv) => inv.status === activeFolder
  );

  const selectedInvoice =
    invoices.find((inv) => inv.id === selectedInvoiceId) || null;

  const handleToggleRead = (ids: string[], read: boolean) => {
    setInvoices(prev => prev.map(inv => ids.includes(inv.id) ? { ...inv, read } : inv));
  };

  const handleSelectInvoice = (id: string) => {
    setSelectedInvoiceId(id);
    handleToggleRead([id], true);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeFolder={activeFolder} 
          onFolderChange={(folder) => {
            setActiveFolder(folder);
            setSelectedInvoiceId(null);
          }} 
        />
        <div className="flex flex-1 overflow-hidden rounded-3xl bg-card shadow-2xl mr-4 mb-4 mt-2">
          <InvoiceList 
            invoices={filteredInvoices}
            selectedId={selectedInvoiceId}
            onSelect={handleSelectInvoice}
            onToggleRead={handleToggleRead}
          />
          {selectedInvoice ? (
            <InvoiceDetail invoice={selectedInvoice} />
          ) : (
            <div className="flex-1 hidden md:flex items-center justify-center text-muted-foreground border-l">
              Select an invoice to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}