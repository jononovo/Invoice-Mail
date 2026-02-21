import { 
  Printer, 
  Share2, 
  MoreVertical, 
  Reply, 
  Forward,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building,
  Star
} from "lucide-react";
import { type Invoice } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function InvoiceDetail({ invoice }: { invoice: Invoice }) {
  return (
    <div className="flex-1 flex flex-col bg-card overflow-hidden">
      {/* Header Actions */}
      <div className="h-12 border-b flex items-center px-6 gap-4 text-muted-foreground bg-secondary/30">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Printer className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" className="h-8 rounded-full border-transparent bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Block
          </Button>
          <Button variant="outline" className="h-8 rounded-full border-transparent bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground">
            <Clock className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button className="h-8 rounded-full bg-[#c2e7ff] hover:bg-[#b0d5f1] text-[#001d35] border-0">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Pay Now
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {/* Email Header Info */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-2xl font-normal text-foreground">
              {invoice.purpose}
              <span className="text-muted-foreground ml-3 font-mono font-medium bg-secondary px-3 py-1 rounded-md text-xl">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoice.value)}
              </span>
            </h1>
            <div className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground ml-2">External</div>
            <div className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground">Inbox x</div>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 border shadow-sm">
                <AvatarImage src={invoice.vendor.logo} />
                <AvatarFallback><Building className="w-5 h-5 text-muted-foreground" /></AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">{invoice.vendor.name}</span>
                  <span className="text-sm text-muted-foreground">&lt;billing@{invoice.vendor.name.toLowerCase().replace(/\s/g, '')}.com&gt;</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  to me <span className="mx-1">▾</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{invoice.dateReceived} (Received)</span>
              <div className="flex gap-2">
                <Star className="w-4 h-4" />
                <Reply className="w-4 h-4" />
                <MoreVertical className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* The Invoice Document Preview */}
        <div className="border border-border/50 rounded-lg shadow-sm bg-[#ffffff] text-slate-900 min-h-[500px] overflow-hidden">
          {/* Header of the document */}
          <div className="p-8 border-b border-slate-200 flex justify-between items-start bg-slate-50">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img src={invoice.vendor.logo} alt="logo" className="w-8 h-8 rounded" onError={(e) => e.currentTarget.style.display = 'none'} />
                <h2 className="text-2xl font-bold text-slate-800">{invoice.vendor.name}</h2>
              </div>
              <p className="text-sm text-slate-500">{invoice.vendor.location || "123 Business Rd, Suite 100"}</p>
            </div>
            <div className="text-right">
              <h3 className="text-3xl font-light text-slate-300 tracking-wider uppercase mb-2">Invoice</h3>
              <p className="text-sm font-medium">#{Math.floor(Math.random() * 100000)}</p>
              <p className="text-sm text-slate-500 mt-1">Due: {invoice.dateDue}</p>
            </div>
          </div>
          
          <div className="p-8">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: invoice.body }} />
            
            <div className="mt-12">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="py-3 font-semibold text-slate-600">Description</th>
                    <th className="py-3 font-semibold text-slate-600 w-24 text-right">Qty</th>
                    <th className="py-3 font-semibold text-slate-600 w-32 text-right">Price</th>
                    <th className="py-3 font-semibold text-slate-600 w-32 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 text-slate-700">{invoice.purpose}</td>
                    <td className="py-4 text-slate-700 text-right">1</td>
                    <td className="py-4 text-slate-700 text-right">${invoice.value.toFixed(2)}</td>
                    <td className="py-4 text-slate-700 text-right font-medium">${invoice.value.toFixed(2)}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="py-4 text-right font-bold text-slate-700">Total Due:</td>
                    <td className="py-4 text-right font-bold text-xl text-slate-900">${invoice.value.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="rounded-full">
            <Reply className="w-4 h-4 mr-2" />
            Reply
          </Button>
          <Button variant="outline" className="rounded-full">
            <Forward className="w-4 h-4 mr-2" />
            Forward
          </Button>
        </div>
      </div>
    </div>
  );
}