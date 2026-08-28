import React from 'react';
import {
  Phone,
  Send,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  ExternalLink,
} from 'lucide-react';

import { content } from '../lib/content';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/duhochangluong799',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/duhoc.hangluong/',
    icon: Instagram,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/user/duhocsing',
    icon: Youtube,
  },
];

const destinations = [
  'Du học Singapore',
  'Du học Úc (Australia)',
  'Du học Mỹ (USA)',
  'Du học Anh (UK)',
  'Du học Canada',
  'Du học New Zealand',
];

const services = [
  'Tư vấn chọn trường & ngành',
  'Hỗ trợ xin học bổng 20% - 100%',
  'Dịch thuật & Công chứng hồ sơ',
  'Luyện phỏng vấn Visa tỷ lệ cao',
  'Sắp xếp nhà ở & Đưa đón sân bay',
];

export default function Footer() {
  const hotline = content?.hotline || '0932 233 521';
  const phoneHref = hotline.replace(/\s/g, '');

  return (
    <footer className="border-t-4 border-[#ef1b24] bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-14 md:py-16">
        {/* LOGO & BRAND DESCRIPTION */}
        <div className="flex flex-col items-center text-center">
          <a href="/" aria-label="Du học Hằng Lương">
            <img
              src="/logo Hằng Lương slogan chữ trắng 2025.png"
              alt="Du học Hằng Lương"
              className="h-auto w-[240px] max-w-full object-contain md:w-[300px] transition-transform duration-300 hover:scale-105"
            />
          </a>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
            Đại diện tuyển sinh chính thức của hàng trăm trường Đại học, Cao đẳng uy tín toàn cầu. Đồng hành cùng học sinh và phụ huynh xây dựng lộ trình du học minh bạch và hiệu quả.
          </p>

          {/* MẠNG XÃ HỘI */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                title={name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-[#ef1b24] hover:bg-[#ef1b24] hover:text-white shadow-md"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* BỐ CỤC 4 CỘT LỚN (KHẮC PHỤC KHOẢNG TRỐNG) */}
        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* CỘT 1: LIÊN HỆ */}
          <div>
            <h4 className="mb-5 text-base font-bold uppercase tracking-wider text-[#ef1b24]">
              Thông tin liên hệ
            </h4>

            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <Phone className="h-4 w-4 text-[#ef1b24]" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">Hotline tư vấn</p>
                  <a
                    href={`tel:${phoneHref}`}
                    className="mt-0.5 inline-block font-semibold text-white transition hover:text-[#ef1b24]"
                  >
                    {hotline}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <Send className="h-4 w-4 text-[#ef1b24]" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">Email tiếp nhận</p>
                  <a
                    href="mailto:admin@duhochangluong.edu.vn"
                    className="mt-0.5 inline-block break-all font-semibold text-white transition hover:text-[#ef1b24]"
                  >
                    admin@duhochangluong.edu.vn
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <Clock className="h-4 w-4 text-[#ef1b24]" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">Giờ làm việc</p>
                  <p className="mt-0.5 font-medium text-slate-300">
                    Thứ 2 - Thứ 7: 8:00 - 17:00
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* CỘT 2: HỆ THỐNG VĂN PHÒNG */}
          <div>
            <h4 className="mb-5 text-base font-bold uppercase tracking-wider text-[#ef1b24]">
              Hệ thống văn phòng
            </h4>

            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#ef1b24]" />
                <div>
                  <strong className="text-white block">Trụ sở TP. Hồ Chí Minh</strong>
                  <a
                    href="https://maps.app.goo.gl/JdrYcGbxrxJirLxk6"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-slate-400 hover:text-white hover:underline transition-colors"
                  >
                    <span>799 Đ. Hồng Bàng, Bình Tây, Hồ Chí Minh, Vietnam</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#ef1b24]" />
                <div>
                  <strong className="text-white block">Văn phòng Đà Lạt</strong>
                  <a
                    href="https://maps.app.goo.gl/ukhrnGcwEkGMbVga7"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-slate-400 hover:text-white hover:underline transition-colors"
                  >
                    <span>Số 16 Đoàn Thị Điểm, Phường Xuân Hương, TP.Đà Lạt, Tỉnh Lâm Đồng</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* CỘT 3: THỊ TRƯỜNG DU HỌC */}
          <div>
            <h4 className="mb-5 text-base font-bold uppercase tracking-wider text-[#ef1b24]">
              Thị trường du học
            </h4>

            <ul className="space-y-2.5 text-sm text-slate-400">
              {destinations.map((country) => (
                <li key={country}>
                  <a
                    href="#registration-form"
                    className="inline-flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ef1b24]" />
                    <span>{country}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 4: DỊCH VỤ HỖ TRỢ */}
          <div>
            <h4 className="mb-5 text-base font-bold uppercase tracking-wider text-[#ef1b24]">
              Dịch vụ du học
            </h4>

            <ul className="space-y-2.5 text-sm text-slate-400">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#registration-form"
                    className="inline-flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ef1b24]" />
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* COPYRIGHT & LINKS */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Du học Hằng Lương. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}