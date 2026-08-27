const GOOGLE_SCRIPT_URL =
  'https://script.google.com/u/0/home/projects/1nz_tVqxf_bZISWoWydJY5ECOHtrajkiUQsInjw_Kx6VPcjheSBxaRGPB/edit';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const response = await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(req.body),
        redirect: 'follow'
      }
    );

    const text = await response.text();

    console.log('Apps Script status:', response.status);
    console.log('Apps Script response:', text);

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      throw new Error(
        'Apps Script không trả JSON: ' + text.slice(0, 200)
      );
    }

    if (!result.success) {
      throw new Error(
        result.message || 'Apps Script failed'
      );
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    console.error('Lead API error:', error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}