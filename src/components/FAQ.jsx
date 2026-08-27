import React, { useState } from 'react';
import { content } from '../lib/content';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            CÂU HỎI THƯỜNG GẶP
          </h2>
          <div className="h-1.5 w-20 bg-brand-red mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {content.faqs.map((item, idx) => (
            <div 
              key={idx} 
              className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900 pr-8">{item.q}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-brand-blue" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              {openIndex === idx && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-50 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
