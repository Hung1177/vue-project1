<template>
  <UserLayout>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Chào mừng đến với CarShop</h1>
        <p>Nơi bạn tìm thấy chiếc xe mơ ước với giá tốt nhất</p>
        <div class="hero-buttons">
          <router-link to="/products" class="btn btn-primary">Xem sản phẩm</router-link>
          <router-link to="/contact" class="btn btn-outline">Liên hệ ngay</router-link>
        </div>
      </div>
    </section>

    <!-- Featured Cars -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Xe nổi bật</h2>
        <div class="cars-grid">
          <div v-for="car in featuredCars" :key="car.id" class="car-card">
            <div class="car-image">
              <span class="car-emoji">{{ car.emoji }}</span>
              <span v-if="car.isNew" class="badge new">Mới</span>
              <span v-if="car.discount" class="badge discount">-{{ car.discount }}%</span>
            </div>
            <div class="car-info">
              <h3>{{ car.name }}</h3>
              <p class="car-brand">{{ car.brand }}</p>
              <div class="car-specs">
                <span>{{ car.year }}</span>
                <span>{{ car.fuel }}</span>
                <span>{{ car.transmission }}</span>
              </div>
              <div class="car-price">
                <span class="price">{{ formatPrice(car.price) }}</span>
                <span v-if="car.oldPrice" class="old-price">{{ formatPrice(car.oldPrice) }}</span>
              </div>
              <router-link :to="`/products/${car.id}`" class="btn btn-sm">Xem chi tiết</router-link>
            </div>
          </div>
        </div>
        <div class="view-all">
          <router-link to="/products" class="btn btn-outline">Xem tất cả xe</router-link>
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">Dịch vụ của chúng tôi</h2>
        <div class="services-grid">
          <div v-for="service in services" :key="service.id" class="service-card">
            <div class="service-icon">{{ service.icon }}</div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
        <div class="view-all">
          <router-link to="/services" class="btn btn-primary">Tìm hiểu thêm</router-link>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Tại sao chọn CarShop?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">✅</div>
            <h3>Chất lượng đảm bảo</h3>
            <p>Tất cả xe đều được kiểm định kỹ lưỡng trước khi bán</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <h3>Giá cả cạnh tranh</h3>
            <p>Cam kết giá tốt nhất thị trường</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔧</div>
            <h3>Bảo hành toàn diện</h3>
            <p>Chế độ bảo hành lên đến 3 năm</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🚚</div>
            <h3>Giao xe tận nơi</h3>
            <p>Miễn phí giao xe toàn quốc</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2>Sẵn sàng sở hữu xe mơ ước?</h2>
        <p>Liên hệ ngay với chúng tôi để được tư vấn miễn phí</p>
        <router-link to="/contact" class="btn btn-primary btn-lg">Liên hệ ngay</router-link>
      </div>
    </section>
  </UserLayout>
</template>

<script setup>
import { ref } from 'vue'
import UserLayout from '../../layouts/UserLayout.vue'

const featuredCars = ref([
  {
    id: 1,
    name: 'Mercedes-Benz C300',
    brand: 'Mercedes-Benz',
    emoji: '🚗',
    year: 2024,
    fuel: 'Xăng',
    transmission: 'Tự động',
    price: 1950000000,
    oldPrice: 2100000000,
    isNew: true,
    discount: 7
  },
  {
    id: 2,
    name: 'BMW X5 xDrive40i',
    brand: 'BMW',
    emoji: '🚙',
    year: 2024,
    fuel: 'Xăng',
    transmission: 'Tự động',
    price: 4150000000,
    isNew: true
  },
  {
    id: 3,
    name: 'Toyota Camry 2.5Q',
    brand: 'Toyota',
    emoji: '🚘',
    year: 2024,
    fuel: 'Xăng',
    transmission: 'Tự động',
    price: 1405000000
  },
  {
    id: 4,
    name: 'Honda CR-V',
    brand: 'Honda',
    emoji: '🚐',
    year: 2024,
    fuel: 'Xăng',
    transmission: 'Tự động',
    price: 1130000000,
    discount: 5
  }
])

const services = ref([
  {
    id: 1,
    icon: '🛠️',
    title: 'Bảo dưỡng định kỳ',
    description: 'Dịch vụ bảo dưỡng chuyên nghiệp với thiết bị hiện đại'
  },
  {
    id: 2,
    icon: '💳',
    title: 'Hỗ trợ trả góp',
    description: 'Lãi suất ưu đãi với nhiều ngân hàng đối tác'
  },
  {
    id: 3,
    icon: '📋',
    title: 'Đăng ký biển số',
    description: 'Hỗ trợ đăng ký biển số xe nhanh chóng'
  },
  {
    id: 4,
    icon: '🛡️',
    title: 'Bảo hiểm xe',
    description: 'Tư vấn và cung cấp các gói bảo hiểm phù hợp'
  }
])

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 5rem 2rem;
  text-align: center;
  color: #fff;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fff;
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #ccc;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.section {
  padding: 4rem 1rem;
}

.section-dark {
  background: #1a1a2e;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #1a1a2e;
}

.section-title.light {
  color: #fff;
}

.cars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.car-card {
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.car-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.car-image {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.car-emoji {
  font-size: 5rem;
}

.badge {
  position: absolute;
  top: 10px;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
}

.badge.new {
  right: 10px;
  background: #4caf50;
  color: #fff;
}

.badge.discount {
  left: 10px;
  background: #e94560;
  color: #fff;
}

.car-info {
  padding: 1.5rem;
}

.car-info h3 {
  margin: 0 0 0.5rem 0;
  color: #1a1a2e;
  font-size: 1.1rem;
}

.car-brand {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.car-specs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.car-specs span {
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  font-size: 0.75rem;
  color: #666;
}

.car-price {
  margin-bottom: 1rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #e94560;
}

.old-price {
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
  margin-left: 0.5rem;
}

.view-all {
  text-align: center;
  margin-top: 2rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.service-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}

.service-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  color: #fff;
  margin-bottom: 0.75rem;
}

.service-card p {
  color: #ccc;
  font-size: 0.95rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #1a1a2e;
  margin-bottom: 0.75rem;
}

.feature-card p {
  color: #666;
}

.cta-section {
  background: linear-gradient(135deg, #e94560 0%, #ff6b6b 100%);
  padding: 4rem 2rem;
  text-align: center;
  color: #fff;
}

.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: #e94560;
  color: #fff;
}

.btn-primary:hover {
  background: #ff6b6b;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  border: 2px solid #e94560;
  color: #e94560;
}

.btn-outline:hover {
  background: #e94560;
  color: #fff;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background: #1a1a2e;
  color: #fff;
}

.btn-sm:hover {
  background: #e94560;
}

.btn-lg {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style>
