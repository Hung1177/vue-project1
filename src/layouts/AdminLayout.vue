<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>🚗 CarShop</h2>
        <span class="admin-badge">Admin</span>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin" class="sidebar-link" :class="{ active: $route.path === '/admin' }">
          <span class="icon">📊</span>
          Dashboard
        </router-link>
        <router-link to="/admin/products" class="sidebar-link">
          <span class="icon">🚙</span>
          Quản lý sản phẩm
        </router-link>
        <router-link to="/admin/news" class="sidebar-link">
          <span class="icon">📰</span>
          Quản lý tin tức
        </router-link>
        <router-link to="/admin/reports" class="sidebar-link">
          <span class="icon">📈</span>
          Thống kê báo cáo
        </router-link>
        <router-link to="/admin/settings" class="sidebar-link">
          <span class="icon">⚙️</span>
          Cài đặt
        </router-link>
      </nav>
      <div class="sidebar-footer">
        <router-link to="/" class="back-link">
          <span class="icon">🏠</span>
          Về trang chủ
        </router-link>
      </div>
    </aside>
    <div class="admin-main">
      <header class="admin-header">
        <div class="header-left">
          <h1>{{ pageTitle }}</h1>
        </div>
        <div class="header-right">
          <div class="admin-user">
            <span class="user-avatar">👤</span>
            <span class="user-name">Admin</span>
          </div>
        </div>
      </header>
      <main class="admin-content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  const titles = {
    '/admin': 'Dashboard',
    '/admin/products': 'Quản lý sản phẩm',
    '/admin/news': 'Quản lý tin tức',
    '/admin/reports': 'Thống kê báo cáo',
    '/admin/settings': 'Cài đặt'
  }
  return titles[route.path] || 'Dashboard'
})
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f0f2f5;
}

.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.sidebar-header h2 {
  color: #e94560;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.admin-badge {
  background: #e94560;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  color: #ccc;
  text-decoration: none;
  transition: all 0.3s;
  border-left: 3px solid transparent;
}

.sidebar-link:hover,
.sidebar-link.router-link-active {
  background: rgba(233, 69, 96, 0.1);
  color: #e94560;
  border-left-color: #e94560;
}

.sidebar-link .icon {
  font-size: 1.25rem;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  text-decoration: none;
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.3s;
}

.back-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.admin-main {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
}

.admin-header {
  background: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.admin-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #1a1a2e;
}

.admin-user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border-radius: 25px;
}

.user-avatar {
  font-size: 1.5rem;
}

.user-name {
  font-weight: 500;
  color: #333;
}

.admin-content {
  flex: 1;
  padding: 2rem;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 200px;
  }
  
  .admin-main {
    margin-left: 200px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 70px;
  }
  
  .sidebar-header h2,
  .admin-badge,
  .sidebar-link span:not(.icon),
  .back-link span:not(.icon) {
    display: none;
  }
  
  .sidebar-link {
    justify-content: center;
    padding: 1rem;
  }
  
  .admin-main {
    margin-left: 70px;
  }
}
</style>
