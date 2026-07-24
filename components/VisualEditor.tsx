'use client';

import React, { useState } from 'react';
import { WebsiteTemplate } from '@/lib/types';
import { TEMPLATES } from '@/lib/templates-data';
import { Sparkles, Palette, Type, Layout, ShoppingCart, RefreshCcw, Check, Eye } from 'lucide-react';

interface VisualEditorProps {
  initialTemplate?: WebsiteTemplate;
  onBuyWithCustomConfig: (template: WebsiteTemplate, config: WebsiteTemplate['defaultConfig']) => void;
}

const COLOR_SWATCHES = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Gold', value: '#d4af37' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Sky Blue', value: '#0ea5e9' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Amber', value: '#f59e0b' },
];

export default function VisualEditor({
  initialTemplate,
  onBuyWithCustomConfig,
}: VisualEditorProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    initialTemplate ? initialTemplate.id : TEMPLATES[0].id
  );

  const currentTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  // Editable configuration state
  const [config, setConfig] = useState<WebsiteTemplate['defaultConfig']>(
    initialTemplate ? initialTemplate.defaultConfig : TEMPLATES[0].defaultConfig
  );

  const handleTemplateChange = (id: string) => {
    setSelectedTemplateId(id);
    const t = TEMPLATES.find((item) => item.id === id);
    if (t) {
      setConfig(t.defaultConfig);
    }
  };

  const handleReset = () => {
    setConfig(currentTemplate.defaultConfig);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Zero-Code Visual Customizer</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">
            Customize Website Visually
          </h2>
          <p className="text-sm text-slate-400">
            Modify branding, copy, and colors in real-time. Code remains hidden until purchase.
          </p>
        </div>

        {/* Template Selector dropdown */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <select
            value={selectedTemplateId}
            onChange={(e) => handleTemplateChange(e.target.value)}
            className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium text-sm focus:outline-none focus:border-indigo-500 shadow-inner"
          >
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title} (${t.price})
              </option>
            ))}
          </select>

          <button
            onClick={handleReset}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset to Default"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Workspace Grid: Left Sidebar (Controls), Right (Live Preview) */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Controls (No Code Visible) */}
        <div className="lg:col-span-4 space-y-6 bg-slate-950/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl h-fit">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
            <Layout className="w-5 h-5 text-indigo-400" />
            <span>Visual Properties</span>
          </h3>

          {/* Brand Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Brand Name
            </label>
            <input
              type="text"
              value={config.brandName}
              onChange={(e) => setConfig({ ...config, brandName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Headline */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Main Headline
            </label>
            <textarea
              rows={2}
              value={config.headline}
              onChange={(e) => setConfig({ ...config, headline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Subheadline */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Subheadline Description
            </label>
            <textarea
              rows={2}
              value={config.subheadline}
              onChange={(e) => setConfig({ ...config, subheadline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Primary Color Swatches */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Brand Accent Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                className="w-10 h-10 rounded-lg bg-transparent cursor-pointer border border-slate-700"
              />
              <div className="flex flex-wrap gap-2">
                {COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.name}
                    onClick={() => setConfig({ ...config, primaryColor: swatch.value })}
                    className="w-6 h-6 rounded-full border-2 border-slate-700 hover:scale-110 transition-transform"
                    style={{ backgroundColor: swatch.value }}
                    title={swatch.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Button Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Call-to-Action Button Text
            </label>
            <input
              type="text"
              value={config.buttonText}
              onChange={(e) => setConfig({ ...config, buttonText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Features customization */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold text-slate-200">Feature 1 Title</h4>
            <input
              type="text"
              value={config.feature1Title}
              onChange={(e) => setConfig({ ...config, feature1Title: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
            <h4 className="text-sm font-bold text-slate-200">Feature 2 Title</h4>
            <input
              type="text"
              value={config.feature2Title}
              onChange={(e) => setConfig({ ...config, feature2Title: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Buy customized code button */}
          <button
            onClick={() => onBuyWithCustomConfig(currentTemplate, config)}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-6"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Buy Customized Code (${currentTemplate.price})</span>
          </button>
        </div>

        {/* Right Side: Live Interactive Preview */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          {/* Browser Bar Header */}
          <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-4 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-md border border-slate-800">
                https://{config.brandName.toLowerCase().replace(/\s+/g, '')}.preview.websell.io
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <Eye className="w-3.5 h-3.5" />
              <span>Live Visual Preview</span>
            </div>
          </div>

          {/* Rendered Live Website Mockup */}
          <div className="p-8 md:p-12 bg-slate-950 text-white flex-1 overflow-y-auto">
            {/* Nav */}
            <div className="flex justify-between items-center mb-16 pb-6 border-b border-slate-900">
              <h1 className="text-2xl font-black tracking-wider" style={{ color: config.primaryColor }}>
                {config.brandName}
              </h1>
              <button
                className="px-6 py-2.5 rounded-full font-bold text-sm shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: config.primaryColor }}
              >
                {config.buttonText}
              </button>
            </div>

            {/* Hero */}
            <div className="text-center max-w-3xl mx-auto py-12">
              <span className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 mb-6 inline-block">
                ✨ Live Preview Mode Active
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                {config.headline}
              </h2>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                {config.subheadline}
              </p>
              <button
                className="px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:scale-105 transition-transform"
                style={{ backgroundColor: config.primaryColor }}
              >
                {config.buttonText}
              </button>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center font-bold text-white shadow-lg" style={{ backgroundColor: config.primaryColor }}>
                  1
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: config.primaryColor }}>
                  {config.feature1Title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {config.feature1Desc}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center font-bold text-white shadow-lg" style={{ backgroundColor: config.primaryColor }}>
                  2
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: config.primaryColor }}>
                  {config.feature2Title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {config.feature2Desc}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center font-bold text-white shadow-lg" style={{ backgroundColor: config.primaryColor }}>
                  3
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: config.primaryColor }}>
                  {config.feature3Title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {config.feature3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
