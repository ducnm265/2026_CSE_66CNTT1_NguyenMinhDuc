import { useState, useEffect } from "react";
// import hook useState để quản lý state (dữ liệu thay đổi trong component)

// Component EmployeeForm là form để thêm nhân viên mới
// Đây là một component con của App, sẽ được hiển thị khi người dùng muốn thêm nhân viên
// Component này sẽ nhận 2 props:
// onAdd: hàm để thêm nhân viên (từ App truyền xuống)
// onClose: hàm đóng form (từ App truyền xuống)
// B3: EmployeeForm sẽ quản lý state riêng để lưu dữ liệu form (name, email, phone, position) khi người dùng nhập
function EmployeeForm({ onAdd, onClose, editingEmployee, onSaveEdit }) {
  // Tạo state để lưu dữ liệu form
  // formData sẽ chứa các field: name, email, phone, position
  // setFormData là hàm để cập nhật formData
  // Khởi tạo formData với giá trị mặc định là rỗng
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    gender: "",
    dob: "",
    password: "",
  });

  // Tạo state để lưu lỗi (nếu có)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    gender: "",
    dob: "",
    password: "",
  });

  // useEffect để fill dữ liệu khi edit
  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name || "",
        email: editingEmployee.email || "",
        phone: editingEmployee.phone || "",
        position: editingEmployee.position || "",
        gender: editingEmployee.gender || "",
        dob: editingEmployee.dob || "",
        password: "", // không fill password
      });
    } else {
      // reset khi thêm mới
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        gender: "",
        dob: "",
        password: "",
      });
    }
  }, [editingEmployee]);

  // Hàm xử lý khi user nhập input
  // e là event (sự kiện) khi user nhập
  // name là tên field (name, email, phone, position)
  // value là giá trị user nhập
  const handleChange = (e) => {
    const { name, value } = e.target;
    // cập nhật formData với field tương ứng
    setFormData({
      ...formData,
      [name]: value,
    });
    // validate ngay khi user nhập
    // cập nhật lỗi (nếu có) cho field tương ứng
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // Hàm validate dữ liệu form
  const validateField = (name, value) => {
    let message = "";
    if (!value) {
      message = "Không được để trống!";
    } else {
      if (name === "name") {
        if (value.length > 30) {
          message = "Họ tên không được quá 30 ký tự!";
        }
      }

      if (name === "email") {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
          message = "Email không hợp lệ!";
        }
      }
      if (name === "phone") {
        const regex = /^[0-9]{10}$/;
        if (!regex.test(value)) {
          message = "SĐT phải 10 số!";
        }
      }
      if (name === "gender") {
        if (value !== "Nam" && value !== "Nữ") {
          message = "Vui lòng chọn giới tính!";
        }
      }
      if (name === "dob") {
        const birthDate = new Date(value);
        if (Number.isNaN(birthDate.getTime())) {
          message = "Ngày sinh không hợp lệ!";
        } else {
          const today = new Date();
          const diffTime = today - birthDate;
          const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
          if (age < 18) {
            message = "Tuổi phải lớn hơn 18!";
          }
        }
      }
      if (name === "password") {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
        if (!regex.test(value)) {
          message =
            "Mật khẩu cần >=8 ký tự, có chữ hoa, chữ thường và ký tự đặc biệt!";
        }
      }
    }
    return message;
  };

  // Hàm xử lý khi user rời khỏi input (blur)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // Hàm xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      position: validateField("position", formData.position),
      gender: validateField("gender", formData.gender),
      dob: validateField("dob", formData.dob),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);

    // nếu có lỗi → dừng
    if (Object.values(newErrors).some((err) => err !== "")) {
      return;
    }

    if (editingEmployee) {
      // đang sửa
      onSaveEdit({ ...editingEmployee, ...formData });
    } else {
      // thêm mới
      onAdd(formData);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      gender: "",
      dob: "",
      password: "",
    });

    setErrors({
      name: "",
      email: "",
      phone: "",
      position: "",
      gender: "",
      dob: "",
      password: "",
    });

    onClose();
  };

  return (
    // overlay nền mờ
    <div className="overlay">
      {/* form chính */}
      <div className="formInput">
        {/* header form */}
        <div className="formHeader">
          <div className="formTitle">
            {editingEmployee ? "Sửa nhân viên" : "Thêm mới nhân sự"}
          </div>

          {/* nút đóng */}
          <div className="close-btn" onClick={onClose}>
            X
          </div>
        </div>

        {/* form nhập */}
        <form className="formBody" onSubmit={handleSubmit}>
          <div className="formRow">
            {/* cột trái */}
            <div className="boxForm1">
              <div className="formGroup">
                <label>Họ tên:</label>
                <input
                  name="name"
                  className="inputName"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>

              <div className="formGroup">
                <label>Email:</label>
                <input
                  name="email"
                  className="inputEmail"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
            </div>

            {/* cột phải */}
            <div className="boxForm2">
              <div className="formGroup">
                <label>Số điện thoại:</label>
                <input
                  name="phone"
                  className="inputPhone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>

              <div className="formGroup">
                <label>Vị trí:</label>
                <select
                  name="position"
                  className="selectOption"
                  value={formData.position}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">-- Chọn vị trí --</option>
                  <option value="Nhân viên">Nhân viên</option>
                  <option value="Quản lý">Quản lý</option>
                  <option value="Giám đốc">Giám đốc</option>
                </select>
                {errors.position && <p className="error">{errors.position}</p>}
              </div>

              <div className="formGroup">
                <label>Giới tính:</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Nam"
                      checked={formData.gender === "Nam"}
                      onChange={handleChange}
                    />{" "}
                    Nam
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <input
                      type="radio"
                      name="gender"
                      value="Nữ"
                      checked={formData.gender === "Nữ"}
                      onChange={handleChange}
                    />{" "}
                    Nữ
                  </label>
                </div>
                {errors.gender && <p className="error">{errors.gender}</p>}
              </div>

              <div className="formGroup">
                <label>Ngày sinh:</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </div>

              <div className="formGroup">
                <label>Mật khẩu:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
            </div>
          </div>

          {/* nút submit */}
          <button type="submit" className="submit-btn">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
// export để dùng ở App.js
