// Payment selection logic
const paymentOptions = document.querySelectorAll('input[name="payment"]');
const qrSection = document.getElementById('qrSection');
const qrImage = document.getElementById('qrImage');
const confirmBtn = document.getElementById('confirmBtn');

// Random QR samples (you can replace with your own)
const qrImages = {
  gcash: [
    "qr.png"
  ],
  paymaya: [
    "qr.png"
  ]
};

paymentOptions.forEach(option => {
  option.addEventListener('change', () => {
    const selected = option.value;
    const qrList = qrImages[selected];
    const randomQR = qrList[Math.floor(Math.random() * qrList.length)];

    qrImage.src = randomQR;
    qrSection.style.display = "block";
    confirmBtn.disabled = false;
  });
});

confirmBtn.addEventListener('click', () => {
  alert("✅ Payment confirmed! Thank you for shopping with Old Goods Thrift.");
  window.location.href = "../Shopping_Window/shopping.html";
});
