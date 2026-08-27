import React from 'react';
import { content } from '../lib/content';
import { track } from '../lib/tracking';

export default function BottomCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-gradient" />
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-red rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-3xl mx-auto text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            BẠN CHƯA BIẾT BẮT ĐẦU HÀNH TRÌNH DU HỌC TỪ ĐÂU?
          </h2>
          <p className="text-lg md:text-xl text-red-100 mb-10 opacity-90">
            Hãy để chuyên viên Hằng Lương giúp bạn xây dựng lộ trình du học phù hợp nhất với điều kiện và mục tiêu của bạn.
          </p>
          <a 
            href="#registration-form" onClick={() => track('click_cta', { location: 'bottom_cta', cta: 'free_consultation' })} 
            className="inline-block px-12 py-5 bg-brand-red text-white rounded-full font-bold text-lg shadow-2xl shadow-red-900/50 hover:bg-red-600 hover:scale-105 transition-all"
          >
            NHẬN TƯ VẤN MIỄN PHÍ NGAY
          </a>
        </div>
      </div>
    </section>
  );
}
