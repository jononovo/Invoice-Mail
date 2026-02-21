import { Menu, Search, Settings, HelpCircle, Grip, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b bg-background text-foreground">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-secondary rounded-full text-muted-foreground transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-xl font-medium">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
            <span className="font-bold font-serif">P</span>
          </div>
          <span>PayMail</span>
        </div>
      </div>

      <div className="flex-1 max-w-3xl px-8">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-foreground" />
          <Input 
            className="w-full bg-secondary border-none h-12 pl-12 pr-4 rounded-xl text-base focus-visible:ring-1 focus-visible:bg-background transition-all"
            placeholder="Search pending invoices..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-secondary rounded-full text-muted-foreground transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-secondary rounded-full text-muted-foreground transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-secondary rounded-full text-muted-foreground transition-colors mr-2">
          <Grip className="w-5 h-5" />
        </button>
        <Avatar className="w-9 h-9 border border-border cursor-pointer hover:opacity-80 transition-opacity">
          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}