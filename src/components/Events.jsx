import React from 'react';
import {
  Calendar,
  MapPin,
  Clock3,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function Events() {

  // =========================
  // QUYỀN LỢI KHI THAM GIA
  // =========================
  const benefits = [
    {
      title: 'Thấu hiểu bản thân',
      desc: 'Xác định xu hướng nghề nghiệp và ngành học phù hợp.',
      icon: '🧠'
    },
    {
      title: 'Lộ trình rõ ràng',
      desc: 'Biết rõ nên học gì, ở đâu và chuẩn bị từ khi nào.',
      icon: '📍'
    },
    {
      title: 'Nắm chắc chi phí',
      desc: 'Cái nhìn thực tế về học phí, sinh hoạt phí và tài chính.',
      icon: '💰'
    },
    {
      title: 'Săn học bổng',
      desc: 'Tư vấn các gói học bổng phù hợp nhất.',
      icon: '🎓'
    },
    {
      title: 'Gặp gỡ chuyên gia',
      desc: 'Trao đổi trực tiếp thay vì tự tìm kiếm thông tin lẻ tẻ.',
      icon: '🤝'
    },
    {
      title: 'An tâm đầu tư',
      desc: 'Giúp phụ huynh hiểu rõ môi trường và cơ hội cho con.',
      icon: '🛡️'
    }
  ];

  // =========================
  // 3 SỰ KIỆN EDUCATION FAIR
  // =========================
  const fairEvents = [
    {
      id: 'robin-hotel',
      date: '24/09/2026',
      day: '24',
      month: 'THÁNG 9',
      location: 'Đắk Nông',
      venue: 'Robin Hotel',
      address:
        '77, Đường 23 Tháng 3, Tổ 1, Nam Gia Nghĩa, Lâm Đồng',
      time: '14:00 – 18:00'
    },
    {
      id: 'bao-loc',
      date: '26/09/2026',
      day: '26',
      month: 'THÁNG 9',
      location: 'TP. Bảo Lộc',
      venue: 'Phạm Garden Coffee',
      address:
        '39 Nguyễn Bỉnh Khiêm, Phường 2, Bảo Lộc, Lâm Đồng',
      time: '08:30 – 12:00'
    },
    {
      id: 'da-lat',
      date: '27/09/2026',
      day: '27',
      month: 'THÁNG 9',
      location: 'TP. Đà Lạt',
      venue: 'Nesta Valley Hotel',
      address:
        '94 Đường Bùi Thị Xuân, Xuân Hương - Đà Lạt, Lâm Đồng',
      time: '13:00 – 17:00'
    }
  ];

  // =========================
  // KHÁCH CHỌN ĐỊA ĐIỂM
  // =========================
  const selectEvent = (event) => {

    // Lưu sự kiện khách đã chọn
    localStorage.setItem(
      'selectedFairEvent',
      JSON.stringify(event)
    );

    // Báo cho LeadForm biết sự kiện vừa được chọn
    window.dispatchEvent(
      new CustomEvent('fair-event-selected', {
        detail: event
      })
    );

    // Cuộn xuống form
    setTimeout(() => {
      document
        .getElementById('registration-form')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    }, 100);
  };

  return (
    <section
      id="events"
      className="bg-white py-20"
    >
      <div className="container mx-auto px-4">

        {/* =========================
            TIÊU ĐỀ
        ========================== */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-brand-red">
            Education Fair 2026
          </p>

          <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
            SỰ KIỆN DU HỌC & HƯỚNG NGHIỆP
          </h2>

          <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-brand-red" />

          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Gặp gỡ chuyên gia – Khám phá nghề nghiệp – Xây dựng
            lộ trình học tập phù hợp nhất.
          </p>

        </div>

        {/* =========================
            DANH SÁCH 3 SỰ KIỆN
        ========================== */}

        <div className="mb-16 grid gap-6 md:grid-cols-3">

          {fairEvents.map((event) => (

            <div
              key={event.id}
              className="
                group overflow-hidden
                rounded-3xl
                border border-slate-100
                bg-white
                shadow-lg
                transition duration-300
                hover:-translate-y-2
                hover:shadow-2xl
              "
            >

              {/* PHẦN ĐỎ TRÊN CARD */}

              <div className="flex items-center gap-4 bg-brand-red p-6 text-white">

                <div
                  className="
                    flex h-20 w-20
                    shrink-0 flex-col
                    items-center justify-center
                    rounded-2xl
                    bg-white
                    text-brand-red
                  "
                >
                  <span className="text-3xl font-extrabold">
                    {event.day}
                  </span>

                  <span className="text-[10px] font-bold">
                    {event.month}
                  </span>
                </div>

                <div>

                  <p className="text-sm font-medium opacity-80">
                    World Study & Career Fair
                  </p>

                  <h3 className="mt-1 text-xl font-extrabold">
                    {event.location}
                  </h3>

                </div>

              </div>

              {/* NỘI DUNG CARD */}

              <div className="p-6">

                <h4 className="mb-5 text-xl font-extrabold text-slate-900">
                  {event.venue}
                </h4>

                <div className="space-y-4 text-sm text-slate-600">

                  {/* ĐỊA CHỈ */}

                  <div className="flex items-start gap-3">

                    <MapPin
                      className="
                        mt-0.5 h-5 w-5
                        shrink-0
                        text-brand-red
                      "
                    />

                    <span className="leading-6">
                      {event.address}
                    </span>

                  </div>

                  {/* NGÀY */}

                  <div className="flex items-center gap-3">

                    <Calendar
                      className="
                        h-5 w-5
                        shrink-0
                        text-brand-red
                      "
                    />

                    <span>
                      {event.date}
                    </span>

                  </div>

                  {/* GIỜ */}

                  <div className="flex items-center gap-3">

                    <Clock3
                      className="
                        h-5 w-5
                        shrink-0
                        text-brand-red
                      "
                    />

                    <span className="font-semibold">
                      {event.time}
                    </span>

                  </div>

                </div>

                {/* NÚT CHỌN SỰ KIỆN */}

                <button
                  type="button"
                  onClick={() => selectEvent(event)}
                  className="
                    mt-6
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-brand-red
                    px-5
                    py-3
                    font-bold
                    text-white
                    transition
                    hover:bg-red-700
                  "
                >
                  ĐĂNG KÝ TẠI {event.location.toUpperCase()}

                  <ArrowRight className="h-4 w-4" />

                </button>

              </div>

            </div>

          ))}

        </div>

        {/* =========================
            THÔNG TIN EDUCATION FAIR
        ========================== */}

        <div className="flex flex-col items-center gap-12 lg:flex-row">

          {/* BÊN TRÁI */}

          <div className="flex-1">

            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                border border-slate-100
                bg-slate-50
                p-8
                md:p-12
              "
            >

              <div className="absolute right-0 top-0 p-6">

                <Calendar
                  className="
                    h-16 w-16
                    text-brand-red
                    opacity-5
                  "
                />

              </div>

              <h3 className="mb-6 text-2xl font-extrabold text-slate-900 md:text-3xl">
                TẠI EDUCATION FAIR, BẠN CÓ THỂ
              </h3>

              <ul className="mb-10 space-y-4">

                {[
                  'Hướng nghiệp miễn phí',
                  'Phân tích xu hướng ngành nghề',
                  'Tư vấn chọn quốc gia du học',
                  'Săn học bổng trực tiếp',
                  'Gặp gỡ đại diện trường quốc tế',
                  'Tư vấn chuyên sâu cho phụ huynh',
                  'Giải đáp thắc mắc 1-1'
                ].map((item) => (

                  <li
                    key={item}
                    className="
                      flex items-center
                      space-x-3
                      font-medium
                      text-slate-700
                    "
                  >

                    <CheckCircle2
                      className="
                        h-5 w-5
                        shrink-0
                        text-green-500
                      "
                    />

                    <span>
                      {item}
                    </span>

                  </li>

                ))}

              </ul>

              <a
                href="#registration-form"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-brand-red
                  px-10
                  py-4
                  font-bold
                  text-white
                  shadow-lg
                  shadow-red-500/20
                  transition-all
                  hover:bg-red-700
                  md:w-auto
                "
              >
                ĐĂNG KÝ THAM GIA MIỄN PHÍ
              </a>

            </div>

          </div>

          {/* =========================
              BÊN PHẢI - BENEFITS
          ========================== */}

          <div className="flex-1">

            <div className="mb-10 text-center lg:text-left">

              <h3 className="mb-2 text-2xl font-extrabold text-slate-900 md:text-3xl">
                BẠN SẼ NHẬN ĐƯỢC GÌ?
              </h3>

              <div
                className="
                  mx-auto
                  h-1
                  w-20
                  rounded-full
                  bg-brand-red
                  lg:mx-0
                "
              />

            </div>

            <div className="grid gap-6 sm:grid-cols-2">

              {benefits.map((item) => (

                <div
                  key={item.title}
                  className="
                    flex
                    space-x-4
                    rounded-2xl
                    border border-slate-100
                    bg-white
                    p-4
                    transition
                    hover:border-red-100
                    hover:shadow-md
                  "
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-red-50
                      text-2xl
                    "
                  >
                    {item.icon}
                  </div>

                  <div>

                    <h4 className="mb-1 font-bold text-slate-900">
                      {item.title}
                    </h4>

                    <p className="text-xs leading-relaxed text-slate-500 md:text-sm">
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