// QR Kod oluşturma işlemi
document.getElementById('generateBtn').addEventListener('click', function () {
    const linkInput = document.getElementById('linkInput').value;
    const qrCodeContainer = document.getElementById('qrcode');
    const errorMessage = document.getElementById('errorMessage');
    const saveBtns = document.getElementById('saveBtns');

    // Önceki QR kodunu temizle
    qrCodeContainer.innerHTML = "";
    errorMessage.innerHTML = ""; // Hata mesajını temizle

    if (linkInput.trim() === "") {
        alert("Lütfen bir link girin!");
        return;
    }

    // Linkin geçerli olup olmadığını kontrol et
    const urlPattern = /^(https?:\/\/)?([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(\:[0-9]{1,5})?(\/.*)?)$/i;
    if (!urlPattern.test(linkInput)) {
        errorMessage.innerHTML = "Geçersiz URL! Lütfen geçerli bir link girin.";
        return;
    }

    // QR Kod API URL'si
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(linkInput)}&size=200x200`;

    // API'den gelen QR kodu görselini yerleştir
    const img = document.createElement('img');
    img.src = qrApiUrl;
    qrCodeContainer.appendChild(img);

    // Kaydet butonlarını göster
    saveBtns.style.display = "block";
});

// QR Kod ve input temizleme işlemi
document.getElementById('clearBtn').addEventListener('click', function () {
    document.getElementById('linkInput').value = "";  // URL inputunu temizle
    document.getElementById('qrcode').innerHTML = "";  // QR kodu temizle
    document.getElementById('errorMessage').innerHTML = "";  // Hata mesajını temizle
    document.getElementById('saveBtns').style.display = "none"; // Kaydet butonlarını gizle
});

// PDF kaydetme işlemi
document.getElementById('savePdfBtn').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const qrCodeImage = document.getElementById('qrcode').getElementsByTagName('img')[0];

    if (qrCodeImage) {
        doc.text("QR Kod", 10, 10);
        doc.addImage(qrCodeImage.src, 'JPEG', 10, 20, 180, 180);
        doc.save('qr-code.pdf');
    } else {
        alert("QR Kod oluşturulmadı, önce oluşturmanız gerekiyor.");
    }
});

// Varsayılan metin temizleme ve geri yükleme işlemleri
const defaultText = "Lütfen QR Kod Oluşturulacak Adresi Giriniz"; // Varsayılan metin

document.getElementById('linkInput').addEventListener('focus', function () {
    const input = document.getElementById('linkInput');
    if (input.value === defaultText) {
        input.value = ""; // Varsayılan metni temizle
    }
});

document.getElementById('linkInput').addEventListener('blur', function () {
    const input = document.getElementById('linkInput');
    if (input.value.trim() === "") {
        input.value = defaultText; // Boş bırakıldıysa varsayılan metni geri getir
    }
});
