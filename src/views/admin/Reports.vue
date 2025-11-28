<template>
  <AdminLayout>
    <div class="reports-page">
      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="filter-group">
          <label>Khoảng thời gian:</label>
          <select v-model="dateRange" class="select-input">
            <option value="today">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="quarter">Quý này</option>
            <option value="year">Năm nay</option>
          </select>
        </div>
        <button class="btn btn-primary" @click="exportReport">
          📥 Xuất báo cáo
        </button>
      </div>

      <!-- Stats Overview -->
      <div class="stats-grid">
        <div class="stat-card revenue">
          <div class="stat-header">
            <span class="stat-icon">💰</span>
            <span class="stat-trend up">+15%</span>
          </div>
          <h3>{{ formatCurrency(stats.revenue) }}</h3>
          <p>Tổng doanh thu</p>
        </div>
        <div class="stat-card orders">
          <div class="stat-header">
            <span class="stat-icon">📦</span>
            <span class="stat-trend up">+8%</span>
          </div>
          <h3>{{ stats.orders }}</h3>
          <p>Đơn hàng</p>
        </div>
        <div class="stat-card customers">
          <div class="stat-header">
            <span class="stat-icon">👥</span>
            <span class="stat-trend up">+12%</span>
          </div>
          <h3>{{ stats.customers }}</h3>
          <p>Khách hàng mới</p>
        </div>
        <div class="stat-card views">
          <div class="stat-header">
            <span class="stat-icon">👁</span>
            <span class="stat-trend down">-3%</span>
          </div>
          <h3>{{ formatNumber(stats.views) }}</h3>
          <p>Lượt truy cập</p>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="charts-row">
        <!-- Revenue Chart -->
        <div class="card chart-card">
          <div class="card-header">
            <h3>Biểu đồ doanh thu</h3>
            <select v-model="revenueChartType" class="select-input select-sm">
              <option value="bar">Cột</option>
              <option value="line">Đường</option>
            </select>
          </div>
          <div class="chart-content">
            <div class="bar-chart">
              <div 
                v-for="(item, index) in revenueData" 
                :key="index" 
                class="bar-item"
              >
                <div class="bar-value">{{ formatShort(item.value) }}</div>
                <div 
                  class="bar" 
                  :style="{ height: item.percentage + '%' }"
                ></div>
                <span class="bar-label">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sales by Category -->
        <div class="card">
          <div class="card-header">
            <h3>Doanh số theo hãng xe</h3>
          </div>
          <div class="pie-chart-content">
            <div class="pie-chart">
              <div class="pie-center">
                <span class="pie-total">{{ totalSales }}</span>
                <span class="pie-label">Xe bán</span>
              </div>
            </div>
            <div class="pie-legend">
              <div v-for="item in salesByBrand" :key="item.brand" class="legend-item">
                <span class="legend-color" :style="{ background: item.color }"></span>
                <span class="legend-label">{{ item.brand }}</span>
                <span class="legend-value">{{ item.count }} ({{ item.percentage }}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tables Row -->
      <div class="tables-row">
        <!-- Top Products -->
        <div class="card">
          <div class="card-header">
            <h3>Sản phẩm bán chạy</h3>
            <a href="#" class="view-all">Xem tất cả</a>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in topProducts" :key="product.id">
                <td>
                  <div class="product-cell">
                    <span class="product-emoji">{{ product.emoji }}</span>
                    <span>{{ product.name }}</span>
                  </div>
                </td>
                <td>{{ product.sold }}</td>
                <td class="revenue-cell">{{ formatCurrency(product.revenue) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Recent Transactions -->
        <div class="card">
          <div class="card-header">
            <h3>Giao dịch gần đây</h3>
            <a href="#" class="view-all">Xem tất cả</a>
          </div>
          <div class="transactions-list">
            <div v-for="transaction in recentTransactions" :key="transaction.id" class="transaction-item">
              <div class="transaction-info">
                <span class="transaction-customer">{{ transaction.customer }}</span>
                <span class="transaction-product">{{ transaction.product }}</span>
              </div>
              <div class="transaction-amount">
                <span :class="['amount', transaction.type]">
                  {{ transaction.type === 'income' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
                </span>
                <span class="transaction-date">{{ transaction.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div class="metrics-section">
        <h2>Chỉ số hiệu suất</h2>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-header">
              <h4>Tỷ lệ chuyển đổi</h4>
              <span class="metric-badge good">Tốt</span>
            </div>
            <div class="metric-value">4.8%</div>
            <div class="metric-progress">
              <div class="progress-bar" style="width: 48%"></div>
            </div>
            <p class="metric-description">Tỷ lệ khách truy cập đặt mua xe</p>
          </div>
          <div class="metric-card">
            <div class="metric-header">
              <h4>Thời gian phản hồi TB</h4>
              <span class="metric-badge excellent">Xuất sắc</span>
            </div>
            <div class="metric-value">2.5h</div>
            <div class="metric-progress">
              <div class="progress-bar" style="width: 85%"></div>
            </div>
            <p class="metric-description">Thời gian phản hồi tin nhắn trung bình</p>
          </div>
          <div class="metric-card">
            <div class="metric-header">
              <h4>Đánh giá khách hàng</h4>
              <span class="metric-badge excellent">Xuất sắc</span>
            </div>
            <div class="metric-value">4.9/5 ⭐</div>
            <div class="metric-progress">
              <div class="progress-bar" style="width: 98%"></div>
            </div>
            <p class="metric-description">Điểm đánh giá trung bình từ khách hàng</p>
          </div>
          <div class="metric-card">
            <div class="metric-header">
              <h4>Tỷ lệ quay lại</h4>
              <span class="metric-badge good">Tốt</span>
            </div>
            <div class="metric-value">32%</div>
            <div class="metric-progress">
              <div class="progress-bar" style="width: 32%"></div>
            </div>
            <p class="metric-description">Khách hàng quay lại mua thêm</p>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '../../layouts/AdminLayout.vue'

const dateRange = ref('month')
const revenueChartType = ref('bar')

const stats = ref({
  revenue: 45600000000,
  orders: 156,
  customers: 89,
  views: 125600
})

const revenueData = ref([
  { label: 'T1', value: 3200000000, percentage: 40 },
  { label: 'T2', value: 2800000000, percentage: 35 },
  { label: 'T3', value: 4100000000, percentage: 51 },
  { label: 'T4', value: 3600000000, percentage: 45 },
  { label: 'T5', value: 4800000000, percentage: 60 },
  { label: 'T6', value: 5200000000, percentage: 65 },
  { label: 'T7', value: 4500000000, percentage: 56 },
  { label: 'T8', value: 5800000000, percentage: 72 },
  { label: 'T9', value: 6100000000, percentage: 76 },
  { label: 'T10', value: 5400000000, percentage: 67 },
  { label: 'T11', value: 6800000000, percentage: 85 },
  { label: 'T12', value: 8000000000, percentage: 100 }
])

const salesByBrand = ref([
  { brand: 'Mercedes-Benz', count: 45, percentage: 29, color: '#e94560' },
  { brand: 'BMW', count: 38, percentage: 24, color: '#1565c0' },
  { brand: 'Toyota', count: 32, percentage: 21, color: '#2e7d32' },
  { brand: 'Honda', count: 25, percentage: 16, color: '#e65100' },
  { brand: 'Khác', count: 16, percentage: 10, color: '#888' }
])

const totalSales = computed(() => {
  return salesByBrand.value.reduce((sum, item) => sum + item.count, 0)
})

const topProducts = ref([
  { id: 1, name: 'Mercedes-Benz C300', emoji: '🚗', sold: 25, revenue: 48750000000 },
  { id: 2, name: 'BMW X5', emoji: '🚙', sold: 18, revenue: 74700000000 },
  { id: 3, name: 'Toyota Camry', emoji: '🚘', sold: 22, revenue: 30910000000 },
  { id: 4, name: 'Honda CR-V', emoji: '🚐', sold: 15, revenue: 16950000000 },
  { id: 5, name: 'Mazda CX-5', emoji: '🚙', sold: 12, revenue: 10788000000 }
])

const recentTransactions = ref([
  { id: 1, customer: 'Nguyễn Văn A', product: 'Mercedes-Benz C300', amount: 1950000000, type: 'income', date: '01/12/2024' },
  { id: 2, customer: 'Trần Thị B', product: 'Toyota Camry', amount: 1405000000, type: 'income', date: '30/11/2024' },
  { id: 3, customer: 'Chi phí marketing', product: '', amount: 50000000, type: 'expense', date: '29/11/2024' },
  { id: 4, customer: 'Lê Hoàng C', product: 'BMW X5', amount: 4150000000, type: 'income', date: '28/11/2024' },
  { id: 5, customer: 'Phạm Văn D', product: 'Honda CR-V', amount: 1130000000, type: 'income', date: '27/11/2024' }
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

const formatShort = (value) => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(1) + 'B'
  }
  return (value / 1000000).toFixed(0) + 'M'
}

const formatNumber = (value) => {
  return new Intl.NumberFormat('vi-VN').format(value)
}

const exportReport = () => {
  alert('Đang xuất báo cáo...')
}
</script>

<style scoped>
.reports-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  background: #fff;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-group label {
  color: #666;
  font-size: 0.9rem;
}

.select-input {
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
}

.select-sm {
  padding: 0.4rem 0.75rem;
  font-size: 0.85rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: #fff;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.stat-icon {
  font-size: 1.75rem;
}

.stat-trend {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
}

.stat-trend.up {
  color: #2e7d32;
  background: #e8f5e9;
}

.stat-trend.down {
  color: #c62828;
  background: #ffebee;
}

.stat-card h3 {
  margin: 0;
  font-size: 1.75rem;
  color: #1a1a2e;
}

.stat-card p {
  margin: 0.5rem 0 0;
  color: #888;
  font-size: 0.9rem;
}

.charts-row,
.tables-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
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

.chart-card {
  min-height: 350px;
}

.chart-content {
  height: 280px;
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

.bar-value {
  font-size: 0.7rem;
  color: #666;
}

.bar {
  width: 25px;
  background: linear-gradient(180deg, #e94560 0%, #ff6b6b 100%);
  border-radius: 5px 5px 0 0;
  transition: height 0.3s;
}

.bar-label {
  font-size: 0.75rem;
  color: #888;
}

.pie-chart-content {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.pie-chart {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: conic-gradient(
    #e94560 0% 29%,
    #1565c0 29% 53%,
    #2e7d32 53% 74%,
    #e65100 74% 90%,
    #888 90% 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.pie-center {
  width: 100px;
  height: 100px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pie-total {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a2e;
}

.pie-label {
  font-size: 0.8rem;
  color: #888;
}

.pie-legend {
  flex: 1;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-label {
  flex: 1;
  color: #333;
  font-size: 0.9rem;
}

.legend-value {
  color: #888;
  font-size: 0.85rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.data-table th {
  font-weight: 600;
  color: #888;
  font-size: 0.85rem;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.product-emoji {
  font-size: 1.25rem;
}

.revenue-cell {
  font-weight: 600;
  color: #e94560;
}

.transactions-list {
  display: flex;
  flex-direction: column;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.transaction-customer {
  font-weight: 500;
  color: #1a1a2e;
}

.transaction-product {
  font-size: 0.85rem;
  color: #888;
}

.transaction-amount {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.amount {
  font-weight: 600;
}

.amount.income {
  color: #2e7d32;
}

.amount.expense {
  color: #c62828;
}

.transaction-date {
  font-size: 0.8rem;
  color: #888;
}

.metrics-section {
  margin-top: 1rem;
}

.metrics-section h2 {
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.metric-card {
  background: #fff;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.metric-header h4 {
  margin: 0;
  color: #1a1a2e;
  font-size: 0.95rem;
}

.metric-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  font-weight: 500;
}

.metric-badge.excellent {
  background: #e8f5e9;
  color: #2e7d32;
}

.metric-badge.good {
  background: #e3f2fd;
  color: #1565c0;
}

.metric-badge.average {
  background: #fff3e0;
  color: #e65100;
}

.metric-value {
  font-size: 2rem;
  font-weight: bold;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
}

.metric-progress {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #e94560 0%, #ff6b6b 100%);
  border-radius: 4px;
}

.metric-description {
  margin: 0;
  color: #888;
  font-size: 0.85rem;
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-primary {
  background: #e94560;
  color: #fff;
}

.btn-primary:hover {
  background: #ff6b6b;
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .charts-row,
  .tables-row {
    grid-template-columns: 1fr;
  }
  
  .pie-chart-content {
    flex-direction: column;
  }
}
</style>
