import { 
  Star, 
  Square, 
  RotateCw,
  ChevronDown,
  Archive,
  AlertOctagon,
  Trash2,
  Mail,
  Clock,
  CheckCircle,
  FolderInput,
  Tag,
  MoreVertical,
  Inbox,
  Users,
  Info
} from "lucide-react";
import { type Invoice } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface InvoiceListProps {
  invoices: Invoice[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InvoiceList({ invoices, selectedId, onSelect }: InvoiceListProps) {
  return (
    <div className="w-[450px] lg:w-[500px] flex-shrink-0 border-r flex flex-col bg-card relative">
      {/* Action Menu Row */}
      <div className="h-12 border-b flex items-center px-4 gap-1 text-muted-foreground bg-secondary/30 sticky top-0 z-10">
        <div className="flex items-center gap-0.5 hover:bg-secondary/50 rounded px-1.5 py-1.5 cursor-pointer mr-2">
          <Square className="w-4 h-4" />
          <ChevronDown className="w-3 h-3" />
        </div>
        <button className="hover:text-foreground hover:bg-secondary/50 p-1.5 rounded">
          <Archive className="w-4 h-4" />
        </button>
        <button className="hover:text-foreground hover:bg-secondary/50 p-1.5 rounded">
          <AlertOctagon className="w-4 h-4" />
        </button>
        <button className="hover:text-foreground hover:bg-secondary/50 p-1.5 rounded">
          <Trash2 className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-border mx-1"></div>
        <button className="hover:text-foreground hover:bg-secondary/50 p-1.5 rounded">
          <Mail className="w-4 h-4" />
        </button>
        <button className="hover:text-foreground hover:bg-secondary/50 p-1.5 rounded">
          <Clock className="w-4 h-4" />
        </button>
        <button className="hover:text-foreground hover:bg-secondary/50 p-1.5 rounded">
          <CheckCircle className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-border mx-1"></div>
        <button className="hover:text-foreground hover:bg-secondary/50 p-1.5 rounded">
          <FolderInput className="w-4 h-4" />
        </button>
        <button className="hover:text-foreground hover:bg-secondary/50 p-1.5 rounded">
          <Tag className="w-4 h-4" />
        </button>
        <button className="hover:text-foreground hover:bg-secondary/50 p-1.5 rounded">
          <MoreVertical className="w-4 h-4" />
        </button>
        
        <div className="ml-auto text-xs font-medium">
          1-{invoices.length} of {invoices.length}
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-border/50 bg-secondary/10 overflow-x-auto no-scrollbar">
        <button className="flex items-center gap-2 px-4 py-3 border-b-2 border-primary text-primary font-medium text-sm whitespace-nowrap min-w-max">
          <Inbox className="w-4 h-4" />
          Primary
          <Badge variant="default" className="ml-1 h-5 px-1.5 py-0 text-[10px] rounded-full">1 new</Badge>
        </button>
        <button className="flex items-center gap-2 px-4 py-3 border-b-2 border-transparent text-muted-foreground hover:bg-secondary/30 text-sm transition-colors whitespace-nowrap min-w-max">
          <Tag className="w-4 h-4" />
          Promotions
        </button>
        <button className="flex items-center gap-2 px-4 py-3 border-b-2 border-transparent text-muted-foreground hover:bg-secondary/30 text-sm transition-colors whitespace-nowrap min-w-max">
          <Users className="w-4 h-4" />
          Social
        </button>
        <button className="flex items-center gap-2 px-4 py-3 border-b-2 border-transparent text-muted-foreground hover:bg-secondary/30 text-sm transition-colors whitespace-nowrap min-w-max">
          <Info className="w-4 h-4" />
          Updates
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {invoices.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No invoices here!
          </div>
        ) : (
          invoices.map((invoice) => {
            const isSelected = selectedId === invoice.id;
            return (
              <div 
                key={invoice.id}
                onClick={() => onSelect(invoice.id)}
                className={cn(
                  "group flex flex-col border-b border-border/50 p-3 cursor-pointer transition-colors relative",
                  isSelected ? "bg-primary/10 shadow-[inset_3px_0_0_0_hsl(var(--primary))]" : "hover:bg-secondary/50",
                  !invoice.read && !isSelected ? "bg-card" : ""
                )}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex gap-2 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
                    <Square className="w-4 h-4" />
                    <Star className={cn("w-4 h-4", invoice.starred && "fill-yellow-400 text-yellow-400 opacity-100")} />
                  </div>
                  
                  <div className="flex items-center gap-2 overflow-hidden flex-1">
                    <Avatar className="w-5 h-5 rounded-sm">
                      <AvatarImage src={invoice.vendor.logo} />
                      <AvatarFallback className="text-[10px] rounded-sm">{invoice.vendor.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className={cn("truncate text-sm", !invoice.read ? "font-bold text-foreground" : "text-muted-foreground")}>
                      {invoice.vendor.name}
                    </span>
                    {invoice.vendor.location && (
                      <span className="text-[10px] text-muted-foreground hidden group-hover:inline-block truncate">
                        • {invoice.vendor.location}
                      </span>
                    )}
                  </div>
                  
                  <span className={cn("text-xs whitespace-nowrap", !invoice.read ? "font-bold text-foreground" : "text-muted-foreground")}>
                    {invoice.dateReceived}
                  </span>
                </div>
                
                <div className="pl-9 flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn("text-sm truncate", !invoice.read ? "font-bold text-foreground" : "text-foreground")}>
                      {invoice.purpose}
                    </span>
                    <span className="text-sm font-mono font-medium whitespace-nowrap text-primary">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoice.value)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={invoice.urgency === "High" ? "destructive" : invoice.urgency === "Medium" ? "secondary" : "outline"} className="text-[10px] px-1.5 py-0 h-4">
                        {invoice.urgency} Urgency
                      </Badge>
                      <span className="text-xs text-muted-foreground truncate opacity-70">
                        {invoice.documentType.toUpperCase()} Attached
                      </span>
                    </div>
                    <span className={cn(
                      "text-xs font-medium",
                      invoice.status === "inbox" ? "text-destructive" : "text-muted-foreground"
                    )}>
                      Due: {invoice.dateDue}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}