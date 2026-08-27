import React, { useEffect } from 'react';
import { CheckCircle2, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';
import Nav from '../components/nav.jsx';
import Footer from '../components/footer.jsx';
import { track } from '../lib/tracking';

export const route = {
  path: '/cam-on',
  title: 'Đăng ký thành công | Du học Hằng Lương',
  description: 'Cảm ơn bạn đã đăng ký tư vấn du học tại Hằng Lương.',
  hydration: 'load',
};

export default function ThankYouPage() {
  useEffect(() => { track('thank_you_view', { lead_submitted: sessionStorage.getItem('hl_lead_submitted') === '1' }); }, []);
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <Nav />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-xl w-full bg-white rounded-[2rem] shadow-xl p-8 md:p-12 text-center border border-slate-100">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
            ĐĂNG KÝ THÀNH CÔNG!
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Cảm ơn bạn đã quan tâm đến dịch vụ tư vấn du học của <strong>Hằng Lương</strong>. <br />
            Chuyên viên của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
          </p>
          
          <div className="space-y-4">
            <a 
              href="https://zalo.me/0932233521" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#0068FF] text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <span>KẾT NỐI QUA ZALO ĐỂ ĐƯỢC HỖ TRỢ NHANH</span>
            </a>
            
            <a 
              href="/" 
              className="w-full bg-slate-50 text-slate-900 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 border-2 border-slate-100 hover:bg-slate-100 transition-all"
            >
              <span>XEM THÊM CÁC CHƯƠNG TRÌNH DU HỌC</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
