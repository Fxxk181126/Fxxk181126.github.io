---
layout: default
title: 产品
description: 展示我的产品与解决方案
permalink: /projects/
---

<div class="container">
  <div class="section">
    <div class="section-title">
      <h1>产品</h1>
      <p>这里展示了我打造与参与的部分产品与解决方案</p>
    </div>

    <!-- 项目筛选 -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex flex-wrap gap-2 justify-content-center">
          <button class="btn btn-outline-primary active" data-filter="all">全部</button>
          <button class="btn btn-outline-primary" data-filter="frontend">前端</button>
          <button class="btn btn-outline-primary" data-filter="backend">后端</button>
          <button class="btn btn-outline-primary" data-filter="fullstack">全栈</button>
          <button class="btn btn-outline-primary" data-filter="mobile">移动端</button>
          <button class="btn btn-outline-primary" data-filter="tool">工具</button>
        </div>
      </div>
    </div>

    <!-- 精选项目 -->
    <div class="row mb-5">
      <div class="col-12">
        <h2 class="mb-4">
          <i class="fas fa-star text-warning me-2"></i>
          精选产品
        </h2>
        <div class="row">
          {% assign featured_projects = site.data.projects | where: "featured", true %}
          {% for project in featured_projects limit: 3 %}
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card project-card h-100" data-category="{{ project.category }}">
                <div class="card-img-container">
                  <img src="{{ project.image }}" class="card-img-top" alt="{{ project.title }}">
                  <div class="card-img-overlay">
                    <div class="project-links">
                      {% if project.demo_url %}
                        <a href="{{ project.demo_url }}" class="btn btn-primary btn-sm" target="_blank">
                          <i class="fas fa-external-link-alt"></i> 演示
                        </a>
                      {% endif %}
                      {% if project.github_url %}
                        <a href="{{ project.github_url }}" class="btn btn-outline-light btn-sm" target="_blank">
                          <i class="fab fa-github"></i> 代码
                        </a>
                      {% endif %}
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">{{ project.title }}</h5>
                  <p class="card-text">{{ project.description }}</p>
                  <div class="tech-stack mb-3">
                    {% for tech in project.tech_stack %}
                      <span class="badge bg-secondary me-1">{{ tech }}</span>
                    {% endfor %}
                  </div>
                </div>
                <div class="card-footer bg-transparent">
                  <small class="text-muted">
                    <i class="fas fa-calendar-alt me-1"></i>
                    {{ project.date | date: "%Y年%m月" }}
                  </small>
                </div>
              </div>
            </div>
          {% endfor %}
        </div>
      </div>
    </div>

    <!-- 所有产品 -->
    <div class="row">
      <div class="col-12">
        <h2 class="mb-4">所有产品</h2>
        <div class="row" id="projects-container">
          {% for project in site.data.projects %}
            <div class="col-lg-4 col-md-6 mb-4 project-item" data-category="{{ project.category }}">
              <div class="card project-card h-100">
                <div class="card-img-container">
                  <img src="{{ project.image }}" class="card-img-top" alt="{{ project.title }}">
                  <div class="card-img-overlay">
                    <div class="project-links">
                      {% if project.demo_url %}
                        <a href="{{ project.demo_url }}" class="btn btn-primary btn-sm" target="_blank">
                          <i class="fas fa-external-link-alt"></i> 演示
                        </a>
                      {% endif %}
                      {% if project.github_url %}
                        <a href="{{ project.github_url }}" class="btn btn-outline-light btn-sm" target="_blank">
                          <i class="fab fa-github"></i> 代码
                        </a>
                      {% endif %}
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="card-title mb-0">{{ project.title }}</h5>
                    {% if project.featured %}
                      <span class="badge bg-warning">
                        <i class="fas fa-star"></i> 精选
                      </span>
                    {% endif %}
                  </div>
                  <p class="card-text">{{ project.description }}</p>
                  <div class="tech-stack mb-3">
                    {% for tech in project.tech_stack %}
                      <span class="badge bg-secondary me-1 mb-1">{{ tech }}</span>
                    {% endfor %}
                  </div>
                </div>
                <div class="card-footer bg-transparent">
                  <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                      <i class="fas fa-calendar-alt me-1"></i>
                      {{ project.date | date: "%Y年%m月" }}
                    </small>
                    <span class="badge bg-primary">{{ project.category }}</span>
                  </div>
                </div>
              </div>
            </div>
          {% endfor %}
        </div>
      </div>
    </div>

    <!-- 产品统计 -->
    <div class="row mt-5">
      <div class="col-12">
        <div class="card bg-light">
          <div class="card-body">
            <div class="row text-center">
              <div class="col-md-3 col-6 mb-3">
                <div class="stat-item">
                  <h3 class="text-primary mb-1">{{ site.data.projects | size }}</h3>
                  <p class="text-muted mb-0">总产品数</p>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-3">
                <div class="stat-item">
                  {% assign frontend_count = site.data.projects | where: "category", "frontend" | size %}
                  <h3 class="text-success mb-1">{{ frontend_count }}</h3>
                  <p class="text-muted mb-0">前端产品</p>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-3">
                <div class="stat-item">
                  {% assign fullstack_count = site.data.projects | where: "category", "fullstack" | size %}
                  <h3 class="text-warning mb-1">{{ fullstack_count }}</h3>
                  <p class="text-muted mb-0">全栈产品</p>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-3">
                <div class="stat-item">
                  {% assign featured_count = site.data.projects | where: "featured", true | size %}
                  <h3 class="text-danger mb-1">{{ featured_count }}</h3>
                  <p class="text-muted mb-0">精选产品</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 技术栈统计 -->
    <div class="row mt-4">
      <div class="col-12">
        <h3 class="mb-3">常用技术栈</h3>
        <div class="tech-cloud">
          {% assign all_techs = "" | split: "," %}
          {% for project in site.data.projects %}
            {% for tech in project.tech_stack %}
              {% assign all_techs = all_techs | push: tech %}
            {% endfor %}
          {% endfor %}
          
          {% assign unique_techs = all_techs | uniq %}
          {% for tech in unique_techs %}
            {% assign tech_count = 0 %}
            {% for project in site.data.projects %}
              {% if project.tech_stack contains tech %}
                {% assign tech_count = tech_count | plus: 1 %}
              {% endif %}
            {% endfor %}
            <span class="badge bg-primary me-2 mb-2" style="font-size: {{ tech_count | times: 0.2 | plus: 0.8 }}rem;">
              {{ tech }} ({{ tech_count }})
            </span>
          {% endfor %}
        </div>
      </div>
    </div>

    <!-- 联系合作 -->
    <div class="row mt-5">
      <div class="col-12">
        <div class="card border-primary">
          <div class="card-body text-center">
            <h3 class="card-title">有产品想要合作？</h3>
            <p class="card-text">
              如果您有有趣的产品想要合作，或者需要技术咨询，欢迎随时联系我！
            </p>
            <a href="/contact/" class="btn btn-primary btn-lg">
              <i class="fas fa-envelope me-2"></i>
              联系我
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 产品新闻列表（自动聚合） -->
<div class="row mt-5">
  <div class="col-12">
    <h2 class="mb-4">
      <i class="fas fa-newspaper text-primary me-2"></i>
      产品新闻
    </h2>
    <div class="row">
      {% assign product_news_pages = site.pages | where: "category", "product_news" %}
      {% for p in product_news_pages %}
        <div class="col-lg-6 col-md-12 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title"><a href="{{ p.url }}">{{ p.title }}</a></h5>
              {% if p.description %}
              <p class="card-text">{{ p.description }}</p>
              {% endif %}
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">
                  <i class="fas fa-calendar-alt me-1"></i>
                  {{ p.date | default: site.time | date: "%Y年%m月%d日" }}
                </small>
                {% if p.product %}
                  <span class="badge bg-secondary">{{ p.product }}</span>
                {% endif %}
              </div>
            </div>
          </div>
        </div>
      {% endfor %}
    </div>
  </div>
  
</div>

<style>
.project-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.card-img-container {
  position: relative;
  overflow: hidden;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .card-img-top {
  transform: scale(1.05);
}

.card-img-overlay {
  background: rgba(0,0,0,0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-card:hover .card-img-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 0.5rem;
}

.tech-stack .badge {
  font-size: 0.75rem;
}

.stat-item h3 {
  font-size: 2.5rem;
  font-weight: bold;
}

.tech-cloud {
  line-height: 2;
}

.project-item {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.project-item.hidden {
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
}

.btn[data-filter].active {
  background-color: #42b883;
  border-color: #42b883;
  color: white;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // 项目筛选功能
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectItems = document.querySelectorAll('.project-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // 更新按钮状态
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // 筛选项目
      projectItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
});
</script>
