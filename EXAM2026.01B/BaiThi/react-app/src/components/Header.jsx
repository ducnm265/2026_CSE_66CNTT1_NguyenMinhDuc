function Header() {
  return (
    <div className="header">
      <div className="head1">
        <div className="title">HộiThảoHub</div>
        <div className="menu">
          <ul>
            <li>Trang chủ</li>
            <li>Danh sách</li>
            <li className="nav-bar-active">Thêm mới</li>
            <li>Giới thiệu</li>
          </ul>
        </div>
      </div>

      <div className="head2">
        <input type="text" placeholder="Tìm kiếm..." className="searchInput" />
      </div>
    </div>
  );
}

export default Header;
