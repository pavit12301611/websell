import { NextResponse } from 'next/server';
import { TEMPLATES } from '@/lib/templates-data';
import { PurchaseOrder, EmailMessage } from '@/lib/types';

// In-memory store for orders and emails in this session
export const globalPurchases: PurchaseOrder[] = [];
export const globalEmails: EmailMessage[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { templateId, gmail, customConfig } = body;

    if (!templateId || !gmail) {
      return NextResponse.json({ error: 'Template ID and Gmail address are required.' }, { status: 400 });
    }

    const template = TEMPLATES.find((t) => t.id === templateId);
    if (!template) {
      return NextResponse.json({ error: 'Template not found.' }, { status: 404 });
    }

    const orderId = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const timestamp = new Date().toISOString();

    const finalConfig = customConfig || template.defaultConfig;

    const codeSnippet = `/* 
  ==================================================
  WEBSESLL SOURCE CODE PACKAGE - ${finalConfig.brandName.toUpperCase()}
  Order ID: ${orderId}
  Template: ${template.title}
  ==================================================
*/

export default function ${finalConfig.brandName.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-wider" style={{ color: '${finalConfig.primaryColor}' }}>
          ${finalConfig.brandName}
        </h1>
        <button className="px-6 py-2.5 rounded-full font-medium transition-all shadow-lg" style={{ backgroundColor: '${finalConfig.primaryColor}' }}>
          ${finalConfig.buttonText}
        </button>
      </nav>

      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          ${finalConfig.headline}
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
          ${finalConfig.subheadline}
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-4 rounded-xl text-lg font-semibold shadow-xl transition-transform hover:scale-105" style={{ backgroundColor: '${finalConfig.primaryColor}' }}>
            ${finalConfig.buttonText}
          </button>
        </div>
      </header>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800">
          <h3 className="text-xl font-bold mb-3" style={{ color: '${finalConfig.primaryColor}' }}>${finalConfig.feature1Title}</h3>
          <p className="text-slate-400">${finalConfig.feature1Desc}</p>
        </div>
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800">
          <h3 className="text-xl font-bold mb-3" style={{ color: '${finalConfig.primaryColor}' }}>${finalConfig.feature2Title}</h3>
          <p className="text-slate-400">${finalConfig.feature2Desc}</p>
        </div>
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800">
          <h3 className="text-xl font-bold mb-3" style={{ color: '${finalConfig.primaryColor}' }}>${finalConfig.feature3Title}</h3>
          <p className="text-slate-400">${finalConfig.feature3Desc}</p>
        </div>
      </section>
    </div>
  );
}`;

    const downloadUrl = `/api/download?orderId=${orderId}`;

    const newOrder: PurchaseOrder = {
      id: orderId,
      templateId: template.id,
      templateTitle: template.title,
      amount: template.price,
      gmail,
      purchasedAt: timestamp,
      customConfig: finalConfig,
      downloadUrl,
      codeSnippet,
    };

    globalPurchases.unshift(newOrder);

    // Create simulated email sent to Gmail
    const emailMessage: EmailMessage = {
      id: 'MAIL-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      to: gmail,
      subject: `🎉 Your Source Code for "${template.title}" is Ready!`,
      body: `Hello,\n\nThank you for purchasing "${template.title}" on WebSell!\n\nYour customized website source code (${template.codePackageSummary.framework}, ${template.codePackageSummary.filesCount} files) has been successfully generated and compiled.\n\nOrder ID: ${orderId}\nAmount Paid: $${template.price}\n\nYou can download your complete source code package using the button below or copy the code snippet from your WebSell dashboard.\n\nEnjoy building,\nThe WebSell Team`,
      codeSnippet,
      downloadLink: downloadUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    globalEmails.unshift(emailMessage);

    return NextResponse.json({
      success: true,
      order: newOrder,
      message: `Source code successfully purchased and sent to ${gmail}!`,
    });
  } catch (error) {
    console.error('Purchase error:', error);
    return NextResponse.json({ error: 'Internal server error processing purchase.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    purchases: globalPurchases,
    emails: globalEmails,
  });
}
