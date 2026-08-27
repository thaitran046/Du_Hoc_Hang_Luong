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
      needs,
    };

    console.log('Sending to Apps Script:', payload);

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',

      // Apps Script xử lý kiểu này ổn định hơn application/json
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },

      body: JSON.stringify(payload),

      redirect: 'follow',
    });

    const text = await response.text();

    console.log('Apps Script HTTP:', response.status);
    console.log('Apps Script URL:', response.url);
    console.log('Apps Script body:', text);

    if (!response.ok) {
      throw new Error(
        `Apps Script HTTP ${response.status}`
      );
    }

    // Nếu Apps Script có trả JSON thì kiểm tra success
    if (text && text.trim()) {
      try {
        const result = JSON.parse(text);

        if (result.success === false) {
          throw new Error(
            result.message || 'Apps Script báo lỗi'
          );
        }
      } catch (error) {
        // Nếu chính Apps Script trả success:false thì ném lỗi
        if (
          error.message &&
          error.message !== 'Unexpected end of JSON input' &&
          !error.message.includes('Unexpected token')
        ) {
          throw error;
        }

        console.log(
          'Apps Script returned non-JSON response.'
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Lead sent',
    });

  } catch (error) {
    console.error('Lead API error:', error);

    return res.status(500).json({
      success: false,
      message:
        error?.message || 'Lead submission failed',
    });
  }
}