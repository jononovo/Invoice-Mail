"use client"

import { Menu, Search, Settings, HelpCircle, Grip, SlidersHorizontal, CircleDot, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Check initial theme
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background text-foreground transition-colors">
      {/* Left section: Hamburger and Logo */}
      <div className="flex items-center gap-4 w-[240px]">
        <button className="p-3 -ml-2 hover:bg-secondary rounded-full text-muted-foreground transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 text-2xl font-medium tracking-tight">
          <div className="w-8 h-8 rounded-md flex items-center justify-center relative">
            {/* Simple M/envelope icon shape using basic elements to match Gmail roughly */}
            <div className="absolute inset-0 bg-white rounded-sm shadow-sm flex overflow-hidden">
              <div className="w-1/2 bg-blue-500 h-full"></div>
              <div className="w-1/2 bg-red-500 h-full"></div>
              <div className="absolute inset-0 border-t-8 border-l-8 border-r-8 border-t-white border-l-transparent border-r-transparent"></div>
            </div>
          </div>
          <span className="text-[22px] text-foreground dark:text-[#e8eaed]">PayMail</span>
        </div>
      </div>

      {/* Middle section: Search bar */}
      <div className="flex-1 max-w-[720px] px-2">
        <div className="relative group flex items-center bg-secondary dark:bg-[#3c4043] rounded-full overflow-hidden focus-within:bg-white dark:focus-within:bg-white focus-within:shadow-md transition-all h-[48px]">
          <button className="p-3 ml-1 text-muted-foreground group-focus-within:text-gray-600 hover:bg-black/5 dark:hover:bg-white/10 group-focus-within:hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-[20px] h-[20px]" />
          </button>
          
          <Input 
            className="w-full bg-transparent border-none h-full px-0 text-base text-foreground dark:text-[#e8eaed] group-focus-within:text-gray-900 placeholder:text-muted-foreground dark:placeholder:text-muted-foreground group-focus-within:placeholder:text-gray-500 focus-visible:ring-0 rounded-none shadow-none"
            placeholder="Search mail"
          />
          
          <button className="p-3 mr-1 text-muted-foreground group-focus-within:text-gray-600 hover:bg-black/5 dark:hover:bg-white/10 group-focus-within:hover:bg-gray-100 rounded-full transition-colors">
            <SlidersHorizontal className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>

      {/* Right section: Icons and Avatar */}
      <div className="flex items-center gap-1 justify-end w-[280px]">
        <div className="flex items-center gap-1 bg-secondary dark:bg-[#3c4043] rounded-full px-2 py-1 mr-4 cursor-pointer hover:bg-secondary/80 dark:hover:bg-[#4a4d51] transition-colors">
           <CircleDot className="w-4 h-4 text-green-500 dark:text-green-400" />
           <span className="text-sm font-medium pr-1">Away</span>
           <span className="text-xs text-muted-foreground ml-1">▾</span>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2.5 hover:bg-secondary rounded-full text-muted-foreground transition-colors"
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-[22px] h-[22px]" /> : <Moon className="w-[22px] h-[22px]" />}
        </button>
        
        <button className="p-2.5 hover:bg-secondary rounded-full text-muted-foreground transition-colors">
          <HelpCircle className="w-[22px] h-[22px]" />
        </button>
        <button className="p-2.5 hover:bg-secondary rounded-full text-muted-foreground transition-colors">
          <Settings className="w-[22px] h-[22px]" />
        </button>
        <button className="p-2.5 hover:bg-secondary rounded-full text-muted-foreground transition-colors mr-2">
          <Grip className="w-[22px] h-[22px]" />
        </button>
        <Avatar className="w-8 h-8 cursor-pointer hover:ring-4 ring-secondary transition-all">
          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}