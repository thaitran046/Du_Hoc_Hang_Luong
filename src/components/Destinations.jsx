import React, { useRef } from 'react';
import { content } from '../lib/content';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Destinations() {
  const railRef = useRef(null);
  const move = (dir) => railRef.current?.scrollBy({ left: dir * Math.min(760, window.innerWidth * .72), behavior: 'smooth' });

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-9">
          <div>
            <p className="text-brand-red font-bold tracking-[.16em] text-xs uppercase mb-2">Điểm đến du học</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">KHÁM PHÁ ĐIỂM ĐẾN TIÊU BIỂU</h2>
            <p className="text-slate-500 mt-3 max-w-2xl">Chọn quốc gia phù hợp với mục tiêu học tập, ngân sách và định hướng tương lai của bạn.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => move(-1)} className="w-11 h-11 rounded-full border border-slate-200 grid place-items-center hover:bg-brand-red hover:text-white hover:border-brand-red transition" aria-label="Trước"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={() => move(1)} className="w-11 h-11 rounded-full border border-slate-200 grid place-items-center hover:bg-brand-red hover:text-white hover:border-brand-red transition" aria-label="Sau"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="relative">
          <div ref={railRef} className="destination-rail flex gap-6 md:gap-8 overflow-x-auto pb-5 snap-x snap-mandatory scroll-smooth">
            {content.destinations.map((item, idx) => (
              <a href="#registration-form" key={idx} className="snap-start shrink-0 w-[150px] md:w-[178px] group text-center">
                <div className="relative mx-auto w-[126px] h-[126px] md:w-[148px] md:h-[148px] rounded-full bg-white border border-slate-200 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-red-200 transition-all grid place-items-center">
                  <div className="absolute inset-2 rounded-full border border-dashed border-red-200" />
                  <span className="relative text-6xl md:text-7xl drop-shadow-sm group-hover:scale-110 transition-transform">{item.flag}</span>
                  <div className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-brand-red text-white grid place-items-center shadow-md"><ChevronRight className="w-4 h-4" /></div>
                </div>
                <h3 className="font-extrabold text-sm md:text-base text-slate-900 mt-4 group-hover:text-brand-red transition-colors">DU HỌC {item.name.toUpperCase()}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">{item.desc}</p>
              </a>
            ))}
            <a href="#registration-form" className="snap-start shrink-0 w-[150px] md:w-[178px] group text-center">
              <div className="mx-auto w-[126px] h-[126px] md:w-[148px] md:h-[148px] rounded-full bg-red-50 border border-red-100 grid place-items-center group-hover:bg-brand-red group-hover:text-white transition-all">
                <div className="text-center"><div className="text-3xl font-black">+</div><div className="text-xs font-bold mt-1">CÁC NƯỚC KHÁC</div></div>
              </div>
              <h3 className="font-extrabold text-sm md:text-base mt-4">KHÁM PHÁ THÊM</h3>
              <p className="text-xs text-slate-500 mt-2">Nhận tư vấn điểm đến phù hợp với hồ sơ của bạn.</p>
            </a>
          </div>
          <div className="pointer-events-none absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white to-transparent hidden md:block" />
        </div>

        <div className="flex justify-center gap-2 mt-2">
          {[0,1,2,3,4].map(i => <span key={i} className={`h-2 rounded-full ${i===0 ? 'w-7 bg-brand-red' : 'w-2 bg-slate-200'}`} />)}
        </div>
      </div>
    </section>
  );
}
