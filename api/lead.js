const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfWKMT14OkabcCipsolbeeQ28sEMuJpr-8BGOvzzFLjmSD1Uw/formResponse';

// ========================================
// GOOGLE FORM OPTIONS
// ========================================

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

  'Hồ sơ nhập học':
    'Hồ sơ nhập học',

  Visa: 'Visa',

  'Chi phí': 'Chi phí',

  'Hướng nghiệp':
    'Hướng nghiệp',

  'Lộ trình học':
    'Lộ trình học',
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
// SEND EMAIL WITH RESEND
// ========================================

async function sendEmail({
  to,
  subject,
  html,
}) {
  const apiKey =
    process.env.RESEND_API_KEY;

  const from =
    process.env.EVENT_FROM_EMAIL;

  if (!apiKey) {
    console.warn(
      'Thiếu RESEND_API_KEY'
    );

    return {
      success: false,
      skipped: true,
    };
  }

  if (!from) {
    console.warn(
      'Thiếu EVENT_FROM_EMAIL'
    );

    return {
      success: false,
      skipped: true,
    };
  }

  const response = await fetch(
    'https://api.resend.com/emails',
    {
      method: 'POST',

      headers: {
        Authorization:
          `Bearer ${apiKey}`,

        'Content-Type':
          'application/json',
      },

      body: JSON.stringify({
        from,

        to: Array.isArray(to)
          ? to
          : [to],

        subject,

        html,
      }),
    }
  );

  let result = {};

  try {
    result =
      await response.json();
  } catch {
    result = {};
  }

  if (!response.ok) {
    console.error(
      'RESEND ERROR:',
      result
    );

    throw new Error(
      result?.message ||
        `Resend failed: ${response.status}`
    );
  }

  return {
    success: true,
    result,
  };
}

// ========================================
// CUSTOMER CONFIRMATION EMAIL
// ========================================

function buildCustomerEmail({
  fullName,
  eventLocation,
  eventVenue,
  eventAddress,
  eventDate,
  eventTime,
}) {
  const name =
    escapeHtml(fullName);

  const location =
    escapeHtml(eventLocation);

  const venue =
    escapeHtml(eventVenue);

  const address =
    escapeHtml(eventAddress);

  const date =
    escapeHtml(eventDate);

  const time =
    escapeHtml(eventTime);

  return `
<!DOCTYPE html>

<html lang="vi">

<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  />

  <title>
    Education Fair 2026
  </title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f5f5f5;
    font-family:Arial,Helvetica,sans-serif;
    color:#1e293b;
  "
>

  <table
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="
      background:#f5f5f5;
      padding:30px 15px;
    "
  >

    <tr>

      <td align="center">

        <table
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            max-width:620px;
            background:#ffffff;
            border-radius:18px;
            overflow:hidden;
          "
        >

          <!-- HEADER -->

          <tr>

            <td
              align="center"
              style="
                background:#dc2626;
                padding:32px 24px;
                color:#ffffff;
              "
            >

              <div
                style="
                  font-size:13px;
                  font-weight:bold;
                  letter-spacing:1.5px;
                "
              >
                DU HỌC QUỐC TẾ HẰNG LƯƠNG
              </div>

              <div
                style="
                  font-size:28px;
                  line-height:1.25;
                  font-weight:800;
                  margin-top:8px;
                "
              >
                EDUCATION FAIR 2026
              </div>

              <div
                style="
                  font-size:15px;
                  margin-top:8px;
                "
              >
                Xác nhận đăng ký tham gia
              </div>

            </td>

          </tr>

          <!-- BODY -->

          <tr>

            <td
              style="
                padding:32px;
              "
            >

              <p
                style="
                  margin-top:0;
                  font-size:17px;
                "
              >
                Xin chào
                <strong>
                  ${name}
                </strong>,
              </p>

              <p
                style="
                  color:#475569;
                  line-height:1.7;
                "
              >
                Bạn đã đăng ký tham gia
                <strong>
                  Education Fair 2026
                </strong>
                thành công.
              </p>

              <div
                style="
                  margin-top:25px;
                  padding:24px;
                  border-radius:15px;
                  border:1px solid #fecaca;
                  background:#fff7f7;
                "
              >

                <div
                  style="
                    color:#dc2626;
                    font-size:12px;
                    font-weight:bold;
                    letter-spacing:1px;
                  "
                >
                  ĐỊA ĐIỂM ĐĂNG KÝ
                </div>

                <div
                  style="
                    margin-top:8px;
                    font-size:22px;
                    font-weight:800;
                  "
                >
                  ${location}
                </div>

                <div
                  style="
                    margin-top:6px;
                    font-size:18px;
                    font-weight:bold;
                  "
                >
                  ${venue}
                </div>

                <div
                  style="
                    margin-top:20px;
                    color:#475569;
                    line-height:1.9;
                    font-size:15px;
                  "
                >

                  <strong>
                    📍 Địa chỉ:
                  </strong>

                  ${address}

                  <br />

                  <strong>
                    📅 Ngày:
                  </strong>

                  ${date}

                  <br />

                  <strong>
                    🕐 Thời gian:
                  </strong>

                  ${time}

                </div>

              </div>

              <p
                style="
                  color:#475569;
                  line-height:1.7;
                  margin-top:25px;
                "
              >
                Vui lòng lưu lại email này
                để tiện kiểm tra thông tin
                khi tham gia sự kiện.
              </p>

              <p
                style="
                  color:#475569;
                  line-height:1.7;
                "
              >
                Hằng Lương sẽ liên hệ với
                bạn nếu cần bổ sung thêm
                thông tin trước ngày diễn
                ra Education Fair.
              </p>

              <div
                style="
                  margin-top:30px;
                  padding-top:20px;
                  border-top:1px solid #e2e8f0;
                  font-size:13px;
                  color:#64748b;
                  line-height:1.7;
                "
              >

                <strong>
                  Du học Quốc tế Hằng Lương
                </strong>

                <br />

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
// ADMIN EMAIL
// ========================================

function buildAdminEmail(data) {
  const {
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
  } = data;

  return `
<!DOCTYPE html>

<html lang="vi">

<body
  style="
    font-family:Arial,Helvetica,sans-serif;
    color:#1e293b;
    line-height:1.7;
  "
>

  <h2
    style="
      color:#dc2626;
    "
  >
    ${
      eventVenue
        ? 'Khách đăng ký Education Fair 2026'
        : 'Lead tư vấn mới'
    }
  </h2>

  <h3>
    Thông tin khách hàng
  </h3>

  <p>

    <strong>
      Họ tên:
    </strong>

    ${escapeHtml(fullName)}

    <br />

    <strong>
      Điện thoại:
    </strong>

    ${escapeHtml(phone)}

    <br />

    <strong>
      Email:
    </strong>

    ${escapeHtml(email)}

    <br />

    <strong>
      Đối tượng:
    </strong>

    ${escapeHtml(role || '-')}

    <br />

    <strong>
      Chương trình:
    </strong>

    ${escapeHtml(program || '-')}

    <br />

    <strong>
      Quốc gia:
    </strong>

    ${escapeHtml(country || '-')}

    <br />

    <strong>
      Thời gian dự kiến:
    </strong>

    ${escapeHtml(timeframe || '-')}

    <br />

    <strong>
      Cần hỗ trợ:
    </strong>

    ${
      Array.isArray(needs) &&
      needs.length
        ? escapeHtml(
            needs.join(', ')
          )
        : '-'
    }

  </p>

  ${
    eventVenue
      ? `
        <h3>
          Thông tin Education Fair
        </h3>

        <p>

          <strong>
            Khu vực:
          </strong>

          ${escapeHtml(eventLocation)}

          <br />

          <strong>
            Địa điểm:
          </strong>

          ${escapeHtml(eventVenue)}

          <br />

          <strong>
            Địa chỉ:
          </strong>

          ${escapeHtml(eventAddress)}

          <br />

          <strong>
            Ngày:
          </strong>

          ${escapeHtml(eventDate)}

          <br />

          <strong>
            Thời gian:
          </strong>

          ${escapeHtml(eventTime)}

        </p>
      `
      : ''
  }

  ${
    page_url
      ? `
        <p>

          <strong>
            Landing page:
          </strong>

          ${escapeHtml(page_url)}

        </p>
      `
      : ''
  }

</body>

</html>
  `;
}

// ========================================
// API HANDLER
// ========================================

export default async function handler(
  req,
  res
) {

  if (req.method !== 'POST') {

    return res.status(405).json({
      success: false,
      message:
        'Method not allowed',
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

      // EDUCATION FAIR

      eventId = '',

      eventLocation = '',

      eventVenue = '',

      eventAddress = '',

      eventDate = '',

      eventTime = '',

      // TRACKING

      page_url = '',

    } = req.body || {};

    // ====================================
    // VALIDATION
    // ====================================

    if (!fullName.trim()) {

      return res.status(400).json({
        success: false,

        message:
          'Thiếu họ tên',
      });

    }

    if (!phone.trim()) {

      return res.status(400).json({
        success: false,

        message:
          'Thiếu số điện thoại',
      });

    }

    if (!email.trim()) {

      return res.status(400).json({
        success: false,

        message:
          'Vui lòng nhập email.',
      });

    }

    // ====================================
    // GOOGLE FORM
    // ====================================

    const form =
      new URLSearchParams();

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

    // Email

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

    // Thời gian

    if (
      timeframe &&
      VALID_TIMEFRAMES.includes(
        timeframe
      )
    ) {

      form.append(
        'entry.965295111',
        timeframe
      );

    }

    // Nhu cầu

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

    // ====================================
    // ĐỊA ĐIỂM EDUCATION FAIR
    // ====================================

    if (eventLocation) {

      form.append(
        'entry.793835857',
        eventLocation
      );

    }

    console.log(
      'GOOGLE FORM PAYLOAD:',
      form.toString()
    );

    // ====================================
    // SEND GOOGLE FORM
    // ====================================

    const googleResponse =
      await fetch(
        GOOGLE_FORM_URL,
        {
          method: 'POST',

          headers: {

            'Content-Type':
              'application/x-www-form-urlencoded;charset=UTF-8',

          },

          body:
            form.toString(),

          redirect:
            'manual',
        }
      );

    console.log(
      'GOOGLE FORM STATUS:',
      googleResponse.status
    );

    if (
      ![200, 302, 303].includes(
        googleResponse.status
      )
    ) {

      const body =
        await googleResponse.text();

      console.error(
        'GOOGLE FORM ERROR:',
        googleResponse.status,
        body.substring(
          0,
          500
        )
      );

      return res.status(502).json({

        success: false,

        message:
          `Google Form failed: ${googleResponse.status}`,

      });

    }

    // ====================================
    // SEND EMAIL
    // ====================================

    let customerEmailSent =
      false;

    let adminEmailSent =
      false;

    let customerEmailError =
      null;

    let adminEmailError =
      null;

    // ====================================
    // CUSTOMER CONFIRMATION EMAIL
    // ====================================

    if (
      eventId &&
      eventVenue &&
      eventDate &&
      email
    ) {

      try {

        const emailResult =
          await sendEmail({

            to:
              email.trim(),

            subject:
              `[Hằng Lương] Xác nhận đăng ký Education Fair 2026 - ${eventLocation}`,

            html:
              buildCustomerEmail({

                fullName:
                  fullName.trim(),

                eventLocation,

                eventVenue,

                eventAddress,

                eventDate,

                eventTime,

              }),

          });

        customerEmailSent =
          emailResult.success === true;

      } catch (error) {

        console.error(
          'CUSTOMER EMAIL ERROR:',
          error
        );

        customerEmailError =
          error?.message ||
          'Email error';

      }

    }

    // ====================================
    // ADMIN EMAIL
    // ====================================

    const adminEmail =
      process.env
        .EVENT_ADMIN_EMAIL;

    if (adminEmail) {

      try {

        const emailResult =
          await sendEmail({

            to:
              adminEmail,

            subject:
              eventVenue
                ? `Education Fair - ${eventLocation} - ${fullName}`
                : `Lead tư vấn mới - ${fullName}`,

            html:
              buildAdminEmail({

                role,

                program,

                fullName:
                  fullName.trim(),

                phone:
                  phone.trim(),

                email:
                  email.trim(),

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

        adminEmailSent =
          emailResult.success === true;

      } catch (error) {

        console.error(
          'ADMIN EMAIL ERROR:',
          error
        );

        adminEmailError =
          error?.message ||
          'Email error';

      }

    }

    // ====================================
    // SUCCESS
    // ====================================

    console.log(
      'LEAD SUCCESS:',
      {
        fullName,
        phone,
        email,
        eventLocation,
        eventVenue,
        customerEmailSent,
        adminEmailSent,
      }
    );

    return res.status(200).json({

      success: true,

      customerEmailSent,

      adminEmailSent,

      customerEmailError,

      adminEmailError,

      event:
        eventId
          ? {

              id:
                eventId,

              location:
                eventLocation,

              venue:
                eventVenue,

              address:
                eventAddress,

              date:
                eventDate,

              time:
                eventTime,

            }
          : null,

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