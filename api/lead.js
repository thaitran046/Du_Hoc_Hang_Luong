const GOOGLE_SCRIPT_URL =
  'https://script.google.com/u/0/home/projects/1nz_tVqxf_bZISWoWydJY5ECOHtrajkiUQsInjw_Kx6VPcjheSBxaRGPB/edit';

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

    const payload = {
      role,
      program,
      fullName,
      phone,
      email,
      country,
      timeframe,
      needs: Array.isArray(needs) ? needs : [],
    };

    console.log(
      'LEAD PAYLOAD:',
      JSON.stringify(payload)
    );

    const response = await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'text/plain;charset=utf-8',
        },

        body: JSON.stringify(payload),

        redirect: 'follow',
      }
    );

    const text = await response.text();

    console.log(
      'APPS SCRIPT STATUS:',
      response.status
    );

    console.log(
      'APPS SCRIPT FINAL URL:',
      response.url
    );

    console.log(
      'APPS SCRIPT CONTENT TYPE:',
      response.headers.get('content-type')
    );

    console.log(
      'APPS SCRIPT BODY:',
      text
    );

    // HTTP từ Google/Apps Script bị lỗi
    if (!response.ok) {
      return res.status(502).json({
        success: false,

        message:
          `Apps Script HTTP ${response.status}`,

        appsScriptResponse:
          text.substring(0, 500),
      });
    }

    // Apps Script trả body rỗng
    if (!text || !text.trim()) {
      return res.status(502).json({
        success: false,
        message:
          'Apps Script trả response rỗng',
      });
    }

    // Thử đọc JSON
    let result;

    try {
      result = JSON.parse(text);
    } catch (error) {
      console.error(
        'APPS SCRIPT NON JSON:',
        text.substring(0, 1000)
      );

      return res.status(502).json({
        success: false,

        message:
          'Apps Script không trả JSON',

        appsScriptResponse:
          text.substring(0, 500),

        finalUrl:
          response.url,
      });
    }

    // Apps Script trả JSON nhưng báo thất bại
    if (result.success !== true) {
      console.error(
        'APPS SCRIPT FAILED:',
        result
      );

      return res.status(502).json({
        success: false,

        message:
          result.message ||
          'Apps Script báo thất bại',
      });
    }

    console.log(
      'LEAD SUCCESS:',
      fullName,
      phone
    );

    return res.status(200).json({
      success: true,
      message: 'Lead submitted successfully',
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