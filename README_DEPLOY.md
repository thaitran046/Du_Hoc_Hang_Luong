# Hằng Lương website - bản chuẩn hóa để deploy

## Chạy local

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
npm run preview
```

Thư mục production sau build: `dist/`.

## Deploy

- Vercel: import project, Build Command `npm run build`, Output Directory `dist`.
- Netlify: Build Command `npm run build`, Publish Directory `dist`.
- Hosting tĩnh/cPanel: chạy `npm run build`, sau đó upload **nội dung bên trong `dist/`**, không upload trực tiếp mã nguồn JSX.

## Lưu ý quan trọng

Form hiện tại CHƯA gửi lead đến CRM/API. `LeadForm.jsx` chỉ `console.log()` dữ liệu, chờ 1.5 giây rồi chuyển sang `/cam-on`. Cần tích hợp API/Webhook thật trước khi chạy quảng cáo.
