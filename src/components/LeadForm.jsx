import React, { useState } from 'react';
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

// ================================
// SEND LEAD TO VERCEL API
// ================================

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

      const result =
        await sendLead(finalData);

      console.log(
        'Lead result:',
        result
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

      window.location.href =
        '/cam-on';
    } catch (error) {
      console.error(
        'Lead submission failed:',
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
          NHẬN TƯ VẤN LỘ TRÌNH
          MIỄN PHÍ
        </h3>

        <p className="text-red-100 text-sm mt-1">
          Để lại thông tin,
          chuyên viên Hằng Lương
          sẽ liên hệ tư vấn lộ
          trình phù hợp nhất cho
          bạn.
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
                              ? 'border-brand-blue bg-red-50 text-brand-blue'
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
                  Bạn quan tâm chương
                  trình nào?
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
                            ? 'border-brand-blue bg-red-50 text-brand-blue'
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
              {/* NAME / PHONE */}

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
                            e.target
                              .value,
                        })
                      )
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none"
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
                            e.target
                              .value,
                        })
                      )
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none"
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
                  value={
                    formData.email
                  }
                  onChange={(e) =>
                    setFormData(
                      (prev) => ({
                        ...prev,
                        email:
                          e.target
                            .value,
                      })
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none"
                />
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
                            e.target
                              .value,
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
                          {
                            country
                          }
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
                            e.target
                              .value,
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
                          'px-3 py-1.5 rounded-full border text-xs font-medium',

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
                  className="px-6 py-4 rounded-xl font-bold border-2 border-slate-100 text-slate-600 disabled:opacity-50"
                >
                  QUAY LẠI
                </button>

                <button
                  type="submit"
                  disabled={
                    isSubmitting
                  }
                  className="flex-1 bg-brand-blue text-white py-4 rounded-xl font-bold flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Send className="w-5 h-5 mr-2 animate-pulse" />
                      ĐANG GỬI...
                    </>
                  ) : (
                    'NHẬN TƯ VẤN MIỄN PHÍ'
                  )}
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center italic">
                Thông tin của bạn
                được bảo mật và chỉ
                sử dụng cho mục đích
                tư vấn.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}