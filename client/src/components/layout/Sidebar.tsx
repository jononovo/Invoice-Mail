import { 
  Inbox, 
  Send, 
  FileBox, 
  Clock, 
  Star, 
  Plus, 
  ChevronDown,
  AlertCircle,
  ShieldAlert,
  MessageSquare
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
  const contestStats = getStats('contest');
  const inquireStats = getStats('inquire');
  const flaggedStats = getStats('flagged');

  const navItems = [
    { id: 'inbox' as const, label: 'To Pay (Inbox)', icon: Inbox, count: inboxStats.count, value: inboxStats.value },
    { id: 'scheduled' as const, label: 'Scheduled', icon: Clock, count: scheduledStats.count, value: scheduledStats.value },
    { id: 'paid' as const, label: 'Paid', icon: Send, count: paidStats.count, value: paidStats.value },
    { id: 'blocked' as const, label: 'Blocked', icon: FileBox, count: blockedStats.count, value: blockedStats.value },
    { id: 'inquire' as const, label: 'Inquire', icon: MessageSquare, count: inquireStats.count, value: inquireStats.value },
    { id: 'contest' as const, label: 'Contest', icon: ShieldAlert, count: contestStats.count, value: contestStats.value },
    { id: 'flagged' as const, label: 'Spam/Fraud', icon: AlertCircle, count: flaggedStats.count, value: flaggedStats.value },
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
                  ? "bg-[#d3e3fd] dark:bg-[#414549] text-[#001d35] dark:text-[#e8eaed] font-semibold" 
                  : "text-[#444746] dark:text-[#e8eaed] hover:bg-black/5 dark:hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-4">
                <Icon className={cn("w-[18px] h-[18px]", isActive ? "text-[#001d35] dark:text-[#e8eaed]" : "text-[#444746] dark:text-[#e8eaed]")} />
                <span className="text-[14px]">{item.label}</span>
              </div>
              {item.count > 0 && (
                <div className="flex items-baseline gap-1 text-xs ml-auto">
                  <span className={cn("font-medium tracking-tight", isActive ? "text-[#001d35] dark:text-[#e8eaed] font-bold" : "text-[#444746] dark:text-[#e8eaed]")}>
                    {item.value}
                  </span>
                  <span className={cn("text-[11px]", isActive ? "text-[#001d35]/70 dark:text-[#e8eaed]/70 font-medium" : "text-[#444746]/70 dark:text-[#e8eaed]/70")}>
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