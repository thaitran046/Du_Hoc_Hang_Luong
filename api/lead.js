const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfWKMT14OkabcCipsolbeeQ28sEMuJpr-8BGOvzzFLjmSD1Uw/formResponse';

// Các giá trị THẬT đang có trên Google Form
const VALID_TIMEFRAMES = [
  'Trong 3 tháng tới',
  '3 - 6 tháng',
  '1 - 2 năm',
  'Chưa quyết định',
];

const NEED_MAP = {
  'Chọn ngành': 'Chọn Ngành',
  'Chọn Ngành': 'Chọn Ngành',

  'Chọn trường': 'Chọn trường',

  'Học bổng': 'Học Bổng',
  'Học Bổng': 'Học Bổng',

  'Hồ sơ nhập học': 'Hồ sơ nhập học',
  Visa: 'Visa',
  'Chi phí': 'Chi phí',
  'Hướng nghiệp': 'Hướng nghiệp',
  'Lộ trình học': 'Lộ trình học',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const {
      role = '',
      program = '',
      fullName = '',
      phone = '',
      email = '',
      country = '',
      timeframe = '',
      needs = [],
    } = req.body || {};

    // Google Form đang bắt buộc 3 field này
    if (!fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu họ tên',
      });
    }

    if (!phone.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu số điện thoại',
      });
    }

    if (!email.trim()) {
      return res.status(400).json({
        success: false,
        message:
          'Google Form đang yêu cầu Email bắt buộc',
      });
    }

    const form = new URLSearchParams();

    // Bạn là ai?
    if (role) {
      form.append(
        'entry.786228905',
        role
      );
    }

    // Chương trình
    if (program) {
      form.append(
        'entry.1432927249',
        program
      );
    }

    // Họ tên
    form.append(
      'entry.741405596',
      fullName.trim()
    );

    // Điện thoại
    form.append(
      'entry.1415447158',
      phone.trim()
    );

    // Email - bắt buộc
    form.append(
      'entry.1045781291',
      email.trim()
    );

    // Quốc gia
    if (country) {
      form.append(
        'entry.1005224062',
        country
      );
    }

    /*
      Chỉ gửi timeframe nếu nó thực sự tồn tại
      trong Google Form.

      Nếu landing page chọn "6 - 12 tháng",
      tạm thời KHÔNG gửi field này để tránh 400.
    */
    if (
      timeframe &&
      VALID_TIMEFRAMES.includes(timeframe)
    ) {
      form.append(
        'entry.965295111',
        timeframe
      );
    }

    // Checkbox - chuẩn hóa đúng chữ của Google Form
    if (Array.isArray(needs)) {
      needs.forEach((need) => {
        const googleValue =
          NEED_MAP[need];

        if (googleValue) {
          form.append(
            'entry.2120121799',
            googleValue
          );
        }
      });
    }

    console.log(
      'GOOGLE FORM PAYLOAD:',
      form.toString()
    );

    const response = await fetch(
      GOOGLE_FORM_URL,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
        },

        body: form.toString(),

        redirect: 'manual',
      }
    );

    console.log(
      'GOOGLE FORM STATUS:',
      response.status
    );

    /*
      Google Forms có thể trả redirect
      sau khi submit.
    */
    if (
      ![200, 302, 303].includes(
        response.status
      )
    ) {
      const body =
        await response.text();

      console.error(
        'GOOGLE FORM ERROR:',
        response.status,
        body.substring(0, 500)
      );

      return res.status(502).json({
        success: false,
        message:
          `Google Form failed: ${response.status}`,
      });
    }

    console.log(
      'LEAD SUCCESS:',
      fullName,
      phone
    );

    return res.status(200).json({
      success: true,
    });

  } catch (error) {
    console.error(
      'LEAD API ERROR:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        'Internal server error',
    });
  }
}