import React, { useState } from 'react';
import { Search, MapPin, GraduationCap, CheckCircle2, ChevronRight, Phone, MessageSquare } from 'lucide-react';

export const content = {
  brandName: 'Du học Hằng Lương',
  hotline: '093 2233 521',
  usp: [
    { text: 'Tư vấn lộ trình 1-1', icon: CheckCircle2 },
    { text: 'Hỗ trợ chọn trường & ngành', icon: CheckCircle2 },
    { text: 'Hỗ trợ hồ sơ du học', icon: CheckCircle2 },
    { text: 'Tư vấn học bổng', icon: CheckCircle2 },
    { text: 'Đồng hành suốt hành trình', icon: CheckCircle2 },
  ],
  whyUs: [
    {
      title: 'Chưa chọn được ngành học?',
      desc: 'Nhận hỗ trợ từ chuyên gia để xác định ngành học phù hợp với năng lực, sở thích và mục tiêu nghề nghiệp.',
      icon: GraduationCap
    },
    {
      title: 'Phân vân chọn trường?',
      desc: 'Đề xuất các trường phù hợp với học lực, ngân sách và mục tiêu phát triển của bạn.',
      icon: MapPin
    },
    {
      title: 'Lo lắng về chi phí du học?',
      desc: 'Hỗ trợ lập kế hoạch tài chính và tìm kiếm cơ hội học bổng tối ưu.',
      icon: Search
    },
    {
      title: 'Rắc rối thủ tục hồ sơ?',
      desc: 'Hướng dẫn từng bước, từ hồ sơ nhập học đến thủ tục xin Visa du học.',
      icon: CheckCircle2
    },
    {
      title: 'Phụ huynh lo lắng cho con?',
      desc: 'Tư vấn lộ trình giáo dục dựa trên mục tiêu dài hạn và an toàn cho học sinh.',
      icon: GraduationCap
    },
    {
      title: 'Chưa biết thời điểm du học?',
      desc: 'Đánh giá thời điểm vàng để chuẩn bị ngoại ngữ, hồ sơ và tài chính.',
      icon: CheckCircle2
    }
  ],
  audiences: [
    {
      title: 'Học sinh THCS & THPT',
      desc: 'Định hướng sớm về ngành nghề, điểm đến và lộ trình du học.',
      cta: 'Khám phá lộ trình',
      tags: ['Lớp 6-9', 'Lớp 10-11']
    },
    {
      title: 'Học sinh lớp 12',
      desc: 'Tư vấn Cao đẳng, Đại học, du học nghề và săn học bổng.',
      cta: 'Nhận tư vấn ngay',
      tags: ['Tốt nghiệp THPT']
    },
    {
      title: 'Sinh viên Đại học',
      desc: 'Chương trình chuyển tiếp, du học Thạc sĩ và học bổng sau đại học.',
      cta: 'Xem lộ trình Thạc sĩ',
      tags: ['Năm 1-4', 'Đã tốt nghiệp']
    },
    {
      title: 'Người đi làm',
      desc: 'Học nâng cao, khóa ngắn hạn, chương trình vừa học vừa làm.',
      cta: 'Tư vấn nghề nghiệp',
      tags: ['Sau đại học', 'Chứng chỉ']
    }
  ],
  process: [
    { title: 'Đăng ký thông tin', desc: 'Điền form trong khoảng 1 phút.' },
    { title: 'Chuyên viên liên hệ', desc: 'Hằng Lương liên hệ tìm hiểu nhu cầu.' },
    { title: 'Xây dựng lộ trình', desc: 'Đề xuất quốc gia, ngành, trường và chi phí.' },
    { title: 'Hỗ trợ hồ sơ', desc: 'Đồng hành chuẩn bị hồ sơ và các bước tiếp theo.' }
  ],
  destinations: [
    { name: 'Úc', flag: '🇦🇺', desc: 'Chất lượng giáo dục hàng đầu, cơ hội định cư cao.' },
    { name: 'Anh', flag: '🇬🇧', desc: 'Cái nôi tri thức thế giới, thời gian học ngắn.' },
    { name: 'Mỹ', flag: '🇺🇸', desc: 'Hệ thống giáo dục đa dạng, học bổng giá trị lớn.' },
    { name: 'Canada', flag: '🇨🇦', desc: 'Môi trường an toàn, chính sách visa ưu tiên.' },
    { name: 'New Zealand', flag: '🇳🇿', desc: 'Cảnh quan tuyệt đẹp, giáo dục thực tiễn.' },
    { name: 'Singapore', flag: '🇸🇬', desc: 'Gần Việt Nam, bằng cấp quốc tế, chi phí hợp lý.' },
    { name: 'Châu Âu', flag: '🇪🇺', desc: 'Văn hóa đa dạng, nhiều chương trình miễn học phí.' }
  ],
  faqs: [
    {
      q: 'Tôi chưa chọn được nước thì có đăng ký được không?',
      a: 'Hoàn toàn được. Chuyên viên sẽ dựa trên học lực, ngành học, tài chính và mục tiêu để gợi ý các lựa chọn phù hợp nhất.'
    },
    {
      q: 'Chi phí tư vấn là bao nhiêu?',
      a: 'Việc tư vấn ban đầu và định hướng lộ trình tại Hằng Lương là hoàn toàn miễn phí.'
    },
    {
      q: 'Phụ huynh có thể đăng ký thay cho con không?',
      a: 'Được, chúng tôi rất khuyến khích phụ huynh cùng tham gia để hiểu rõ lộ trình và chuẩn bị tài chính tốt nhất.'
    },
    {
      q: 'Chưa có chứng chỉ IELTS có tư vấn được không?',
      a: 'Được. Chúng tôi sẽ tư vấn lộ trình học tiếng Anh phù hợp để bạn đạt chuẩn đầu vào của trường.'
    }
  ]
};
