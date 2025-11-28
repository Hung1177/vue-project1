<template>
  <AdminLayout>
    <div class="dashboard">
      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon blue">🚗</div>
          <div class="stat-info">
            <h3>{{ stats.totalProducts }}</h3>
            <p>Tổng sản phẩm</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">💰</div>
          <div class="stat-info">
            <h3>{{ formatCurrency(stats.totalRevenue) }}</h3>
            <p>Doanh thu tháng</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange">📦</div>
          <div class="stat-info">
            <h3>{{ stats.totalOrders }}</h3>
            <p>Đơn hàng mới</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon purple">👥</div>
          <div class="stat-info">
            <h3>{{ stats.totalCustomers }}</h3>
            <p>Khách hàng</p>
          </div>
        </div>
      </div>

      <!-- Charts & Tables Row -->
      <div class="dashboard-row">
        <!-- Sales Chart -->
        <div class="card chart-card">
          <div class="card-header">
            <h3>Biểu đồ doanh thu</h3>
            <select v-model="chartPeriod" class="select-input">
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="year">Năm nay</option>
            </select>
          </div>
          <div class="chart-placeholder">
            <div class="bar-chart">
              <div 
                v-for="(item, index) in chartData" 
                :key="index" 
                class="bar-item"
              >
                <div 
                  class="bar" 
                  :style="{ height: item.percentage + '%' }"
                ></div>
                <span class="bar-label">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="card">
          <div class="card-header">
            <h3>Đơn hàng gần đây</h3>
            <a href="#" class="view-all">Xem tất cả</a>
          </div>
          <div class="orders-list">
            <div v-for="order in recentOrders" :key="order.id" class="order-item">
              <div class="order-info">
                <span class="order-id">#{{ order.id }}</span>
                <span class="order-customer">{{ order.customer }}</span>
              </div>
              <div class="order-meta">
                <span class="order-amount">{{ formatCurrency(order.amount) }}</span>
                <span :class="['order-status', order.status]">{{ getStatusText(order.status) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row -->
      <div class="dashboard-row">
        <!-- Popular Products -->
        <div class="card">
          <div class="card-header">
            <h3>Sản phẩm nổi bật</h3>
            <a href="#" class="view-all">Xem tất cả</a>
          </div>
          <div class="products-list">
            <div v-for="product in popularProducts" :key="product.id" class="product-item">
              <span class="product-emoji">{{ product.emoji }}</span>
              <div class="product-info">
                <h4>{{ product.name }}</h4>
                <p>{{ product.brand }}</p>
              </div>
              <div class="product-stats">
                <span class="product-views">👁 {{ product.views }}</span>
                <span class="product-price">{{ formatCurrency(product.price) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activities -->
        <div class="card">
          <div class="card-header">
            <h3>Hoạt động gần đây</h3>
          </div>
          <div class="activities-list">
            <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
              <span class="activity-icon">{{ activity.icon }}</span>
              <div class="activity-content">
                <p>{{ activity.message }}</p>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '../../layouts/AdminLayout.vue'

const chartPeriod = ref('month')

const stats = ref({
  totalProducts: 156,
  totalRevenue: 45600000000,
  totalOrders: 28,
  totalCustomers: 1234
})

const chartData = computed(() => {
  if (chartPeriod.value === 'week') {
    return [
      { label: 'T2', percentage: 60 },
      { label: 'T3', percentage: 45 },
      { label: 'T4', percentage: 80 },
      { label: 'T5', percentage: 55 },
      { label: 'T6', percentage: 90 },
      { label: 'T7', percentage: 75 },
      { label: 'CN', percentage: 40 }
    ]
  }
  return [
    { label: 'T1', percentage: 45 },
    { label: 'T2', percentage: 60 },
    { label: 'T3', percentage: 55 },
    { label: 'T4', percentage: 70 },
    { label: 'T5', percentage: 65 },
    { label: 'T6', percentage: 80 },
    { label: 'T7', percentage: 75 },
    { label: 'T8', percentage: 85 },
    { label: 'T9', percentage: 90 },
    { label: 'T10', percentage: 70 },
    { label: 'T11', percentage: 65 },
    { label: 'T12', percentage: 95 }
  ]
})

const recentOrders = ref([
  { id: '001234', customer: 'Nguyễn Văn A', amount: 1950000000, status: 'completed' },
  { id: '001233', customer: 'Trần Thị B', amount: 899000000, status: 'pending' },
  { id: '001232', customer: 'Lê Hoàng C', amount: 4150000000, status: 'processing' },
  { id: '001231', customer: 'Phạm Văn D', amount: 1130000000, status: 'completed' },
  { id: '001230', customer: 'Hoàng Thị E', amount: 1405000000, status: 'cancelled' }
])

const popularProducts = ref([
  { id: 1, name: 'Mercedes-Benz C300', brand: 'Mercedes-Benz', emoji: '🚗', price: 1950000000, views: 1250 },
  { id: 2, name: 'BMW X5', brand: 'BMW', emoji: '🚙', price: 4150000000, views: 980 },
  { id: 3, name: 'Toyota Camry', brand: 'Toyota', emoji: '🚘', price: 1405000000, views: 856 },
  { id: 4, name: 'Honda CR-V', brand: 'Honda', emoji: '🚐', price: 1130000000, views: 742 }
])

const recentActivities = ref([
  { id: 1, icon: '🛒', message: 'Đơn hàng mới #001234 từ Nguyễn Văn A', time: '5 phút trước' },
  { id: 2, icon: '📝', message: 'Tin tức "Khuyến mãi tháng 12" đã được đăng', time: '15 phút trước' },
  { id: 3, icon: '🚗', message: 'Sản phẩm Mercedes-Benz C300 đã được cập nhật', time: '1 giờ trước' },
  { id: 4, icon: '👤', message: 'Khách hàng mới Trần Thị B đã đăng ký', time: '2 giờ trước' },
  { id: 5, icon: '💬', message: 'Tin nhắn mới từ khách hàng Lê Hoàng C', time: '3 giờ trước' }
])

const formatCurrency = (value) => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(1) + ' tỷ'
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(0) + ' triệu'
  }
  return new Intl.NumberFormat('vi-VN').format(value) + 'đ'
}

const getStatusText = (status) => {
  const texts = {
    completed: 'Hoàn thành',
    pending: 'Chờ xác nhận',
    processing: 'Đang xử lý',
    cancelled: 'Đã hủy'
  }
  return texts[status] || status
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: #fff;
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
}

.stat-icon.blue { background: #e3f2fd; }
.stat-icon.green { background: #e8f5e9; }
.stat-icon.orange { background: #fff3e0; }
.stat-icon.purple { background: #f3e5f5; }

.stat-info h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #1a1a2e;
}

.stat-info p {
  margin: 0.25rem 0 0;
  color: #888;
  font-size: 0.9rem;
}

.dashboard-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #fff;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-header h3 {
  margin: 0;
  color: #1a1a2e;
  font-size: 1.1rem;
}

.view-all {
  color: #e94560;
  text-decoration: none;
  font-size: 0.9rem;
}

.view-all:hover {
  text-decoration: underline;
}

.select-input {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
}

.chart-card {
  min-height: 350px;
}

.chart-placeholder {
  height: 250px;
  display: flex;
  align-items: flex-end;
  padding: 1rem 0;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.bar {
  width: 30px;
  background: linear-gradient(180deg, #e94560 0%, #ff6b6b 100%);
  border-radius: 5px 5px 0 0;
  transition: height 0.3s;
}

.bar-label {
  font-size: 0.75rem;
  color: #888;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f9f9f9;
  border-radius: 10px;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-id {
  font-weight: 600;
  color: #1a1a2e;
  font-size: 0.9rem;
}

.order-customer {
  color: #888;
  font-size: 0.85rem;
}

.order-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.order-amount {
  font-weight: 600;
  color: #1a1a2e;
}

.order-status {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.order-status.completed { background: #e8f5e9; color: #2e7d32; }
.order-status.pending { background: #fff3e0; color: #e65100; }
.order-status.processing { background: #e3f2fd; color: #1565c0; }
.order-status.cancelled { background: #ffebee; color: #c62828; }

.products-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f9f9f9;
  border-radius: 10px;
}

.product-emoji {
  font-size: 2rem;
}

.product-info {
  flex: 1;
}

.product-info h4 {
  margin: 0;
  font-size: 0.95rem;
  color: #1a1a2e;
}

.product-info p {
  margin: 0.25rem 0 0;
  color: #888;
  font-size: 0.85rem;
}

.product-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.product-views {
  font-size: 0.8rem;
  color: #888;
}

.product-price {
  font-weight: 600;
  color: #e94560;
  font-size: 0.9rem;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  font-size: 1.5rem;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  margin: 0;
  color: #333;
  font-size: 0.9rem;
}

.activity-time {
  font-size: 0.8rem;
  color: #888;
}

@media (max-width: 900px) {
  .dashboard-row {
    grid-template-columns: 1fr;
  }
}
</style>
