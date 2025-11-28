<template>
  <AdminLayout>
    <div class="settings-page">
      <!-- Settings Tabs -->
      <div class="settings-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>

      <!-- General Settings -->
      <div v-if="activeTab === 'general'" class="settings-section">
        <div class="section-header">
          <h2>Cài đặt chung</h2>
          <p>Quản lý thông tin cơ bản của website</p>
        </div>
        <div class="settings-form">
          <div class="form-group">
            <label>Tên website</label>
            <input v-model="settings.siteName" type="text" />
          </div>
          <div class="form-group">
            <label>Mô tả</label>
            <textarea v-model="settings.siteDescription" rows="3"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Email liên hệ</label>
              <input v-model="settings.contactEmail" type="email" />
            </div>
            <div class="form-group">
              <label>Số điện thoại</label>
              <input v-model="settings.contactPhone" type="tel" />
            </div>
          </div>
          <div class="form-group">
            <label>Địa chỉ</label>
            <input v-model="settings.address" type="text" />
          </div>
          <div class="form-actions">
            <button class="btn btn-primary" @click="saveSettings">Lưu thay đổi</button>
          </div>
        </div>
      </div>

      <!-- Profile Settings -->
      <div v-if="activeTab === 'profile'" class="settings-section">
        <div class="section-header">
          <h2>Thông tin cá nhân</h2>
          <p>Quản lý thông tin tài khoản của bạn</p>
        </div>
        <div class="settings-form">
          <div class="profile-avatar">
            <span class="avatar-emoji">👤</span>
            <button class="btn btn-outline btn-sm">Đổi ảnh đại diện</button>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Họ và tên</label>
              <input v-model="profile.fullName" type="text" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="profile.email" type="email" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Số điện thoại</label>
              <input v-model="profile.phone" type="tel" />
            </div>
            <div class="form-group">
              <label>Chức vụ</label>
              <input v-model="profile.role" type="text" disabled />
            </div>
          </div>
          <div class="form-actions">
            <button class="btn btn-primary" @click="saveProfile">Lưu thay đổi</button>
          </div>
        </div>
      </div>

      <!-- Security Settings -->
      <div v-if="activeTab === 'security'" class="settings-section">
        <div class="section-header">
          <h2>Bảo mật</h2>
          <p>Quản lý mật khẩu và bảo mật tài khoản</p>
        </div>
        <div class="settings-form">
          <div class="security-card">
            <div class="security-info">
              <h4>🔐 Đổi mật khẩu</h4>
              <p>Cập nhật mật khẩu đăng nhập của bạn</p>
            </div>
            <button class="btn btn-outline" @click="showPasswordModal = true">Đổi mật khẩu</button>
          </div>
          <div class="security-card">
            <div class="security-info">
              <h4>📱 Xác thực 2 bước</h4>
              <p>Tăng cường bảo mật với xác thực 2 bước</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="security.twoFactor" />
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="security-card">
            <div class="security-info">
              <h4>📧 Thông báo đăng nhập</h4>
              <p>Nhận email khi có đăng nhập mới</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="security.loginNotification" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Notifications Settings -->
      <div v-if="activeTab === 'notifications'" class="settings-section">
        <div class="section-header">
          <h2>Thông báo</h2>
          <p>Cấu hình các loại thông báo bạn muốn nhận</p>
        </div>
        <div class="settings-form">
          <div class="notification-group">
            <h4>Email</h4>
            <div class="notification-item">
              <div class="notification-info">
                <span>Đơn hàng mới</span>
                <p>Nhận email khi có đơn hàng mới</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" v-model="notifications.newOrder" />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="notification-item">
              <div class="notification-info">
                <span>Tin nhắn khách hàng</span>
                <p>Nhận email khi có tin nhắn mới từ khách hàng</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" v-model="notifications.newMessage" />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="notification-item">
              <div class="notification-info">
                <span>Báo cáo tuần</span>
                <p>Nhận báo cáo tổng hợp hàng tuần</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" v-model="notifications.weeklyReport" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          <div class="notification-group">
            <h4>Hệ thống</h4>
            <div class="notification-item">
              <div class="notification-info">
                <span>Cập nhật hệ thống</span>
                <p>Thông báo khi có cập nhật mới</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" v-model="notifications.systemUpdate" />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="notification-item">
              <div class="notification-info">
                <span>Cảnh báo bảo mật</span>
                <p>Thông báo các vấn đề bảo mật</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" v-model="notifications.securityAlert" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Password Change Modal -->
      <div v-if="showPasswordModal" class="modal-overlay" @click.self="showPasswordModal = false">
        <div class="modal">
          <div class="modal-header">
            <h2>Đổi mật khẩu</h2>
            <button class="btn-close" @click="showPasswordModal = false">×</button>
          </div>
          <form @submit.prevent="changePassword" class="modal-form">
            <div class="form-group">
              <label>Mật khẩu hiện tại</label>
              <input v-model="passwordForm.current" type="password" required />
            </div>
            <div class="form-group">
              <label>Mật khẩu mới</label>
              <input v-model="passwordForm.new" type="password" required minlength="8" />
            </div>
            <div class="form-group">
              <label>Xác nhận mật khẩu mới</label>
              <input v-model="passwordForm.confirm" type="password" required />
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-outline" @click="showPasswordModal = false">Hủy</button>
              <button type="submit" class="btn btn-primary">Đổi mật khẩu</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Toast Notification -->
      <div v-if="showToast" class="toast" :class="toastType">
        {{ toastMessage }}
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import AdminLayout from '../../layouts/AdminLayout.vue'

const activeTab = ref('general')
const showPasswordModal = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const tabs = [
  { id: 'general', label: 'Chung', icon: '⚙️' },
  { id: 'profile', label: 'Hồ sơ', icon: '👤' },
  { id: 'security', label: 'Bảo mật', icon: '🔐' },
  { id: 'notifications', label: 'Thông báo', icon: '🔔' }
]

const settings = reactive({
  siteName: 'CarShop',
  siteDescription: 'Chuyên cung cấp các dòng xe ô tô chất lượng cao với giá cả cạnh tranh nhất thị trường.',
  contactEmail: 'contact@carshop.vn',
  contactPhone: '(028) 1234 5678',
  address: '123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh'
})

const profile = reactive({
  fullName: 'Admin CarShop',
  email: 'admin@carshop.vn',
  phone: '0909 123 456',
  role: 'Quản trị viên'
})

const security = reactive({
  twoFactor: false,
  loginNotification: true
})

const notifications = reactive({
  newOrder: true,
  newMessage: true,
  weeklyReport: true,
  systemUpdate: false,
  securityAlert: true
})

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
})

const showNotification = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const saveSettings = () => {
  showNotification('Cài đặt đã được lưu thành công!')
}

const saveProfile = () => {
  showNotification('Thông tin cá nhân đã được cập nhật!')
}

const changePassword = () => {
  if (passwordForm.new !== passwordForm.confirm) {
    showNotification('Mật khẩu xác nhận không khớp!', 'error')
    return
  }
  showPasswordModal.value = false
  passwordForm.current = ''
  passwordForm.new = ''
  passwordForm.confirm = ''
  showNotification('Mật khẩu đã được thay đổi thành công!')
}
</script>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-tabs {
  display: flex;
  gap: 0.5rem;
  background: #fff;
  padding: 0.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #666;
  transition: all 0.3s;
}

.tab-btn:hover {
  background: #f5f5f5;
}

.tab-btn.active {
  background: #e94560;
  color: #fff;
}

.tab-icon {
  font-size: 1.1rem;
}

.settings-section {
  background: #fff;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h2 {
  margin: 0;
  color: #1a1a2e;
}

.section-header p {
  margin: 0.5rem 0 0;
  color: #888;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
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
.form-group textarea {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: border-color 0.3s;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #e94560;
}

.form-group input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.form-group textarea {
  resize: vertical;
}

.form-actions {
  margin-top: 1rem;
}

.profile-avatar {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 15px;
}

.avatar-emoji {
  font-size: 4rem;
}

.security-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: #f9f9f9;
  border-radius: 15px;
}

.security-info h4 {
  margin: 0;
  color: #1a1a2e;
  font-size: 1rem;
}

.security-info p {
  margin: 0.25rem 0 0;
  color: #888;
  font-size: 0.85rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ccc;
  border-radius: 14px;
  transition: 0.3s;
}

.toggle-slider::before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background: #fff;
  border-radius: 50%;
  transition: 0.3s;
}

.toggle-switch input:checked + .toggle-slider {
  background: #e94560;
}

.toggle-switch input:checked + .toggle-slider::before {
  transform: translateX(22px);
}

.notification-group {
  margin-bottom: 1.5rem;
}

.notification-group h4 {
  color: #1a1a2e;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f5f5f5;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-info span {
  font-weight: 500;
  color: #1a1a2e;
}

.notification-info p {
  margin: 0.25rem 0 0;
  color: #888;
  font-size: 0.85rem;
}

/* Modal */
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
  max-width: 450px;
  overflow: hidden;
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
}

.modal-form {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  color: #fff;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
  z-index: 1001;
}

.toast.success {
  background: #2e7d32;
}

.toast.error {
  background: #c62828;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
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

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .settings-tabs {
    justify-content: center;
  }
  
  .security-card {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
