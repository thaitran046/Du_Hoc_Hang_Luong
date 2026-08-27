import React from 'react';
import { content } from '../lib/content';
import LeadForm from './LeadForm';
import { ChevronRight, Calendar } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-10 pb-20 md:py-24">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue opacity-[0.03] -skew-x-12 translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 text-brand-blue text-sm font-bold mb-6 border border-red-100">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
              </span>
              Tư vấn du học chuyên nghiệp
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              MỞ CỬA TƯƠNG LAI <br />
              <span className="text-brand-blue italic">CÙNG DU HỌC HẰNG LƯƠNG</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Tư vấn du học cá nhân hóa: định hướng lộ trình, chọn trường & ngành, hỗ trợ hồ sơ phù hợp năng lực và tài chính từng gia đình.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-xl mx-auto lg:mx-0">
              {content.usp.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-slate-700 font-medium">
                  <item.icon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm md:text-base">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#registration-form" className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white rounded-xl font-bold shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all flex items-center justify-center space-x-2">
                <span>NHẬN TƯ VẤN MIỄN PHÍ</span>
              </a>
              <a href="#events" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>ĐĂNG KÝ SỰ KIỆN</span>
              </a>
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl lg:max-w-md xl:max-w-lg">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
