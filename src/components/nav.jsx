import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { content } from '../lib/content';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  // Hiệu ứng nhận biết cuộn trang để đổ bóng thanh Header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar thông tin liên hệ */}
      <div className="hidden md:block bg-slate-900 text-slate-300 text-[12px] py-1.5 transition-all">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${content?.hotline?.replace(/\s/g, '') || ''}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#ef1b24] animate-pulse" />
              <span>Hotline: <strong className="text-white">{content?.hotline}</strong></span>
            </a>
            <span className="text-slate-500">|</span>
            <span>📍 799 Đ. Hồng Bàng, Bình Tây, Hồ Chí Minh, Vietnam</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>⏰ T3 - T7: 8:00 - 17:00</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`bg-white/90 backdrop-blur-md border-b transition-all duration-300 ${
          scrolled ? 'border-slate-200/80 shadow-md py-2.5' : 'border-slate-100 py-3.5'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo đã được cập nhật liên kết website */}
          <a
            href="https://www.duhochangluong.edu.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center group"
            aria-label="Du học Hằng Lương"
          >
            <img
              src="/hang-luong-logo.png"
              alt="Du học Hằng Lương"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Nút Đăng Ký Tư Vấn (CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#registration-form"
              className="group inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#ef1b24] px-4 md:px-6 py-2.5 text-xs md:text-sm font-bold text-white shadow-md shadow-red-500/20 transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>ĐĂNG KÝ TƯ VẤN</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}