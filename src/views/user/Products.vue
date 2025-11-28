<template>
  <UserLayout>
    <div class="products-page">
      <div class="container">
        <div class="page-header">
          <h1>Danh sách xe</h1>
          <p>Khám phá các dòng xe chất lượng tại CarShop</p>
        </div>

        <div class="products-layout">
          <!-- Filters Sidebar -->
          <aside class="filters-sidebar">
            <div class="filter-section">
              <h3>Tìm kiếm</h3>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm xe..."
                class="search-input"
              />
            </div>

            <div class="filter-section">
              <h3>Hãng xe</h3>
              <div class="filter-options">
                <label v-for="brand in brands" :key="brand" class="filter-option">
                  <input
                    type="checkbox"
                    :value="brand"
                    v-model="selectedBrands"
                  />
                  {{ brand }}
                </label>
              </div>
            </div>

            <div class="filter-section">
              <h3>Khoảng giá</h3>
              <div class="price-range">
                <select v-model="priceRange" class="select-input">
                  <option value="">Tất cả</option>
                  <option value="0-500">Dưới 500 triệu</option>
                  <option value="500-1000">500 - 1 tỷ</option>
                  <option value="1000-2000">1 - 2 tỷ</option>
                  <option value="2000-5000">2 - 5 tỷ</option>
                  <option value="5000+">Trên 5 tỷ</option>
                </select>
              </div>
            </div>

            <div class="filter-section">
              <h3>Nhiên liệu</h3>
              <div class="filter-options">
                <label v-for="fuel in fuelTypes" :key="fuel" class="filter-option">
                  <input
                    type="checkbox"
                    :value="fuel"
                    v-model="selectedFuels"
                  />
                  {{ fuel }}
                </label>
              </div>
            </div>

            <button @click="clearFilters" class="btn btn-outline btn-full">
              Xóa bộ lọc
            </button>
          </aside>

          <!-- Products Grid -->
          <div class="products-main">
            <div class="products-toolbar">
              <span class="results-count">Tìm thấy {{ filteredCars.length }} xe</span>
              <select v-model="sortBy" class="select-input">
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="year-desc">Năm: Mới nhất</option>
              </select>
            </div>

            <div class="products-grid">
              <div v-for="car in filteredCars" :key="car.id" class="car-card">
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
                  <router-link :to="`/products/${car.id}`" class="btn btn-primary btn-full">
                    Xem chi tiết
                  </router-link>
                </div>
              </div>
            </div>

            <div v-if="filteredCars.length === 0" class="no-results">
              <p>Không tìm thấy xe phù hợp</p>
              <button @click="clearFilters" class="btn btn-primary">Xóa bộ lọc</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import UserLayout from '../../layouts/UserLayout.vue'

const searchQuery = ref('')
const selectedBrands = ref([])
const selectedFuels = ref([])
const priceRange = ref('')
const sortBy = ref('default')

const brands = ['Mercedes-Benz', 'BMW', 'Toyota', 'Honda', 'Mazda', 'Hyundai', 'Kia', 'Ford']
const fuelTypes = ['Xăng', 'Dầu', 'Điện', 'Hybrid']

const cars = ref([
  { id: 1, name: 'Mercedes-Benz C300', brand: 'Mercedes-Benz', emoji: '🚗', year: 2024, fuel: 'Xăng', transmission: 'Tự động', price: 1950000000, oldPrice: 2100000000, isNew: true, discount: 7 },
  { id: 2, name: 'BMW X5 xDrive40i', brand: 'BMW', emoji: '🚙', year: 2024, fuel: 'Xăng', transmission: 'Tự động', price: 4150000000, isNew: true },
  { id: 3, name: 'Toyota Camry 2.5Q', brand: 'Toyota', emoji: '🚘', year: 2024, fuel: 'Xăng', transmission: 'Tự động', price: 1405000000 },
  { id: 4, name: 'Honda CR-V', brand: 'Honda', emoji: '🚐', year: 2024, fuel: 'Xăng', transmission: 'Tự động', price: 1130000000, discount: 5 },
  { id: 5, name: 'Mazda CX-5', brand: 'Mazda', emoji: '🚙', year: 2024, fuel: 'Xăng', transmission: 'Tự động', price: 899000000 },
  { id: 6, name: 'Hyundai Tucson', brand: 'Hyundai', emoji: '🚐', year: 2024, fuel: 'Dầu', transmission: 'Tự động', price: 1030000000, isNew: true },
  { id: 7, name: 'Kia Sportage', brand: 'Kia', emoji: '🚙', year: 2024, fuel: 'Xăng', transmission: 'Tự động', price: 899000000 },
  { id: 8, name: 'Ford Explorer', brand: 'Ford', emoji: '🚙', year: 2024, fuel: 'Xăng', transmission: 'Tự động', price: 2399000000 },
  { id: 9, name: 'Mercedes-Benz GLC 300', brand: 'Mercedes-Benz', emoji: '🚙', year: 2024, fuel: 'Xăng', transmission: 'Tự động', price: 2499000000 },
  { id: 10, name: 'BMW 320i', brand: 'BMW', emoji: '🚗', year: 2024, fuel: 'Xăng', transmission: 'Tự động', price: 1869000000 },
  { id: 11, name: 'Toyota Fortuner', brand: 'Toyota', emoji: '🚙', year: 2024, fuel: 'Dầu', transmission: 'Tự động', price: 1426000000 },
  { id: 12, name: 'Honda City', brand: 'Honda', emoji: '🚗', year: 2024, fuel: 'Xăng', transmission: 'Tự động', price: 599000000 }
])

const filteredCars = computed(() => {
  let result = [...cars.value]
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(car => 
      car.name.toLowerCase().includes(query) ||
      car.brand.toLowerCase().includes(query)
    )
  }
  
  // Brand filter
  if (selectedBrands.value.length > 0) {
    result = result.filter(car => selectedBrands.value.includes(car.brand))
  }
  
  // Fuel filter
  if (selectedFuels.value.length > 0) {
    result = result.filter(car => selectedFuels.value.includes(car.fuel))
  }
  
  // Price filter
  if (priceRange.value) {
    const [min, max] = priceRange.value.split('-').map(v => v === '+' ? Infinity : parseFloat(v) * 1000000)
    result = result.filter(car => {
      if (max === Infinity) return car.price >= min
      return car.price >= min && car.price <= max
    })
  }
  
  // Sorting
  if (sortBy.value === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'year-desc') {
    result.sort((a, b) => b.year - a.year)
  }
  
  return result
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedBrands.value = []
  selectedFuels.value = []
  priceRange.value = ''
  sortBy.value = 'default'
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}
</script>

<style scoped>
.products-page {
  padding: 2rem 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #666;
}

.products-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
}

.filters-sidebar {
  background: #fff;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.filter-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.filter-section:last-of-type {
  border-bottom: none;
  margin-bottom: 1rem;
}

.filter-section h3 {
  color: #1a1a2e;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.search-input,
.select-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.3s;
}

.search-input:focus,
.select-input:focus {
  outline: none;
  border-color: #e94560;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #555;
  font-size: 0.9rem;
}

.filter-option input {
  accent-color: #e94560;
}

.products-main {
  min-width: 0;
}

.products-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
}

.results-count {
  color: #666;
}

.products-toolbar .select-input {
  width: auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.car-card {
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.car-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.car-image {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.car-emoji {
  font-size: 4rem;
}

.badge {
  position: absolute;
  top: 10px;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
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
  padding: 1.25rem;
}

.car-info h3 {
  margin: 0 0 0.5rem 0;
  color: #1a1a2e;
  font-size: 1rem;
}

.car-brand {
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}

.car-specs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.car-specs span {
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  font-size: 0.7rem;
  color: #666;
}

.car-price {
  margin-bottom: 1rem;
}

.price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #e94560;
}

.old-price {
  font-size: 0.85rem;
  color: #999;
  text-decoration: line-through;
  margin-left: 0.5rem;
}

.no-results {
  text-align: center;
  padding: 3rem;
  background: #fff;
  border-radius: 15px;
}

.no-results p {
  color: #666;
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  cursor: pointer;
  border: none;
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

.btn-full {
  width: 100%;
  display: block;
}

@media (max-width: 900px) {
  .products-layout {
    grid-template-columns: 1fr;
  }
  
  .filters-sidebar {
    position: static;
  }
}
</style>
