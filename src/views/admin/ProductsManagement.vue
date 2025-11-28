<template>
  <AdminLayout>
    <div class="products-management">
      <!-- Header Actions -->
      <div class="page-actions">
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Tìm kiếm sản phẩm..."
            class="search-input"
          />
        </div>
        <div class="action-buttons">
          <select v-model="filterBrand" class="select-input">
            <option value="">Tất cả hãng</option>
            <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
          </select>
          <button class="btn btn-primary" @click="openAddModal">
            + Thêm sản phẩm
          </button>
        </div>
      </div>

      <!-- Products Table -->
      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Hãng</th>
              <th>Năm SX</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredProducts" :key="product.id">
              <td>
                <div class="product-cell">
                  <span class="product-emoji">{{ product.emoji }}</span>
                  <div class="product-info">
                    <span class="product-name">{{ product.name }}</span>
                    <span class="product-id">#{{ product.id }}</span>
                  </div>
                </div>
              </td>
              <td>{{ product.brand }}</td>
              <td>{{ product.year }}</td>
              <td class="price-cell">{{ formatPrice(product.price) }}</td>
              <td>
                <span :class="['status-badge', product.status]">
                  {{ getStatusText(product.status) }}
                </span>
              </td>
              <td>
                <div class="action-cell">
                  <button class="btn-icon" @click="viewProduct(product)" title="Xem">👁</button>
                  <button class="btn-icon" @click="editProduct(product)" title="Sửa">✏️</button>
                  <button class="btn-icon danger" @click="confirmDelete(product)" title="Xóa">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredProducts.length === 0" class="empty-state">
          <p>Không tìm thấy sản phẩm nào</p>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button class="btn-page" :disabled="currentPage === 1" @click="currentPage--">
          ← Trước
        </button>
        <span class="page-info">Trang {{ currentPage }} / {{ totalPages }}</span>
        <button class="btn-page" :disabled="currentPage === totalPages" @click="currentPage++">
          Sau →
        </button>
      </div>

      <!-- Add/Edit Modal -->
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <div class="modal-header">
            <h2>{{ isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới' }}</h2>
            <button class="btn-close" @click="closeModal">×</button>
          </div>
          <form @submit.prevent="saveProduct" class="modal-form">
            <div class="form-row">
              <div class="form-group">
                <label>Tên sản phẩm *</label>
                <input v-model="formData.name" type="text" required />
              </div>
              <div class="form-group">
                <label>Hãng xe *</label>
                <select v-model="formData.brand" required>
                  <option value="">Chọn hãng</option>
                  <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Năm sản xuất *</label>
                <input v-model="formData.year" type="number" min="2000" max="2025" required />
              </div>
              <div class="form-group">
                <label>Giá (VND) *</label>
                <input v-model="formData.price" type="number" min="0" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Nhiên liệu</label>
                <select v-model="formData.fuel">
                  <option value="Xăng">Xăng</option>
                  <option value="Dầu">Dầu</option>
                  <option value="Điện">Điện</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div class="form-group">
                <label>Trạng thái</label>
                <select v-model="formData.status">
                  <option value="available">Còn hàng</option>
                  <option value="sold">Đã bán</option>
                  <option value="reserved">Đã đặt</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Mô tả</label>
              <textarea v-model="formData.description" rows="4"></textarea>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-outline" @click="closeModal">Hủy</button>
              <button type="submit" class="btn btn-primary">
                {{ isEditing ? 'Cập nhật' : 'Thêm mới' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
        <div class="modal modal-small">
          <div class="modal-header">
            <h2>Xác nhận xóa</h2>
          </div>
          <div class="modal-body">
            <p>Bạn có chắc chắn muốn xóa sản phẩm <strong>{{ productToDelete?.name }}</strong>?</p>
            <p class="warning-text">Hành động này không thể hoàn tác.</p>
          </div>
          <div class="modal-actions">
            <button class="btn btn-outline" @click="showDeleteModal = false">Hủy</button>
            <button class="btn btn-danger" @click="deleteProduct">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import AdminLayout from '../../layouts/AdminLayout.vue'

const searchQuery = ref('')
const filterBrand = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const productToDelete = ref(null)

const brands = ['Mercedes-Benz', 'BMW', 'Toyota', 'Honda', 'Mazda', 'Hyundai', 'Kia', 'Ford']

const formData = reactive({
  id: null,
  name: '',
  brand: '',
  year: 2024,
  price: 0,
  fuel: 'Xăng',
  status: 'available',
  description: '',
  emoji: '🚗'
})

const products = ref([
  { id: 1, name: 'Mercedes-Benz C300', brand: 'Mercedes-Benz', emoji: '🚗', year: 2024, price: 1950000000, fuel: 'Xăng', status: 'available', description: '' },
  { id: 2, name: 'BMW X5 xDrive40i', brand: 'BMW', emoji: '🚙', year: 2024, price: 4150000000, fuel: 'Xăng', status: 'available', description: '' },
  { id: 3, name: 'Toyota Camry 2.5Q', brand: 'Toyota', emoji: '🚘', year: 2024, price: 1405000000, fuel: 'Xăng', status: 'sold', description: '' },
  { id: 4, name: 'Honda CR-V', brand: 'Honda', emoji: '🚐', year: 2024, price: 1130000000, fuel: 'Xăng', status: 'available', description: '' },
  { id: 5, name: 'Mazda CX-5', brand: 'Mazda', emoji: '🚙', year: 2024, price: 899000000, fuel: 'Xăng', status: 'reserved', description: '' },
  { id: 6, name: 'Hyundai Tucson', brand: 'Hyundai', emoji: '🚐', year: 2024, price: 1030000000, fuel: 'Dầu', status: 'available', description: '' },
  { id: 7, name: 'Kia Sportage', brand: 'Kia', emoji: '🚙', year: 2024, price: 899000000, fuel: 'Xăng', status: 'available', description: '' },
  { id: 8, name: 'Ford Explorer', brand: 'Ford', emoji: '🚙', year: 2024, price: 2399000000, fuel: 'Xăng', status: 'sold', description: '' },
  { id: 9, name: 'Mercedes-Benz GLC 300', brand: 'Mercedes-Benz', emoji: '🚙', year: 2024, price: 2499000000, fuel: 'Xăng', status: 'available', description: '' },
  { id: 10, name: 'BMW 320i', brand: 'BMW', emoji: '🚗', year: 2024, price: 1869000000, fuel: 'Xăng', status: 'available', description: '' }
])

const filteredProducts = computed(() => {
  let result = [...products.value]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query)
    )
  }
  
  if (filterBrand.value) {
    result = result.filter(p => p.brand === filterBrand.value)
  }
  
  return result
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const getStatusText = (status) => {
  const texts = {
    available: 'Còn hàng',
    sold: 'Đã bán',
    reserved: 'Đã đặt'
  }
  return texts[status] || status
}

const openAddModal = () => {
  isEditing.value = false
  Object.assign(formData, {
    id: null,
    name: '',
    brand: '',
    year: 2024,
    price: 0,
    fuel: 'Xăng',
    status: 'available',
    description: '',
    emoji: '🚗'
  })
  showModal.value = true
}

const editProduct = (product) => {
  isEditing.value = true
  Object.assign(formData, { ...product })
  showModal.value = true
}

const viewProduct = (product) => {
  editProduct(product)
}

const closeModal = () => {
  showModal.value = false
}

const saveProduct = () => {
  if (isEditing.value) {
    const index = products.value.findIndex(p => p.id === formData.id)
    if (index > -1) {
      products.value[index] = { ...formData }
    }
  } else {
    const newId = Math.max(...products.value.map(p => p.id)) + 1
    products.value.push({ ...formData, id: newId })
  }
  closeModal()
}

const confirmDelete = (product) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const deleteProduct = () => {
  const index = products.value.findIndex(p => p.id === productToDelete.value.id)
  if (index > -1) {
    products.value.splice(index, 1)
  }
  showDeleteModal.value = false
  productToDelete.value = null
}
</script>

<style scoped>
.products-management {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-box {
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
}

.search-input:focus {
  outline: none;
  border-color: #e94560;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.select-input {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
  cursor: pointer;
}

.table-card {
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.data-table th {
  background: #f9f9f9;
  font-weight: 600;
  color: #1a1a2e;
  font-size: 0.9rem;
}

.data-table tr:hover {
  background: #fafafa;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.product-emoji {
  font-size: 2rem;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-weight: 500;
  color: #1a1a2e;
}

.product-id {
  font-size: 0.8rem;
  color: #888;
}

.price-cell {
  font-weight: 600;
  color: #e94560;
}

.status-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.available { background: #e8f5e9; color: #2e7d32; }
.status-badge.sold { background: #ffebee; color: #c62828; }
.status-badge.reserved { background: #fff3e0; color: #e65100; }

.action-cell {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  width: 36px;
  height: 36px;
  border: none;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.btn-icon:hover {
  background: #e0e0e0;
}

.btn-icon.danger:hover {
  background: #ffebee;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: #888;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.btn-page {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-page:not(:disabled):hover {
  background: #f5f5f5;
}

.page-info {
  color: #666;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-small {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h2 {
  margin: 0;
  color: #1a1a2e;
  font-size: 1.25rem;
}

.btn-close {
  width: 36px;
  height: 36px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close:hover {
  background: #e0e0e0;
}

.modal-form {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  color: #555;
  margin: 0.5rem 0;
}

.warning-text {
  color: #c62828 !important;
  font-size: 0.9rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #e94560;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #f0f0f0;
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

.btn-outline {
  background: transparent;
  border: 2px solid #ddd;
  color: #666;
}

.btn-outline:hover {
  border-color: #e94560;
  color: #e94560;
}

.btn-danger {
  background: #c62828;
  color: #fff;
}

.btn-danger:hover {
  background: #b71c1c;
}

@media (max-width: 768px) {
  .page-actions {
    flex-direction: column;
  }
  
  .search-box {
    max-width: 100%;
  }
  
  .action-buttons {
    width: 100%;
    flex-wrap: wrap;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .data-table {
    font-size: 0.85rem;
  }
}
</style>
