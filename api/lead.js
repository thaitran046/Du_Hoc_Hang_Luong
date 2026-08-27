const GOOGLE_SCRIPT_URL =
  'https://script.google.com/u/0/home/projects/1nz_tVqxf_bZISWoWydJY5ECOHtrajkiUQsInjw_Kx6VPcjheSBxaRGPB/edit';

export default async function handler(req, res) {
  // Chỉ nhận POST
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

    // Validate tối thiểu
    if (!fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu họ và tên',
      });
    }

    if (!phone.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu số điện thoại',
      });
    }

    // Payload giữ đúng tên field Apps Script đang nhận
    const payload = {
      role,
      program,
      fullName,
      phone,
      email,
      country,
      timeframe,
      needs: Array.isArray(needs)
        ? needs
        : [],
    };

    console.log(
      '=== LEAD RECEIVED ===',
      JSON.stringify(payload)
    );

    // Gửi sang Apps Script
    const googleResponse = await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: 'POST',

        /*
          Dùng text/plain để tránh preflight/CORS
          không cần thiết với Apps Script.
        */
        headers: {
          'Content-Type':
            'text/plain;charset=utf-8',
        },

        body: JSON.stringify(payload),

        redirect: 'follow',
      }
    );

    const responseText =
      await googleResponse.text();

    console.log(
      '=== APPS SCRIPT STATUS ===',
      googleResponse.status
    );

    console.log(
      '=== APPS SCRIPT FINAL URL ===',
      googleResponse.url
    );

    console.log(
      '=== APPS SCRIPT RESPONSE ===',
      responseText
    );

    // HTTP lỗi
    if (!googleResponse.ok) {
      return res.status(502).json({
        success: false,
        message:
          `Apps Script HTTP ${googleResponse.status}`,
      });
    }

    /*
      Apps Script chuẩn của bạn trả:
      {"success":true}

      hoặc:
      {"success":false,"message":"..."}
    */

    if (!responseText.trim()) {
      return res.status(502).json({
        success: false,
        message:
          'Apps Script trả response rỗng',
      });
    }

    let googleResult;

    try {
      googleResult =
        JSON.parse(responseText);
    } catch (error) {
      console.error(
        'Apps Script invalid JSON:',
        responseText
      );

      return res.status(502).json({
        success: false,
        message:
          'Apps Script không trả JSON hợp lệ',
      });
    }

    // Apps Script tự báo lỗi
    if (
      googleResult.success !== true
    ) {
      return res.status(502).json({
        success: false,
        message:
          googleResult.message ||
          'Apps Script không tạo được response',
      });
    }

    console.log(
      '=== LEAD SUCCESS ===',
      fullName,
      phone
    );

    return res.status(200).json({
      success: true,
      message:
        'Lead đã được Apps Script xử lý',
    });

  } catch (error) {
    console.error(
      '=== LEAD API ERROR ===',
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