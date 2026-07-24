import React from 'react';

export default function NightDayBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* TOP SECTION: NIGHT WITH MOON & STARS */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] bg-gradient-to-b from-[#030712] via-[#090d16] to-[#1e1b4b]">
        {/* Glowing Moon */}
        <div className="absolute top-24 right-16 w-32 h-32 rounded-full bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500 shadow-[0_0_80px_rgba(255,255,255,0.4)] opacity-90 animate-pulse">
          {/* Moon craters effect */}
          <div className="absolute top-6 left-8 w-6 h-6 rounded-full bg-slate-300/40 blur-[1px]" />
          <div className="absolute bottom-8 right-10 w-8 h-8 rounded-full bg-slate-400/40 blur-[1px]" />
        </div>

        {/* Starry Night particles */}
        <div className="absolute top-12 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-80" />
        <div className="absolute top-36 left-1/3 w-1 h-1 bg-blue-200 rounded-full animate-pulse opacity-90" />
        <div className="absolute top-20 left-2/3 w-2 h-2 bg-purple-200 rounded-full animate-pulse opacity-70" />
        <div className="absolute top-64 left-1/6 w-1 h-1 bg-white rounded-full opacity-60" />
        <div className="absolute top-80 right-1/3 w-1.5 h-1.5 bg-indigo-200 rounded-full animate-ping opacity-75" />
        <div className="absolute top-96 left-1/2 w-2 h-2 bg-cyan-200 rounded-full opacity-85" />
      </div>

      {/* TRANSITION ZONE: DAWN / TWILIGHT */}
      <div className="absolute top-[900px] left-0 right-0 h-[600px] bg-gradient-to-b from-[#1e1b4b] via-[#4c1d95] to-[#f59e0b]/30" />

      {/* BOTTOM SECTION: DAY WITH SUN & CLOUDS */}
      <div className="absolute top-[1500px] bottom-0 left-0 right-0 bg-gradient-to-b from-[#fef08a]/20 via-[#38bdf8]/10 to-[#0f172a]">
        {/* Radiant Sun */}
        <div className="absolute bottom-32 left-16 w-48 h-48 rounded-full bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-200 blur-[2px] shadow-[0_0_120px_rgba(251,191,36,0.6)] animate-pulse" />

        {/* Fluffy Day Clouds */}
        <div className="absolute bottom-48 right-1/4 w-64 h-16 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-24 right-12 w-96 h-20 bg-white/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
}
