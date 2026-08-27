import React from 'react';
import { content } from '../lib/content';
import { ChevronRight } from 'lucide-react';

export default function Audience() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            HẰNG LƯƠNG ĐỒNG HÀNH TRONG MỌI GIAI ĐOẠN
          </h2>
          <div className="h-1.5 w-20 bg-brand-blue mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {content.audiences.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {item.desc}
                </p>
                <a 
                  href="#registration-form" 
                  className="inline-flex items-center text-brand-blue font-bold hover:translate-x-1 transition-transform"
                >
                  {item.cta} <ChevronRight className="w-5 h-5 ml-1" />
                </a>
              </div>
              <div className="w-full md:w-40 h-40 bg-slate-50 rounded-2xl flex items-center justify-center">
                 <div className="text-4xl">🎓</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
