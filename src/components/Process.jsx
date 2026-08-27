import React from 'react';
import { ArrowRight, Compass, FileText, GraduationCap, CheckCircle2, Sparkles } from 'lucide-react';
import { content } from '../lib/content';

// Mảng icon tương ứng cho 4 bước
const stepIcons = [Compass, FileText, GraduationCap, CheckCircle2];

export default function Process() {
  const processList = content?.process || [];

  return (
    <section id="process" className="py-20 lg:py-28 bg-brand-gradient text-white overflow-hidden relative">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none select-none">
        <div className="absolute -top-12 -right-12 w-80 h-80 border-[10px] border-white rounded-full animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] border-[12px] border-white rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wider mb-3 border border-white/20 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Lộ trình rõ ràng
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            CHỈ 4 BƯỚC ĐỂ BẮT ĐẦU HÀNH TRÌNH DU HỌC
          </h2>
          <div className="h-1.5 w-24 bg-brand-red mx-auto rounded-full shadow-sm" />
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {processList.map((item, idx) => {
            const StepIcon = stepIcons[idx % stepIcons.length];

            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl bg-white/10 p-6 lg:p-8 backdrop-blur-md border border-white/15 transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:shadow-black/20"
              >
                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white font-black text-xl border border-white/30 group-hover:bg-brand-red group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                      0{idx + 1}
                    </div>
                    <StepIcon className="w-8 h-8 text-white/40 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                  </div>

                  {/* Text Content */}
                  <h3 className="text-lg lg:text-xl font-bold mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <a
            href="#registration-form"
            className="group inline-flex items-center gap-3 px-8 lg:px-10 py-4 bg-brand-red text-white rounded-full font-bold shadow-xl shadow-red-950/40 hover:bg-red-700 hover:scale-105 active:scale-100 transition-all duration-300"
          >
            <span>BẮT ĐẦU NGAY</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}