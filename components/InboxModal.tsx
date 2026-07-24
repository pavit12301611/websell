'use client';

import React, { useState } from 'react';
import { EmailMessage } from '@/lib/types';
import { X, Mail, Inbox, ExternalLink, Download, Copy, Check, ShieldCheck } from 'lucide-react';

interface InboxModalProps {
  emails: EmailMessage[];
  onClose: () => void;
}

export default function InboxModal({ emails, onClose }: InboxModalProps) {
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(
    emails.length > 0 ? emails[0] : null
  );
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[650px] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Gmail Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Signed-in Gmail Inbox</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                  Connected
                </span>
              </h3>
              <p className="text-xs text-slate-400">buyer@gmail.com • WebSell Code Delivery Hub</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gmail Body Split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Email List Sidebar */}
          <div className="w-1/3 border-r border-slate-800 bg-slate-950/60 overflow-y-auto">
            {emails.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <Inbox className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">No emails yet. Purchase a website to receive source code here!</p>
              </div>
            ) : (
              emails.map((email) => (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`p-4 border-b border-slate-800 cursor-pointer transition-colors ${
                    selectedEmail?.id === email.id
                      ? 'bg-indigo-600/10 border-l-4 border-l-indigo-500'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-indigo-400">WebSell Team</span>
                    <span className="text-[10px] text-slate-500">{email.timestamp}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 mb-1">{email.subject}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{email.body}</p>
                </div>
              ))
            )}
          </div>

          {/* Email Detail View */}
          <div className="flex-1 bg-slate-900 p-8 overflow-y-auto flex flex-col justify-between">
            {selectedEmail ? (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-bold text-white mb-2">{selectedEmail.subject}</h2>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>From: notifications@websell.io</span>
                    <span>To: {selectedEmail.to}</span>
                  </div>
                </div>

                <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {selectedEmail.body}
                </div>

                {/* Code Snippet Box */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-400">Source Code Package Preview</span>
                    <button
                      onClick={() => handleCopyCode(selectedEmail.codeSnippet)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-indigo-300 font-mono overflow-x-auto max-h-48">
                    {selectedEmail.codeSnippet}
                  </pre>
                </div>

                {/* Download Button */}
                <div className="pt-4 flex gap-4">
                  <a
                    href={selectedEmail.downloadLink}
                    download
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full Source Code (.tsx)</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="m-auto text-center text-slate-500">
                <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Select an email message to view details and code.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
