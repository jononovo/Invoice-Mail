import { 
  Inbox, 
  Send, 
  FileBox, 
  Clock, 
  Star, 
  Plus, 
  ChevronDown,
  AlertCircle
} from "lucide-react";
import { type InvoiceStatus, mockInvoices } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeFolder: InvoiceStatus;
  onFolderChange: (folder: InvoiceStatus) => void;
}

export function Sidebar({ activeFolder, onFolderChange }: SidebarProps) {
  
  const getStats = (status: InvoiceStatus) => {
    const items = mockInvoices.filter(i => i.status === status);
    const totalValue = items.reduce((sum, item) => sum + item.value, 0);
    return {
      count: items.length,
      value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalValue)
    };
  };

  const inboxStats = getStats('inbox');
  const blockedStats = getStats('blocked');
  const paidStats = getStats('paid');
  const scheduledStats = getStats('scheduled');

  const navItems = [
    { id: 'inbox' as const, label: 'Inbox', icon: Inbox, count: inboxStats.count, value: inboxStats.value },
    { id: 'scheduled' as const, label: 'Scheduled', icon: Clock, count: scheduledStats.count, value: scheduledStats.value },
    { id: 'paid' as const, label: 'Paid', icon: Send, count: paidStats.count, value: paidStats.value },
    { id: 'blocked' as const, label: 'Blocked / Unsure', icon: FileBox, count: blockedStats.count, value: blockedStats.value },
  ];

  return (
    <div className="w-[260px] flex-shrink-0 flex flex-col py-3 px-2 text-sm font-medium">
      <div className="px-2 mb-4">
        <button className="flex items-center gap-4 bg-[#c2e7ff] text-[#001d35] hover:bg-[#b0d5f1] dark:bg-[#c2e7ff] dark:hover:bg-[#b0d5f1] px-5 py-4 rounded-2xl transition-all font-medium">
          <Plus className="w-5 h-5" />
          <span className="text-base">Upload Invoice</span>
        </button>
      </div>

      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = activeFolder === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onFolderChange(item.id)}
              className={cn(
                "flex items-center justify-between px-4 py-2 rounded-r-full mr-2 transition-colors",
                isActive 
                  ? "bg-primary/20 text-primary-foreground font-semibold" 
                  : "text-foreground hover:bg-secondary/50"
              )}
            >
              <div className="flex items-center gap-4">
                <Icon className={cn("w-5 h-5", isActive ? "text-primary text-opacity-100" : "text-muted-foreground")} />
                <span>{item.label}</span>
              </div>
              {item.count > 0 && (
                <div className="flex items-baseline gap-1 text-xs ml-auto">
                  <span className={cn("font-mono tracking-tight", isActive ? "text-[#0b57d0] dark:text-[#a8c7fa] font-bold" : "text-foreground font-medium")}>
                    {item.value}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    /{item.count}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-6 pt-4 border-t border-border/50 px-4">
        <div className="flex items-center justify-between text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          <span>Labels</span>
          <Plus className="w-4 h-4" />
        </div>
        
        <div className="mt-3 flex flex-col gap-2 text-muted-foreground">
          <div className="flex items-center gap-3 hover:text-foreground cursor-pointer">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span>High Urgency</span>
          </div>
          <div className="flex items-center gap-3 hover:text-foreground cursor-pointer">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span>Missing W-9</span>
          </div>
          <div className="flex items-center gap-3 hover:text-foreground cursor-pointer">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Contractors</span>
          </div>
        </div>
      </div>
    </div>
  );
}