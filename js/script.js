// script.js

// Utility to create a 4-digit numeric captcha as string
function makeCaptcha() {
    return String(Math.floor(1000 + Math.random() * 9000));
}

// Insert a new captcha into the UI
function setCaptcha(value) {
    const box = document.getElementById("captchaBox");
    if (box) box.textContent = value;
}

// Show message under the form
function showMessage(text, color) {
    const el = document.getElementById("message");
    el.textContent = text;
    el.style.color = color || "black";
}

// Reset message
function clearMessage() {
    showMessage("", "");
}

document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const captchaBox = document.getElementById("captchaBox");
    const form = document.getElementById("loginForm");
    const captchaInput = document.getElementById("captchaInput");

    // Generate initial captcha
    let currentCaptcha = makeCaptcha();
    setCaptcha(currentCaptcha);

    // Regenerate on captcha box click (or keyboard activation because it's a button)
    captchaBox.addEventListener("click", function() {
        currentCaptcha = makeCaptcha();
        setCaptcha(currentCaptcha);
        clearMessage();
    });

    // Optional: regenerate on 'r' key when the captcha input is focused (nice UX)
    captchaInput.addEventListener("keydown", function(ev) {
        if (ev.key === "r" || ev.key === "R") {
            ev.preventDefault();
            currentCaptcha = makeCaptcha();
            setCaptcha(currentCaptcha);
            clearMessage();
        }
    });

    // Form submit / Enter button
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const entered = (captchaInput.value || "").trim();

        // Basic validations: required fields
        const name = document.getElementById("name").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const agree = document.getElementById("agree").checked;

        if (!name || !mobile) {
            showMessage("Please fill in Name and Mobile Number.", "red");
            return;
        }

        if (!agree) {
            showMessage("Please accept Terms and Privacy Policy.", "red");
            return;
        }

        if (!entered) {
            showMessage("Please enter the captcha.", "red");
            return;
        }

        if (entered === currentCaptcha) {
            showMessage("Login Successful ✔", "green");
            
        } else {
            showMessage("Invalid Captcha ❌", "red");
            // regenerate captcha after wrong attempt
            currentCaptcha = makeCaptcha();
            setCaptcha(currentCaptcha);
            // clear the input so user types new value
            captchaInput.value = "";
            captchaInput.focus();
        }
    });
});