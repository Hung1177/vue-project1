<template>
  <UserLayout>
    <div class="services-page">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>Dịch vụ của chúng tôi</h1>
          <p>Chúng tôi cung cấp đầy đủ các dịch vụ hỗ trợ khách hàng trong suốt quá trình sở hữu xe</p>
        </div>
      </section>

      <!-- Main Services -->
      <section class="section">
        <div class="container">
          <div class="services-grid">
            <div v-for="service in mainServices" :key="service.id" class="service-card">
              <div class="service-icon">{{ service.icon }}</div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
              <ul class="service-features">
                <li v-for="feature in service.features" :key="feature">{{ feature }}</li>
              </ul>
              <button class="btn btn-outline">Tìm hiểu thêm</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Finance Section -->
      <section class="section section-alt">
        <div class="container">
          <div class="finance-layout">
            <div class="finance-content">
              <h2>Hỗ trợ tài chính</h2>
              <p>Chúng tôi hợp tác với nhiều ngân hàng lớn để mang đến cho bạn các gói vay ưu đãi nhất.</p>
              <div class="finance-features">
                <div class="finance-item">
                  <span class="icon">💰</span>
                  <div>
                    <h4>Lãi suất từ 0%</h4>
                    <p>Trong 12 tháng đầu tiên</p>
                  </div>
                </div>
                <div class="finance-item">
                  <span class="icon">📋</span>
                  <div>
                    <h4>Thủ tục đơn giản</h4>
                    <p>Chỉ cần CMND và bằng lái xe</p>
                  </div>
                </div>
                <div class="finance-item">
                  <span class="icon">⏰</span>
                  <div>
                    <h4>Duyệt nhanh 24h</h4>
                    <p>Nhận kết quả trong vòng 24 giờ</p>
                  </div>
                </div>
                <div class="finance-item">
                  <span class="icon">📊</span>
                  <div>
                    <h4>Vay đến 80%</h4>
                    <p>Giá trị xe</p>
                  </div>
                </div>
              </div>
              <button class="btn btn-primary">Tính toán khoản vay</button>
            </div>
            <div class="finance-image">
              <div class="finance-emoji">💳</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Maintenance Section -->
      <section class="section">
        <div class="container">
          <h2 class="section-title">Dịch vụ bảo dưỡng</h2>
          <div class="maintenance-grid">
            <div v-for="item in maintenanceServices" :key="item.id" class="maintenance-card">
              <div class="maintenance-icon">{{ item.icon }}</div>
              <h4>{{ item.title }}</h4>
              <p class="maintenance-price">{{ item.price }}</p>
            </div>
          </div>
          <div class="cta-box">
            <h3>Đặt lịch bảo dưỡng ngay</h3>
            <p>Tiết kiệm đến 20% khi đặt lịch trực tuyến</p>
            <button class="btn btn-primary">Đặt lịch ngay</button>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="section section-dark">
        <div class="container">
          <h2 class="section-title light">Khách hàng nói gì về chúng tôi</h2>
          <div class="testimonials-grid">
            <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
              <div class="testimonial-content">
                <p>"{{ testimonial.content }}"</p>
              </div>
              <div class="testimonial-author">
                <span class="avatar">{{ testimonial.avatar }}</span>
                <div>
                  <h4>{{ testimonial.name }}</h4>
                  <span>{{ testimonial.car }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <h2>Bạn cần hỗ trợ?</h2>
          <p>Liên hệ với đội ngũ tư vấn của chúng tôi để được hỗ trợ tốt nhất</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="btn btn-primary btn-lg">Liên hệ ngay</router-link>
            <a href="tel:02812345678" class="btn btn-outline btn-lg">📞 (028) 1234 5678</a>
          </div>
        </div>
      </section>
    </div>
  </UserLayout>
</template>

<script setup>
import { ref } from 'vue'
import UserLayout from '../../layouts/UserLayout.vue'

const mainServices = ref([
  {
    id: 1,
    icon: '🛠️',
    title: 'Bảo dưỡng & Sửa chữa',
    description: 'Dịch vụ bảo dưỡng chuyên nghiệp với đội ngũ kỹ thuật viên được đào tạo bài bản.',
    features: [
      'Kiểm tra 50 điểm miễn phí',
      'Thay nhớt và phụ tùng chính hãng',
      'Bảo hành 6 tháng sau sửa chữa',
      'Xe thay thế khi sửa chữa lớn'
    ]
  },
  {
    id: 2,
    icon: '💳',
    title: 'Hỗ trợ trả góp',
    description: 'Đa dạng gói vay với lãi suất ưu đãi từ các ngân hàng đối tác.',
    features: [
      'Lãi suất 0% trong 12 tháng',
      'Vay đến 80% giá trị xe',
      'Thời hạn vay đến 7 năm',
      'Thủ tục đơn giản, nhanh gọn'
    ]
  },
  {
    id: 3,
    icon: '📋',
    title: 'Đăng ký biển số',
    description: 'Hỗ trợ toàn bộ thủ tục đăng ký xe, đăng kiểm nhanh chóng.',
    features: [
      'Đăng ký biển số các tỉnh',
      'Sang tên đổi chủ',
      'Gia hạn đăng kiểm',
      'Hoàn tất trong 7 ngày'
    ]
  },
  {
    id: 4,
    icon: '🛡️',
    title: 'Bảo hiểm xe',
    description: 'Tư vấn và cung cấp các gói bảo hiểm từ các công ty uy tín.',
    features: [
      'Bảo hiểm vật chất xe',
      'Bảo hiểm trách nhiệm dân sự',
      'Bảo hiểm người ngồi trên xe',
      'Quyền lợi bồi thường tối đa'
    ]
  }
])

const maintenanceServices = ref([
  { id: 1, icon: '🔧', title: 'Thay nhớt', price: 'Từ 500.000đ' },
  { id: 2, icon: '🛞', title: 'Cân chỉnh lốp', price: 'Từ 200.000đ' },
  { id: 3, icon: '🔋', title: 'Kiểm tra ắc quy', price: 'Miễn phí' },
  { id: 4, icon: '❄️', title: 'Bảo dưỡng điều hòa', price: 'Từ 350.000đ' },
  { id: 5, icon: '🚿', title: 'Rửa xe & Vệ sinh nội thất', price: 'Từ 150.000đ' },
  { id: 6, icon: '🔩', title: 'Bảo dưỡng định kỳ', price: 'Từ 1.500.000đ' }
])

const testimonials = ref([
  {
    id: 1,
    avatar: '👨',
    name: 'Nguyễn Văn Minh',
    car: 'Mercedes-Benz C300',
    content: 'Dịch vụ tư vấn rất chuyên nghiệp, nhân viên nhiệt tình. Tôi rất hài lòng với chiếc xe đã mua.'
  },
  {
    id: 2,
    avatar: '👩',
    name: 'Trần Thị Hương',
    car: 'Toyota Camry',
    content: 'Thủ tục mua xe nhanh gọn, được hỗ trợ trả góp với lãi suất tốt. Đặc biệt dịch vụ hậu mãi rất tốt.'
  },
  {
    id: 3,
    avatar: '👨',
    name: 'Lê Hoàng Nam',
    car: 'BMW X5',
    content: 'CarShop là nơi đáng tin cậy để mua xe. Xe được kiểm tra kỹ lưỡng, giá cả hợp lý.'
  }
])
</script>

<style scoped>
.services-page {
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
  max-width: 600px;
  margin: 0 auto;
}

.section {
  padding: 4rem 1rem;
}

.section-alt {
  background: #fff;
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.service-card {
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  color: #1a1a2e;
  margin-bottom: 0.75rem;
}

.service-card > p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-features {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.service-features li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: #555;
  font-size: 0.9rem;
}

.service-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4caf50;
}

.finance-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.finance-content h2 {
  color: #1a1a2e;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.finance-content > p {
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.finance-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.finance-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.finance-item .icon {
  font-size: 2rem;
}

.finance-item h4 {
  margin: 0;
  color: #1a1a2e;
}

.finance-item p {
  margin: 0.25rem 0 0;
  color: #666;
  font-size: 0.9rem;
}

.finance-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.finance-emoji {
  font-size: 12rem;
}

.maintenance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.maintenance-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.maintenance-card:hover {
  transform: translateY(-3px);
}

.maintenance-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.maintenance-card h4 {
  color: #1a1a2e;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.maintenance-price {
  color: #e94560;
  font-weight: bold;
  margin: 0;
}

.cta-box {
  background: linear-gradient(135deg, #e94560 0%, #ff6b6b 100%);
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  color: #fff;
}

.cta-box h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.cta-box p {
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.testimonial-content p {
  color: #ccc;
  font-style: italic;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonial-author .avatar {
  font-size: 2.5rem;
}

.testimonial-author h4 {
  color: #fff;
  margin: 0;
}

.testimonial-author span {
  color: #888;
  font-size: 0.9rem;
}

.cta-section {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
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
  opacity: 0.9;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
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

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1rem;
}

@media (max-width: 900px) {
  .finance-layout {
    grid-template-columns: 1fr;
  }
  
  .finance-image {
    order: -1;
  }
  
  .finance-emoji {
    font-size: 8rem;
  }
  
  .finance-features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 1.8rem;
  }
}
</style>
