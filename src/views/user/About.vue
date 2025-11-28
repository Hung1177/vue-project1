<template>
  <UserLayout>
    <div class="about-page">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>Về chúng tôi</h1>
          <p>CarShop - Đối tác tin cậy trong hành trình sở hữu xe mơ ước của bạn</p>
        </div>
      </section>

      <!-- Story Section -->
      <section class="section">
        <div class="container">
          <div class="story-layout">
            <div class="story-image">
              <div class="story-emoji">🏢</div>
            </div>
            <div class="story-content">
              <h2>Câu chuyện của chúng tôi</h2>
              <p>CarShop được thành lập năm 2010 với sứ mệnh mang đến cho khách hàng Việt Nam những chiếc xe chất lượng với giá cả hợp lý nhất.</p>
              <p>Trải qua hơn 14 năm hoạt động, chúng tôi tự hào đã phục vụ hơn 50,000 khách hàng và trở thành một trong những đại lý xe uy tín hàng đầu tại Việt Nam.</p>
              <p>Với phương châm "Chất lượng là hàng đầu", chúng tôi cam kết mang đến cho khách hàng những sản phẩm và dịch vụ tốt nhất.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="section section-dark">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-number">14+</span>
              <span class="stat-label">Năm kinh nghiệm</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50,000+</span>
              <span class="stat-label">Khách hàng hài lòng</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">100+</span>
              <span class="stat-label">Mẫu xe đa dạng</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">10</span>
              <span class="stat-label">Chi nhánh toàn quốc</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="section">
        <div class="container">
          <h2 class="section-title">Giá trị cốt lõi</h2>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">🎯</div>
              <h3>Uy tín</h3>
              <p>Luôn giữ chữ "tín" trong mọi giao dịch, cam kết cung cấp thông tin chính xác và minh bạch.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">⭐</div>
              <h3>Chất lượng</h3>
              <p>Tất cả xe đều được kiểm định nghiêm ngặt trước khi giao đến tay khách hàng.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">💖</div>
              <h3>Tận tâm</h3>
              <p>Đặt lợi ích của khách hàng lên hàng đầu, luôn lắng nghe và thấu hiểu nhu cầu.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">🚀</div>
              <h3>Đổi mới</h3>
              <p>Không ngừng cập nhật và cải tiến để mang đến trải nghiệm tốt nhất cho khách hàng.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="section section-alt">
        <div class="container">
          <h2 class="section-title">Đội ngũ lãnh đạo</h2>
          <div class="team-grid">
            <div v-for="member in teamMembers" :key="member.id" class="team-card">
              <div class="team-avatar">{{ member.avatar }}</div>
              <h3>{{ member.name }}</h3>
              <span class="team-role">{{ member.role }}</span>
              <p>{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Partners Section -->
      <section class="section">
        <div class="container">
          <h2 class="section-title">Đối tác của chúng tôi</h2>
          <div class="partners-grid">
            <div class="partner-logo">Mercedes-Benz</div>
            <div class="partner-logo">BMW</div>
            <div class="partner-logo">Toyota</div>
            <div class="partner-logo">Honda</div>
            <div class="partner-logo">Mazda</div>
            <div class="partner-logo">Hyundai</div>
          </div>
        </div>
      </section>

      <!-- Awards Section -->
      <section class="section section-alt">
        <div class="container">
          <h2 class="section-title">Giải thưởng & Chứng nhận</h2>
          <div class="awards-grid">
            <div class="award-card">
              <div class="award-icon">🏆</div>
              <h4>Top 10 Đại lý xe uy tín</h4>
              <p>2023</p>
            </div>
            <div class="award-card">
              <div class="award-icon">🥇</div>
              <h4>Dịch vụ khách hàng xuất sắc</h4>
              <p>2022</p>
            </div>
            <div class="award-card">
              <div class="award-icon">🌟</div>
              <h4>Thương hiệu tin cậy</h4>
              <p>2021</p>
            </div>
            <div class="award-card">
              <div class="award-icon">✅</div>
              <h4>Chứng nhận ISO 9001</h4>
              <p>2020</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <h2>Sẵn sàng khám phá CarShop?</h2>
          <p>Hãy đến showroom của chúng tôi để trải nghiệm dịch vụ tốt nhất</p>
          <div class="cta-buttons">
            <router-link to="/products" class="btn btn-primary btn-lg">Xem sản phẩm</router-link>
            <router-link to="/contact" class="btn btn-outline btn-lg">Liên hệ ngay</router-link>
          </div>
        </div>
      </section>
    </div>
  </UserLayout>
</template>

<script setup>
import { ref } from 'vue'
import UserLayout from '../../layouts/UserLayout.vue'

const teamMembers = ref([
  {
    id: 1,
    avatar: '👨‍💼',
    name: 'Nguyễn Văn An',
    role: 'Giám đốc điều hành',
    bio: 'Hơn 20 năm kinh nghiệm trong ngành ô tô, từng làm việc tại các tập đoàn đa quốc gia.'
  },
  {
    id: 2,
    avatar: '👩‍💼',
    name: 'Trần Thị Bình',
    role: 'Giám đốc kinh doanh',
    bio: 'Chuyên gia marketing với 15 năm kinh nghiệm, đã xây dựng nhiều chiến lược thành công.'
  },
  {
    id: 3,
    avatar: '👨‍🔧',
    name: 'Lê Minh Cường',
    role: 'Giám đốc kỹ thuật',
    bio: 'Kỹ sư ô tô với chứng chỉ quốc tế, phụ trách kiểm định chất lượng xe.'
  },
  {
    id: 4,
    avatar: '👩‍💻',
    name: 'Phạm Thu Dung',
    role: 'Giám đốc dịch vụ khách hàng',
    bio: 'Chuyên gia trong lĩnh vực chăm sóc khách hàng, luôn đặt khách hàng làm trọng tâm.'
  }
])
</script>

<style scoped>
.about-page {
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

.story-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.story-image {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  border-radius: 20px;
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.story-emoji {
  font-size: 10rem;
}

.story-content h2 {
  color: #1a1a2e;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.story-content p {
  color: #555;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: #e94560;
}

.stat-label {
  color: #ccc;
  font-size: 1rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-card {
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.value-card h3 {
  color: #1a1a2e;
  margin-bottom: 0.75rem;
}

.value-card p {
  color: #666;
  line-height: 1.6;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.team-card {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  transition: transform 0.3s;
}

.team-card:hover {
  transform: translateY(-5px);
}

.team-avatar {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.team-card h3 {
  color: #1a1a2e;
  margin-bottom: 0.25rem;
}

.team-role {
  color: #e94560;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 1rem;
}

.team-card p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  align-items: center;
}

.partner-logo {
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  font-weight: bold;
  color: #1a1a2e;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.awards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.award-card {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
}

.award-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.award-card h4 {
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.award-card p {
  color: #888;
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
  background: #fff;
  color: #e94560;
}

.btn-primary:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.btn-outline:hover {
  background: #fff;
  color: #e94560;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1rem;
}

@media (max-width: 900px) {
  .story-layout {
    grid-template-columns: 1fr;
  }
  
  .story-image {
    order: -1;
  }
  
  .story-emoji {
    font-size: 6rem;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 1.8rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>
