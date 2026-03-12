let students = [
  { name: "Minh Đức", score: 8 },
  { name: "Minh Ngọc", score: 8.5 },
];

function getRank(score) {
  if (score >= 8.5) return "Giỏi";
  if (score >= 7.0) return "Khá";
  if (score >= 5.0) return "Trung bình";
  return "Yếu";
}

function renderTable() {
  const tableBody = document.querySelector("#student-table tbody");
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    const rank = getRank(student.score);
    const rowClass = student.score < 5.0 ? "low-score" : "";
    const newRow = tableBody.insertRow();
    newRow.className = rowClass;
    newRow.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.score}</td>
      <td>${rank}</td>
      <td><button class="btn-remove" data-index="${index}">Xóa</button></td>
    `;
  });

  updateStatistics();
}

function updateStatistics() {
  const totalStudents = students.length;
  const averageScore =
    totalStudents > 0
      ? (students.reduce((sum, s) => sum + s.score, 0) / totalStudents).toFixed(
          2,
        )
      : 0;

  document.getElementById("total-students").textContent = totalStudents;
  document.getElementById("average-score").textContent = averageScore;
}

function addStudent() {
  const nameInput = document.getElementById("name-input");
  const scoreInput = document.getElementById("score-input");
  const errorMessage = document.getElementById("error-message");

  const name = nameInput.value.trim();
  const score = parseFloat(scoreInput.value);

  // Validate
  if (!name) {
    alert("Vui lòng nhập họ và tên.");
    return;
  }
  if (isNaN(score) || score < 0 || score > 10) {
    alert("Điểm phải là số từ 0 đến 10.");
    return;
  }

  errorMessage.textContent = "";

  // thêm sinh viên mới vào mảng
  students.push({ name, score });

  // cập nhật bảng và thống kê
  renderTable();

  // xóa input sau khi thêm
  nameInput.value = "";
  scoreInput.value = "";
  nameInput.focus();
}

// Xử lý sự kiện sau khi DOM đã tải xong
document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#student-table tbody");
  tableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-remove")) {
      const index = parseInt(event.target.getAttribute("data-index"));
      students.splice(index, 1);
      renderTable();
    }
  });

  // Thêm sự kiện cho input điểm để thêm sinh viên khi nhấn Enter
  document
    .getElementById("score-input")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        addStudent();
      }
    });

  // Hiển thị bảng và thống kê ban đầu
  renderTable();
});
