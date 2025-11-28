<template>
  <AdminLayout>
    <div class="news-management">
      <!-- Header Actions -->
      <div class="page-actions">
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Tìm kiếm tin tức..."
            class="search-input"
          />
        </div>
        <div class="action-buttons">
          <select v-model="filterCategory" class="select-input">
            <option value="">Tất cả danh mục</option>
            <option v-for="cat in categories" :key="cat.value" :value="cat.value">
              {{ cat.label }}
            </option>
          </select>
          <button class="btn btn-primary" @click="openAddModal">
            + Thêm tin tức
          </button>
        </div>
      </div>

      <!-- News Grid -->
      <div class="news-grid">
        <div v-for="news in filteredNews" :key="news.id" class="news-card">
          <div class="news-image">
            <span class="news-emoji">{{ news.emoji }}</span>
            <span :class="['category-badge', news.category]">{{ getCategoryLabel(news.category) }}</span>
          </div>
          <div class="news-content">
            <h3>{{ news.title }}</h3>
            <p class="news-excerpt">{{ news.excerpt }}</p>
            <div class="news-meta">
              <span class="news-date">📅 {{ formatDate(news.date) }}</span>
              <span class="news-views">👁 {{ news.views }}</span>
            </div>
            <div class="news-status">
              <span :class="['status-badge', news.status]">
                {{ getStatusText(news.status) }}
              </span>
            </div>
            <div class="news-actions">
              <button class="btn-icon" @click="editNews(news)" title="Sửa">✏️</button>
              <button class="btn-icon" @click="togglePublish(news)" :title="news.status === 'published' ? 'Ẩn' : 'Đăng'">
                {{ news.status === 'published' ? '📤' : '📥' }}
              </button>
              <button class="btn-icon danger" @click="confirmDelete(news)" title="Xóa">🗑️</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredNews.length === 0" class="empty-state">
        <p>Không có tin tức nào</p>
      </div>

      <!-- Add/Edit Modal -->
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal modal-large">
          <div class="modal-header">
            <h2>{{ isEditing ? 'Chỉnh sửa tin tức' : 'Thêm tin tức mới' }}</h2>
            <button class="btn-close" @click="closeModal">×</button>
          </div>
          <form @submit.prevent="saveNews" class="modal-form">
            <div class="form-group">
              <label>Tiêu đề *</label>
              <input v-model="formData.title" type="text" required />
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>Danh mục *</label>
                <select v-model="formData.category" required>
                  <option value="">Chọn danh mục</option>
                  <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                    {{ cat.label }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>Trạng thái</label>
                <select v-model="formData.status">
                  <option value="draft">Bản nháp</option>
                  <option value="published">Đã đăng</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Mô tả ngắn</label>
              <textarea v-model="formData.excerpt" rows="2"></textarea>
            </div>

            <div class="form-group">
              <label>Nội dung *</label>
              <textarea v-model="formData.content" rows="10" required></textarea>
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
            <p>Bạn có chắc chắn muốn xóa tin tức <strong>"{{ newsToDelete?.title }}"</strong>?</p>
            <p class="warning-text">Hành động này không thể hoàn tác.</p>
          </div>
          <div class="modal-actions">
            <button class="btn btn-outline" @click="showDeleteModal = false">Hủy</button>
            <button class="btn btn-danger" @click="deleteNews">Xóa</button>
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
const filterCategory = ref('')
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const newsToDelete = ref(null)

const categories = [
  { value: 'promotion', label: 'Khuyến mãi' },
  { value: 'news', label: 'Tin tức' },
  { value: 'review', label: 'Đánh giá xe' },
  { value: 'tips', label: 'Mẹo hay' }
]

const formData = reactive({
  id: null,
  title: '',
  category: '',
  excerpt: '',
  content: '',
  status: 'draft',
  emoji: '📰'
})

const newsList = ref([
  {
    id: 1,
    title: 'Khuyến mãi cuối năm - Giảm đến 200 triệu',
    category: 'promotion',
    emoji: '🎉',
    excerpt: 'Chương trình khuyến mãi đặc biệt cuối năm với ưu đãi giảm giá lên đến 200 triệu đồng.',
    content: 'Nội dung chi tiết về chương trình khuyến mãi...',
    date: '2024-12-01',
    views: 1250,
    status: 'published'
  },
  {
    id: 2,
    title: 'Mercedes-Benz ra mắt C-Class 2025',
    category: 'news',
    emoji: '🚗',
    excerpt: 'Mercedes-Benz chính thức giới thiệu phiên bản C-Class mới với nhiều cải tiến đáng kể.',
    content: 'Nội dung chi tiết về Mercedes-Benz C-Class 2025...',
    date: '2024-11-28',
    views: 980,
    status: 'published'
  },
  {
    id: 3,
    title: 'So sánh Toyota Camry vs Honda Accord 2024',
    category: 'review',
    emoji: '⚖️',
    excerpt: 'Đánh giá chi tiết và so sánh hai mẫu sedan hạng D bán chạy nhất thị trường.',
    content: 'Nội dung chi tiết so sánh...',
    date: '2024-11-25',
    views: 856,
    status: 'published'
  },
  {
    id: 4,
    title: '10 mẹo bảo dưỡng xe mùa đông',
    category: 'tips',
    emoji: '❄️',
    excerpt: 'Những lưu ý quan trọng để bảo vệ xe của bạn trong mùa đông.',
    content: 'Nội dung chi tiết về mẹo bảo dưỡng...',
    date: '2024-11-20',
    views: 742,
    status: 'published'
  },
  {
    id: 5,
    title: 'Flash Sale tháng 12 - Giảm 50% phí dịch vụ',
    category: 'promotion',
    emoji: '⚡',
    excerpt: 'Chương trình Flash Sale với ưu đãi giảm 50% phí dịch vụ bảo dưỡng.',
    content: 'Nội dung chi tiết về Flash Sale...',
    date: '2024-12-05',
    views: 320,
    status: 'draft'
  }
])

const filteredNews = computed(() => {
  let result = [...newsList.value]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(n => 
      n.title.toLowerCase().includes(query) ||
      n.excerpt.toLowerCase().includes(query)
    )
  }
  
  if (filterCategory.value) {
    result = result.filter(n => n.category === filterCategory.value)
  }
  
  return result.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getCategoryLabel = (category) => {
  const cat = categories.find(c => c.value === category)
  return cat ? cat.label : category
}

const getStatusText = (status) => {
  return status === 'published' ? 'Đã đăng' : 'Bản nháp'
}

const openAddModal = () => {
  isEditing.value = false
  Object.assign(formData, {
    id: null,
    title: '',
    category: '',
    excerpt: '',
    content: '',
    status: 'draft',
    emoji: '📰'
  })
  showModal.value = true
}

const editNews = (news) => {
  isEditing.value = true
  Object.assign(formData, { ...news })
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveNews = () => {
  if (isEditing.value) {
    const index = newsList.value.findIndex(n => n.id === formData.id)
    if (index > -1) {
      newsList.value[index] = { ...formData, date: new Date().toISOString().split('T')[0] }
    }
  } else {
    const newId = Math.max(...newsList.value.map(n => n.id)) + 1
    newsList.value.push({
      ...formData,
      id: newId,
      date: new Date().toISOString().split('T')[0],
      views: 0
    })
  }
  closeModal()
}

const togglePublish = (news) => {
  news.status = news.status === 'published' ? 'draft' : 'published'
}

const confirmDelete = (news) => {
  newsToDelete.value = news
  showDeleteModal.value = true
}

const deleteNews = () => {
  const index = newsList.value.findIndex(n => n.id === newsToDelete.value.id)
  if (index > -1) {
    newsList.value.splice(index, 1)
  }
  showDeleteModal.value = false
  newsToDelete.value = null
}
</script>

<style scoped>
.news-management {
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

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.news-card {
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.news-card:hover {
  transform: translateY(-3px);
}

.news-image {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.news-emoji {
  font-size: 4rem;
}

.category-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.category-badge.promotion { background: #e8f5e9; color: #2e7d32; }
.category-badge.news { background: #e3f2fd; color: #1565c0; }
.category-badge.review { background: #fff3e0; color: #e65100; }
.category-badge.tips { background: #f3e5f5; color: #7b1fa2; }

.news-content {
  padding: 1.25rem;
}

.news-content h3 {
  margin: 0 0 0.5rem 0;
  color: #1a1a2e;
  font-size: 1rem;
  line-height: 1.4;
}

.news-excerpt {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  color: #888;
}

.news-status {
  margin-bottom: 1rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.published { background: #e8f5e9; color: #2e7d32; }
.status-badge.draft { background: #fff3e0; color: #e65100; }

.news-actions {
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
  text-align: center;
  padding: 3rem;
  color: #888;
  background: #fff;
  border-radius: 15px;
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

.modal-large {
  max-width: 800px;
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

.form-group textarea {
  resize: vertical;
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
}
</style>
