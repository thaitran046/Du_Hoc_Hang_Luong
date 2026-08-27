import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  const scrollToForm = () => {
    const form = document.getElementById('registration-form');

    if (form) {
      form.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="max-w-4xl mx-auto text-center">

          {/* BADGE */}
          <div className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-brand-red mb-5">
            🎓 TƯ VẤN ĐỊNH HƯỚNG DU HỌC 1-1
          </div>

          {/* HOOK MỚI */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            CHỌN SAI NGÀNH,
            <br />

            <span className="text-brand-red">
              CÓ THỂ MẤT CẢ VÀI NĂM
            </span>

            <br />

            ĐỂ BẮT ĐẦU LẠI.
          </h1>

          {/* SUB HOOK */}
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Đừng chọn ngành chỉ vì đang “hot”.
            Hãy tìm ngành phù hợp với
            <strong className="text-slate-900">
              {' '}năng lực, sở thích và mục tiêu tương lai{' '}
            </strong>
            của chính bạn.
          </p>

          {/* BENEFITS */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-sm md:text-base text-slate-700">

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-red" />
              Định hướng ngành phù hợp
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-red" />
              Chọn trường & quốc gia
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-red" />
              Xây dựng lộ trình du học
            </div>

          </div>

          {/* CTA */}
          <div className="mt-9">

            <button
              type="button"
              onClick={scrollToForm}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                bg-brand-red
                hover:bg-red-600
                text-white
                px-8
                py-4
                rounded-xl
                font-bold
                text-base
                md:text-lg
                shadow-lg
                shadow-red-500/20
                transition-all
                hover:-translate-y-0.5
              "
            >
              ĐĂNG KÝ TƯ VẤN 1-1 MIỄN PHÍ

              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="mt-3 text-xs md:text-sm text-slate-500">
              Chuyên viên Hằng Lương sẽ liên hệ để tư vấn lộ trình phù hợp.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}