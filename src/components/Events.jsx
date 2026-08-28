import React from 'react';
import {
  MapPin,
  CalendarDays,
  Clock3,
  ArrowRight,
} from 'lucide-react';

import { track } from '../lib/tracking';

// ======================================
// DANH SÁCH EDUCATION FAIR
// ======================================

export const FAIR_EVENTS = [
  {
    id: 'robin-hotel',

    date: '24/09/2026',

    day: '24',

    month: 'THÁNG 9',

    location: 'Đắk Nông',

    venue: 'Robin Hotel',

    address:
      '77, Đường 23 Tháng 3, Tổ 1, Nam Gia Nghĩa, Lâm Đồng 65106',

    time: '14:00 – 18:00',
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

    time: '08:30 – 12:00',
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

    time: '13:00 – 17:00',
  },
];

// ======================================
// EVENTS COMPONENT
// ======================================

export default function Events() {
  const selectEvent = (event) => {
    try {
      // Lưu sự kiện khách chọn
      localStorage.setItem(
        'selectedFairEvent',
        JSON.stringify(event)
      );

      // Báo cho LeadForm biết
      window.dispatchEvent(
        new CustomEvent(
          'fair-event-selected',
          {
            detail: event,
          }
        )
      );

      // Tracking
      track(
        'select_event_location',
        {
          event_id: event.id,

          event_location:
            event.location,

          event_venue:
            event.venue,

          event_date:
            event.date,

          event_time:
            event.time,
        }
      );

      // Cuộn xuống form đăng ký
      window.setTimeout(() => {
        document
          .getElementById(
            'registration-form'
          )
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      }, 50);
    } catch (error) {
      console.error(
        'Không thể chọn sự kiện:',
        error
      );
    }
  };

  return (
    <section
      id="events"
      className="bg-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="mx-auto mb-10 max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-bold uppercase tracking-wide text-brand-red">
            Education Fair 2026
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Chọn địa điểm tham gia
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Gặp gỡ chuyên gia tư vấn,
            tìm hiểu ngành học, trường học,
            học bổng và lộ trình du học
            phù hợp với bạn.
          </p>

        </div>

        {/* EVENT CARDS */}

        <div className="grid gap-6 md:grid-cols-3">

          {FAIR_EVENTS.map(
            (event) => (
              <article
                key={event.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* DATE HEADER */}

                <div className="flex items-center gap-4 bg-brand-red px-6 py-5 text-white">

                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-white text-brand-red shadow-sm">

                    <span className="text-2xl font-extrabold leading-none">
                      {event.day}
                    </span>

                    <span className="mt-1 text-[10px] font-bold">
                      {event.month}
                    </span>

                  </div>

                  <div>

                    <p className="text-sm font-semibold text-red-100">
                      EDUCATION FAIR
                    </p>

                    <h3 className="mt-1 text-xl font-extrabold">
                      {event.location}
                    </h3>

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <div className="space-y-4">

                    {/* VENUE */}

                    <div className="flex items-start gap-3">

                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />

                      <div>

                        <p className="font-bold text-slate-900">
                          {event.venue}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {event.address}
                        </p>

                      </div>

                    </div>

                    {/* DATE */}

                    <div className="flex items-center gap-3">

                      <CalendarDays className="h-5 w-5 shrink-0 text-brand-red" />

                      <p className="text-sm font-semibold text-slate-700">
                        {event.date}
                      </p>

                    </div>

                    {/* TIME */}

                    <div className="flex items-center gap-3">

                      <Clock3 className="h-5 w-5 shrink-0 text-brand-red" />

                      <p className="text-sm font-semibold text-slate-700">
                        {event.time}
                      </p>

                    </div>

                  </div>

                  {/* BUTTON */}

                  <button
                    type="button"
                    onClick={() =>
                      selectEvent(event)
                    }
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 font-bold text-white transition hover:bg-red-700"
                  >
                    ĐĂNG KÝ TẠI{' '}
                    {event.location.toUpperCase()}

                    <ArrowRight className="h-4 w-4" />
                  </button>

                </div>

              </article>
            )
          )}

        </div>

      </div>
    </section>
  );
}