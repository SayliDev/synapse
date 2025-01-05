import logo from "@/assets/logo.png";
import {
  Ellipsis,
  Folder,
  MessageSquare,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

const Sidebar = () => {
  // Mock data for demonstration
  const categories = [
    { name: "Sales", count: 3, color: "white" },
    { name: "Marketing", count: 5, color: "white" },
    { name: "Negotiation", count: 2, color: "white" },
  ];

  const recentChats = [
    { id: 1, title: "Marketing Strategy Q4 2023 Presentation", date: "2h ago" },
    { id: 2, title: "Sales Pitch Review session", date: "5h ago" },
    { id: 3, title: "Email Campaign Ideas for Q1 2024", date: "1d ago" },
    { id: 4, title: "The Future of Marketing as a Sales Tool", date: "1d ago" },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-300",
    lime: "bg-lime-300",
    yellow: "bg-yellow-300",
    red: "bg-red-300",
    green: "bg-green-300",
    purple: "bg-purple-300",
    pink: "bg-pink-300",
    orange: "bg-orange-300",
    white: "bg-white",
  };

  return (
    <div className="w-1/5 h-screen flex flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="flex items-center  gap-3 mb-4 p-6 border-b border-zinc-800">
        <img src={logo} alt="logo" className="w-8 h-8" />
        <h1 className="font-semibold text-lg text-zinc-50">Synapse AI</h1>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button className="w-full" size="lg">
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-300"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <ScrollArea className="flex-1 px-4">
        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-white mb-2">
            <span>Categories</span>
          </div>
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="ghost"
              className="w-full justify-between mb-1 py-6 text-zinc-300 border border-zinc-800 hover:bg-zinc-800"
            >
              <div className="flex items-center relative">
                <div
                  className={`h-[46px] w-[2px] mr-2 shrink-0 ${
                    colorMap[category.color]
                  } absolute -left-[15px]`}
                />
                <div className="flex items-center">
                  <Folder className="!h-5 !w-5 mr-2" />
                  {category.name}
                </div>
              </div>
              <span className="text-xs text-zinc-500">{category.count}</span>
            </Button>
          ))}
        </div>

        {/* Today */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-white mb-2">
            <span>Today</span>
          </div>

          <Button
            variant="ghost"
            className="group w-full justify-start mb-1 py-5 text-zinc-300 hover:bg-zinc-800 font-normal"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center overflow-hidden relative">
                <MessageSquare className="!h-5 !w-5 mr-2 shrink-0" />

                <div className="relative w-[200px] h-6 overflow-hidden">
                  <span className="absolute top-0 left-0 truncate">
                    Project Needs Help with Sales
                  </span>
                  <div className="absolute inset-0 left-20">
                    {/* Gradient de base */}
                    <div className="absolute inset-0 bg-gradient-to-l from-zinc-950 via-zinc-950/20 to-transparent" />
                    {/* Gradient au hover avec opacité transitionnée */}
                    <div className="absolute inset-0 bg-gradient-to-l from-zinc-800 via-zinc-800/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
              </div>
              <span>
                <Ellipsis className="!h-5 !w-5" />
              </span>
            </div>
          </Button>
        </div>
        {/* Recent Chats */}
        <div>
          <div className="flex items-center justify-between text-sm text-white mb-2">
            <span>Recent Chats</span>
          </div>
          {recentChats.map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              className="w-full justify-start mb-1 text-zinc-300 hover:bg-zinc-800 font-normal group"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center overflow-hidden relative">
                  <MessageSquare className="!h-5 !w-5 mr-2 shrink-0" />

                  <div className="relative w-[200px] h-6 overflow-hidden">
                    <span className="absolute top-0 left-0 truncate">
                      {chat.title}
                    </span>
                    <div className="absolute inset-0 left-20">
                      {/* Gradient de base */}
                      <div className="absolute inset-0 bg-gradient-to-l from-zinc-950 via-zinc-950/20 to-transparent" />
                      {/* Gradient au hover avec opacité transitionnée */}
                      <div className="absolute inset-0 bg-gradient-to-l from-zinc-800 via-zinc-800/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                </div>
                <span>
                  <Ellipsis className="!h-5 !w-5" />
                </span>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* User Profile */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-[#f1f1f1] mr-3 flex items-center justify-center">
              <span className="text-sm font-medium text-black">JD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-100">
                John Doe
              </span>
              <span className="text-xs text-zinc-400">Premium Plan</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-zinc-100"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
