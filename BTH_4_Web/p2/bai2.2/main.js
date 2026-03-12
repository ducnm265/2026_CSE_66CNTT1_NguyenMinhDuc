const form = document.getElementById("order-form");

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const date = document.getElementById("delivery-date");
const address = document.getElementById("address");
const note = document.getElementById("note");

const productError = document.getElementById("product-error");
const quantityError = document.getElementById("quantity-error");
const dateError = document.getElementById("date-error");
const addressError = document.getElementById("address-error");
const noteError = document.getElementById("note-error");
const paymentError = document.getElementById("payment-error");

const totalPrice = document.getElementById("total-price");
const successMessage = document.getElementById("success-message");

const prices = {
  ao: 150000,
  quan: 200000,
  giay: 300000,
};

function showError(element, message) {
  element.textContent = message;
}

function clearError(element) {
  element.textContent = "";
}

function validateProduct() {
  if (product.value === "") {
    showError(productError, "Vui lòng chọn sản phẩm");
    return false;
  }
  clearError(productError);
  return true;
}

function validateQuantity() {
  const value = Number(quantity.value);

  if (quantity.value === "") {
    showError(quantityError, "Vui lòng nhập số lượng");
    return false;
  }

  if (value < 1 || value > 99) {
    showError(quantityError, "Số lượng phải từ 1 đến 99");
    return false;
  }

  clearError(quantityError);
  return true;
}

function validateDate() {
  if (date.value === "") {
    showError(dateError, "Vui lòng chọn ngày giao");
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // sửa bug ngày

  const selected = new Date(date.value);

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  if (selected < today) {
    showError(dateError, "Không được chọn ngày trong quá khứ");
    return false;
  }

  if (selected > maxDate) {
    showError(dateError, "Ngày giao không quá 30 ngày");
    return false;
  }

  clearError(dateError);
  return true;
}

function validateAddress() {
  if (address.value.trim() === "") {
    showError(addressError, "Địa chỉ không được để trống");
    return false;
  }

  if (address.value.length < 10) {
    showError(addressError, "Địa chỉ phải ≥ 10 ký tự");
    return false;
  }

  clearError(addressError);
  return true;
}

function validateNote() {
  if (note.value.length > 200) {
    showError(noteError, "Ghi chú không quá 200 ký tự");
    return false;
  }

  clearError(noteError);
  return true;
}

function validatePayment() {
  const payment = document.querySelector('input[name="payment"]:checked');

  if (!payment) {
    showError(paymentError, "Vui lòng chọn phương thức thanh toán");
    return false;
  }

  clearError(paymentError);
  return true;
}

function calculateTotal() {
  const p = product.value;
  const q = Number(quantity.value);

  if (prices[p] && q > 0) {
    const total = prices[p] * q;
    totalPrice.textContent = total.toLocaleString("vi-VN") + " VND";
  } else {
    totalPrice.textContent = "";
  }
}

function countNote() {
  const length = note.value.length;

  if (length <= 200) {
    noteError.textContent = length + "/200";
    noteError.style.color = "black";
  } else {
    noteError.textContent = length + "/200";
    noteError.style.color = "red";
  }
}

product.addEventListener("change", calculateTotal);
quantity.addEventListener("input", calculateTotal);

note.addEventListener("input", countNote);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // dùng & để đảm bảo mọi validate đều chạy
  const valid =
    validateProduct() &
    validateQuantity() &
    validateDate() &
    validateAddress() &
    validateNote() &
    validatePayment();

  if (valid) {
    successMessage.textContent = "Đặt hàng thành công!";
    form.reset();
    totalPrice.textContent = "";
    noteError.textContent = "";
  }
});
