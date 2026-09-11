import React, {
  useEffect,
  useState,
} from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import {
  ChevronRight,
  GraduationCap,
  Briefcase,
  Users,
  Send,
  MapPin,
  Calendar,
  Clock3,
  CheckCircle2,
} from 'lucide-react';
import {
  cn,
  useUtm,
} from '../lib/utils';
import {
  getAttribution,
  track,
} from '../lib/tracking';

// ======================================================
// ĐỐI TƯỢNG
// ======================================================
const roles = [
  {
    id: 'high-school',
    label: 'Học sinh THPT',
    icon: GraduationCap,
  },
  {
    id: 'university',
    label: 'Sinh viên Đại học',
    icon: GraduationCap,
  },
  {
    id: 'professional',
    label: 'Người đi làm',
    icon: Briefcase,
  },
  {
    id: 'parent',
    label: 'Phụ huynh',
    icon: Users,
  },
];

// ======================================================
// CHƯƠNG TRÌNH
// ======================================================
const programs = [
  'Du học Trung học',
  'Dự bị đại học',
  'Cao Đẳng',
  'Đại học',
  'Sau đại học',
  'Khoá ngắn hạn',
  'Du học nghề',
  'Chưa quyết định',
];

// ======================================================
// QUỐC GIA
// ======================================================
const countries = [
  'Australia',
  'UK',
  'USA',
  'Canada',
  'New Zealand',
  'Singapore',
  'Euro',
  'Khác',
  'Chưa quyết định',
];

// ======================================================
// THỜI GIAN
// ======================================================
const timeframes = [
  'Trong 3 tháng tới',
  '3 - 6 tháng',
  '6 - 12 tháng',
  '1 - 2 năm',
  'Chưa quyết định',
];

// ======================================================
// NHU CẦU HỖ TRỢ
// ======================================================
const assistance = [
  'Chọn ngành',
  'Chọn trường',
  'Học bổng',
  'Hồ sơ du học',
  'Visa',
  'Chi phí',
  'Hướng nghiệp',
  'Lộ trình du học',
];

// ======================================================
// EDUCATION FAIR EVENTS
// ======================================================
const EVENTS = [
  {
    id: 'dak-nong',
    location: 'Đắk Nông',
    venue: 'Robin Hotel',
    address:
      '77, Đường 23 Tháng 3, Tổ 1, Nam Gia Nghĩa, Lâm Đồng 65106',
    date: '24/09/2026',
    time: '13:00 – 17:00',
  },
  {
    id: 'bao-loc',
    location: 'TP. Bảo Lộc',
    venue: 'Pham Garden Coffee',
    address:
      '39 Nguyễn Bỉnh Khiêm, Phường 2, Bảo Lộc, Lâm Đồng',
    date: '26/09/2026',
    time: '13:00 – 17:00',
  },
  {
    id: 'da-lat',
    location: 'TP. Đà Lạt',
    venue: 'Nesta Valley Hotel',
    address:
      '94 Đường Bùi Thị Xuân, Xuân Hương - Đà Lạt, Lâm Đồng',
    date: '27/09/2026',
    time: '13:00 – 17:00',
  },
];

// ======================================================
// GỬI LEAD API
// ======================================================
async function sendLead(data) {
  const response = await fetch(
    '/api/lead',
    {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  const rawText =
    await response.text();
  let result = {};
  try {
    result = rawText
      ? JSON.parse(rawText)
      : {};
  } catch {
    throw new Error(
      `API không trả về JSON. Status ${response.status}: ${rawText.substring(
        0,
        300
      )}`
    );
  }
  if (
    !response.ok ||
    !result.success
  ) {
    throw new Error(
      result.message ||
        `Lead API returned ${response.status}`
    );
  }
  return result;
}

// ======================================================
// COMPONENT
// ======================================================
export default function LeadForm({
  className,
}) {
  const [
    step,
    setStep,
  ] = useState(1);
  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  // Event đang chọn
  const [
    selectedEvent,
    setSelectedEvent,
  ] = useState(null);

  // Form Data
  const [
    formData,
    setFormData,
  ] = useState({
    role: '',
    program: '',
    fullName: '',
    phone: '',
    email: '',
    country: '',
    timeframe: '',
    location: '',
    needs: [],
  });

  const utm = useUtm();

  // Tìm event theo ID
  const findEvent = (eventId) => {
    return EVENTS.find(
      (event) =>
        event.id === eventId
    );
  };

  // Xử lý khi chọn địa điểm ngay trong form (hoặc từ bên dưới đồng bộ lên)
  const handleLocationChange = (
    eventId
  ) => {
    const event =
      findEvent(eventId);
    setSelectedEvent(
      event || null
    );
    setFormData((prev) => ({
      ...prev,
      location:
        event?.location || '',
    }));

    if (event) {
      localStorage.setItem(
        'selectedFairEvent',
        JSON.stringify(event)
      );
      window.dispatchEvent(
        new CustomEvent(
          'fair-event-selected',
          {
            detail: event,
          }
        )
      );
    } else {
      localStorage.removeItem(
        'selectedFairEvent'
      );
    }
  };

  // Đồng bộ 2 chiều: Lắng nghe sự kiện từ section bên dưới hoặc localStorage
  useEffect(() => {
    const savedEvent =
      localStorage.getItem(
        'selectedFairEvent'
      );
    if (savedEvent) {
      try {
        const parsedEvent =
          JSON.parse(savedEvent);
        const matchedEvent =
          findEvent(
            parsedEvent?.id
          );
        const eventToUse =
          matchedEvent ||
          parsedEvent;
        setSelectedEvent(
          eventToUse
        );
        setFormData((prev) => ({
          ...prev,
          location:
            eventToUse?.location ||
            '',
        }));
      } catch (error) {
        console.error(
          'Không đọc được selectedFairEvent:',
          error
        );
      }
    }

    const handleEventSelected = (
      event
    ) => {
      const incomingEvent =
        event.detail;
      if (!incomingEvent) {
        return;
      }
      const matchedEvent =
        findEvent(
          incomingEvent?.id
        );
      const eventToUse =
        matchedEvent ||
        incomingEvent;
      setSelectedEvent(
        eventToUse
      );
      setFormData((prev) => ({
        ...prev,
        location:
          eventToUse?.location ||
          '',
      }));
    };

    window.addEventListener(
      'fair-event-selected',
      handleEventSelected
    );
    return () => {
      window.removeEventListener(
        'fair-event-selected',
        handleEventSelected
      );
    };
  }, []);

  // Chuyển bước
  const handleNext = () => {
    track(
      'form_step_1',
      {
        role:
          formData.role,
        program:
          formData.program,
        event_id:
          selectedEvent?.id ||
          '',
        event_location:
          selectedEvent?.location ||
          '',
      }
    );
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  // Chọn nhu cầu
  const toggleNeed = (need) => {
    setFormData((prev) => ({
      ...prev,
      needs:
        prev.needs.includes(
          need
        )
          ? prev.needs.filter(
              (item) =>
                item !== need
            )
          : [
              ...prev.needs,
              need,
            ],
    }));
  };

  // Submit form
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      !formData.fullName.trim()
    ) {
      alert(
        'Vui lòng nhập họ và tên.'
      );
      return;
    }
    if (
      !formData.phone.trim()
    ) {
      alert(
        'Vui lòng nhập số điện thoại.'
      );
      return;
    }
    if (
      !formData.email.trim()
    ) {
      alert(
        'Vui lòng nhập email để nhận xác nhận tham gia sự kiện.'
      );
      return;
    }
    if (!selectedEvent) {
      alert(
        'Vui lòng chọn địa điểm tham gia Education Fair.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const finalData = {
        ...formData,
        ...utm,
        ...getAttribution(),
        leadType: 'education_fair',
        eventId:
          selectedEvent?.id ||
          '',
        eventLocation:
          selectedEvent?.location ||
          '',
        eventVenue:
          selectedEvent?.venue ||
          '',
        eventAddress:
          selectedEvent?.address ||
          '',
        eventDate:
          selectedEvent?.date ||
          '',
        eventTime:
          selectedEvent?.time ||
          '',
        page_url:
          window.location.href,
        date_created:
          new Date().toISOString(),
      };

      track(
        'submit_form',
        {
          form_name:
            'education_fair_registration',
          country:
            formData.country,
          program:
            formData.program,
          event_id:
            selectedEvent?.id ||
            '',
          event_location:
            selectedEvent?.location ||
            '',
          event_venue:
            selectedEvent?.venue ||
            '',
        }
      );

      const result =
        await sendLead(
          finalData
        );

      track(
        'generate_lead',
        {
          form_name:
            'education_fair_registration',
          country:
            formData.country,
          program:
            formData.program,
          event_id:
            selectedEvent?.id ||
            '',
          event_location:
            selectedEvent?.location ||
            '',
        }
      );

      sessionStorage.setItem(
        'hl_lead_submitted',
        '1'
      );
      sessionStorage.setItem(
        'hl_customer_name',
        formData.fullName
      );
      sessionStorage.setItem(
        'hl_customer_email',
        formData.email
      );
      sessionStorage.setItem(
        'hl_fair_event',
        JSON.stringify(
          selectedEvent
        )
      );
      localStorage.setItem(
        'selectedFairEvent',
        JSON.stringify(
          selectedEvent
        )
      );

      window.location.href =
        '/cam-on';
    } catch (error) {
      console.error(
        'Lead submission failed:',
        error
      );
      track(
        'form_error',
        {
          form_name:
            'education_fair_registration',
          error:
            error?.message ||
            'Unknown error',
        }
      );
      setIsSubmitting(
        false
      );
      alert(
        error?.message ||
          'Có lỗi khi gửi thông tin. Vui lòng thử lại hoặc liên hệ hotline.'
      );
    }
  };

  return (
    <div
      id="registration-form"
      className={cn(
        'bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100',
        className
      )}
    >
      {/* HEADER */}
      <div className="bg-brand-red p-6 text-white text-center">
        <h3 className="text-xl font-bold">
          ĐĂNG KÝ EDUCATION FAIR 2026
        </h3>
        <p className="text-red-100 text-sm mt-1">
          Hoàn tất thông tin để nhận email xác nhận tham gia sự kiện.
        </p>
        <div className="flex items-center justify-center mt-6 space-x-2">
          <div
            className={cn(
              'h-1.5 w-12 rounded-full',
              step >= 1
                ? 'bg-white'
                : 'bg-red-400'
            )}
          />
          <div
            className={cn(
              'h-1.5 w-12 rounded-full',
              step >= 2
                ? 'bg-white'
                : 'bg-red-400'
            )}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 md:p-8"
      >
        <AnimatePresence
          mode="wait"
        >
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -20,
              }}
              className="space-y-6"
            >
              {/* ROLE */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Bạn là ai?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map(
                    (role) => {
                      const Icon =
                        role.icon;
                      return (
                        <button
                          key={
                            role.id
                          }
                          type="button"
                          onClick={() =>
                            setFormData(
                              (prev) => ({
                                ...prev,
                                role:
                                  role.label,
                              })
                            )
                          }
                          className={cn(
                            'flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all text-sm',
                            formData.role ===
                              role.label
                              ? 'border-brand-red bg-red-50 text-brand-red'
                              : 'border-slate-100 text-slate-600 hover:border-slate-200'
                          )}
                        >
                          <Icon className="w-6 h-6 mb-2" />
                          {role.label}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* PROGRAM */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Bạn quan tâm chương trình nào?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {programs.map(
                    (program) => (
                      <button
                        key={
                          program
                        }
                        type="button"
                        onClick={() =>
                          setFormData(
                            (prev) => ({
                              ...prev,
                              program,
                            })
                          )
                        }
                        className={cn(
                          'px-3 py-2 rounded-lg border text-xs font-medium text-left transition-all',
                          formData.program ===
                            program
                            ? 'border-brand-red bg-red-50 text-brand-red'
                            : 'border-slate-100 text-slate-600 hover:border-slate-200'
                        )}
                      >
                        {program}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* NEXT BUTTON */}
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  !formData.role ||
                  !formData.program
                }
                className="w-full bg-brand-red text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                TIẾP TỤC
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -20,
              }}
              className="space-y-5"
            >
              {/* NAME + PHONE */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Họ và tên *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={
                      formData.fullName
                    }
                    onChange={(e) =>
                      setFormData(
                        (prev) => ({
                          ...prev,
                          fullName:
                            e.target.value,
                        })
                      )
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="09xx xxx xxx"
                    value={
                      formData.phone
                    }
                    onChange={(e) =>
                      setFormData(
                        (prev) => ({
                          ...prev,
                          phone:
                            e.target.value,
                        })
                      )
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Email nhận xác nhận *
                </label>
                <input
                  required
                  type="email"
                  placeholder="example@gmail.com"
                  value={
                    formData.email
                  }
                  onChange={(e) =>
                    setFormData(
                      (prev) => ({
                        ...prev,
                        email:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:border-brand-red"
                />
              </div>

              {/* COUNTRY + TIMEFRAME */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Nước quan tâm
                  </label>
                  <select
                    value={
                      formData.country
                    }
                    onChange={(e) =>
                      setFormData(
                        (prev) => ({
                          ...prev,
                          country:
                            e.target.value,
                        })
                      )
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="">
                      Chọn quốc gia
                    </option>
                    {countries.map(
                      (country) => (
                        <option
                          key={
                            country
                          }
                          value={
                            country
                          }
                        >
                          {country}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Thời gian dự kiến
                  </label>
                  <select
                    value={
                      formData.timeframe
                    }
                    onChange={(e) =>
                      setFormData(
                        (prev) => ({
                          ...prev,
                          timeframe:
                            e.target.value,
                        })
                      )
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="">
                      Chọn thời gian
                    </option>
                    {timeframes.map(
                      (time) => (
                        <option
                          key={time}
                          value={time}
                        >
                          {time}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* ĐỊA ĐIỂM THAM GIA (TÍCH HỢP TRỰC TIẾP TRÊN FORM) */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Địa điểm tham gia *
                </label>
                <select
                  required
                  value={
                    selectedEvent?.id ||
                    ''
                  }
                  onChange={(e) =>
                    handleLocationChange(
                      e.target.value
                    )
                  }
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border bg-white outline-none transition-all',
                    selectedEvent
                      ? 'border-brand-red ring-1 ring-red-100'
                      : 'border-slate-200 focus:border-brand-red'
                  )}
                >
                  <option value="">
                    Chọn địa điểm tham gia
                  </option>
                  {EVENTS.map(
                    (event) => (
                      <option
                        key={
                          event.id
                        }
                        value={
                          event.id
                        }
                      >
                        {event.location}
                        {' – '}
                        {event.date} ({event.venue})
                      </option>
                    )
                  )}
                </select>

                {/* Hiển thị chi tiết địa điểm khi đã chọn */}
                {selectedEvent && (
                  <div className="mt-3 rounded-xl bg-red-50 border border-red-100 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red text-white">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-red">
                          Địa điểm đã chọn
                        </p>
                        <p className="mt-1 font-extrabold text-slate-900">
                          {selectedEvent.location}
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          {selectedEvent.venue}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                        <span>
                          {selectedEvent.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 shrink-0 text-brand-red" />
                        <span>
                          {selectedEvent.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 shrink-0 text-brand-red" />
                        <span>
                          {selectedEvent.time}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* NEEDS */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Bạn cần hỗ trợ điều gì? (Có thể chọn nhiều)
                </label>
                <div className="flex flex-wrap gap-2">
                  {assistance.map(
                    (need) => (
                      <button
                        key={
                          need
                        }
                        type="button"
                        onClick={() =>
                          toggleNeed(
                            need
                          )
                        }
                        className={cn(
                          'px-3 py-1.5 rounded-full border text-xs font-medium',
                          formData.needs.includes(
                            need
                          )
                            ? 'border-brand-red bg-red-50 text-brand-red'
                            : 'border-slate-100 text-slate-600 hover:border-slate-200'
                        )}
                      >
                        {need}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={
                    handleBack
                  }
                  disabled={
                    isSubmitting
                  }
                  className="px-6 py-4 rounded-xl font-bold border-2 border-slate-100 text-slate-600 disabled:opacity-50"
                >
                  QUAY LẠI
                </button>
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !selectedEvent
                  }
                  className="flex-1 bg-brand-red text-white py-4 rounded-xl font-bold flex items-center justify-center disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Send className="w-5 h-5 mr-2 animate-pulse" />
                      ĐANG GỬI...
                    </>
                  ) : (
                    'XÁC NHẬN THAM GIA SỰ KIỆN'
                  )}
                </button>
              </div>

              {/* PRIVACY */}
              <p className="text-[10px] text-slate-400 text-center italic">
                Thông tin của bạn được bảo mật và chỉ sử dụng cho mục đích tư vấn và xác nhận tham gia sự kiện.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}