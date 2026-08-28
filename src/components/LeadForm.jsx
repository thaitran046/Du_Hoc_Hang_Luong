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

const timeframes = [
  'Trong 3 tháng tới',
  '3 - 6 tháng',
  '6 - 12 tháng',
  '1 - 2 năm',
  'Chưa quyết định',
];

const assistance = [
  'Chọn ngành',
  'Chọn trường',
  'Học bổng',
  'Hồ sơ nhập học',
  'Visa',
  'Chi phí',
  'Hướng nghiệp',
  'Lộ trình học',
];

// ======================================
// GỬI LEAD + EMAIL XÁC NHẬN
// ======================================

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

  let result = {};

  try {
    result =
      await response.json();
  } catch {
    result = {};
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

export default function LeadForm({
  className,
}) {

  const [step, setStep] =
    useState(1);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    selectedEvent,
    setSelectedEvent,
  ] = useState(null);

  const [formData, setFormData] =
    useState({
      role: '',
      program: '',
      fullName: '',
      phone: '',
      email: '',
      country: '',
      timeframe: '',
      needs: [],
    });

  const utm = useUtm();

  // ======================================
  // NHẬN ĐỊA ĐIỂM KHÁCH CHỌN TỪ EVENTS
  // ======================================

  useEffect(() => {

    const savedEvent =
      localStorage.getItem(
        'selectedFairEvent'
      );

    if (savedEvent) {
      try {
        setSelectedEvent(
          JSON.parse(savedEvent)
        );
      } catch (error) {
        console.error(
          'Không đọc được sự kiện:',
          error
        );
      }
    }

    const handleEventSelected = (
      event
    ) => {
      setSelectedEvent(
        event.detail
      );
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

  // ======================================
  // NEXT
  // ======================================

  const handleNext = () => {

    track('form_step_1', {
      role: formData.role,
      program: formData.program,

      event_id:
        selectedEvent?.id || '',

      event_location:
        selectedEvent?.location || '',
    });

    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  // ======================================
  // NEEDS
  // ======================================

  const toggleNeed = (need) => {

    setFormData((prev) => ({
      ...prev,

      needs:
        prev.needs.includes(need)
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

  // ======================================
  // SUBMIT
  // ======================================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    // HỌ TÊN
    if (
      !formData.fullName.trim()
    ) {
      alert(
        'Vui lòng nhập họ và tên.'
      );
      return;
    }

    // PHONE
    if (
      !formData.phone.trim()
    ) {
      alert(
        'Vui lòng nhập số điện thoại.'
      );
      return;
    }

    // EMAIL BẮT BUỘC
    if (
      !formData.email.trim()
    ) {
      alert(
        'Vui lòng nhập email để nhận xác nhận tham gia sự kiện.'
      );
      return;
    }

    // EVENT
    if (!selectedEvent) {

      const confirmNoEvent =
        window.confirm(
          'Bạn chưa chọn địa điểm Education Fair. Bạn có muốn gửi yêu cầu tư vấn chung không?'
        );

      if (!confirmNoEvent) {

        document
          .getElementById('events')
          ?.scrollIntoView({
            behavior: 'smooth',
          });

        return;
      }
    }

    setIsSubmitting(true);

    try {

      const finalData = {

        // THÔNG TIN FORM
        ...formData,

        // UTM
        ...utm,

        // ATTRIBUTION
        ...getAttribution(),

        // =================================
        // EDUCATION FAIR
        // =================================

        leadType:
          selectedEvent
            ? 'education_fair'
            : 'consultation',

        eventId:
          selectedEvent?.id || '',

        eventLocation:
          selectedEvent?.location || '',

        eventVenue:
          selectedEvent?.venue || '',

        eventAddress:
          selectedEvent?.address || '',

        eventDate:
          selectedEvent?.date || '',

        eventTime:
          selectedEvent?.time || '',

        // =================================
        // TRACKING
        // =================================

        page_url:
          window.location.href,

        date_created:
          new Date().toISOString(),
      };

      // TRACK SUBMIT
      track('submit_form', {

        form_name:
          selectedEvent
            ? 'education_fair_registration'
            : 'lead_consultation',

        country:
          formData.country,

        program:
          formData.program,

        event_id:
          selectedEvent?.id || '',

        event_location:
          selectedEvent?.location || '',

        event_venue:
          selectedEvent?.venue || '',
      });

      // =================================
      // SEND TO API
      // API SẼ:
      // 1. LƯU LEAD
      // 2. GỬI MAIL CHO HẰNG LƯƠNG
      // 3. GỬI MAIL XÁC NHẬN CHO KHÁCH
      // =================================

      const result =
        await sendLead(finalData);

      console.log(
        'Lead result:',
        result
      );

      // =================================
      // TRACK LEAD
      // =================================

      track('generate_lead', {

        form_name:
          selectedEvent
            ? 'education_fair_registration'
            : 'lead_consultation',

        country:
          formData.country,

        program:
          formData.program,

        event_id:
          selectedEvent?.id || '',

        event_location:
          selectedEvent?.location || '',
      });

      // =================================
      // LƯU THÔNG TIN CHO TRANG CẢM ƠN
      // =================================

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

      if (selectedEvent) {

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
      }

      // =================================
      // THANK YOU PAGE
      // =================================

      window.location.href =
        '/cam-on';

    } catch (error) {

      console.error(
        'Lead submission failed:',
        error
      );

      track('form_error', {

        form_name:
          selectedEvent
            ? 'education_fair_registration'
            : 'lead_consultation',
      });

      setIsSubmitting(false);

      alert(
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

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="bg-brand-red p-6 text-white text-center">

        <h3 className="text-xl font-bold">

          {selectedEvent
            ? 'ĐĂNG KÝ EDUCATION FAIR 2026'
            : 'NHẬN TƯ VẤN LỘ TRÌNH MIỄN PHÍ'
          }

        </h3>

        <p className="text-red-100 text-sm mt-1">

          {selectedEvent
            ? 'Hoàn tất thông tin để nhận email xác nhận tham gia sự kiện.'
            : 'Để lại thông tin, chuyên viên Hằng Lương sẽ liên hệ tư vấn lộ trình phù hợp nhất cho bạn.'
          }

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

      {/* =====================================
          EVENT SELECTED
      ====================================== */}

      {selectedEvent && (

        <div className="border-b border-red-100 bg-red-50 p-5">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red text-white">

              <CheckCircle2 className="h-5 w-5" />

            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-brand-red">
                Địa điểm bạn đăng ký
              </p>

              <h4 className="mt-1 text-lg font-extrabold text-slate-900">
                {selectedEvent.location}
              </h4>

              <p className="mt-1 font-bold text-slate-800">
                {selectedEvent.venue}
              </p>

            </div>

          </div>

          <div className="mt-4 space-y-2 text-sm text-slate-600">

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

      {/* =====================================
          FORM
      ====================================== */}

      <form
        onSubmit={handleSubmit}
        className="p-6 md:p-8"
      >

        <AnimatePresence mode="wait">

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
                              (
                                prev
                              ) => ({
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

                          {
                            role.label
                          }

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
                            (
                              prev
                            ) => ({
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

              <button
                type="button"

                onClick={
                  handleNext
                }

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

                    onChange={(
                      e
                    ) =>
                      setFormData(
                        (
                          prev
                        ) => ({
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

                    onChange={(
                      e
                    ) =>
                      setFormData(
                        (
                          prev
                        ) => ({
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

                {selectedEvent && (

                  <p className="mt-2 text-xs text-slate-500">

                    Email này sẽ nhận xác nhận tham gia{' '}

                    <strong>
                      {selectedEvent.venue}
                    </strong>

                    {' '}sau khi đăng ký thành công.

                  </p>

                )}

              </div>

              {/* COUNTRY / TIME */}

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

              {/* NEEDS */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Bạn cần hỗ trợ điều gì? (Có thể chọn nhiều)
                </label>

                <div className="flex flex-wrap gap-2">

                  {assistance.map(
                    (need) => (

                      <button
                        key={need}

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
                            : 'border-slate-100 text-slate-600'
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
                    isSubmitting
                  }

                  className="flex-1 bg-brand-red text-white py-4 rounded-xl font-bold flex items-center justify-center disabled:opacity-60"
                >

                  {isSubmitting ? (

                    <>

                      <Send className="w-5 h-5 mr-2 animate-pulse" />

                      ĐANG GỬI...

                    </>

                  ) : selectedEvent ? (

                    'XÁC NHẬN THAM GIA SỰ KIỆN'

                  ) : (

                    'NHẬN TƯ VẤN MIỄN PHÍ'

                  )}

                </button>

              </div>

              {selectedEvent && (

                <div className="rounded-xl bg-green-50 p-3 text-center">

                  <p className="text-xs font-medium text-green-700">

                    ✓ Sau khi đăng ký thành công, thông tin xác nhận sự kiện sẽ được gửi đến email của bạn.

                  </p>

                </div>

              )}

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