import React from 'react';
import { content } from '../lib/content';

export default function WhyUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            BẠN ĐANG PHÂN VÂN TRÊN HÀNH TRÌNH DU HỌC?
          </h2>
          <div className="h-1.5 w-20 bg-brand-red mx-auto rounded-full mb-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.whyUs.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl border border-slate-100 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-red-500/5 transition-all group">
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
