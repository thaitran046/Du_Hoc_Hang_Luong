const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfWKMT14OkabcCipsolbeeQ28sEMuJpr-8BGOvzzFLjmSD1Uw/formResponse';

// ========================================
// GOOGLE FORM VALUES
// ========================================

const VALID_TIMEFRAMES = [
  'Trong 3 tháng tới',
  '3 - 6 tháng',
  '6 - 12 tháng',
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

// ========================================
// MAP ĐỊA ĐIỂM WEBSITE -> GOOGLE FORM
// ========================================

const EVENT_LOCATION_MAP = {
  'Đắk Nông': 'Dak Nong',
  'Dak Nong': 'Dak Nong',
  'Bảo Lộc': 'Bao Loc',
  'TP. Bảo Lộc': 'Bao Loc',
  'Bao Loc': 'Bao Loc',
  'Đà Lạt': 'Đà Lạt',
  'TP. Đà Lạt': 'Đà Lạt',
};

// ========================================
// ESCAPE HTML
// ========================================

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// ========================================
// SEND EMAIL VIA RESEND
// ========================================

function normalizeRecipients(to) {
  const values = Array.isArray(to) ? to : [to];

  return values
    .flatMap((item) =>
      String(item || '')
        .split(/[;,]/)
        .map((email) => email.trim())
    )
    .filter(Boolean);
}

async function sendEmail({ to, subject, html }) {
  // Lấy API key từ env (đã clean)
  const apiKey = (process.env.RESEND_API_KEY || '')
    .trim()
    .replace(/^RESEND_API_KEY=/i, '')
    .replace(/^Bearer\s+/i, '')
    .replace(/^["']|["']$/g, '')
    .replace(/\s+/g, '');

  const from = (process.env.EVENT_FROM_EMAIL || 'onboarding@resend.dev').trim();
  const recipients = normalizeRecipients(to);

  console.log('======= RESEND DEBUG =======');
  console.log('keyPresent:', Boolean(apiKey));
  console.log('keyLength:', apiKey.length);
  console.log('startsWithRe:', apiKey.startsWith('re_'));
  console.log('keyTail:', apiKey ? `***${apiKey.slice(-4)}` : 'NONE');
  console.log('from:', from);
  console.log('to:', recipients);
  console.log('============================');

  if (!apiKey) {
    console.warn('RESEND_API_KEY chưa được cấu hình');
    return { success: false, skipped: true };
  }

  if (!apiKey.startsWith('re_')) {
    console.warn('RESEND_API_KEY không đúng format (phải bắt đầu bằng re_)');
    return { success: false, skipped: true };
  }

  if (!from) {
    console.warn('EVENT_FROM_EMAIL chưa được cấu hình');
    return { success: false, skipped: true };
  }

  if (!recipients.length) {
    console.warn('Không có email người nhận hợp lệ');
    return { success: false, skipped: true };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: recipients,
      subject,
      html,
    }),
  });

  let result = {};
  try {
    result = await response.json();
  } catch {
    result = {};
  }

  if (!response.ok) {
    console.error('RESEND ERROR:', {
      status: response.status,
      statusText: response.statusText,
      ...result,
    });
    throw new Error(result?.message || `Resend failed: ${response.status}`);
  }

  console.log('RESEND SUCCESS:', result);
  return { success: true, result };
}

// ========================================
// EMAIL KHÁCH HÀNG
// ========================================

function buildCustomerEmail({
  fullName,
  eventLocation,
  eventVenue,
  eventAddress,
  eventDate,
  eventTime,
}) {
  return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Xác nhận Education Fair 2026</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
  <table width="100%" cellspacing="0" cellpadding="0" style="padding:30px 15px;background:#f5f5f5;">
    <tr>
      <td align="center">
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:18px;overflow:hidden;">
          <tr>
            <td align="center" style="padding:32px 20px;background:#dc2626;color:white;">
              <div style="font-size:13px;font-weight:bold;letter-spacing:1px;">DU HỌC QUỐC TẾ HẰNG LƯƠNG</div>
              <div style="margin-top:8px;font-size:28px;font-weight:800;">EDUCATION FAIR 2026</div>
              <div style="margin-top:8px;font-size:15px;">Xác nhận đăng ký tham gia</div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="font-size:17px;margin-top:0;">
                Xin chào <strong>${escapeHtml(fullName)}</strong>,
              </p>
              <p style="line-height:1.7;color:#475569;">
                Bạn đã đăng ký tham gia <strong>Education Fair 2026</strong> thành công.
              </p>
              <div style="margin-top:24px;padding:22px;border:1px solid #fecaca;background:#fff7f7;border-radius:15px;">
                <div style="color:#dc2626;font-size:12px;font-weight:bold;">ĐỊA ĐIỂM ĐĂNG KÝ</div>
                <h2 style="margin:8px 0 4px;font-size:22px;">${escapeHtml(eventLocation)}</h2>
                <div style="font-size:18px;font-weight:bold;">${escapeHtml(eventVenue)}</div>
                <p style="margin-bottom:0;line-height:1.9;color:#475569;">
                  📍 <strong>Địa chỉ:</strong> ${escapeHtml(eventAddress)}<br />
                  📅 <strong>Ngày:</strong> ${escapeHtml(eventDate)}<br />
                  🕐 <strong>Thời gian:</strong> ${escapeHtml(eventTime)}
                </p>
              </div>
              <p style="margin-top:24px;line-height:1.7;color:#475569;">
                Vui lòng giữ lại email này để tiện đối chiếu thông tin khi tham gia sự kiện.
              </p>
              <div style="margin-top:25px;padding-top:20px;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px;">
                <strong>Du học Quốc tế Hằng Lương</strong><br />
                Education Fair 2026
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// ========================================
// EMAIL ADMIN
// ========================================

function buildAdminEmail({
  role,
  program,
  fullName,
  phone,
  email,
  country,
  timeframe,
  needs,
  eventLocation,
  eventVenue,
  eventAddress,
  eventDate,
  eventTime,
  page_url,
}) {
  return `
<!DOCTYPE html>
<html lang="vi">
<body style="font-family:Arial,Helvetica,sans-serif;color:#1e293b;line-height:1.7;">
  <h2 style="color:#dc2626;">
    ${eventVenue ? 'Khách đăng ký Education Fair 2026' : 'Lead tư vấn mới'}
  </h2>
  <h3>Thông tin khách hàng</h3>
  <p>
    <strong>Họ tên:</strong> ${escapeHtml(fullName)}<br />
    <strong>Điện thoại:</strong> ${escapeHtml(phone)}<br />
    <strong>Email:</strong> ${escapeHtml(email)}<br />
    <strong>Đối tượng:</strong> ${escapeHtml(role || '-')}<br />
    <strong>Chương trình:</strong> ${escapeHtml(program || '-')}<br />
    <strong>Quốc gia:</strong> ${escapeHtml(country || '-')}<br />
    <strong>Thời gian dự kiến:</strong> ${escapeHtml(timeframe || '-')}<br />
    <strong>Nhu cầu:</strong> ${
      Array.isArray(needs) && needs.length ? escapeHtml(needs.join(', ')) : '-'
    }
  </p>
  ${
    eventVenue
      ? `
    <h3>Sự kiện đã đăng ký</h3>
    <p>
      <strong>Khu vực:</strong> ${escapeHtml(eventLocation)}<br />
      <strong>Địa điểm:</strong> ${escapeHtml(eventVenue)}<br />
      <strong>Địa chỉ:</strong> ${escapeHtml(eventAddress)}<br />
      <strong>Ngày:</strong> ${escapeHtml(eventDate)}<br />
      <strong>Thời gian:</strong> ${escapeHtml(eventTime)}
    </p>
  `
      : ''
  }
  ${
    page_url
      ? `<p><strong>Landing page:</strong> ${escapeHtml(page_url)}</p>`
      : ''
  }
</body>
</html>
  `;
}

// ========================================
// HANDLER
// ========================================

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
      eventId = '',
      eventLocation = '',
      eventVenue = '',
      eventAddress = '',
      eventDate = '',
      eventTime = '',
      page_url = '',
    } = req.body || {};

    // =====================================
    // VALIDATION
    // =====================================

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
        message: 'Vui lòng nhập email',
      });
    }

    // =====================================
    // GOOGLE FORM
    // =====================================

    const form = new URLSearchParams();

    if (role) {
      form.append('entry.786228905', role);
    }

    if (program) {
      form.append('entry.1432927249', program);
    }

    form.append('entry.741405596', fullName.trim());
    form.append('entry.1415447158', phone.trim());
    form.append('entry.1045781291', email.trim());

    if (country) {
      form.append('entry.1005224062', country);
    }

    if (timeframe && VALID_TIMEFRAMES.includes(timeframe)) {
      form.append('entry.965295111', timeframe);
    }

    if (Array.isArray(needs)) {
      needs.forEach((need) => {
        const googleValue = NEED_MAP[need];
        if (googleValue) {
          form.append('entry.2120121799', googleValue);
        }
      });
    }

    // =====================================
    // EDUCATION FAIR LOCATION
    // =====================================

    if (eventLocation) {
      const googleEventLocation =
        EVENT_LOCATION_MAP[eventLocation.trim()];

      if (!googleEventLocation) {
        console.error('UNKNOWN EVENT LOCATION:', eventLocation);
        return res.status(400).json({
          success: false,
          message: `Địa điểm "${eventLocation}" chưa được map với Google Form.`,
        });
      }

      form.append('entry.793835857', googleEventLocation);
      console.log('EVENT LOCATION MAP:', eventLocation, '=>', googleEventLocation);
    }

    console.log('GOOGLE FORM PAYLOAD:', form.toString());

    // =====================================
    // SUBMIT GOOGLE FORM
    // =====================================

    const googleResponse = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: form.toString(),
      redirect: 'manual',
    });

    console.log('GOOGLE FORM STATUS:', googleResponse.status);

    if (![200, 302, 303].includes(googleResponse.status)) {
      const body = await googleResponse.text();
      console.error('GOOGLE FORM ERROR:', googleResponse.status, body.substring(0, 500));
      return res.status(502).json({
        success: false,
        message: `Google Form failed: ${googleResponse.status}`,
      });
    }

    // =====================================
    // EMAIL
    // =====================================

    let customerEmailSent = false;
    let adminEmailSent = false;
    let customerEmailError = null;
    let adminEmailError = null;

    // Email xác nhận cho khách
    if (eventId && eventVenue && eventDate) {
      try {
        const result = await sendEmail({
          to: email.trim(),
          subject: `[Hằng Lương] Xác nhận đăng ký Education Fair 2026 - ${eventLocation}`,
          html: buildCustomerEmail({
            fullName: fullName.trim(),
            eventLocation,
            eventVenue,
            eventAddress,
            eventDate,
            eventTime,
          }),
        });
        customerEmailSent = result.success === true;
      } catch (error) {
        console.error('CUSTOMER EMAIL ERROR:', error);
        customerEmailError = error?.message || 'Không gửi được email khách';
      }
    }

    // Email thông báo cho admin
    const adminEmails = normalizeRecipients(process.env.EVENT_ADMIN_EMAIL);

    if (adminEmails.length) {
      try {
        const result = await sendEmail({
          to: adminEmails,
          subject: eventVenue
            ? `Education Fair - ${eventLocation} - ${fullName}`
            : `Lead tư vấn mới - ${fullName}`,
          html: buildAdminEmail({
            role,
            program,
            fullName: fullName.trim(),
            phone: phone.trim(),
            email: email.trim(),
            country,
            timeframe,
            needs,
            eventLocation,
            eventVenue,
            eventAddress,
            eventDate,
            eventTime,
            page_url,
          }),
        });
        adminEmailSent = result.success === true;
      } catch (error) {
        console.error('ADMIN EMAIL ERROR:', error);
        adminEmailError = error?.message || 'Không gửi được email admin';
      }
    }

    // =====================================
    // SUCCESS
    // =====================================

    console.log('LEAD SUCCESS:', {
      fullName,
      phone,
      email,
      eventLocation,
      eventVenue,
      customerEmailSent,
      adminEmailSent,
    });

    return res.status(200).json({
      success: true,
      customerEmailSent,
      adminEmailSent,
      customerEmailError,
      adminEmailError,
      event: eventId
        ? {
            id: eventId,
            location: eventLocation,
            venue: eventVenue,
            address: eventAddress,
            date: eventDate,
            time: eventTime,
          }
        : null,
    });
  } catch (error) {
    console.error('LEAD API ERROR:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    });
  }
}