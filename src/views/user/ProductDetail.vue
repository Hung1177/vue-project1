<template>
  <UserLayout>
    <div class="product-detail-page">
      <div class="container">
        <nav class="breadcrumb">
          <router-link to="/">Trang chủ</router-link>
          <span>/</span>
          <router-link to="/products">Sản phẩm</router-link>
          <span>/</span>
          <span>{{ car.name }}</span>
        </nav>

        <div class="product-layout">
          <!-- Image Gallery -->
          <div class="product-gallery">
            <div class="main-image">
              <span class="car-emoji">{{ car.emoji }}</span>
              <span v-if="car.isNew" class="badge new">Mới</span>
              <span v-if="car.discount" class="badge discount">-{{ car.discount }}%</span>
            </div>
            <div class="thumbnail-list">
              <div class="thumbnail active">{{ car.emoji }}</div>
              <div class="thumbnail">{{ car.emoji }}</div>
              <div class="thumbnail">{{ car.emoji }}</div>
              <div class="thumbnail">{{ car.emoji }}</div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-info">
            <span class="product-brand">{{ car.brand }}</span>
            <h1>{{ car.name }}</h1>
            
            <div class="product-price">
              <span class="current-price">{{ formatPrice(car.price) }}</span>
              <span v-if="car.oldPrice" class="old-price">{{ formatPrice(car.oldPrice) }}</span>
            </div>

            <div class="product-specs">
              <div class="spec-item">
                <span class="spec-label">Năm sản xuất</span>
                <span class="spec-value">{{ car.year }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Nhiên liệu</span>
                <span class="spec-value">{{ car.fuel }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Hộp số</span>
                <span class="spec-value">{{ car.transmission }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Số chỗ ngồi</span>
                <span class="spec-value">{{ car.seats }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Động cơ</span>
                <span class="spec-value">{{ car.engine }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Màu sắc</span>
                <span class="spec-value">{{ car.color }}</span>
              </div>
            </div>

            <div class="product-actions">
              <button class="btn btn-primary btn-lg">
                📞 Liên hệ tư vấn
              </button>
              <button class="btn btn-outline btn-lg">
                🚗 Đặt lịch lái thử
              </button>
            </div>

            <div class="product-services">
              <div class="service-item">
                <span class="icon">✅</span>
                <span>Bảo hành 3 năm</span>
              </div>
              <div class="service-item">
                <span class="icon">🚚</span>
                <span>Giao xe miễn phí</span>
              </div>
              <div class="service-item">
                <span class="icon">💳</span>
                <span>Hỗ trợ trả góp 0%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Description Section -->
        <div class="product-description">
          <h2>Mô tả sản phẩm</h2>
          <div class="description-content">
            <p>{{ car.description }}</p>
            <h3>Tính năng nổi bật:</h3>
            <ul>
              <li v-for="feature in car.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
        </div>

        <!-- Related Products -->
        <div class="related-products">
          <h2>Xe liên quan</h2>
          <div class="related-grid">
            <div v-for="relatedCar in relatedCars" :key="relatedCar.id" class="car-card">
              <div class="car-image">
                <span class="car-emoji">{{ relatedCar.emoji }}</span>
              </div>
              <div class="car-info">
                <h3>{{ relatedCar.name }}</h3>
                <p class="car-brand">{{ relatedCar.brand }}</p>
                <div class="car-price">
                  <span class="price">{{ formatPrice(relatedCar.price) }}</span>
                </div>
                <router-link :to="`/products/${relatedCar.id}`" class="btn btn-sm">Xem chi tiết</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import UserLayout from '../../layouts/UserLayout.vue'

const route = useRoute()

const allCars = ref([
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
    discount: 7,
    seats: 5,
    engine: '2.0L Turbo',
    color: 'Đen Obsidian',
    description: 'Mercedes-Benz C300 2024 là mẫu sedan hạng sang với thiết kế sang trọng, nội thất cao cấp và động cơ mạnh mẽ. Xe được trang bị nhiều công nghệ hiện đại giúp nâng cao trải nghiệm lái xe.',
    features: [
      'Hệ thống lái tự động cấp độ 2',
      'Màn hình MBUX 12.3 inch',
      'Ghế da Artico cao cấp',
      'Hệ thống âm thanh Burmester',
      'Đèn LED thông minh',
      'Cửa sổ trời toàn cảnh'
    ]
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
    isNew: true,
    seats: 7,
    engine: '3.0L Turbo',
    color: 'Trắng Alpine',
    description: 'BMW X5 xDrive40i là mẫu SUV cao cấp với khả năng vận hành mạnh mẽ và không gian rộng rãi. Được trang bị công nghệ tiên tiến nhất của BMW.',
    features: [
      'Hệ thống xDrive thông minh',
      'BMW Live Cockpit Professional',
      'Ghế Vernasca leather',
      'Hệ thống Harman Kardon',
      'Đèn Laserlight',
      'Panorama sunroof'
    ]
  },
  {
    id: 3,
    name: 'Toyota Camry 2.5Q',
    brand: 'Toyota',
    emoji: '🚘',
    year: 2024,
    fuel: 'Xăng',
    transmission: 'Tự động',
    price: 1405000000,
    seats: 5,
    engine: '2.5L',
    color: 'Trắng Ngọc Trai',
    description: 'Toyota Camry 2.5Q là mẫu sedan hạng D bán chạy nhất với độ tin cậy cao và chi phí vận hành thấp.',
    features: [
      'Toyota Safety Sense',
      'Màn hình 9 inch',
      'Ghế da cao cấp',
      'JBL premium audio',
      'Head-up display',
      'Wireless charging'
    ]
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
    discount: 5,
    seats: 7,
    engine: '1.5L Turbo',
    color: 'Đỏ Crystal',
    description: 'Honda CR-V là mẫu SUV đa dụng với thiết kế hiện đại và không gian cabin rộng rãi.',
    features: [
      'Honda Sensing',
      'Màn hình 7 inch',
      'Ghế da chỉnh điện',
      'Hệ thống âm thanh 8 loa',
      'Cửa sổ trời',
      'Khởi động từ xa'
    ]
  }
])

const car = computed(() => {
  const id = parseInt(route.params.id)
  return allCars.value.find(c => c.id === id) || allCars.value[0]
})

const relatedCars = computed(() => {
  return allCars.value.filter(c => c.id !== car.value.id).slice(0, 3)
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}
</script>

<style scoped>
.product-detail-page {
  padding: 2rem 1rem;
  background: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: #666;
  text-decoration: none;
}

.breadcrumb a:hover {
  color: #e94560;
}

.breadcrumb span {
  color: #999;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
}

.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  border-radius: 15px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.main-image .car-emoji {
  font-size: 10rem;
}

.badge {
  position: absolute;
  top: 15px;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: bold;
}

.badge.new {
  right: 15px;
  background: #4caf50;
  color: #fff;
}

.badge.discount {
  left: 15px;
  background: #e94560;
  color: #fff;
}

.thumbnail-list {
  display: flex;
  gap: 1rem;
}

.thumbnail {
  width: 80px;
  height: 80px;
  background: #f5f5f5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.thumbnail.active,
.thumbnail:hover {
  border-color: #e94560;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-brand {
  color: #888;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-info h1 {
  margin: 0;
  color: #1a1a2e;
  font-size: 2rem;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.current-price {
  font-size: 2rem;
  font-weight: bold;
  color: #e94560;
}

.old-price {
  font-size: 1.25rem;
  color: #999;
  text-decoration: line-through;
}

.product-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 15px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.spec-label {
  font-size: 0.85rem;
  color: #888;
}

.spec-value {
  font-weight: 600;
  color: #1a1a2e;
}

.product-actions {
  display: flex;
  gap: 1rem;
}

.product-services {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: #f0fff4;
  border-radius: 10px;
}

.service-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #2e7d32;
}

.service-item .icon {
  font-size: 1.25rem;
}

.product-description {
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
}

.product-description h2 {
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.description-content p {
  color: #555;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.description-content h3 {
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.description-content ul {
  list-style: none;
  padding: 0;
}

.description-content li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: #555;
}

.description-content li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4caf50;
}

.related-products {
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
}

.related-products h2 {
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.car-card {
  background: #f9f9f9;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s;
}

.car-card:hover {
  transform: translateY(-5px);
}

.car-card .car-image {
  background: linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%);
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.car-card .car-emoji {
  font-size: 4rem;
}

.car-card .car-info {
  padding: 1.25rem;
}

.car-card h3 {
  margin: 0 0 0.5rem 0;
  color: #1a1a2e;
  font-size: 1rem;
}

.car-card .car-brand {
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}

.car-card .car-price {
  margin-bottom: 1rem;
}

.car-card .price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #e94560;
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  cursor: pointer;
  border: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background: #e94560;
  color: #fff;
}

.btn-primary:hover {
  background: #ff6b6b;
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

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1rem;
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

@media (max-width: 900px) {
  .product-layout {
    grid-template-columns: 1fr;
  }
  
  .main-image {
    height: 300px;
  }
  
  .main-image .car-emoji {
    font-size: 7rem;
  }
  
  .product-actions {
    flex-direction: column;
  }
}
</style>
