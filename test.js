// 'qrcode' kütüphanesini dahil et
const QRCode = require('qrcode');

// QR kodu oluşturmak için basit bir örnek
QRCode.toDataURL('Hello, world!', (err, url) => {
  if (err) throw err;
  console.log(url);  // Oluşturulan QR kodunun base64 url çıktısını yazdırır
});
