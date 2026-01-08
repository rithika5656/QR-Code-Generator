// DOM Elements
const textInput = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const qrSection = document.getElementById('qr-section');
const qrcodeDiv = document.getElementById('qrcode');
const downloadBtn = document.getElementById('download-btn');

let qrcode = null;

// Generate QR Code
function generateQRCode() {
    const text = textInput.value.trim();
    
    if (!text) {
        alert('Please enter a URL or text');
        return;
    }
    
    // Clear previous QR code
    qrcodeDiv.innerHTML = '';
    
    // Create new QR code
    qrcode = new QRCode(qrcodeDiv, {
        text: text,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Show QR section
    qrSection.classList.add('active');
}

// Download QR Code as image
function downloadQRCode() {
    const canvas = qrcodeDiv.querySelector('canvas');
    
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    } else {
        // Fallback for img element
        const img = qrcodeDiv.querySelector('img');
        if (img) {
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = img.src;
            link.click();
        }
    }
}

// Event Listeners
generateBtn.addEventListener('click', generateQRCode);

// Generate on Enter key
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateQRCode();
    }
});

// Download button
downloadBtn.addEventListener('click', downloadQRCode);
