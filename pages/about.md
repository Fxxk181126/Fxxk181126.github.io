---
layout: default
title: 关于我
description: 了解更多关于我的背景、技能和经历
permalink: /about/
---

<div class="container">
  <div class="section">
    <div class="section-title">
      <h1>关于我</h1>
      <p>了解更多关于我的背景、技能和经历</p>
    </div>

    <!-- 个人简介 -->
    <div class="row mb-5">
      <div class="col-lg-4 mb-4">
        <div class="card">
          <div class="card-body text-center">
            <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20developer%20portrait%20avatar%20modern%20style&image_size=square" 
                 alt="{{ site.data.personal.basic.name }}" 
                 class="rounded-circle mb-3" 
                 style="width: 150px; height: 150px; object-fit: cover;">
            <h3>{{ site.data.personal.basic.name }}</h3>
            <p class="text-muted">{{ site.data.personal.basic.title }}</p>
            <div class="d-flex justify-content-center gap-2">
              {% for social in site.data.social %}
                <a href="{{ social.url }}" class="btn btn-outline-primary btn-sm" target="_blank">
                  <i class="{{ social.icon }}"></i>
                </a>
              {% endfor %}
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-lg-8">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">个人简介</h3>
            <p class="card-text">
              {{ site.data.personal.basic.bio }}
            </p>
            <p class="card-text">
              我专注于现代Web开发技术，包括前端框架、后端服务和云计算平台。
              热爱学习新技术，喜欢分享技术心得，致力于创建高质量的软件产品。
            </p>
            
            <div class="row mt-4">
              <div class="col-md-6">
                <h5>技术专长</h5>
                <ul class="list-unstyled">
                  <li><i class="fas fa-check text-success me-2"></i>前端开发 (Vue.js, React)</li>
                  <li><i class="fas fa-check text-success me-2"></i>后端开发 (Node.js, Python)</li>
                  <li><i class="fas fa-check text-success me-2"></i>数据库设计 (MySQL, MongoDB)</li>
                  <li><i class="fas fa-check text-success me-2"></i>云服务部署 (AWS, 阿里云)</li>
                </ul>
              </div>
              <div class="col-md-6">
                <h5>兴趣爱好</h5>
                <ul class="list-unstyled">
                  <li><i class="fas fa-heart text-danger me-2"></i>开源项目贡献</li>
                  <li><i class="fas fa-heart text-danger me-2"></i>技术博客写作</li>
                  <li><i class="fas fa-heart text-danger me-2"></i>摄影与旅行</li>
                  <li><i class="fas fa-heart text-danger me-2"></i>音乐与阅读</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 技能展示 -->
    <div class="row mb-5">
      <div class="col-12">
        <h2 class="mb-4">技能专长</h2>
        {% for category in site.data.skills %}
          <div class="card mb-4">
            <div class="card-header">
              <h4 class="mb-0">
                <i class="{{ category.icon }} me-2" style="color: {{ category.color }}"></i>
                {{ category.name }}
              </h4>
            </div>
            <div class="card-body">
              <div class="row">
                {% for skill in category.skills %}
                  <div class="col-md-6 col-lg-4 mb-3">
                    <div class="d-flex align-items-center">
                      <i class="{{ skill.icon }} me-2" style="color: {{ skill.color }}"></i>
                      <div class="flex-grow-1">
                        <div class="d-flex justify-content-between">
                          <span>{{ skill.name }}</span>
                          <span class="text-muted">{{ skill.level }}%</span>
                        </div>
                        <div class="progress" style="height: 4px;">
                          <div class="progress-bar" 
                               style="width: {{ skill.level }}%; background-color: {{ skill.color }};"
                               role="progressbar"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                {% endfor %}
              </div>
            </div>
          </div>
        {% endfor %}
      </div>
    </div>

    <!-- 工作经历 -->
    <div class="row mb-5">
      <div class="col-12">
        <h2 class="mb-4">工作经历</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">高级前端工程师</h5>
                  <h6 class="card-subtitle mb-2 text-muted">某科技公司 • 2022 - 至今</h6>
                  <p class="card-text">
                    负责公司核心产品的前端开发，使用Vue.js和React构建现代化的Web应用。
                    参与系统架构设计，优化应用性能，提升用户体验。
                  </p>
                  <div class="d-flex flex-wrap gap-1">
                    <span class="badge bg-primary">Vue.js</span>
                    <span class="badge bg-primary">React</span>
                    <span class="badge bg-primary">TypeScript</span>
                    <span class="badge bg-primary">Webpack</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">全栈开发工程师</h5>
                  <h6 class="card-subtitle mb-2 text-muted">创业公司 • 2020 - 2022</h6>
                  <p class="card-text">
                    独立负责多个项目的全栈开发，从需求分析到产品上线。
                    搭建CI/CD流程，建立代码规范，提升团队开发效率。
                  </p>
                  <div class="d-flex flex-wrap gap-1">
                    <span class="badge bg-success">Node.js</span>
                    <span class="badge bg-success">Express</span>
                    <span class="badge bg-success">MongoDB</span>
                    <span class="badge bg-success">Docker</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">前端开发实习生</h5>
                  <h6 class="card-subtitle mb-2 text-muted">互联网公司 • 2019 - 2020</h6>
                  <p class="card-text">
                    参与公司官网和管理后台的开发维护，学习现代前端开发流程。
                    协助优化页面性能，提升SEO效果。
                  </p>
                  <div class="d-flex flex-wrap gap-1">
                    <span class="badge bg-warning">HTML/CSS</span>
                    <span class="badge bg-warning">JavaScript</span>
                    <span class="badge bg-warning">jQuery</span>
                    <span class="badge bg-warning">Bootstrap</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 教育背景 -->
    <div class="row mb-5">
      <div class="col-12">
        <h2 class="mb-4">教育背景</h2>
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <h5 class="card-title">计算机科学与技术 • 本科</h5>
                <h6 class="card-subtitle mb-2 text-muted">某某大学 • 2016 - 2020</h6>
                <p class="card-text">
                  主修课程包括数据结构与算法、计算机网络、数据库系统、软件工程等。
                  在校期间积极参与编程竞赛和开源项目，获得多项奖学金。
                </p>
              </div>
              <div class="col-md-4 text-center">
                <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=university%20graduation%20cap%20diploma%20education%20academic&image_size=square" 
                     alt="教育背景" 
                     class="img-fluid rounded" 
                     style="max-width: 120px;">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系方式 -->
    <div class="row">
      <div class="col-12">
        <h2 class="mb-4">联系我</h2>
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h5>联系信息</h5>
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <i class="fas fa-envelope me-2 text-primary"></i>
                    <a href="mailto:{{ site.data.personal.contact.email }}">{{ site.data.personal.contact.email }}</a>
                  </li>
                  <li class="mb-2">
                    <i class="fas fa-phone me-2 text-primary"></i>
                    {{ site.data.personal.contact.phone }}
                  </li>
                  <li class="mb-2">
                    <i class="fas fa-map-marker-alt me-2 text-primary"></i>
                    {{ site.data.personal.contact.location }}
                  </li>
                </ul>
              </div>
              <div class="col-md-6">
                <h5>社交媒体</h5>
                <div class="d-flex flex-wrap gap-2">
                  {% for social in site.data.social %}
                    <a href="{{ social.url }}" class="btn btn-outline-primary" target="_blank">
                      <i class="{{ social.icon }} me-1"></i>{{ social.name }}
                    </a>
                  {% endfor %}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>