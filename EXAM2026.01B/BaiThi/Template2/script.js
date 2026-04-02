// ========== KHỞI TẠO CÁC BIẾN TOÀN CỤC ==========
// Lấy phần tử table từ HTML
const table = document.querySelector("table");
// Lấy nút "Thêm mới"
const addBtn = document.querySelector(".add-btn");
// Lấy phần thân (tbody) của table
const tbody = table.querySelector("tbody");
// Lấy overlay (lớp phủ mờ toàn màn hình)
const overlay = document.getElementById("overlay");
// Lấy form input
const formInput = document.querySelector(".formInput");
// Lấy nút X để đóng form
const closeBtn = document.querySelector(".close-btn");
// Lấy phần tử form (để sau này reset dữ liệu)
const nativeForm = document.querySelector(".formBody");

// Biến toàn cục để lưu dữ liệu hội thảo
let seminars = [];

// Biến toàn cục để biết đang edit hàng nào - không còn dùng
// let currentEditingRow = null;

// ========== HÀM LƯU VÀ TẢI DỮ LIỆU ==========
// Hàm lưu dữ liệu vào localStorage
function saveSeminarsToLocalStorage() {
  localStorage.setItem("seminars", JSON.stringify(seminars));
}

// Hàm tải dữ liệu từ localStorage hoặc data.json
function loadSeminars() {
  const saved = localStorage.getItem("seminars");
  if (saved) {
    // Nếu có dữ liệu trong localStorage, dùng nó
    seminars = JSON.parse(saved);
    renderSeminars(); // Hiển thị dữ liệu
  } else {
    // Nếu không có, fetch từ data.json
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        seminars = data.seminars; // Lưu vào biến toàn cục
        renderSeminars(); // Hiển thị dữ liệu
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu:", error);
        seminars = []; // Nếu lỗi, dùng mảng rỗng
        renderSeminars();
      });
  }
}

// Hàm hiển thị danh sách hội thảo lên table
function renderSeminars() {
  tbody.innerHTML = ""; // Xóa dữ liệu cũ
  seminars.forEach((seminar, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${seminar.name}</td>
      <td>${seminar.speaker}</td>
      <td>${seminar.email}</td>
      <td>${seminar.date ? new Date(seminar.date).toLocaleDateString() : ""}</td>
      <td>${seminar.location}</td>
    `;
    tbody.appendChild(row);
  });
}

// ========== KHỞI ĐỘNG ỨNG DỤNG ==========
// Khi trang load xong, tải dữ liệu
document.addEventListener("DOMContentLoaded", loadSeminars);

// ========== EVENT LISTENERS ==========

// Khi bấm nút "Thêm mới"
addBtn.addEventListener("click", function () {
  overlay.style.display = "flex"; // Hiển thị overlay + form (modal)
});

// Hàm để ẩn form
function hideForm() {
  overlay.style.display = "none"; // Ẩn overlay
  if (nativeForm) {
    nativeForm.reset(); // Reset các input trong form
  }
}

// Khi bấm nút X để đóng form
closeBtn.addEventListener("click", hideForm);

// Khi bấm ngoài form (trên overlay), cũng đóng form
overlay.addEventListener("click", function (event) {
  // Kiểm tra xem sự kiện click có từ overlay chứ không phải từ form
  if (event.target === overlay) {
    hideForm(); // Ẩn form
  }
});

const errorName = document.querySelector(".errorName");
const errorSpeaker = document.querySelector(".errorSpeaker");
const errorEmail = document.querySelector(".errorEmail");
const errorDo = document.querySelector(".errorDo");
const errorLocal = document.querySelector(".errorLocal");

const inputName = document.querySelector(".inputName");
const inputSpeaker = document.querySelector(".inputSpeaker");
const inputEmail = document.querySelector(".inputEmail");
const inputDo = document.querySelector(".inputDo");
const inputLocal = document.querySelector(".inputLocal");

function showError(error, message) {
  error.textContent = message;
  error.style.display = "block";
  error.style.color = "red";
}

function hideError(error) {
  error.textContent = "";
  error.style.display = "none";
}

function validateName() {
  const name = inputName.value.trim();
  if (name === "") {
    showError(errorName, "Tên hội thảo không được để trống");
    return false;
  }
  if (name.length > 60) {
    showError(errorName, "Tên hội thảo không được vượt quá 60 ký tự");
    return false;
  }
  hideError(errorName);
  return true;
}

function validateEmail() {
  const email = inputEmail.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    showError(errorEmail, "Email không được để trống");
    return false;
  }
  if (!emailRegex.test(email)) {
    showError(errorEmail, "Email không hợp lệ");
    return false;
  }
  hideError(errorEmail);
  return true;
}

function validateSpeaker() {
  const speaker = inputSpeaker.value.trim();
  if (speaker === "") {
    showError(errorSpeaker, "Diễn giả không được để trống");
    return false;
  }
  if (speaker.length > 30) {
    showError(errorSpeaker, "Diễn giả không được vượt quá 30 ký tự");
    return false;
  }
  hideError(errorSpeaker);
  return true;
}

function validateDo() {
  const doValue = inputDo.value;
  if (!doValue) {
    showError(errorDo, "Ngày tổ chức không được để trống");
    return false;
  }
  const eventDate = new Date(doValue);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time để so sánh ngày
  if (eventDate > today) {
    showError(errorDo, "Ngày tổ chức phải lớn hơn hoặc bằng ngày hiện tại");
    return false;
  }
  hideError(errorDo);
  return true;
}

function validateLocal() {
  const local = inputLocal.value.trim();
  if (local === "") {
    showError(errorLocal, "Địa điểm không được để trống");
    return false;
  }
  const specialCharRegex =
    /[^a-zA-Z0-9\sàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ]/;
  if (specialCharRegex.test(local)) {
    showError(errorLocal, "Địa điểm không được chứa ký tự đặc biệt");
    return false;
  }
  hideError(errorLocal);
  return true;
}

inputName.addEventListener("blur", validateName);
inputSpeaker.addEventListener("blur", validateSpeaker);
inputEmail.addEventListener("blur", validateEmail);
inputDo.addEventListener("blur", validateDo);
inputLocal.addEventListener("blur", validateLocal);

inputName.addEventListener("input", () => hideError(errorName));
inputSpeaker.addEventListener("input", () => hideError(errorSpeaker));
inputEmail.addEventListener("input", () => hideError(errorEmail));
inputDo.addEventListener("input", () => hideError(errorDo));
inputLocal.addEventListener("input", () => hideError(errorLocal));

nativeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const isNameValid = validateName();
  const isSpeakerValid = validateSpeaker();
  const isEmailValid = validateEmail();
  const isDoValid = validateDo();
  const isLocalValid = validateLocal();

  if (
    isNameValid &&
    isSpeakerValid &&
    isEmailValid &&
    isDoValid &&
    isLocalValid
  ) {
    // Thêm hội thảo mới
    const newSeminar = {
      id: seminars.length > 0 ? Math.max(...seminars.map((s) => s.id)) + 1 : 1, // Tạo id mới
      name: inputName.value,
      speaker: inputSpeaker.value,
      email: inputEmail.value,
      date: inputDo.value,
      location: inputLocal.value,
    };
    seminars.push(newSeminar);

    saveSeminarsToLocalStorage(); // Lưu vào localStorage
    renderSeminars(); // Re-render table

    // đóng + reset
    hideForm();
    nativeForm.reset();
  }
});
