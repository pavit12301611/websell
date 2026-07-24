'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Code, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onExplore: () => void;
  onOpenEditor: () => void;
}

export default function Hero({ onExplore, onOpenEditor }: HeroProps) {
  return (
    <div className="relative pt-16 pb-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 backdrop-blur-md shadow-lg shadow-indigo-500/10"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>The Ultimate Website Marketplace & Visual Customizer</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent"
        >
          Buy Professional Websites. <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">
            Customize Visually. Get Code Instantly.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Welcome to <span className="text-white font-bold">websell</span>. Browse elite pre-built website templates, edit content and branding visually in our zero-code customizer, and instantly receive complete source code packages delivered straight to your Gmail inbox upon checkout.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-5"
        >
          <button
            onClick={onExplore}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold text-lg shadow-xl shadow-indigo-500/25 hover:scale-105 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 group"
          >
            <span>Explore Marketplace</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenEditor}
            className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-lg border border-slate-700/80 shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
          >
            <Code className="w-5 h-5 text-amber-400" />
            <span>Open Visual Customizer</span>
          </button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
        >
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <ShieldCheck className="w-8 h-8 text-indigo-400 mb-3" />
            <h3 className="text-white font-bold text-base mb-1">Secure Delivery</h3>
            <p className="text-xs text-slate-400">Complete source code sent securely to your Gmail instantly.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <Zap className="w-8 h-8 text-amber-400 mb-3" />
            <h3 className="text-white font-bold text-base mb-1">Visual Customizer</h3>
            <p className="text-xs text-slate-400">Edit titles, colors, and content without touching code.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <Code className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-white font-bold text-base mb-1">Clean Production Code</h3>
            <p className="text-xs text-slate-400">Optimized Next.js, React, and Tailwind CSS codebases.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <Award className="w-8 h-8 text-emerald-400 mb-3" />
            <h3 className="text-white font-bold text-base mb-1">Commercial License</h3>
            <p className="text-xs text-slate-400">Full ownership rights to deploy for client or personal projects.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
