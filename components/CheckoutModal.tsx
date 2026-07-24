'use client';

import React, { useState } from 'react';
import { WebsiteTemplate, PurchaseOrder } from '@/lib/types';
import { X, Mail, CreditCard, ShieldCheck, CheckCircle2, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  template: WebsiteTemplate;
  customConfig?: WebsiteTemplate['defaultConfig'];
  onClose: () => void;
  onPurchaseSuccess: (order: PurchaseOrder) => void;
}

export default function CheckoutModal({
  template,
  customConfig,
  onClose,
  onPurchaseSuccess,
}: CheckoutModalProps) {
  const [gmail, setGmail] = useState('buyer@gmail.com');
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PurchaseOrder | null>(null);
  const [error, setError] = useState('');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gmail || !gmail.includes('@')) {
      setError('Please enter a valid Gmail address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: template.id,
          gmail,
          customConfig: customConfig || template.defaultConfig,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete purchase.');
      }

      setCompletedOrder(data.order);
      onPurchaseSuccess(data.order);

      // Trigger celebration confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!completedOrder ? (
          <div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Secure WebSell Checkout</span>
            </div>

            <h3 className="text-2xl font-black text-white mb-2">Complete Your Purchase</h3>
            <p className="text-sm text-slate-400 mb-6">
              You are purchasing source code ownership for <span className="text-white font-bold">{template.title}</span>.
            </p>

            {/* Order summary box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Template Package</span>
                <span className="text-white font-medium">{template.codePackageSummary.framework}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Included Files</span>
                <span className="text-white font-medium">{template.codePackageSummary.filesCount} files</span>
              </div>
              <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center">
                <span className="text-white font-bold">Total Price</span>
                <span className="text-2xl font-extrabold text-amber-400">${template.price}</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Checkout Form */}
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>Enter Your Gmail (For Code Delivery)</span>
                </label>
                <input
                  type="email"
                  required
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Payment Method (Simulated Secure Checkout)</span>
                </label>
                <div className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 flex items-center justify-between">
                  <span>💳 Secured Test Card •••• 4242</span>
                  <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md">Verified</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <span>Processing Secure Payment...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Pay ${template.price} & Receive Code in Gmail</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white mb-2">Purchase Successful!</h3>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Your complete source code package has been dispatched and successfully sent to your Gmail inbox at <span className="text-indigo-400 font-bold">{completedOrder.gmail}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2">
              <div className="text-xs text-slate-400 font-mono">Order ID: {completedOrder.id}</div>
              <div className="text-xs text-slate-400 font-mono">Delivered to: {completedOrder.gmail}</div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={completedOrder.downloadUrl}
                download
                className="flex-1 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Code Zip</span>
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
