import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  GraduationCap,
  Briefcase,
  Users,
  Send,
} from 'lucide-react';

import { cn, useUtm } from '../lib/utils';
import { getAttribution, track } from '../lib/tracking';

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

// ======================================================
// GOOGLE FORM CONFIG
// ======================================================

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSfWKMT14OkabcCipsolbeeQ28sEMuJpr-8BGOvzzFLjmSD1Uw/formResponse';

const GOOGLE_FORM_FIELDS = {
  role: 'entry.786228905',
  program: 'entry.1432927249',
  fullName: 'entry.741405596',
  phone: 'entry.1415447158',
  email: 'entry.1045781291',
  country: 'entry.1005224062',
  timeframe: 'entry.965295111',
  needs: 'entry.2120121799',
};

// ======================================================
// SEND TO GOOGLE FORM
// ======================================================

async function sendLeadToGoogleForm(data) {
  const payload = new URLSearchParams();

  const appendIfValue = (field, value) => {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ''
    ) {
      payload.append(field, String(value));
    }
  };

  appendIfValue(
    GOOGLE_FORM_FIELDS.role,
    data.role
  );

  appendIfValue(
    GOOGLE_FORM_FIELDS.program,
    data.program
  );

  appendIfValue(
    GOOGLE_FORM_FIELDS.fullName,
    data.fullName
  );

  appendIfValue(
    GOOGLE_FORM_FIELDS.phone,
    data.phone
  );

  appendIfValue(
    GOOGLE_FORM_FIELDS.email,
    data.email
  );

  appendIfValue(
    GOOGLE_FORM_FIELDS.country,
    data.country
  );

  appendIfValue(
    GOOGLE_FORM_FIELDS.timeframe,
    data.timeframe
  );

  if (Array.isArray(data.needs)) {
    data.needs.forEach((need) => {
      if (need) {
        payload.append(
          GOOGLE_FORM_FIELDS.needs,
          need
        );
      }
    });
  }

  await fetch(GOOGLE_FORM_ACTION, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: payload.toString(),
  });
}

// ======================================================
// COMPONENT
// ======================================================

export default function LeadForm({
  className,
}) {
  const [step, setStep] = useState(1);

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

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const utm = useUtm();

  const handleNext = () => {
    track('form_step_1', {
      role: formData.role,
      program: formData.program,
    });

    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const toggleNeed = (need) => {
    setFormData((prev) => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter(
            (n) => n !== need
          )
        : [...prev.needs, need],
    }));
  };

  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      alert(
        'Vui lòng nhập họ và tên.'
      );
      return;
    }

    if (!formData.phone.trim()) {
      alert(
        'Vui lòng nhập số điện thoại.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const finalData = {
        ...formData,
        ...utm,
        ...getAttribution(),
        page_url:
          window.location.href,
        date_created:
          new Date().toISOString(),
      };

      track('submit_form', {
        form_name:
          'lead_consultation',
        country:
          formData.country,
        program:
          formData.program,
      });

      await sendLeadToGoogleForm(
        finalData
      );

      track('generate_lead', {
        form_name:
          'lead_consultation',
        country:
          formData.country,
        program:
          formData.program,
      });

      sessionStorage.setItem(
        'hl_lead_submitted',
        '1'
      );

      setTimeout(() => {
        window.location.href =
          '/cam-on';
      }, 700);
    } catch (error) {
      console.error(
        'Google Form submission failed:',
        error
      );

      track('form_error', {
        form_name:
          'lead_consultation',
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
      {/* HEADER */}
      <div className="bg-brand-blue p-6 text-white text-center">
        <h3 className="text-xl font-bold">
          NHẬN TƯ VẤN LỘ TRÌNH MIỄN PHÍ
        </h3>

        <p className="text-red-100 text-sm mt-1">
          Để lại thông tin, chuyên
          viên Hằng Lương sẽ liên hệ
          tư vấn lộ trình phù hợp nhất
          cho bạn.
        </p>

        <div className="flex items-center justify-center mt-6 space-x-2">
          <div
            className={cn(
              'h-1.5 w-12 rounded-full transition-colors',
              step >= 1
                ? 'bg-white'
                : 'bg-red-400'
            )}
          />

          <div
            className={cn(
              'h-1.5 w-12 rounded-full transition-colors',
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
                  {roles.map((r) => {
                    const Icon =
                      r.icon;

                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() =>
                          setFormData(
                            (prev) => ({
                              ...prev,
                              role: r.label,
                            })
                          )
                        }
                        className={cn(
                          'flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all text-sm',
                          formData.role ===
                            r.label
                            ? 'border-brand-blue bg-red-50 text-brand-blue'
                            : 'border-slate-100 hover:border-slate-200 text-slate-600'
                        )}
                      >
                        <Icon className="w-6 h-6 mb-2" />

                        {r.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PROGRAM */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Bạn quan tâm chương
                  trình nào?
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {programs.map(
                    (program) => (
                      <button
                        key={program}
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
                          'px-3 py-2 rounded-lg border text-xs font-medium transition-all text-left',
                          formData.program ===
                            program
                            ? 'border-brand-blue bg-red-50 text-brand-blue'
                            : 'border-slate-100 hover:border-slate-200 text-slate-600'
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
                onClick={handleNext}
                disabled={
                  !formData.role ||
                  !formData.program
                }
                className="w-full bg-brand-red text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
              >
                <span>
                  TIẾP TỤC
                </span>

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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none"
                    value={
                      formData.fullName
                    }
                    onChange={(e) =>
                      setFormData(
                        (prev) => ({
                          ...prev,
                          fullName:
                            e.target
                              .value,
                        })
                      )
                    }
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none"
                    value={
                      formData.phone
                    }
                    onChange={(e) =>
                      setFormData(
                        (prev) => ({
                          ...prev,
                          phone:
                            e.target
                              .value,
                        })
                      )
                    }
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData(
                      (prev) => ({
                        ...prev,
                        email:
                          e.target.value,
                      })
                    )
                  }
                />
              </div>

              {/* COUNTRY + TIME */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Nước quan tâm
                  </label>

                  <select
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none bg-white"
                    value={
                      formData.country
                    }
                    onChange={(e) =>
                      setFormData(
                        (prev) => ({
                          ...prev,
                          country:
                            e.target
                              .value,
                        })
                      )
                    }
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none bg-white"
                    value={
                      formData.timeframe
                    }
                    onChange={(e) =>
                      setFormData(
                        (prev) => ({
                          ...prev,
                          timeframe:
                            e.target
                              .value,
                        })
                      )
                    }
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
                  Bạn cần hỗ trợ điều
                  gì? (Có thể chọn
                  nhiều)
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
                          'px-3 py-1.5 rounded-full border text-xs font-medium transition-all',
                          formData.needs.includes(
                            need
                          )
                            ? 'border-brand-blue bg-red-50 text-brand-blue'
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
                  className="px-6 py-4 rounded-xl font-bold border-2 border-slate-100 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  QUAY LẠI
                </button>

                <button
                  type="submit"
                  disabled={
                    isSubmitting
                  }
                  className="flex-1 bg-brand-blue text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Send className="w-5 h-5 mr-2 animate-pulse" />
                      ĐANG GỬI...
                    </span>
                  ) : (
                    <span>
                      NHẬN TƯ VẤN
                      MIỄN PHÍ
                    </span>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center italic mt-2">
                Thông tin của bạn được
                bảo mật và chỉ sử dụng
                cho mục đích tư vấn.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
