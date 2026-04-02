import { useState, useEffect } from "react";
// import hook useState để quản lý state
// import hook useEffect để quản lý side effects

import Header from "./components/Header";
// import component Header (phần đầu trang)

import SeminarTable from "./components/SeminarTable";
// import bảng hiển thị danh sách hội thảo

import SeminarForm from "./components/SeminarForm";
// import form thêm hội thảo (modal)

import { seminarsData } from "./data";
// import dữ liệu ban đầu (giả lập JSON)

import "./App.css";
// import file CSS

function App() {
  // ===== STATE =====

  //B1:App sẽ quản lý state chính ở đây (dữ liệu hội thảo, trạng thái hiển thị form)
  const [seminars, setSeminars] = useState(() => {
    const saved = localStorage.getItem("seminars");
    return saved ? JSON.parse(saved) : seminarsData;
  });
  // seminars: danh sách hội thảo
  // setSeminars: cập nhật danh sách
  // seminarsData: dữ liệu ban đầu
  // Sử dụng hàm khởi tạo để lấy dữ liệu từ localStorage (nếu có) hoặc sử dụng dữ liệu mặc định
  useEffect(() => {
    localStorage.setItem("seminars", JSON.stringify(seminars));
  }, [seminars]);
  // Lưu dữ liệu vào localStorage mỗi khi seminars thay đổi

  const [showForm, setShowForm] = useState(false);
  // showForm: true → hiện form
  // false → ẩn form

  const [editingSeminar, setEditingSeminar] = useState(null);
  // editingSeminar: hội thảo đang được sửa (null nếu thêm mới)

  // ===== HÀM THÊM HỘI THẢO =====

  const handleAdd = (sem) => {
    // sem là dữ liệu nhận từ SeminarForm

    const newSem = {
      id: seminars.length > 0 ? Math.max(...seminars.map((s) => s.id)) + 1 : 1,
      // tạo id tự tăng

      ...sem,
      // copy dữ liệu từ form (name, speaker, ...)
    };

    setSeminars([...seminars, newSem]);
    // cập nhật state:
    // copy danh sách cũ + thêm hội thảo mới

    // React sẽ re-render → bảng tự update
  };

  // ===== HÀM SỬA HỘI THẢO =====

  const handleEdit = (sem) => {
    // sem là hội thảo cần sửa
    setEditingSeminar(sem);
    setShowForm(true);
    // mở form và truyền dữ liệu hội thảo vào
  };

  // ===== HÀM XÓA HỘI THẢO =====

  const handleDelete = (id) => {
    // id là id của hội thảo cần xóa
    if (window.confirm("Bạn có chắc muốn xóa hội thảo này?")) {
      setSeminars(seminars.filter((sem) => sem.id !== id));
      // lọc ra những hội thảo không có id này
    }
  };

  // ===== HÀM LƯU SỬA =====

  const handleSaveEdit = (sem) => {
    // sem là dữ liệu đã sửa
    setSeminars(seminars.map((s) => (s.id === sem.id ? sem : s)));
    // cập nhật hội thảo có id khớp
    setEditingSeminar(null);
    // reset trạng thái edit
  };

  // ===== GIAO DIỆN =====

  return (
    <div className="container">
      {/* HEADER */}
      <Header />

      {/* BDK */}
      <div className="bdk">
        <p className="p1">Bảng điều khiện hội thảo</p>
        <p className="p2">Theo dõi lịch, diễn giả và địa điểm các sự kiện.</p>
      </div>

      {/* BODY */}
      <div className="body">
        <div className="box1">
          <div className="box1-title">Danh sách hội thảo</div>

          {/* NÚT THÊM */}
          <button className="add-btn" onClick={() => setShowForm(true)}>
            + Thêm mới
          </button>
          {/* click → mở form */}
        </div>

        {/* BẢNG */}
        <SeminarTable
          seminars={seminars}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {/* truyền dữ liệu và hàm xuống component con */}
      </div>

      {/* FORM (HIỂN THỊ CÓ ĐIỀU KIỆN) */}
      {showForm && (
        <SeminarForm
          // prop để đuat dữ liệu từ App xuống form
          onAdd={handleAdd}
          // truyền hàm thêm dữ liệu xuống form

          onSaveEdit={handleSaveEdit}
          // truyền hàm lưu sửa

          editingSeminar={editingSeminar}
          // truyền hội thảo đang sửa (null nếu thêm mới)

          onClose={() => {
            setShowForm(false);
            setEditingSeminar(null);
          }}
          // truyền hàm đóng form và reset edit
        />
      )}
      {/* nếu showForm = true → render form */}

      {/* FOOTER */}
      <div className="footer">
        <span className="footer1">HộiThảoHub</span>
        <span className="footer2">
          2451060645 - 66CNTT1 - Thi CSE391 3-2026
        </span>
      </div>
    </div>
  );
}

export default App;
// export component để React render

// 1. App giữ data
// 2. App truyền data xuống Table
// 3. Form nhập data
// 4. Form gửi data lên App
// 5. App update state
// 6. Table tự render lại
