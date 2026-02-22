import { useState } from "react";
import { 
  Star, 
  Square, 
  CheckSquare,
  RotateCw,
  ChevronDown,
  Archive,
  AlertOctagon,
  Trash2,
  Mail,
  MailOpen,
  Clock,
  CheckCircle,
  FolderInput,
  Tag,
  MoreVertical,
  Inbox,
  Users,
  Info,
  GripVertical,
  Calendar
} from "lucide-react";
import { type Invoice } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MailUnreadIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 10.5V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h11.5" />
    <path d="m22 8.5-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 8.5" />
    <circle cx="21" cy="3" r="3" fill="currentColor" stroke="none" />
  </svg>
);

interface InvoiceListProps {
  invoices: Invoice[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onToggleRead: (ids: string[], read: boolean) => void;
}

export function InvoiceList({ invoices, selectedId, onSelect, onToggleRead }: InvoiceListProps) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const handleCheck = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const next = new Set(checkedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCheckedIds(next);
  };

  const handleCheckAll = () => {
    if (checkedIds.size === invoices.length && invoices.length > 0) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(invoices.map(i => i.id)));
    }
  };

  const handleSelectGroup = (group: string) => {
    if (group === 'All') setCheckedIds(new Set(invoices.map(i => i.id)));
    if (group === 'None') setCheckedIds(new Set());
    if (group === 'Read') setCheckedIds(new Set(invoices.filter(i => i.read).map(i => i.id)));
    if (group === 'Unread') setCheckedIds(new Set(invoices.filter(i => !i.read).map(i => i.id)));
    if (group === 'Starred') setCheckedIds(new Set(invoices.filter(i => i.starred).map(i => i.id)));
    if (group === 'Unstarred') setCheckedIds(new Set(invoices.filter(i => !i.starred).map(i => i.id)));
  };

  const handleMarkAsRead = (read: boolean) => {
    if (checkedIds.size > 0) {
      onToggleRead(Array.from(checkedIds), read);
      setCheckedIds(new Set());
    }
  };

  const hasChecked = checkedIds.size > 0;
  const CheckIcon = hasChecked ? CheckSquare : Square;

  return (
    <div className="w-[450px] lg:w-[500px] flex-shrink-0 border-r flex flex-col bg-card relative">
      {/* Action Menu Row */}
      <div className="h-12 border-b flex items-center px-4 gap-1 text-muted-foreground bg-secondary/30 sticky top-0 z-10">
        <div className="flex items-center gap-0.5 mr-2">
          <div 
            className="hover:bg-secondary/50 rounded px-1.5 py-1.5 cursor-pointer flex items-center"
            onClick={handleCheckAll}
          >
            <CheckIcon className={cn("w-4 h-4", hasChecked ? "text-primary" : "")} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="hover:bg-secondary/50 rounded px-1 py-1.5 cursor-pointer flex items-center">
                <ChevronDown className="w-3 h-3" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem onClick={() => handleSelectGroup('All')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelectGroup('None')}>None</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelectGroup('Read')}>Read</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelectGroup('Unread')}>Unread</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelectGroup('Starred')}>Starred</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelectGroup('Unstarred')}>Unstarred</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <button 
          className="hover:text-foreground hover:bg-secondary/50 p-1.5 rounded"
          onClick={(e) => {
            e.stopPropagation();
            handleMarkAsRead(false);
          }}
          title="Mark as unread"
        >
          <MailUnreadIcon className="w-4 h-4" />
        </button>
        <button 
          className="hover:text-foreground hover:bg-secondary/50 p-1.5 rounded"
          onClick={(e) => {
            e.stopPropagation();
            handleMarkAsRead(true);
          }}
          title="Mark as read"
        >
          <MailOpen className="w-4 h-4" />
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
          <Badge variant="outline" className="ml-1 h-5 px-1.5 py-0 text-[10px] rounded-full bg-primary/10 text-primary border-transparent">1 new</Badge>
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
                  isSelected 
                    ? "bg-[#d3e3fd] dark:bg-[#414549] text-[#001d35] dark:text-[#e8eaed]" 
                    : !invoice.read 
                      ? "bg-white dark:bg-[#202124] text-foreground" 
                      : "bg-[#f2f6fc] dark:bg-[#202124] text-[#444746] dark:text-[#bdc1c6]",
                  !isSelected && "hover:shadow-[inset_1px_0_0_0_#dadce0,-1px_0_0_0_#dadce0_inset,0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] dark:hover:shadow-[inset_1px_0_0_0_#5f6368,-1px_0_0_0_#5f6368_inset,0_1px_2px_0_rgba(0,0,0,0.3),0_1px_3px_1px_rgba(0,0,0,0.15)] z-0 hover:z-10 bg-clip-padding"
                )}
              >
                {/* Floating Hover Action Menu - Positioned lower right */}
                <div className={cn(
                  "absolute right-3 bottom-3 hidden group-hover:flex items-center gap-1 z-10 px-1 py-0.5 rounded shadow-[0_1px_2px_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_1px_3px_1px_rgba(0,0,0,0.15)]",
                  isSelected 
                    ? "bg-[#d3e3fd] dark:bg-[#414549]" 
                    : !invoice.read 
                      ? "bg-white dark:bg-[#202124]" 
                      : "bg-[#f2f6fc] dark:bg-[#202124]"
                )}>
                  <div className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" title="Archive">
                    <Archive className="w-[18px] h-[18px]" />
                  </div>
                  <div className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" title="Delete">
                    <Trash2 className="w-[18px] h-[18px]" />
                  </div>
                  <div 
                    className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" 
                    title="Mark as unread"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleRead([invoice.id], false);
                    }}
                  >
                    <MailUnreadIcon className="w-[18px] h-[18px]" />
                  </div>
                  <div className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" title="Snooze">
                    <Clock className="w-[18px] h-[18px]" />
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-1 relative">
                  
                  {/* Drag Handle - shows on hover */}
                  <div className="absolute -left-2 top-[1px] opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-[#cccccc] dark:text-[#5f6368] hover:text-[#444746] dark:hover:text-[#e8eaed]">
                    <GripVertical className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  </div>
                  
                  <div 
                    className={cn(
                      "flex gap-3 transition-opacity ml-2 items-center",
                      !isSelected && invoice.read ? "opacity-50 group-hover:opacity-100" : ""
                    )}
                    onClick={(e) => handleCheck(e, invoice.id)}
                  >
                    {checkedIds.has(invoice.id) ? (
                      <CheckSquare className="w-[18px] h-[18px] text-[#0b57d0] dark:text-[#a8c7fa]" />
                    ) : (
                      <Square className={cn("w-[18px] h-[18px]", isSelected ? "text-[#0b57d0] dark:text-[#a8c7fa]" : "")} />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 overflow-hidden flex-1 pl-1">
                    <Avatar className="w-5 h-5 rounded-sm">
                      <AvatarImage src={invoice.vendor.logo} />
                      <AvatarFallback className="text-[10px] rounded-sm">{invoice.vendor.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className={cn(
                      "truncate text-sm", 
                      !invoice.read ? "font-bold text-[#001d35] dark:text-[#e8eaed]" : "text-[#444746] dark:text-[#bdc1c6]"
                    )}>
                      {invoice.vendor.name}
                    </span>
                    {invoice.vendor.status && (
                      <div 
                        className="group/tooltip relative flex items-center"
                      >
                        <span className={cn(
                          "hidden group-hover:inline-flex items-center text-[9px] font-medium px-1.5 py-0 h-4 rounded border whitespace-nowrap",
                          invoice.vendor.status === "Top" ? "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700" :
                          invoice.vendor.status === "Regular" ? "bg-green-500/10 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30" :
                          invoice.vendor.status === "Periodical" ? "bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30" :
                          invoice.vendor.status === "Known" ? "bg-purple-500/10 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30" :
                          invoice.vendor.status === "Unknown" ? "bg-orange-500/10 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-500/30" :
                          "bg-red-500/10 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30"
                        )}>
                          {invoice.vendor.status}
                        </span>
                        
                        {/* Tooltip */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover/tooltip:block z-50">
                          <div className="bg-black/80 backdrop-blur-sm text-white text-[11px] px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-xl flex flex-col items-center">
                            <span className="font-semibold mb-0.5">{invoice.vendor.status}</span>
                            <span className="text-white/80">
                              {invoice.vendor.status === "Top" && "Extremely consistent supplier"}
                              {invoice.vendor.status === "Regular" && "Usually monthly"}
                              {invoice.vendor.status === "Periodical" && "Every 2 months"}
                              {invoice.vendor.status === "Known" && "Used before"}
                              {invoice.vendor.status === "Unknown" && "New. Exercise caution, first time system processed invoice from this vendor."}
                              {invoice.vendor.status === "Caution" && "Unexpected, Flagged for some reason"}
                            </span>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/80" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <span className={cn(
                      "text-sm font-mono whitespace-nowrap",
                      !invoice.read ? "text-[#001d35] dark:text-[#e8eaed] font-bold" : "text-[#444746] dark:text-[#bdc1c6] font-medium"
                    )}>
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoice.value)}
                    </span>
                  </div>
                </div>
                
                <div className="pl-9 flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn(
                      "text-sm truncate", 
                      !invoice.read ? "font-bold text-[#001d35] dark:text-[#e8eaed]" : "text-[#444746] dark:text-[#bdc1c6]"
                    )}>
                      {invoice.purpose}
                    </span>
                    <div className="flex items-center gap-2">
                      {invoice.valueCaution && (
                        <span className={cn(
                          "text-[10px] font-medium px-1.5 py-0 h-4 rounded border whitespace-nowrap flex items-center",
                          invoice.valueCaution === "Consistent" ? "bg-green-500/10 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30" :
                          invoice.valueCaution === "Regular" ? "bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30" :
                          invoice.valueCaution === "Review" ? "bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30" :
                          invoice.valueCaution === "Suspicious" ? "bg-orange-500/10 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-500/30" :
                          "bg-red-500/10 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30"
                        )}>
                          {invoice.valueCaution}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-xs whitespace-nowrap opacity-70", 
                        !invoice.read ? "font-bold text-[#001d35] dark:text-[#e8eaed]" : "text-[#444746] dark:text-[#bdc1c6]"
                      )}>
                        {invoice.dateReceived}
                      </span>
                      <span className={cn(
                        "text-[11px] font-medium px-2 py-0.5 rounded-full border border-transparent",
                        invoice.urgency === "High" ? "bg-red-500/15 text-[#444746] dark:bg-red-500/20 dark:text-[#bdc1c6]" :
                        invoice.urgency === "Medium" ? "bg-amber-500/15 text-[#444746] dark:bg-amber-500/20 dark:text-[#bdc1c6]" :
                        "bg-slate-500/15 text-[#444746] dark:bg-slate-500/20 dark:text-[#bdc1c6]",
                        isSelected && invoice.urgency !== "High" && "bg-black/10 dark:bg-white/10"
                      )}>
                        Due: {invoice.dateDue}
                      </span>
                    </div>
                    <Star className={cn(
                      "w-[16px] h-[16px] flex-shrink-0", 
                      invoice.starred ? "fill-yellow-400 text-yellow-400 opacity-100" : "text-muted-foreground opacity-50 hover:opacity-100",
                      isSelected && !invoice.starred ? "text-[#001d35] dark:text-[#e8eaed]" : ""
                    )} />
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