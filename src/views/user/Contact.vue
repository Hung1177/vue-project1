<template>
  <UserLayout>
    <div class="contact-page">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>Liên hệ với chúng tôi</h1>
          <p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
        </div>
      </section>

      <!-- Contact Info & Form -->
      <section class="section">
        <div class="container">
          <div class="contact-layout">
            <!-- Contact Info -->
            <div class="contact-info">
              <h2>Thông tin liên hệ</h2>
              
              <div class="info-card">
                <div class="info-icon">📍</div>
                <div class="info-content">
                  <h4>Địa chỉ Showroom</h4>
                  <p>123 Nguyễn Văn Linh, Quận 7</p>
                  <p>TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div class="info-card">
                <div class="info-icon">📞</div>
                <div class="info-content">
                  <h4>Hotline</h4>
                  <p><a href="tel:02812345678">(028) 1234 5678</a></p>
                  <p><a href="tel:0909123456">0909 123 456</a></p>
                </div>
              </div>

              <div class="info-card">
                <div class="info-icon">✉️</div>
                <div class="info-content">
                  <h4>Email</h4>
                  <p><a href="mailto:contact@carshop.vn">contact@carshop.vn</a></p>
                  <p><a href="mailto:sales@carshop.vn">sales@carshop.vn</a></p>
                </div>
              </div>

              <div class="info-card">
                <div class="info-icon">⏰</div>
                <div class="info-content">
                  <h4>Giờ làm việc</h4>
                  <p>Thứ 2 - Thứ 7: 8:00 - 18:00</p>
                  <p>Chủ nhật: 9:00 - 17:00</p>
                </div>
              </div>

              <div class="social-section">
                <h4>Theo dõi chúng tôi</h4>
                <div class="social-links">
                  <a href="#" class="social-link facebook">Facebook</a>
                  <a href="#" class="social-link youtube">YouTube</a>
                  <a href="#" class="social-link zalo">Zalo</a>
                </div>
              </div>
            </div>

            <!-- Contact Form -->
            <div class="contact-form-wrapper">
              <h2>Gửi tin nhắn cho chúng tôi</h2>
              <form @submit.prevent="handleSubmit" class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="name">Họ và tên *</label>
                    <input
                      type="text"
                      id="name"
                      v-model="form.name"
                      required
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div class="form-group">
                    <label for="phone">Số điện thoại *</label>
                    <input
                      type="tel"
                      id="phone"
                      v-model="form.phone"
                      required
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    placeholder="Nhập email (không bắt buộc)"
                  />
                </div>

                <div class="form-group">
                  <label for="subject">Chủ đề</label>
                  <select id="subject" v-model="form.subject">
                    <option value="">Chọn chủ đề</option>
                    <option value="buy">Tư vấn mua xe</option>
                    <option value="sell">Bán xe cũ</option>
                    <option value="service">Dịch vụ bảo dưỡng</option>
                    <option value="finance">Hỗ trợ tài chính</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="message">Nội dung tin nhắn *</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    required
                    rows="5"
                    placeholder="Nhập nội dung tin nhắn..."
                  ></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-lg btn-full" :disabled="isSubmitting">
                  {{ isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn' }}
                </button>

                <p v-if="submitSuccess" class="success-message">
                  ✅ Tin nhắn của bạn đã được gửi thành công! Chúng tôi sẽ liên hệ lại sớm nhất.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <!-- Map Section -->
      <section class="map-section">
        <div class="container">
          <h2 class="section-title">Vị trí Showroom</h2>
          <div class="map-placeholder">
            <div class="map-icon">🗺️</div>
            <p>123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener" class="btn btn-outline">
              Xem trên Google Maps
            </a>
          </div>
        </div>
      </section>

      <!-- Branches Section -->
      <section class="section section-alt">
        <div class="container">
          <h2 class="section-title">Chi nhánh khác</h2>
          <div class="branches-grid">
            <div v-for="branch in branches" :key="branch.id" class="branch-card">
              <h4>{{ branch.name }}</h4>
              <p>📍 {{ branch.address }}</p>
              <p>📞 {{ branch.phone }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="section">
        <div class="container">
          <h2 class="section-title">Câu hỏi thường gặp</h2>
          <div class="faq-list">
            <div v-for="faq in faqs" :key="faq.id" class="faq-item">
              <button class="faq-question" @click="toggleFaq(faq.id)">
                <span>{{ faq.question }}</span>
                <span class="faq-icon">{{ openFaqs.includes(faq.id) ? '−' : '+' }}</span>
              </button>
              <div v-if="openFaqs.includes(faq.id)" class="faq-answer">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </UserLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import UserLayout from '../../layouts/UserLayout.vue'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
  submitSuccess.value = true
  
  // Reset form
  Object.assign(form, {
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  })
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    submitSuccess.value = false
  }, 5000)
}

const branches = ref([
  { id: 1, name: 'CarShop Quận 1', address: '456 Lê Lợi, Quận 1, TP.HCM', phone: '(028) 2222 3333' },
  { id: 2, name: 'CarShop Bình Thạnh', address: '789 Điện Biên Phủ, Bình Thạnh, TP.HCM', phone: '(028) 4444 5555' },
  { id: 3, name: 'CarShop Tân Bình', address: '321 Cộng Hòa, Tân Bình, TP.HCM', phone: '(028) 6666 7777' },
  { id: 4, name: 'CarShop Hà Nội', address: '100 Trần Duy Hưng, Cầu Giấy, Hà Nội', phone: '(024) 8888 9999' }
])

const faqs = ref([
  {
    id: 1,
    question: 'Làm thế nào để đặt lịch lái thử xe?',
    answer: 'Bạn có thể đặt lịch lái thử bằng cách gọi hotline (028) 1234 5678, gửi form liên hệ trên website hoặc đến trực tiếp showroom. Chúng tôi sẽ liên hệ xác nhận lịch hẹn trong vòng 24 giờ.'
  },
  {
    id: 2,
    question: 'CarShop có hỗ trợ trả góp không?',
    answer: 'Có, chúng tôi hợp tác với nhiều ngân hàng lớn như Vietcombank, Techcombank, VPBank... để cung cấp các gói vay với lãi suất ưu đãi, thời hạn lên đến 7 năm và vay đến 80% giá trị xe.'
  },
  {
    id: 3,
    question: 'Xe tại CarShop có được bảo hành không?',
    answer: 'Tất cả xe mới đều được bảo hành theo chính sách của hãng (thường từ 3-5 năm). Với xe đã qua sử dụng, chúng tôi cam kết bảo hành động cơ và hộp số trong 6 tháng hoặc 10,000 km.'
  },
  {
    id: 4,
    question: 'Tôi có thể bán xe cũ cho CarShop không?',
    answer: 'Có, chúng tôi thu mua xe cũ với giá tốt nhất thị trường. Bạn có thể mang xe đến showroom để được định giá miễn phí hoặc liên hệ hotline để được tư vấn.'
  }
])

const openFaqs = ref([])

const toggleFaq = (id) => {
  const index = openFaqs.value.indexOf(id)
  if (index > -1) {
    openFaqs.value.splice(index, 1)
  } else {
    openFaqs.value.push(id)
  }
}
</script>

<style scoped>
.contact-page {
  background: #f5f5f5;
}

.hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 5rem 2rem;
  text-align: center;
  color: #fff;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.1rem;
  color: #ccc;
}

.section {
  padding: 4rem 1rem;
}

.section-alt {
  background: #fff;
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

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
}

.contact-info h2,
.contact-form-wrapper h2 {
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.info-card {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: #fff;
  border-radius: 15px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.info-icon {
  font-size: 1.5rem;
}

.info-content h4 {
  color: #1a1a2e;
  margin-bottom: 0.25rem;
}

.info-content p {
  color: #666;
  margin: 0;
  font-size: 0.95rem;
}

.info-content a {
  color: #e94560;
  text-decoration: none;
}

.info-content a:hover {
  text-decoration: underline;
}

.social-section {
  margin-top: 1.5rem;
}

.social-section h4 {
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  padding: 0.5rem 1rem;
  border-radius: 25px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
}

.social-link.facebook {
  background: #1877f2;
  color: #fff;
}

.social-link.youtube {
  background: #ff0000;
  color: #fff;
}

.social-link.zalo {
  background: #0068ff;
  color: #fff;
}

.social-link:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.contact-form-wrapper {
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
  font-size: 0.95rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.875rem 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
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

.success-message {
  background: #e8f5e9;
  color: #2e7d32;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
}

.map-section {
  padding: 4rem 1rem;
  background: #fff;
}

.map-placeholder {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  border-radius: 20px;
  padding: 4rem;
  text-align: center;
}

.map-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.map-placeholder p {
  color: #666;
  margin-bottom: 1.5rem;
}

.branches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.branch-card {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 15px;
}

.branch-card h4 {
  color: #1a1a2e;
  margin-bottom: 0.75rem;
}

.branch-card p {
  color: #666;
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: #fff;
  border-radius: 15px;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.faq-question {
  width: 100%;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a2e;
  text-align: left;
}

.faq-question:hover {
  background: #f9f9f9;
}

.faq-icon {
  font-size: 1.5rem;
  color: #e94560;
}

.faq-answer {
  padding: 0 1.5rem 1.25rem;
}

.faq-answer p {
  color: #666;
  line-height: 1.7;
  margin: 0;
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

.btn-primary:hover:not(:disabled) {
  background: #ff6b6b;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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

.btn-full {
  width: 100%;
}

@media (max-width: 900px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 1.8rem;
  }
  
  .social-links {
    flex-wrap: wrap;
  }
}
</style>
