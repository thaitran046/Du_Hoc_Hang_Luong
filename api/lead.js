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

    if (!fullName.trim() || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu họ tên hoặc số điện thoại',
      });
    }

    const GOOGLE_FORM_URL =
      'https://docs.google.com/forms/d/e/1FAIpQLSfWKMT14OkabcCipsolbeeQ28sEMuJpr-8BGOvzzFLjmSD1Uw/formResponse';

    const formData = new URLSearchParams();

    // Bạn là ai?
    formData.append(
      'entry.786228905',
      role
    );

    // Chương trình quan tâm
    formData.append(
      'entry.1432927249',
      program
    );

    // Họ tên
    formData.append(
      'entry.741405596',
      fullName
    );

    // Số điện thoại
    formData.append(
      'entry.1415447158',
      phone
    );

    // Email
    if (email) {
      formData.append(
        'entry.1045781291',
        email
      );
    }

    // Quốc gia
    if (country) {
      formData.append(
        'entry.1005224062',
        country
      );
    }

    // Thời gian
    if (timeframe) {
      formData.append(
        'entry.965295111',
        timeframe
      );
    }

    // Checkbox - hỗ trợ nhiều lựa chọn
    if (Array.isArray(needs)) {
      needs.forEach((need) => {
        if (need) {
          formData.append(
            'entry.2120121799',
            need
          );
        }
      });
    }

    console.log(
      'Sending lead:',
      fullName,
      phone
    );

    const googleResponse =
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded',
        },

        body: formData.toString(),

        // Cho fetch tự follow redirect của Google
        redirect: 'follow',
      });

    console.log(
      'Google final status:',
      googleResponse.status
    );

    console.log(
      'Google final URL:',
      googleResponse.url
    );

    /*
      Google Forms thường trả về HTML trang xác nhận.
      Vì vậy KHÔNG parse response thành JSON.
    */

    const responseText =
      await googleResponse.text();

    console.log(
      'Google response received:',
      responseText.length
    );

    /*
      Nếu Google trả lỗi HTTP thực sự
      mới coi là thất bại.
    */

    if (!googleResponse.ok) {
      console.error(
        'Google Form failed:',
        googleResponse.status
      );

      return res.status(502).json({
        success: false,
        message:
          'Google Form không nhận dữ liệu',
        googleStatus:
          googleResponse.status,
      });
    }

    console.log(
      'LEAD SUCCESS:',
      fullName,
      phone
    );

    return res.status(200).json({
      success: true,
      message: 'Lead submitted',
    });

  } catch (error) {
    console.error(
      'Lead API error:',
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