import React from 'react';
import { Compass, UserCheck, Target, ArrowRight, Sparkles } from 'lucide-react';

const pillars = [
  {
    icon: UserCheck,
    title: 'Tư vấn cá nhân hóa 1:1',
    desc: 'Mỗi học sinh có thế mạnh riêng. Chuyên gia phân tích hồ sơ để xây lộ trình từ THPT đến Đại học và Sau đại học.',
  },
  {
    icon: Target,
    title: 'Test định hướng nghề nghiệp',
    desc: 'Giúp học sinh thấu hiểu năng lực bản thân, từ đó chọn chuyên ngành phù hợp với nhu cầu nhân lực toàn cầu 5–10 năm tới.',
  },
  {
    icon: Compass,
    title: 'Chiến lược dài hạn',
    desc: 'Không chỉ lấy bằng. Chúng tôi tư vấn cơ hội thực tập, định cư và khả năng thăng tiến tại quốc gia sở tại.',
  },
];

export default function CareerOrientation() {
  return (
    <section id="career-orientation" className="py-20 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-red">
            <Sparkles className="h-3.5 w-3.5" />
            Trọng tâm sự kiện 2026
          </span>

          <h2 className="text-3xl font-extrabold uppercase leading-tight text-slate-900 md:text-4xl">
            Du học bắt đầu từ
            <br className="hidden sm:block" />
            <span className="text-brand-red"> “Hướng nghiệp đúng”</span>
          </h2>

          <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-brand-red" />

          <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
            Nhiều học sinh vẫn rơi vào cái bẫy “chọn đại” ngành vì xu hướng hoặc cảm tính.
            Hằng Lương đặt <strong className="font-semibold text-slate-800">hướng nghiệp</strong> làm trọng tâm
            để bạn chọn đúng ngành – đúng quốc gia – đúng lộ trình sự nghiệp.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/20 hover:shadow-xl hover:shadow-red-500/5"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-slate-900 md:text-xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Box */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-lg md:p-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-red">
            Bài viết chuyên sâu
          </p>
          <h3 className="mb-4 text-xl font-extrabold text-slate-900 md:text-2xl">
            Giải mã lộ trình chiến lược cho thế hệ Gen Z
          </h3>
          <p className="mb-7 text-slate-600">
            Tìm hiểu cách xây dựng lộ trình du học cá nhân hóa, chọn đúng ngành – đúng quốc gia
            và tối ưu chi phí đầu tư tại Ngày hội Du học Quốc tế 2026.
          </p>

          <a
            href="https://www.duhochangluong.edu.vn/tin-tuc/ngay-hoi-du-hoc-quoc-te-2026-giai-ma-lo-trinh-chien-luoc-cho-the-he-gen-z-w4575.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-red px-8 py-3.5 font-bold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:bg-red-700 hover:scale-105 active:scale-100"
          >
            <span>Xem thêm</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}