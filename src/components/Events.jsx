import React from 'react';
import { Calendar, Users, MapPin, CheckCircle2 } from 'lucide-react';

export default function Events() {
  const benefits = [
    { title: 'Thấu hiểu bản thân', desc: 'Xác định xu hướng nghề nghiệp và ngành học phù hợp.', icon: '🧠' },
    { title: 'Lộ trình rõ ràng', desc: 'Biết rõ nên học gì, ở đâu và chuẩn bị từ khi nào.', icon: '📍' },
    { title: 'Nắm chắc chi phí', desc: 'Cái nhìn thực tế về học phí, sinh hoạt phí và tài chính.', icon: '💰' },
    { title: 'Săn học bổng', icon: '🎓', desc: 'Tư vấn các gói học bổng phù hợp nhất.' },
    { title: 'Gặp gỡ chuyên gia', icon: '🤝', desc: 'Trao đổi trực tiếp thay vì tự tìm kiếm thông tin lẻ tẻ.' },
    { title: 'An tâm đầu tư', icon: '🛡️', desc: 'Giúp phụ huynh hiểu rõ môi trường và cơ hội cho con.' }
  ];

  return (
    <section id="events" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="bg-slate-50 p-8 md:p-12 rounded-[2rem] border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6">
                 <Calendar className="w-16 h-16 text-brand-blue opacity-5" />
               </div>
               
               <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                 SỰ KIỆN DU HỌC & HƯỚNG NGHIỆP
               </h2>
               <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                 Gặp gỡ chuyên gia – Khám phá nghề nghiệp – Xây dựng lộ trình học tập phù hợp nhất.
               </p>

               <ul className="space-y-4 mb-10">
                 {[
                   'Hướng nghiệp miễn phí',
                   'Phân tích xu hướng ngành nghề',
                   'Tư vấn chọn quốc gia du học',
                   'Săn học bổng trực tiếp',
                   'Gặp gỡ đại diện trường quốc tế',
                   'Tư vấn chuyên sâu cho phụ huynh',
                   'Giải đáp thắc mắc 1-1'
                 ].map(item => (
                   <li key={item} className="flex items-center space-x-3 text-slate-700 font-medium">
                     <CheckCircle2 className="w-5 h-5 text-green-500" />
                     <span>{item}</span>
                   </li>
                 ))}
               </ul>

               <a href="#registration-form" className="w-full md:w-auto inline-flex items-center justify-center px-10 py-4 bg-brand-blue text-white rounded-xl font-bold shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all">
                 ĐĂNG KÝ THAM GIA MIỄN PHÍ
               </a>
            </div>
          </div>

          <div className="flex-1">
            <div className="text-center lg:text-left mb-10">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">BẠN SẼ NHẬN ĐƯỢC GÌ?</h3>
              <div className="h-1 w-20 bg-brand-red mx-auto lg:mx-0 rounded-full" />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
