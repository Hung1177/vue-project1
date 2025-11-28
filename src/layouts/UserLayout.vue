<template>
  <div class="user-layout">
    <header class="header">
      <div class="container">
        <div class="logo">
          <router-link to="/">
            <h1>🚗 CarShop</h1>
          </router-link>
        </div>
        <nav class="nav">
          <router-link to="/" class="nav-link">Trang chủ</router-link>
          <router-link to="/products" class="nav-link">Sản phẩm</router-link>
          <router-link to="/services" class="nav-link">Dịch vụ</router-link>
          <router-link to="/about" class="nav-link">Giới thiệu</router-link>
          <router-link to="/contact" class="nav-link">Liên hệ</router-link>
        </nav>
        <div class="header-actions">
          <router-link to="/admin" class="admin-btn">Quản trị</router-link>
        </div>
      </div>
    </header>
    <main class="main-content">
      <slot></slot>
    </main>
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-section">
            <h3>🚗 CarShop</h3>
            <p>Chuyên cung cấp các dòng xe ô tô chất lượng cao với giá cả cạnh tranh nhất thị trường.</p>
          </div>
          <div class="footer-section">
            <h4>Liên kết nhanh</h4>
            <ul>
              <li><router-link to="/">Trang chủ</router-link></li>
              <li><router-link to="/products">Sản phẩm</router-link></li>
              <li><router-link to="/services">Dịch vụ</router-link></li>
              <li><router-link to="/about">Giới thiệu</router-link></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Liên hệ</h4>
            <p>📍 123 Nguyễn Văn Linh, Quận 7, TP.HCM</p>
            <p>📞 (028) 1234 5678</p>
            <p>✉️ contact@carshop.vn</p>
          </div>
          <div class="footer-section">
            <h4>Theo dõi chúng tôi</h4>
            <div class="social-links">
              <a href="#" class="social-link">Facebook</a>
              <a href="#" class="social-link">YouTube</a>
              <a href="#" class="social-link">Zalo</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 CarShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
.user-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.header .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo a {
  text-decoration: none;
}

.logo h1 {
  color: #e94560;
  margin: 0;
  font-size: 1.8rem;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #e94560;
}

.admin-btn {
  background: #e94560;
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.admin-btn:hover {
  background: #ff6b6b;
  transform: translateY(-2px);
}

.main-content {
  flex: 1;
  background: #f5f5f5;
}

.footer {
  background: #1a1a2e;
  color: #fff;
  padding: 3rem 0 1rem;
}

.footer .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: #e94560;
  margin-bottom: 1rem;
}

.footer-section h4 {
  color: #fff;
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul a:hover {
  color: #e94560;
}

.footer-section p {
  color: #ccc;
  margin-bottom: 0.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: #ccc;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s;
}

.social-link:hover {
  background: #e94560;
  border-color: #e94560;
  color: #fff;
}

.footer-bottom {
  border-top: 1px solid #333;
  padding-top: 1rem;
  text-align: center;
  color: #888;
}

@media (max-width: 768px) {
  .header .container {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .nav {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
}
</style>
