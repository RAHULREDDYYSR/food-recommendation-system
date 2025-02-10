import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative w-10 h-10 rounded-xl hover:bg-orange-100 dark:hover:bg-gray-800 transition-all duration-200"
        >
          <Sun className={`h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all duration-200 text-orange-500
            ${theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} 
          />
          <Moon className={`h-[1.4rem] w-[1.4rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all duration-200 text-blue-500
            ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} 
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="w-36 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-700/50 focus:bg-orange-50 dark:focus:bg-gray-700/50 rounded-lg transition-colors"
        >
          <Sun className="h-4 w-4 text-orange-500" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-700/50 focus:bg-orange-50 dark:focus:bg-gray-700/50 rounded-lg transition-colors"
        >
          <Moon className="h-4 w-4 text-blue-500" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-700/50 focus:bg-orange-50 dark:focus:bg-gray-700/50 rounded-lg transition-colors"
        >
          <span className="h-4 w-4 text-gray-500">💻</span>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}