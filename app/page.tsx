'use client';

import React, { useState, useEffect } from 'react';
import { WebsiteTemplate, PurchaseOrder, EmailMessage } from '@/lib/types';
import NightDayBackground from '@/components/NightDayBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TemplateCatalog from '@/components/TemplateCatalog';
import VisualEditor from '@/components/VisualEditor';
import CheckoutModal from '@/components/CheckoutModal';
import InboxModal from '@/components/InboxModal';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'editor'>('catalog');
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([]);
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  
  // Modals state
  const [checkoutTemplate, setCheckoutTemplate] = useState<WebsiteTemplate | null>(null);
  const [checkoutCustomConfig, setCheckoutCustomConfig] = useState<WebsiteTemplate['defaultConfig'] | undefined>(undefined);
  const [editorTemplate, setEditorTemplate] = useState<WebsiteTemplate | undefined>(undefined);
  const [showInbox, setShowInbox] = useState(false);

  // Fetch initial purchases / emails if any
  useEffect(() => {
    fetch('/api/purchase')
      .then((res) => res.json())
      .then((data) => {
        if (data.purchases) setPurchases(data.purchases);
        if (data.emails) setEmails(data.emails);
      })
      .catch((err) => console.error('Failed to load purchases:', err));
  }, []);

  const handleSelectTemplateForEdit = (template: WebsiteTemplate) => {
    setEditorTemplate(template);
    setActiveTab('editor');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleBuyTemplate = (template: WebsiteTemplate) => {
    setCheckoutTemplate(template);
    setCheckoutCustomConfig(undefined);
  };

  const handleBuyWithCustomConfig = (template: WebsiteTemplate, config: WebsiteTemplate['defaultConfig']) => {
    setCheckoutTemplate(template);
    setCheckoutCustomConfig(config);
  };

  const handlePurchaseSuccess = (order: PurchaseOrder) => {
    setPurchases((prev) => [order, ...prev]);
    // Refresh emails from backend
    fetch('/api/purchase')
      .then((res) => res.json())
      .then((data) => {
        if (data.emails) setEmails(data.emails);
      });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden">
      {/* Background with Top Night (Moon & Stars) and Bottom Day (Sun) */}
      <NightDayBackground />

      {/* Glassmorphism Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={purchases.length}
        onOpenInbox={() => setShowInbox(true)}
        unreadEmailsCount={emails.length}
      />

      {/* Hero Section (Only shown on Catalog tab) */}
      {activeTab === 'catalog' && (
        <Hero
          onExplore={() => {
            window.scrollTo({ top: 700, behavior: 'smooth' });
          }}
          onOpenEditor={() => {
            setActiveTab('editor');
          }}
        />
      )}

      {/* Main Content Area */}
      <div className="relative z-10 pb-32">
        {activeTab === 'catalog' ? (
          <TemplateCatalog
            onSelectTemplateForEdit={handleSelectTemplateForEdit}
            onBuyTemplate={handleBuyTemplate}
          />
        ) : (
          <VisualEditor
            initialTemplate={editorTemplate}
            onBuyWithCustomConfig={handleBuyWithCustomConfig}
          />
        )}
      </div>

      {/* Checkout Modal */}
      {checkoutTemplate && (
        <CheckoutModal
          template={checkoutTemplate}
          customConfig={checkoutCustomConfig}
          onClose={() => setCheckoutTemplate(null)}
          onPurchaseSuccess={handlePurchaseSuccess}
        />
      )}

      {/* Signed-in Gmail Inbox Modal */}
      {showInbox && (
        <InboxModal
          emails={emails}
          onClose={() => setShowInbox(false)}
        />
      )}
    </main>
  );
}
