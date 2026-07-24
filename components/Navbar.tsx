'use client';

import React from 'react';
import { Sparkles, ShoppingBag, Mail, Code2, Globe } from 'lucide-react';

interface NavbarProps {
  activeTab: 'catalog' | 'editor';
  setActiveTab: (tab: 'catalog' | 'editor') => void;
  cartCount: number;
  onOpenInbox: () => void;
  unreadEmailsCount: number;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenInbox,
  unreadEmailsCount,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('catalog')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-400 p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Globe className="w-5 h-5 text-indigo-400 group-hover:text-amber-300 transition-colors" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-amber-200 bg-clip-text text-transparent">
              websell
            </span>
            <span className="block text-[10px] font-semibold text-indigo-400 tracking-widest uppercase">
              Pre-built Website Marketplace
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden md:flex items-center bg-slate-900/90 border border-slate-800 rounded-full p-1.5 shadow-inner">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Marketplace Catalog
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'editor'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Visual Customizer
          </button>
        </div>

        {/* Right Actions: Gmail Inbox & Cart */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenInbox}
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-all flex items-center gap-2"
            title="Signed-in Gmail Inbox (Code Delivery)"
          >
            <Mail className="w-5 h-5 text-indigo-400" />
            <span className="hidden sm:inline text-xs font-medium">Gmail Inbox</span>
            {unreadEmailsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-lg animate-bounce">
                {unreadEmailsCount}
              </span>
            )}
          </button>

          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold">{cartCount} Purchased</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
