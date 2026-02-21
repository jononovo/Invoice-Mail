import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { InvoiceList } from "@/components/invoices/InvoiceList";
import { InvoiceDetail } from "@/components/invoices/InvoiceDetail";
import { type Invoice, type InvoiceStatus, mockInvoices } from "@/lib/mock-data";

export default function Home() {
  const [activeFolder, setActiveFolder] = useState<InvoiceStatus>("inbox");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    mockInvoices[0]?.id || null
  );

  const filteredInvoices = mockInvoices.filter(
    (inv) => inv.status === activeFolder
  );

  const selectedInvoice =
    mockInvoices.find((inv) => inv.id === selectedInvoiceId) || null;

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
        <div className="flex flex-1 overflow-hidden rounded-tl-xl bg-card border-t border-l shadow-2xl mr-2 mb-2">
          <InvoiceList 
            invoices={filteredInvoices}
            selectedId={selectedInvoiceId}
            onSelect={setSelectedInvoiceId}
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