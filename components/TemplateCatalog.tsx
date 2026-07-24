'use client';

import React, { useState } from 'react';
import { WebsiteTemplate } from '@/lib/types';
import { TEMPLATES } from '@/lib/templates-data';
import { Star, Eye, Code2, ShoppingCart, CheckCircle2, Sparkles, Filter } from 'lucide-react';

interface TemplateCatalogProps {
  onSelectTemplateForEdit: (template: WebsiteTemplate) => void;
  onBuyTemplate: (template: WebsiteTemplate) => void;
}

const CATEGORIES = ['All', 'SaaS', 'E-Commerce', 'AI Startup', 'Portfolio', 'Real Estate', 'Crypto'];

export default function TemplateCatalog({
  onSelectTemplateForEdit,
  onBuyTemplate,
}: TemplateCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = TEMPLATES.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
      {/* Section Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Curated Collections</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Explore Pre-Built Websites
          </h2>
        </div>

        {/* Search input */}
        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search templates, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden hover:border-indigo-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
          >
            <div>
              {/* Image Preview Box */}
              <div className="relative h-52 overflow-hidden bg-slate-950">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-bold text-indigo-300">
                    {template.category}
                  </span>
                </div>

                {/* Price Tag */}
                <div className="absolute top-4 right-4">
                  <span className="px-3.5 py-1.5 rounded-xl bg-indigo-600/90 backdrop-blur-md text-white font-extrabold text-sm shadow-lg">
                    ${template.price}
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm font-bold ml-1 text-white">{template.rating}</span>
                  </div>
                  <span className="text-xs text-slate-500">({template.reviewsCount} reviews)</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {template.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                  {template.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="px-6 pb-6 pt-0 grid grid-cols-2 gap-3">
              <button
                onClick={() => onSelectTemplateForEdit(template)}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-slate-700"
              >
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>Visual Edit</span>
              </button>

              <button
                onClick={() => onBuyTemplate(template)}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Buy Code (${template.price})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
