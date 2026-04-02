// Component SeminarTable nhận dữ liệu từ component cha (App)
// thông qua props là "seminars"
// Component này chỉ có nhiệm vụ hiển thị bảng dữ liệu hội thảo
// B2: App sẽ quản lý state chính (dữ liệu hội thảo) và truyền xuống SeminarTable để hiển thị
function SeminarTable({ seminars, onEdit, onDelete }) {
  return (
    // div bọc ngoài để dễ style (CSS)
    <div className="box2">
      {/* Bảng hiển thị dữ liệu */}
      <table>
        {/* PHẦN HEADER CỦA BẢNG */}
        <thead>
          <tr>
            {/* Các tiêu đề cột */}
            <th>Tên Hội Thảo</th>
            <th>Diễn Giả</th>
            <th>Email</th>
            <th>Ngày tổ chức</th>
            <th>Địa điểm</th>
            
          </tr>
        </thead>

        {/* PHẦN BODY (DỮ LIỆU) */}
        <tbody>
          {/* Duyệt qua mảng seminars để render từng dòng */}
          {seminars.map((sem) => (
            // Mỗi dòng là một hội thảo
            // key là bắt buộc trong React để tối ưu render
            <tr key={sem.id}>
              {/* Hiển thị thông tin từng hội thảo */}
              <td>{sem.name}</td>
              <td>{sem.speaker}</td>
              <td>{sem.email}</td>
              <td>{sem.date ? new Date(sem.date).toLocaleDateString() : ""}</td>
              <td>{sem.location}</td>

              {/* Cột hành động */}
              <td>
                {/* Nút sửa */}
                <button className="edit-btn" onClick={() => onEdit(sem)}>
                  Sửa
                </button>
                {/* Nút xóa */}
                <button className="delete-btn" onClick={() => onDelete(sem.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Export component để dùng ở file khác (App.js)
export default SeminarTable;
