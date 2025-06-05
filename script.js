document.getElementById('generateBtn').addEventListener('click', function () {
    const linkInput = document.getElementById('linkInput').value.trim();
    const qrCodeContainer = document.getElementById('qrcode');
    const errorMessage = document.getElementById('errorMessage');
    const saveBtns = document.getElementById('saveBtns');

    // Önceki QR kodu temizle
    qrCodeContainer.innerHTML = "";
    errorMessage.innerHTML = "";

    if (linkInput === "") {
        alert("Lütfen bir link girin!");
        return;
    }

    const urlPattern = /^(https?:\/\/)?([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(\:[0-9]{1,5})?(\/.*)?)$/i;
    if (!urlPattern.test(linkInput)) {
        errorMessage.innerHTML = "Geçersiz URL! Lütfen geçerli bir link girin.";
        return;
    }

    // qrcode.min.js ile QR kod oluştur
    new QRCode(qrCodeContainer, {
        text: linkInput,
        width: 200,
        height: 200
    });

    saveBtns.style.display = "block";
});

document.getElementById('clearBtn').addEventListener('click', function () {
    document.getElementById('linkInput').value = "";
    document.getElementById('qrcode').innerHTML = "";
    document.getElementById('errorMessage').innerHTML = "";
    document.getElementById('saveBtns').style.display = "none";
});

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

// Varsayılan metin kontrolü
const defaultText = "Lütfen QR Kod Oluşturulacak Adresi Giriniz";

const inputElement = document.getElementById('linkInput');

inputElement.addEventListener('focus', function () {
    if (inputElement.value === defaultText) {
        inputElement.value = "";
    }
});

inputElement.addEventListener('blur', function () {
    if (inputElement.value.trim() === "") {
        inputElement.value = defaultText;
    }
});
