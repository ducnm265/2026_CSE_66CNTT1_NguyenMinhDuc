// Component EmployeeTable nhận dữ liệu từ component cha (App)
// thông qua props là "employees"
// Component này chỉ có nhiệm vụ hiển thị bảng dữ liệu nhân viên
// B2: App sẽ quản lý state chính (dữ liệu nhân viên) và truyền xuống EmployeeTable để hiển thị
function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    // div bọc ngoài để dễ style (CSS)
    <div className="box2">
      {/* Bảng hiển thị dữ liệu */}
      <table>
        {/* PHẦN HEADER CỦA BẢNG */}
        <thead>
          <tr>
            {/* Các tiêu đề cột */}
            <th>STT</th> {/* Số thứ tự */}
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Vị trí</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Hành động</th>
          </tr>
        </thead>

        {/* PHẦN BODY (DỮ LIỆU) */}
        <tbody>
          {/* Duyệt qua mảng employees để render từng dòng */}
          {employees.map((emp, index) => (
            // Mỗi dòng là một nhân viên
            // key là bắt buộc trong React để tối ưu render
            <tr key={emp.id}>
              {/* index + 1 để hiển thị STT bắt đầu từ 1 */}
              <td>{index + 1}</td>

              {/* Hiển thị thông tin từng nhân viên */}
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.position}</td>
              <td>{emp.gender || ""}</td>
              <td>{emp.dob ? new Date(emp.dob).toLocaleDateString() : ""}</td>

              {/* Cột hành động */}
              <td>
                {/* Nút sửa */}
                <button className="edit-btn" onClick={() => onEdit(emp)}>
                  Sửa
                </button>

                {/* Nút xóa */}
                <button className="delete-btn" onClick={() => onDelete(emp.id)}>
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
export default EmployeeTable;
