---
layout: default
title: 博客
description: 分享技术心得、学习笔记和生活感悟
permalink: /blog/
---

<div class="container">
  <div class="section">
    <div class="section-title">
      <h1>博客</h1>
      <p>分享技术心得、学习笔记和生活感悟</p>
    </div>

    <!-- 博客统计 -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="card bg-gradient-primary text-white">
          <div class="card-body">
            <div class="row text-center">
              <div class="col-md-4 col-12 mb-3 mb-md-0">
                <h3 class="mb-1">{{ site.posts | size }}</h3>
                <p class="mb-0">总文章数</p>
              </div>
              <div class="col-md-4 col-12 mb-3 mb-md-0">
                {% assign total_words = 0 %}
                {% for post in site.posts %}
                  {% assign words = post.content | number_of_words %}
                  {% assign total_words = total_words | plus: words %}
                {% endfor %}
                <h3 class="mb-1">{{ total_words | divided_by: 1000 }}K+</h3>
                <p class="mb-0">总字数</p>
              </div>
              <div class="col-md-4 col-12">
                {% assign categories = site.posts | map: 'categories' | join: ',' | split: ',' | uniq %}
                <h3 class="mb-1">{{ categories | size }}</h3>
                <p class="mb-0">文章分类</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分类筛选 -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex flex-wrap gap-2 justify-content-center">
          <button class="btn btn-outline-primary active" data-filter="all">全部</button>
          {% assign all_categories = site.posts | map: 'categories' | join: ',' | split: ',' | uniq | sort %}
          {% for category in all_categories %}
            {% unless category == "" %}
              <button class="btn btn-outline-primary" data-filter="{{ category }}">{{ category }}</button>
            {% endunless %}
          {% endfor %}
        </div>
      </div>
    </div>

    <!-- 最新文章 -->
    {% if site.posts.size > 0 %}
      <div class="row mb-5">
        <div class="col-12">
          <h2 class="mb-4">
            <i class="fas fa-fire text-danger me-2"></i>
            最新文章
          </h2>
          <div class="row">
            {% for post in site.posts limit: 3 %}
              <div class="col-lg-4 col-md-6 mb-4">
                <article class="card blog-card h-100">
                  {% if post.image %}
                    <img src="{{ post.image }}" class="card-img-top" alt="{{ post.title }}">
                  {% else %}
                    <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=blog%20article%20technology%20coding%20modern%20design&image_size=landscape_16_9" 
                         class="card-img-top" alt="{{ post.title }}">
                  {% endif %}
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <span class="badge bg-primary">{{ post.categories | first | default: "技术" }}</span>
                      <small class="text-muted">{{ post.date | date: "%Y-%m-%d" }}</small>
                    </div>
                    <h5 class="card-title">
                      <a href="{{ post.url }}" class="text-decoration-none">{{ post.title }}</a>
                    </h5>
                    <p class="card-text">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <small class="text-muted">
                        <i class="fas fa-clock me-1"></i>
                        {{ post.content | number_of_words | divided_by: 200 }} 分钟阅读
                      </small>
                      {% if post.tags %}
                        <div class="tags">
                          {% for tag in post.tags limit: 2 %}
                            <span class="badge bg-secondary me-1">{{ tag }}</span>
                          {% endfor %}
                        </div>
                      {% endif %}
                    </div>
                  </div>
                  <div class="card-footer bg-transparent">
                    <a href="{{ post.url }}" class="btn btn-outline-primary btn-sm">
                      阅读全文 <i class="fas fa-arrow-right ms-1"></i>
                    </a>
                  </div>
                </article>
              </div>
            {% endfor %}
          </div>
        </div>
      </div>

      <!-- 所有文章 -->
      <div class="row">
        <div class="col-12">
          <h2 class="mb-4">所有文章</h2>
          <div class="row" id="posts-container">
            {% for post in site.posts %}
              <div class="col-lg-6 col-12 mb-4 post-item" data-category="{{ post.categories | first | default: 'uncategorized' }}">
                <article class="card blog-card-horizontal h-100">
                  <div class="row g-0 h-100">
                    <div class="col-md-4">
                      {% if post.image %}
                        <img src="{{ post.image }}" class="img-fluid rounded-start h-100" alt="{{ post.title }}" style="object-fit: cover;">
                      {% else %}
                        <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=blog%20article%20technology%20coding%20modern%20design&image_size=square" 
                             class="img-fluid rounded-start h-100" alt="{{ post.title }}" style="object-fit: cover;">
                      {% endif %}
                    </div>
                    <div class="col-md-8">
                      <div class="card-body d-flex flex-column h-100">
                        <div>
                          <div class="d-flex justify-content-between align-items-start mb-2">
                            <span class="badge bg-primary">{{ post.categories | first | default: "技术" }}</span>
                            <small class="text-muted">{{ post.date | date: "%Y-%m-%d" }}</small>
                          </div>
                          <h5 class="card-title">
                            <a href="{{ post.url }}" class="text-decoration-none">{{ post.title }}</a>
                          </h5>
                          <p class="card-text">{{ post.excerpt | strip_html | truncatewords: 15 }}</p>
                        </div>
                        <div class="mt-auto">
                          <div class="d-flex justify-content-between align-items-center mb-2">
                            <small class="text-muted">
                              <i class="fas fa-clock me-1"></i>
                              {{ post.content | number_of_words | divided_by: 200 }} 分钟阅读
                            </small>
                            {% if post.tags %}
                              <div class="tags">
                                {% for tag in post.tags limit: 2 %}
                                  <span class="badge bg-secondary me-1">{{ tag }}</span>
                                {% endfor %}
                              </div>
                            {% endif %}
                          </div>
                          <a href="{{ post.url }}" class="btn btn-outline-primary btn-sm">
                            阅读全文 <i class="fas fa-arrow-right ms-1"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            {% endfor %}
          </div>
        </div>
      </div>
    {% else %}
      <!-- 暂无文章 -->
      <div class="row">
        <div class="col-12">
          <div class="card text-center">
            <div class="card-body py-5">
              <i class="fas fa-edit fa-3x text-muted mb-3"></i>
              <h3>暂无文章</h3>
              <p class="text-muted">博客正在建设中，敬请期待精彩内容！</p>
              <div class="mt-4">
                <h5>即将发布的内容：</h5>
                <ul class="list-unstyled">
                  <li><i class="fas fa-check text-success me-2"></i>Vue.js 开发实战经验</li>
                  <li><i class="fas fa-check text-success me-2"></i>前端性能优化技巧</li>
                  <li><i class="fas fa-check text-success me-2"></i>Node.js 后端开发指南</li>
                  <li><i class="fas fa-check text-success me-2"></i>全栈项目部署实践</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    {% endif %}

    <!-- 标签云 -->
    {% if site.tags.size > 0 %}
      <div class="row mt-5">
        <div class="col-12">
          <h3 class="mb-3">标签云</h3>
          <div class="tag-cloud">
            {% for tag in site.tags %}
              <a href="/tags/#{{ tag[0] }}" class="badge bg-secondary me-2 mb-2 text-decoration-none" 
                 style="font-size: {{ tag[1].size | times: 0.1 | plus: 0.8 }}rem;">
                {{ tag[0] }} ({{ tag[1].size }})
              </a>
            {% endfor %}
          </div>
        </div>
      </div>
    {% endif %}

    <!-- 订阅提醒 -->
    <div class="row mt-5">
      <div class="col-12">
        <div class="card border-primary">
          <div class="card-body text-center">
            <h3 class="card-title">
              <i class="fas fa-bell me-2"></i>
              订阅更新
            </h3>
            <p class="card-text">
              关注我的社交媒体，第一时间获取最新文章推送！
            </p>
            <div class="d-flex justify-content-center gap-3">
              {% for social in site.data.social limit: 4 %}
                <a href="{{ social.url }}" class="btn btn-outline-primary" target="_blank">
                  <i class="{{ social.icon }} me-1"></i>
                  {{ social.name }}
                </a>
              {% endfor %}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.bg-gradient-primary {
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
}

.blog-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.blog-card-horizontal {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.blog-card-horizontal:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-title a {
  color: inherit;
  transition: color 0.3s ease;
}

.card-title a:hover {
  color: #42b883;
}

.tags .badge {
  font-size: 0.7rem;
}

.tag-cloud {
  line-height: 2.5;
}

.tag-cloud a {
  transition: all 0.3s ease;
}

.tag-cloud a:hover {
  background-color: #42b883 !important;
  transform: scale(1.1);
}

.post-item {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.post-item.hidden {
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
  // 文章筛选功能
  const filterButtons = document.querySelectorAll('[data-filter]');
  const postItems = document.querySelectorAll('.post-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // 更新按钮状态
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // 筛选文章
      postItems.forEach(item => {
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