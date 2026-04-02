import { useState, useEffect } from "react";
// import hook useState để quản lý state (dữ liệu thay đổi trong component)

// Component SeminarForm là form để thêm hội thảo mới
// Đây là một component con của App, sẽ được hiển thị khi người dùng muốn thêm hội thảo
// Component này sẽ nhận props:
// onAdd: hàm để thêm hội thảo (từ App truyền xuống)
// onClose: hàm đóng form (từ App truyền xuống)
// editingSeminar: hội thảo đang edit (null nếu thêm mới)
// onSaveEdit: hàm lưu edit
function SeminarForm({ onAdd, onClose, editingSeminar, onSaveEdit }) {
  // Tạo state để lưu dữ liệu form
  const [formData, setFormData] = useState({
    name: "",
    speaker: "",
    email: "",
    date: "",
    location: "",
  });

  // Tạo state để lưu lỗi
  const [errors, setErrors] = useState({
    name: "",
    speaker: "",
    email: "",
    date: "",
    location: "",
  });

  // useEffect để fill dữ liệu khi edit
  useEffect(() => {
    if (editingSeminar) {
      setFormData({
        name: editingSeminar.name || "",
        speaker: editingSeminar.speaker || "",
        email: editingSeminar.email || "",
        date: editingSeminar.date || "",
        location: editingSeminar.location || "",
      });
    } else {
      // reset khi thêm mới
      setFormData({
        name: "",
        speaker: "",
        email: "",
        date: "",
        location: "",
      });
    }
  }, [editingSeminar]);

  // Hàm xử lý khi user nhập input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // validate ngay khi user nhập
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // Hàm validate dữ liệu form
  const validateField = (name, value) => {
    let message = "";
    if (!value.trim()) {
      switch (name) {
        case "name":
          message = "Tên hội thảo không được để trống";
          break;
        case "speaker":
          message = "Diễn giả không được để trống";
          break;
        case "email":
          message = "Email không được để trống";
          break;
        case "date":
          message = "Ngày tổ chức không được để trống";
          break;
        case "location":
          message = "Địa điểm không được để trống";
          break;
        default:
          break;
      }
    } else {
      if (name === "name" && value.length > 60) {
        message = "Tên hội thảo không được vượt quá 60 ký tự";
      }
      if (name === "speaker" && value.length > 30) {
        message = "Diễn giả không được vượt quá 30 ký tự";
      }
      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          message = "Email không hợp lệ";
        }
      }
      if (name === "date") {
        const eventDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (eventDate < today) {
          message = "Ngày tổ chức phải lớn hơn hoặc bằng ngày hiện tại";
        }
      }
      if (name === "location") {
        const specialCharRegex =
          /[^a-zA-Z0-9\sàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ]/;
        if (specialCharRegex.test(value)) {
          message = "Địa điểm không được chứa ký tự đặc biệt";
        }
      }
    }
    return message;
  };

  // Hàm submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // validate tất cả fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    // nếu không có lỗi
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (!hasErrors) {
      if (editingSeminar) {
        onSaveEdit({ ...editingSeminar, ...formData });
      } else {
        onAdd(formData);
      }
      onClose();
    }
  };

  return (
    <div
      className="overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="formInput">
        <div className="formHeader">
          <div className="formTitle">
            {editingSeminar ? "Sửa hội thảo" : "Thêm hội thảo mới"}
          </div>
          <div className="close-btn" onClick={onClose}>
            X
          </div>
        </div>

        <form className="formBody" onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="boxForm1">
              <label htmlFor="name">Tên hội thảo:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="inputName"
                value={formData.name}
                onChange={handleChange}
              />
              <div className="error errorName">{errors.name}</div>

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="inputEmail"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="error errorEmail">{errors.email}</div>

              <label htmlFor="location">Địa điểm</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Hội trường / địa chỉ"
                className="inputLocal"
                required
                value={formData.location}
                onChange={handleChange}
              />
              <div className="error errorLocal">{errors.location}</div>
            </div>

            <div className="boxForm2">
              <label htmlFor="speaker">Diễn giả:</label>
              <input
                type="text"
                id="speaker"
                name="speaker"
                required
                className="inputSpeaker"
                value={formData.speaker}
                onChange={handleChange}
              />
              <div className="error errorSpeaker">{errors.speaker}</div>
              <label htmlFor="date">Ngày tổ chức:</label>
              <input
                type="date"
                id="date"
                name="date"
                className="inputDo"
                required
                value={formData.date}
                onChange={handleChange}
              />
              <div className="error errorDo">{errors.date}</div>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
}

export default SeminarForm;
