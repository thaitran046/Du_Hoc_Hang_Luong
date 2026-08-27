import React from 'react';
import { Phone, MessageSquare, Send } from 'lucide-react';
import { content } from '../lib/content';
import { track } from '../lib/tracking';

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-3 border-t border-slate-100">
      <div className="flex gap-3">
        <a 
          href={`tel:${content.hotline.replace(/\s/g, '')}`} onClick={() => track('click_phone', { location: 'floating_cta' })} 
          className="flex-1 bg-white text-slate-900 border-2 border-slate-200 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 text-sm"
        >
          <Phone className="w-5 h-5 text-brand-blue" />
          <span>GỌI TƯ VẤN</span>
        </a>
        <a 
          href="#registration-form" onClick={() => track('click_cta', { location: 'floating_cta', cta: 'registration' })} 
          className="flex-[1.5] bg-brand-red text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 text-sm shadow-lg shadow-red-500/20"
        >
          <Send className="w-5 h-5" />
          <span>ĐĂNG KÝ NGAY</span>
        </a>
      </div>
      
      {/* Mini floating buttons for Zalo/Messenger above the bar */}
      <div className="absolute bottom-[calc(100%+1rem)] right-4 flex flex-col space-y-3">
        <a href="#" className="w-12 h-12 bg-[#0084FF] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <MessageSquare className="w-6 h-6" />
        </a>
        <a href="#" className="w-12 h-12 bg-[#0068FF] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform overflow-hidden font-bold">
          Zalo
        </a>
      </div>
    </div>
  );
}
