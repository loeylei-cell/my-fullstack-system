document.addEventListener("DOMContentLoaded", () => {
  const toggleIcons = document.querySelectorAll(".toggle-password");
  const canvas = document.getElementById("captcha-canvas");
  const ctx = canvas.getContext("2d");
  const refreshBtn = document.getElementById("refresh-captcha");
  const form = document.getElementById("signup-form");

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirm-password");
  const captchaInput = document.getElementById("captcha-input");
  const signupBtn = document.getElementById("signup-btn");

  const usernameError = document.getElementById("username-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const confirmError = document.getElementById("confirm-error");
  const captchaError = document.getElementById("captcha-error");

  let generatedCaptcha = "";

  // === SIMULATED DATABASE (for now) ===
  const takenUsernames = ["john123", "kate", "lauren", "admin"];

  // === SHOW / HIDE PASSWORD ===
  toggleIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const targetId = icon.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (input.type === "password") {
        input.type = "text";
        icon.src = "eye-open.png";
      } else {
        input.type = "password";
        icon.src = "eye-close.png";
      }
    });
  });

  // === GENERATE CAPTCHA ===
  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    generatedCaptcha = "";
    for (let i = 0; i < 6; i++) {
      generatedCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "24px Verdana";
    ctx.fillStyle = "#333";

    for (let i = 0; i < generatedCaptcha.length; i++) {
      const letter = generatedCaptcha[i];
      const angle = (Math.random() - 0.5) * 0.4;
      ctx.save();
      ctx.translate(15 + i * 18, 30);
      ctx.rotate(angle);
      ctx.fillText(letter, 0, 0);
      ctx.restore();
    }

    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(0,0,0,${Math.random()})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
  }

  generateCaptcha();
  refreshBtn.addEventListener("click", generateCaptcha);

  // === USERNAME VALIDATION ===
  usernameInput.addEventListener("input", () => {
    const usernameValue = usernameInput.value.trim();

    if (usernameValue.length < 3) {
      usernameError.textContent = "Username must be at least 3 characters.";
      usernameError.style.display = "block";
      usernameInput.classList.add("invalid");
      usernameInput.classList.remove("valid");
    } else if (takenUsernames.includes(usernameValue.toLowerCase())) {
      usernameError.textContent = "This username is already taken.";
      usernameError.style.display = "block";
      usernameInput.classList.add("invalid");
      usernameInput.classList.remove("valid");
    } else {
      usernameError.style.display = "none";
      usernameInput.classList.remove("invalid");
      usernameInput.classList.add("valid");
    }

    checkFormValidity();
  });

  // === EMAIL VALIDATION ===
  emailInput.addEventListener("input", () => {
    const emailValue = emailInput.value.trim();
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (gmailPattern.test(emailValue)) {
      emailError.style.display = "none";
      emailInput.classList.remove("invalid");
      emailInput.classList.add("valid");
    } else {
      emailError.textContent = "Please enter a valid Gmail address (example@gmail.com)";
      emailError.style.display = "block";
      emailInput.classList.add("invalid");
      emailInput.classList.remove("valid");
    }
    checkFormValidity();
  });

  // === PASSWORD VALIDATION ===
  passwordInput.addEventListener("input", () => {
    const passwordValue = passwordInput.value.trim();

    if (passwordValue.length < 8 || passwordValue.length > 16) {
      passwordError.textContent = "Password must be 8–16 characters long.";
      passwordError.style.display = "block";
      passwordInput.classList.add("invalid");
      passwordInput.classList.remove("valid");
    } else {
      passwordError.style.display = "none";
      passwordInput.classList.remove("invalid");
      passwordInput.classList.add("valid");
    }

    checkPasswordsMatch();
    checkFormValidity();
  });

  // === CONFIRM PASSWORD MATCH ===
  confirmInput.addEventListener("input", () => {
    checkPasswordsMatch();
    checkFormValidity();
  });

  function checkPasswordsMatch() {
    if (confirmInput.value.trim() !== passwordInput.value.trim()) {
      confirmError.textContent = "Passwords do not match.";
      confirmError.style.display = "block";
      confirmInput.classList.add("invalid");
      confirmInput.classList.remove("valid");
    } else {
      confirmError.style.display = "none";
      confirmInput.classList.remove("invalid");
      confirmInput.classList.add("valid");
    }
  }

  // === CAPTCHA VALIDATION (live) ===
  captchaInput.addEventListener("input", () => {
    if (captchaInput.value.trim().length > 0) {
      captchaError.style.display = "none";
      captchaInput.classList.remove("invalid");
      captchaInput.classList.add("valid");
    } else {
      captchaInput.classList.add("invalid");
      captchaInput.classList.remove("valid");
    }
    checkFormValidity();
  });

  // === CHECK FORM VALIDITY ===
  function checkFormValidity() {
    const allValid =
      usernameInput.classList.contains("valid") &&
      emailInput.classList.contains("valid") &&
      passwordInput.classList.contains("valid") &&
      confirmInput.classList.contains("valid") &&
      captchaInput.classList.contains("valid");

    signupBtn.disabled = !allValid;
  }

  // === FORM SUBMIT ===
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (captchaInput.value.trim() !== generatedCaptcha) {
      captchaError.textContent = "Captcha incorrect! Please try again.";
      captchaError.style.display = "block";
      captchaInput.classList.add("invalid");
      captchaInput.classList.remove("valid");
      generateCaptcha();
      signupBtn.disabled = true;
      return;
    } else {
      captchaError.style.display = "none";
    }

    alert("Sign Up Successful!");
    form.reset();
    document.querySelectorAll(".valid").forEach(el => el.classList.remove("valid"));
    signupBtn.disabled = true;
    generateCaptcha();
  });
});
