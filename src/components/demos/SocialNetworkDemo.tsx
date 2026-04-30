"use client";

import React, { useState } from "react";
import { 
  Users, 
  Heart, 
  MessageSquare, 
  User as UserIcon, 
  LogOut, 
  Shield, 
  Camera, 
  Send,
  MoreVertical,
  Search,
  Bell
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import DemoQuickStart from "@/components/demos/DemoQuickStart";
import { projects } from "@/lib/projects";

// Exact colors from styles.css and .NET/Angular branding
const COLORS = {
  primary: "#E95420", // Ubuntu Orange/Terracotta
  bg: "#F8F9FA",
  textMain: "#333333",
  textMuted: "#8B949E",
  border: "#DEE2E6",
  white: "#FFFFFF",
  accent: "#fbcdcf"
};

type Page = "home" | "members" | "lists" | "messages" | "admin" | "detail";

interface User {
  id: number;
  name: string;
  age: number;
  location: string;
  lastActive: string;
  bio: string;
  photo: string;
}

export default function SocialNetworkDemo() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [quickStartDone, setQuickStartDone] = useState(false);
  const projectData = projects.find((p) => p.id === "social-network");

  // Mock users
  const users: User[] = [
    { id: 1, name: "Lisa", age: 24, location: "London", lastActive: "2 mins ago", bio: "Passionate about photography and travel.", photo: "https://i.pravatar.cc/150?u=lisa" },
    { id: 2, name: "Mark", age: 28, location: "Berlin", lastActive: "1 hour ago", bio: "Full stack developer who loves hiking.", photo: "https://i.pravatar.cc/150?u=mark" },
    { id: 3, name: "Sarah", age: 22, location: "New York", lastActive: "Just now", bio: "Coffee enthusiast and book worm.", photo: "https://i.pravatar.cc/150?u=sarah" },
    { id: 4, name: "James", age: 31, location: "Tokyo", lastActive: "5 mins ago", bio: "Exploring the world, one city at a time.", photo: "https://i.pravatar.cc/150?u=james" }
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActivePage("members");
  };

  const renderNav = () => (
    <nav className="h-14 border-b flex items-center px-4 md:px-8 shrink-0 sticky top-0 z-10" style={{ background: COLORS.white, borderColor: COLORS.border }}>
      <div className="flex items-center gap-2 mr-8">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: COLORS.primary }}>
          SN
        </div>
        <span className="font-bold text-lg tracking-tight hidden sm:inline">SocialNetwork</span>
      </div>

      <div className="flex items-center gap-1 md:gap-4 overflow-x-auto hide-scrollbar">
        {isLoggedIn && (
          <>
            <button 
              onClick={() => setActivePage("members")}
              className={cn("px-3 py-2 text-sm font-medium transition-colors border-b-2", activePage === "members" || activePage === "detail" ? "border-[#E95420] text-[#333333]" : "border-transparent text-zinc-500 hover:text-zinc-800")}
            >
              Members
            </button>
            <button 
              onClick={() => setActivePage("lists")}
              className={cn("px-3 py-2 text-sm font-medium transition-colors border-b-2", activePage === "lists" ? "border-[#E95420] text-[#333333]" : "border-transparent text-zinc-500 hover:text-zinc-800")}
            >
              Lists
            </button>
            <button 
              onClick={() => setActivePage("messages")}
              className={cn("px-3 py-2 text-sm font-medium transition-colors border-b-2", activePage === "messages" ? "border-[#E95420] text-[#333333]" : "border-transparent text-zinc-500 hover:text-zinc-800")}
            >
              Messages
            </button>
            <button 
              onClick={() => setActivePage("admin")}
              className={cn("px-3 py-2 text-sm font-medium transition-colors border-b-2", activePage === "admin" ? "border-[#E95420] text-[#333333]" : "border-transparent text-zinc-500 hover:text-zinc-800")}
            >
              Admin
            </button>
          </>
        )}
      </div>

      <div className="ml-auto flex items-center gap-3">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-zinc-500 cursor-pointer" />
            <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: COLORS.border }}>
              <div className="relative w-8 h-8 rounded-full overflow-hidden border">
                <Image src="https://i.pravatar.cc/150?u=ajay" alt="Me" fill className="object-cover" />
              </div>
              <span className="text-sm font-semibold hidden md:block">Welcome, Ajay</span>
              <LogOut size={18} className="text-zinc-500 cursor-pointer" onClick={() => setIsLoggedIn(false)} />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={handleLogin} className="px-4 py-1.5 rounded-full text-sm font-bold text-white transition-all shadow-md" style={{ background: COLORS.primary }}>
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );

  const renderHome = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl animate-in fade-in zoom-in duration-500">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6" style={{ color: COLORS.textMain }}>
          Real-time. <span style={{ color: COLORS.primary }}>Reactive.</span>
        </h1>
        <p className="text-lg text-zinc-500 mb-10 leading-relaxed">
          My deep dive into building real-time full-stack systems with <span className="font-bold text-[#E95420]">Angular</span> and <span className="font-bold text-[#512BD4]">.NET Core</span>. 
          I built this to master SignalR web sockets, reactive UI patterns, and secure identity management.
        </p>
        {!isLoggedIn && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleLogin}
              className="px-8 py-3 rounded-full text-lg font-bold text-white transition-all hover:scale-105 shadow-xl"
              style={{ background: COLORS.primary }}
            >
              Explore the App
            </button>
            <button className="px-8 py-3 rounded-full text-lg font-bold border-2 transition-all hover:bg-zinc-50" style={{ borderColor: COLORS.primary, color: COLORS.primary }}>
              View My Story
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="p-6 rounded-2xl bg-white shadow-sm border border-zinc-100 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
            <Shield className="text-[#E95420]" size={24} />
          </div>
          <h3 className="font-bold mb-2">Secure .NET API</h3>
          <p className="text-xs text-zinc-500">JWT Authentication & ASP.NET Core Identity management.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white shadow-sm border border-zinc-100 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
            <MessageSquare className="text-blue-600" size={24} />
          </div>
          <h3 className="font-bold mb-2">SignalR Real-time</h3>
          <p className="text-xs text-zinc-500">Low-latency messaging powered by SignalR web sockets.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white shadow-sm border border-zinc-100 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
            <Users className="text-purple-600" size={24} />
          </div>
          <h3 className="font-bold mb-2">Angular Frontend</h3>
          <p className="text-xs text-zinc-500">Reactive UI components with shared services and resolvers.</p>
        </div>
      </div>
    </div>
  );

  const renderMemberDetail = () => (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-in slide-in-from-bottom-4 duration-500">
      {selectedUser && (
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8">
          {/* Left Card */}
          <div className="w-full md:w-80 shrink-0 bg-white rounded-2xl shadow-lg overflow-hidden border border-zinc-100">
            <div className="relative aspect-square">
              <Image src={selectedUser.photo} alt={selectedUser.name} fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-white text-2xl font-bold">{selectedUser.name}, {selectedUser.age}</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Location</p>
                <p className="text-sm font-medium">{selectedUser.location}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Last Active</p>
                <p className="text-sm font-medium">{selectedUser.lastActive}</p>
              </div>
              <div className="flex gap-2 pt-4">
                <button className="flex-1 py-2 rounded-xl font-bold text-white shadow-md text-sm" style={{ background: COLORS.primary }}>
                  Like
                </button>
                <button className="flex-1 py-2 rounded-xl font-bold border-2 text-sm" style={{ borderColor: COLORS.primary, color: COLORS.primary }}>
                  Message
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Tabs */}
          <div className="flex-1 w-full bg-white rounded-2xl shadow-lg border border-zinc-100 overflow-hidden flex flex-col min-h-[500px]">
            <div className="flex border-b" style={{ borderColor: COLORS.border }}>
              {["About", "Interests", "Photos", "Messages"].map((tab) => (
                <button 
                  key={tab}
                  className="px-6 py-4 text-sm font-bold transition-all border-b-2"
                  style={{ 
                    borderColor: tab === "About" ? COLORS.primary : "transparent",
                    color: tab === "About" ? COLORS.textMain : COLORS.textMuted
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold mb-4">Description</h3>
              <p className="text-zinc-600 leading-relaxed">
                {selectedUser.bio}
                <br /><br />
                I&apos;m looking for someone who shares my passion for exploration and has a good sense of humor. 
                Always open to meeting new people and sharing stories.
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Looking for</h3>
                <p className="text-zinc-600">A compatible partner who enjoys the finer things in life.</p>
              </div>

              <div className="mt-12 flex items-center justify-between p-4 rounded-xl bg-orange-50 border border-orange-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#E95420] shadow-sm">
                      <Shield size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#E95420]">Authenticated Session</p>
                      <p className="text-[10px] text-zinc-500">API connection secured via JWT Bearer Token</p>
                    </div>
                </div>
                <div className="text-[10px] font-mono text-zinc-400 bg-white px-2 py-1 rounded border">
                  GET /api/users/{selectedUser.name.toLowerCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMembers = () => (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">Your matches - 4 found</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded-full border px-3 py-1.5 shadow-sm">
            <Search size={16} className="text-zinc-400" />
            <input type="text" placeholder="Search members..." className="bg-transparent border-none outline-none text-xs w-40 ml-2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {users.map((user) => (
          <div 
            key={user.id}
            onClick={() => { setSelectedUser(user); setActivePage("detail"); }}
            className="group cursor-pointer bg-white rounded-2xl shadow-md border border-zinc-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image 
                src={user.photo} 
                alt={user.name} 
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#E95420] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <UserIcon size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#E95420] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75">
                  <Heart size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#E95420] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform delay-150">
                  <MessageSquare size={20} />
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold">{user.name}, {user.age}</h3>
                <div className="flex h-2 w-2 rounded-full bg-green-500" />
              </div>
              <p className="text-xs text-zinc-500">{user.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="flex-1 flex overflow-hidden p-4 md:p-8 animate-in slide-in-from-right-4 duration-500">
      <div className="max-w-6xl mx-auto w-full bg-white rounded-2xl shadow-xl border border-zinc-100 flex overflow-hidden">
        {/* Contact List */}
        <div className="w-1/3 border-r hidden md:flex flex-col" style={{ borderColor: COLORS.border }}>
          <div className="p-6 border-b" style={{ borderColor: COLORS.border }}>
            <h2 className="text-lg font-bold">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {users.slice(0, 3).map((user, i) => (
              <div key={user.id} className={cn("p-4 flex items-center gap-3 cursor-pointer hover:bg-zinc-50 border-b", i === 0 && "bg-orange-50 border-l-4 border-l-[#E95420]")}>
                <div className="relative w-12 h-12 rounded-full overflow-hidden border shadow-sm">
                  <Image src={user.photo} alt={user.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate">{user.name}</p>
                  <p className="text-xs text-zinc-500 truncate">Hey, how are you doing?</p>
                </div>
                <p className="ml-auto text-[10px] text-zinc-400">12:30</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-zinc-50/50">
          <div className="p-4 bg-white border-b flex items-center justify-between" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border">
                <Image src={users[0].photo} alt="Lisa" fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold">Lisa</p>
                <p className="text-[10px] text-green-500 font-bold uppercase">Online</p>
              </div>
            </div>
            <MoreVertical size={18} className="text-zinc-500" />
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-center">
              <span className="px-3 py-1 rounded-full bg-zinc-200 text-[10px] text-zinc-600 font-bold">TODAY</span>
            </div>
            
            <div className="flex items-end gap-2 max-w-[80%]">
              <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                <Image src={users[0].photo} alt="Lisa" fill className="object-cover" />
              </div>
              <div className="p-3 rounded-2xl rounded-bl-none bg-white border border-zinc-100 shadow-sm text-sm">
                Hi Ajay! I saw your profile and loved your travel photos. Where was that beach shot taken?
              </div>
            </div>

            <div className="flex flex-row-reverse items-end gap-2 max-w-[80%] ml-auto">
              <div className="p-3 rounded-2xl rounded-br-none text-white shadow-md text-sm" style={{ background: COLORS.primary }}>
                Thanks Lisa! That was in Bali last summer. It&apos;s an amazing place.
              </div>
            </div>

            <div className="flex items-end gap-2 max-w-[80%]">
              <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                <Image src={users[0].photo} alt="Lisa" fill className="object-cover" />
              </div>
              <div className="p-3 rounded-2xl rounded-bl-none bg-white border border-zinc-100 shadow-sm text-sm">
                Oh wow, Bali is on my bucket list! How was the food there?
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border-t" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
                <Camera size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Send a message..." 
                className="flex-1 bg-zinc-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#E95420] outline-none" 
              />
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg" style={{ background: COLORS.primary }}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full rounded-lg border overflow-hidden flex flex-col font-sans text-sm relative shadow-2xl" style={{ borderColor: COLORS.border, background: COLORS.bg }}>
      {renderNav()}
      
      <main className="flex-1 overflow-hidden flex flex-col">
        {activePage === "home" && renderHome()}
        {activePage === "members" && renderMembers()}
        {activePage === "detail" && renderMemberDetail()}
        {activePage === "messages" && renderMessages()}
        {activePage === "lists" && <div className="flex-1 flex items-center justify-center text-zinc-400 font-bold uppercase tracking-widest">Lists Area (WIP)</div>}
        {activePage === "admin" && <div className="flex-1 flex items-center justify-center text-zinc-400 font-bold uppercase tracking-widest">Admin Dashboard (Protected)</div>}
      </main>

      {!quickStartDone && projectData?.quickStartSteps && (
        <DemoQuickStart projectId="social-network" steps={projectData.quickStartSteps} onComplete={() => setQuickStartDone(true)} />
      )}
    </div>
  );
}
