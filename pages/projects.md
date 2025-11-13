---
layout: default
title: 产品
description: 展示我的产品与解决方案
permalink: /projects/
---

<section class="projects-hero">
  <div class="container">
    <div class="projects-hero-content">
      <h1 class="projects-title">产品</h1>
      <p class="projects-subtitle">以简洁、克制与一致性为核心，呈现可持续演进的产品阵列</p>
    </div>
  </div>
</section>

<section class="projects-filter">
  <div class="container">
    <div class="filter-tabs segmented-control" id="product-filter">
      <button class="filter-tab active" data-filter="all">全部</button>
      <button class="filter-tab" data-filter="frontend">前端</button>
      <button class="filter-tab" data-filter="backend">后端</button>
      <button class="filter-tab" data-filter="fullstack">全栈</button>
      <button class="filter-tab" data-filter="mobile">移动端</button>
      <button class="filter-tab" data-filter="tool">工具</button>
    </div>
  </div>
</section>

<section class="section projects-grid">
  <div class="container">
    {% assign featured_projects = site.data.projects | where: "featured", true %}
    {% if featured_projects.size > 0 %}
    <div class="projects-container">
      {% assign hero = featured_projects.first %}
      <div class="project-card project-card--hero" data-category="{{ hero.category }}">
        <div class="project-image">
          <img src="{{ hero.image | default: '/assets/images/project-placeholder.svg' }}" alt="{{ hero.title }}">
        </div>
        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title">{{ hero.title }}</h3>
            <div class="project-status status-{{ hero.status | default: 'completed' }}">{{ hero.status | default: '已上线' }}</div>
          </div>
          <p class="project-description">{{ hero.description }}</p>
          <div class="project-tech">
            {% for tech in hero.tech_stack %}
              <span class="tech-tag">{{ tech }}</span>
            {% endfor %}
          </div>
          <div class="project-meta">
            <div class="project-category">{{ hero.category }}</div>
            {% if hero.date %}
            <div class="project-date">{{ hero.date | date: "%Y年%m月" }}</div>
            {% endif %}
          </div>
        </div>
      </div>
    </div>
    {% endif %}

    <div class="projects-container" id="projects-container">
      {% for project in site.data.projects %}
      <div class="project-card project-item" data-category="{{ project.category }}">
        <div class="project-image">
          <img src="{{ project.image | default: '/assets/images/project-placeholder.svg' }}" alt="{{ project.title }}">
        </div>
        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title">{{ project.title }}</h3>
            {% if project.featured %}
            <div class="project-status status-featured">精选</div>
            {% else %}
            <div class="project-status status-{{ project.status | default: 'completed' }}">{{ project.status | default: '已上线' }}</div>
            {% endif %}
          </div>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tech">
            {% for tech in project.tech_stack %}
              <span class="tech-tag">{{ tech }}</span>
            {% endfor %}
          </div>
          <div class="project-meta">
            <div class="project-category">{{ project.category }}</div>
            {% if project.date %}
            <div class="project-date">{{ project.date | date: "%Y年%m月" }}</div>
            {% endif %}
          </div>
        </div>
      </div>
      {% endfor %}
    </div>

    <div class="projects-empty" style="display:none;">
      <div class="empty-icon">🗂️</div>
      <h3>暂无匹配的产品</h3>
      <p>尝试切换筛选或查看全部</p>
    </div>
  </div>
</section>

<section class="section product-news">
  <div class="container">
    <div class="section-title">
      <h2>产品新闻</h2>
      <p>最新发布与重要更新</p>
    </div>
    <div class="projects-container">
      {% assign product_news_pages = site.pages | where: "category", "product_news" %}
      {% for p in product_news_pages %}
      <div class="project-card">
        <div class="project-content">
          <h3 class="project-title"><a href="{{ p.url }}">{{ p.title }}</a></h3>
          {% if p.description %}
          <p class="project-description">{{ p.description }}</p>
          {% endif %}
          <div class="project-meta">
            <div class="project-category">{{ p.product | default: '产品' }}</div>
            <div class="project-date">{{ p.date | default: site.time | date: "%Y年%m月%d日" }}</div>
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section projects-cta">
  <div class="container">
    <div class="cta-content">
      <h2 class="cta-title">有产品想法？</h2>
      <p class="cta-description">欢迎与我交流，让好产品以更优雅的形式抵达用户</p>
      <div class="cta-actions">
        <a href="/contact" class="btn btn-primary btn-lg">联系我</a>
        <a href="/products/clipfast/news/" class="btn btn-outline btn-lg">查看最新发布</a>
      </div>
    </div>
  </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll('.project-item');
  const empty = document.querySelector('.projects-empty');

  function applyFilter(filter) {
    let visible = 0;
    items.forEach(item => {
      const category = item.getAttribute('data-category');
      const match = filter === 'all' || category === filter;
      item.style.display = match ? 'block' : 'none';
      if (match) visible++;
    });
    empty.style.display = visible === 0 ? 'block' : 'none';
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      filterTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      applyFilter(this.getAttribute('data-filter'));
    });
  });
});
</script>
