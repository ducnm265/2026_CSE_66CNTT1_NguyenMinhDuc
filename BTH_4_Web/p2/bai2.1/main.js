function showError(id, message) {
  document.getElementById(id).innerText = message;
}

function clearError(id) {
  document.getElementById(id).innerText = "";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid =
      validateFullname() &&
      validateEmail() &&
      validatePhone() &&
      validatePassword() &&
      validateConfirm() &&
      validateGender();
    if (isValid) {
      let name = document.getElementById("fullname").value;
      document.getElementById("success-message").textContent =
        "Đăng ký thành công ";
    }
  });
});

function validateFullname() {
  let name = document.getElementById("fullname").value.trim();
  if (name === "") {
    showError("fullname-error", "Vui lòng nhập họ và tên.");
    return false;
  }
  let regex = /^[A-Za-z\s]{3,}$/;
  if (!regex.test(name)) {
    showError(
      "fullname-error",
      "Họ và tên phải có ít nhất 3 ký tự và chỉ chứa chữ cái.",
    );
    return false;
  }
  clearError("fullname-error");
  return true;
}

function validateEmail() {
  let email = document.getElementById("email").value.trim();
  if (email === "") {
    showError("email-error", "Vui lòng nhập email.");
    return false;
  }
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    showError("email-error", "Email không hợp lệ.");
    return false;
  }
  clearError("email-error");
  return true;
}

function validatePhone() {
  let phone = document.getElementById("phone").value.trim();
  if (phone === "") {
    showError("phone-error", "Vui lòng nhập số điện thoại.");
    return false;
  }
  let regex = /^0\d{9}$/;
  if (!regex.test(phone)) {
    showError("phone-error", "Số điện thoại phải có 10 chữ số.");
    return false;
  }
  clearError("phone-error");
  return true;
}
function validatePassword() {
  let password = document.getElementById("password").value;
  if (password === "") {
    showError("password-error", "Vui lòng nhập mật khẩu.");
    return false;
  }
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!regex.test(password)) {
    showError(
      "password-error",
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.",
    );
    return false;
  }
  clearError("password-error");
  return true;
}

function validateConfirmPassword() {
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;
  if (confirmPassword === "") {
    showError("confirm-error", "Vui lòng xác nhận mật khẩu.");
    return false;
  }
  if (password !== confirmPassword) {
    showError("confirm-error", "Mật khẩu xác nhận không khớp.");
    return false;
  }
  clearError("confirm-error");
  return true;
}

function validateGender() {
  let gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    showError("gender-error", "Vui lòng chọn giới tính.");
    return false;
  }
  clearError("gender-error");
  return true;
}

function validateTerms() {
  let terms = document.getElementById("terms").checked;
  if (!terms) {
    showError("terms-error", "Bạn phải đồng ý với điều khoản.");
    return false;
  }
  clearError("terms-error");
  return true;
}

document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid =
      validateFullname() &
      validateEmail() &
      validatePhone() &
      validatePassword() &
      validateConfirm() &
      validateGender() &
      validateTerms();

    if (isValid) {
      let name = document.getElementById("fullname").value;

      document.getElementById("success-message").textContent =
        "Đăng ký thành công";
    }
  });
