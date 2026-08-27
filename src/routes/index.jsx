import React from 'react';
import Nav from '../components/nav.jsx';
import Hero from '../components/hero.jsx';
import WhyUs from '../components/WhyUs.jsx';
import Audience from '../components/Audience.jsx';
import Process from '../components/Process.jsx';
import Events from '../components/Events.jsx';
import Destinations from '../components/Destinations.jsx';
import FAQ from '../components/FAQ.jsx';
import BottomCTA from '../components/BottomCTA.jsx';
import Footer from '../components/footer.jsx';
import FloatingCTA from '../components/FloatingCTA.jsx';

export const route = {
  path: '/',
  title: 'Tư vấn lộ trình du học cùng Hằng Lương | Free Consultation',
  description: 'Đăng ký tư vấn du học miễn phí cùng Hằng Lương. Nhận lộ trình học tập cá nhân hóa, hỗ trợ chọn trường, ngành, săn học bổng và thủ tục Visa.',
  hydration: 'load',
};

export default function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-white text-slate-900 antialiased overflow-x-hidden selection:bg-brand-red selection:text-white">
      <Nav />
      
      <main>
        <Hero />
        <WhyUs />
        <Audience />
        <Process />
        <Events />
        <Destinations />
        
        {/* Social Proof Placeholder */}
        {/* CÂU CHUYỆN SINH VIÊN */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-brand-red">
                Học viên Hằng Lương
              </p>

              <h2 className="text-3xl font-extrabold uppercase text-slate-900 md:text-4xl">
                Câu chuyện sinh viên
              </h2>

              <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-brand-red" />

              <p className="mt-5 text-slate-500">
                Những hành trình du học thực tế và chia sẻ từ học viên
                đã đồng hành cùng Hằng Lương.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {/* P.N.H.NGÂN */}
              <a
                href="https://www.duhochangluong.edu.vn/khach-hang-cua-chung-toi/chuc-mung-ban-p-n-h-ngan-dat-visa-du-hoc-malaysia-w4585.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <img
                    src="/student-ngan-malaysia.png"
                    alt="P.N.H.Ngân đạt Visa du học Malaysia"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-brand-red px-4 py-2 text-xs font-bold uppercase text-white shadow-md">
                    Visa Malaysia
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="mb-3 text-xl font-extrabold text-slate-900 transition group-hover:text-brand-red">
                    P.N.H.NGÂN
                  </h3>

                  <p className="mb-5 font-semibold text-brand-red">
                    Đạt Visa Du Học Malaysia
                  </p>

                  <p className="line-clamp-5 text-sm leading-7 text-slate-600">
                    “Em cảm thấy mọi người ở Hằng Lương thân thiện với nhiệt
                    tình lắm luôn, mọi người quan tâm cảm nhận của em hơn là
                    lợi ích. Mãi iu ♡”
                  </p>

                  <div className="mt-6 flex items-center font-bold text-brand-red">
                    Xem câu chuyện
                    <span className="ml-2 transition-transform group-hover:translate-x-2">
                      →
                    </span>
                  </div>
                </div>
              </a>

              {/* LÊ TRẦN YẾN NHI */}
              <a
                href="https://www.duhochangluong.edu.vn/khach-hang-cua-chung-toi/cam-on-nhung-tinh-cam-chan-thanh-tu-hoc-sinh-cua-du-hoc-hang-luong-w4586.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <img
                    src="/student-yen-nhi-australia.png"
                    alt="Lê Trần Yến Nhi du học Úc"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-brand-red px-4 py-2 text-xs font-bold uppercase text-white shadow-md">
                    Visa Úc
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="mb-3 text-xl font-extrabold text-slate-900 transition group-hover:text-brand-red">
                    LÊ TRẦN YẾN NHI
                  </h3>

                  <p className="mb-5 font-semibold text-brand-red">
                    Du Học Úc
                  </p>

                  <p className="line-clamp-5 text-sm leading-7 text-slate-600">
                    “Cảm ơn các anh chị tại Hằng Lương rất nhiều vì không chỉ
                    hỗ trợ em một lần mà tận lần 2, lần 3 và rất nhiều lần để
                    em có thể hoàn thành việc đi du học của mình. Các anh chị
                    đã luôn hỗ trợ rất nhiệt tình và tận tâm với em từ vấn đề
                    lớn cho đến những vấn đề siêu nhỏ...”
                  </p>

                  <div className="mt-6 flex items-center font-bold text-brand-red">
                    Xem câu chuyện
                    <span className="ml-2 transition-transform group-hover:translate-x-2">
                      →
                    </span>
                  </div>
                </div>
              </a>

              {/* PHẠM NGUYỄN GIA BẢO */}
              <a
                href="https://www.duhochangluong.edu.vn/khach-hang-cua-chung-toi/lam-ho-so-du-hoc-online-trai-nghiem-dich-vu-mien-ban-va-hanh-trinh-nhan-visa-malaysia-cua-gia-bao-w4527.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl md:col-span-2 lg:col-span-1"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <img
                    src="/student-gia-bao-malaysia.png"
                    alt="Phạm Nguyễn Gia Bảo Visa Malaysia"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-brand-red px-4 py-2 text-xs font-bold uppercase text-white shadow-md">
                    Visa Malaysia
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="mb-3 text-xl font-extrabold text-slate-900 transition group-hover:text-brand-red">
                    PHẠM NGUYỄN GIA BẢO
                  </h3>

                  <p className="mb-5 font-semibold text-brand-red">
                    Visa Du Học Malaysia
                  </p>

                  <p className="line-clamp-5 text-sm leading-7 text-slate-600">
                    “Công ty gửi hồ sơ tận nhà cho em nên em rất yên tâm,”
                    Bảo chia sẻ. Niềm tin của gia đình em được củng cố khi
                    mọi giấy tờ đều được xử lý minh bạch và chuyên nghiệp.
                  </p>

                  <div className="mt-6 flex items-center font-bold text-brand-red">
                    Xem câu chuyện
                    <span className="ml-2 transition-transform group-hover:translate-x-2">
                      →
                    </span>
                  </div>
                </div>
              </a>

            </div>
          </div>
        </section>

        <FAQ />
        <BottomCTA />
      </main>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
