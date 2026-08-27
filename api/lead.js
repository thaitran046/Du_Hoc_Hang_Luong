export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const {
      role,
      program,
      fullName,
      phone,
      email,
      country,
      timeframe,
      needs = [],
    } = req.body || {};

    if (!fullName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu họ tên hoặc số điện thoại',
      });
    }

    const GOOGLE_FORM_ACTION =
      'https://docs.google.com/forms/d/e/1FAIpQLSfWKMT14OkabcCipsolbeeQ28sEMuJpr-8BGOvzzFLjmSD1Uw/formResponse';

    const payload = new URLSearchParams();

    if (role) {
      payload.append('entry.786228905', role);
    }

    if (program) {
      payload.append('entry.1432927249', program);
    }

    payload.append('entry.741405596', fullName);
    payload.append('entry.1415447158', phone);

    if (email) {
      payload.append('entry.1045781291', email);
    }

    if (country) {
      payload.append('entry.1005224062', country);
    }

    if (timeframe) {
      payload.append('entry.965295111', timeframe);
    }

    if (Array.isArray(needs)) {
      needs.forEach((need) => {
        if (need) {
          payload.append('entry.2120121799', need);
        }
      });
    }

    const googleResponse = await fetch(
      GOOGLE_FORM_ACTION,
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: payload.toString(),
        redirect: 'manual',
      }
    );

    console.log(
      'Google Form status:',
      googleResponse.status
    );

    /*
      Google Form có thể trả:
      200
      302
      303

      đều có thể là submit thành công.
    */

    if (
      ![200, 302, 303].includes(
        googleResponse.status
      )
    ) {
      const responseText =
        await googleResponse.text();

      console.error(
        'Google Form response:',
        responseText
      );

      return res.status(502).json({
        success: false,
        message:
          'Google Form không nhận dữ liệu',
        googleStatus:
          googleResponse.status,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead sent successfully',
      googleStatus:
        googleResponse.status,
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