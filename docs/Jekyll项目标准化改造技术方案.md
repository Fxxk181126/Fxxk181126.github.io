# Jekyll项目标准化改造技术方案

## 1. 项目现状分析

### 1.1 当前项目结构
```
├── _config.yml                 ✅ 已存在
├── _includes/                  ✅ 已存在
├── _layouts/                   ✅ 已存在
├── _posts/                     ✅ 已存在
├── _site/                      ✅ 已存在
├── assets/                     ✅ 已存在
├── _data/                      ✅ 已存在（额外功能）
├── _web-src/                   ❌ 非标准目录
├── package.json                ❌ Node.js依赖
├── package-lock.json           ❌ Node.js依赖
├── about.html                  ⚠️ 应为Markdown格式
├── blog.html                   ⚠️ 应为Markdown格式
├── contact.html                ⚠️ 应为Markdown格式
├── projects.html               ⚠️ 应为Markdown格式
├── index.html                  ⚠️ 应为index.md
└── 其他文件...
```

### 1.2 问题识别
1. **非标准目录结构**：存在`_web-src/`目录，不符合Jekyll标准
2. **Node.js依赖**：包含`package.json`等Node.js相关文件
3. **文件格式不统一**：页面文件使用HTML而非Markdown
4. **SCSS编译混乱**：同时使用Jekyll内置和Node.js编译
5. **冗余文件**：存在多余的编译输出文件

## 2. 标准化改造方案

### 2.1 目标结构
```
├── _config.yml                 # Jekyll配置文件
├── _includes/                  # 可复用的HTML片段
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   └── ...
├── _layouts/                   # 页面布局模板
│   ├── default.html
│   ├── post.html
│   ├── page.html
│   └── ...
├── _posts/                     # 博客文章
│   ├── 2024-01-05-modern-css-techniques.md
│   ├── 2024-01-10-frontend-performance-optimization.md
│   └── 2024-01-15-vue3-composition-api-guide.md
├── _data/                      # 数据文件
│   ├── navigation.yml
│   ├── social.yml
│   └── ...
├── _sass/                      # SCSS源文件（标准目录）
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _base.scss
│   └── components/
├── assets/                     # 静态资源
│   ├── css/
│   │   └── main.scss
│   ├── js/
│   │   └── main.js
│   └── images/
├── _site/                      # 生成的静态网站
├── index.md                    # 首页（Markdown格式）
├── about.md                    # 关于页面
├── blog.md                     # 博客页面
├── projects.md                 # 项目页面
├── contact.md                  # 联系页面
├── Gemfile                     # Ruby依赖
├── Gemfile.lock               # Ruby依赖锁定
└── README.md                   # 项目说明
```

## 3. 改造实施步骤

### 第一步：创建标准目录结构

#### 3.1 创建_sass目录
```bash
mkdir -p _sass/components
mkdir -p _sass/pages
mkdir -p _sass/theme
```

#### 3.2 迁移SCSS文件
- 将`_web-src/scss/`内容迁移到`_sass/`
- 保持原有的模块化结构
- 更新导入路径

### 第二步：文件格式标准化

#### 3.3 转换页面文件为Markdown格式
将现有的HTML页面文件转换为Markdown格式：

**index.md**
```markdown
---
layout: home
title: "首页"
description: "基于Vue.js设计风格的个人官网"
---

# 欢迎来到我的个人官网

这里展示我的技术能力、项目作品和个人见解。
```

**about.md**
```markdown
---
layout: page
title: "关于我"
permalink: /about/
---

# 关于我

全栈开发者，专注于前端开发和用户体验设计。
```

**blog.md**
```markdown
---
layout: blog
title: "博客"
permalink: /blog/
---

# 技术博客

分享技术心得和开发经验。
```

**projects.md**
```markdown
---
layout: projects
title: "项目作品"
permalink: /projects/
---

# 项目作品

展示我的技术项目和作品集。
```

**contact.md**
```markdown
---
layout: page
title: "联系我"
permalink: /contact/
---

# 联系我

欢迎与我交流技术和合作机会。
```

### 第三步：配置优化

#### 3.4 优化_config.yml
```yaml
# 基本站点信息
title: "个人官网"
email: "zhao999ss@163.com"
description: "个人官网，展示技术能力、项目作品和个人见解"
baseurl: ""
url: "https://fxxk181126.github.io"

# 构建设置
markdown: kramdown
highlighter: rouge
permalink: /:categories/:title/
paginate: 6
paginate_path: "/blog/page:num/"

# 插件
plugins:
  - jekyll-paginate
  - jekyll-sitemap
  - jekyll-feed
  - jekyll-seo-tag

# SCSS设置（标准化）
sass:
  sass_dir: _sass
  style: compressed

# 集合
collections:
  projects:
    output: true
    permalink: /:collection/:name/

# 排除文件
exclude:
  - Gemfile
  - Gemfile.lock
  - README.md
  - LICENSE.md
  - .sass-cache/
  - .jekyll-cache/
  - gemfiles/
  - node_modules/
  - vendor/

# 默认值
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: "Zane"
  - scope:
      path: ""
      type: "pages"
    values:
      layout: "page"
```

#### 3.5 更新assets/css/main.scss
```scss
---
# 只有这个前置内容，Jekyll才会处理这个文件
---

@charset "utf-8";

// 导入所有SCSS模块
@import "variables";
@import "mixins";
@import "base";
@import "components/buttons";
@import "components/cards";
@import "components/blog";
@import "components/projects";
@import "components/footer";
@import "pages/home";
@import "pages/about";
@import "pages/blog";
@import "pages/projects";
@import "pages/contact";
@import "theme/navbar";
@import "theme/mobile";
```

### 第四步：清理冗余文件

#### 3.6 删除非必要文件
```bash
# 删除Node.js相关文件
rm package.json
rm package-lock.json
rm -rf node_modules/

# 删除非标准目录
rm -rf _web-src/
rm -rf web-dist/

# 删除编译缓存
rm -rf .sass-cache/
rm -rf .jekyll-cache/

# 删除临时文件
rm test-output.css
```

#### 3.7 更新.gitignore
```gitignore
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
vendor/
.bundle/
Gemfile.lock
```

### 第五步：验证和测试

#### 3.8 构建测试
```bash
# 清理并重新构建
bundle exec jekyll clean
bundle exec jekyll build

# 启动开发服务器
bundle exec jekyll serve
```

#### 3.9 功能验证清单
- [ ] 首页正常显示
- [ ] 博客列表和文章页面正常
- [ ] 项目展示页面正常
- [ ] 关于页面正常
- [ ] 联系页面正常
- [ ] CSS样式正确加载
- [ ] 响应式设计正常
- [ ] SEO标签正确
- [ ] RSS订阅正常

## 4. 迁移注意事项

### 4.1 URL结构保持
确保改造后的URL结构与原有保持一致：
- `/` → 首页
- `/about/` → 关于页面
- `/blog/` → 博客列表
- `/blog/post-title/` → 具体文章
- `/projects/` → 项目页面
- `/contact/` → 联系页面

### 4.2 样式兼容性
- 保持原有的Vue.js风格设计
- 确保所有组件样式正常
- 验证响应式布局
- 检查移动端适配

### 4.3 数据完整性
- 保持_data/目录下的所有数据文件
- 确保个人信息、项目信息、技能信息等数据完整
- 验证社交媒体链接正常

## 5. 性能优化建议

### 5.1 SCSS优化
- 使用compressed样式输出
- 合理组织SCSS文件结构
- 避免重复的样式定义

### 5.2 图片优化
- 使用适当的图片格式
- 添加图片懒加载
- 优化图片尺寸

### 5.3 SEO优化
- 确保所有页面都有适当的meta标签
- 使用jekyll-seo-tag插件
- 生成sitemap.xml和robots.txt

## 6. 部署配置

### 6.1 GitHub Pages配置
确保Gemfile包含GitHub Pages兼容的gem：
```ruby
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "jekyll-paginate"
gem "jekyll-sitemap"
gem "jekyll-feed"
gem "jekyll-seo-tag"
```

### 6.2 自动化部署
可以配置GitHub Actions进行自动化部署：
```yaml
name: Build and Deploy
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-ruby@v1
      with:
        ruby-version: '3.0'
    - run: bundle install
    - run: bundle exec jekyll build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site
```

## 7. 维护指南

### 7.1 日常维护
- 定期更新gem依赖
- 检查链接有效性
- 更新内容和项目信息

### 7.2 内容管理
- 博客文章放在_posts/目录
- 项目信息更新_data/projects.yml
- 个人信息更新_data/personal.yml

### 7.3 样式修改
- 主要样式变量在_sass/_variables.scss
- 组件样式在_sass/components/
- 页面特定样式在_sass/pages/

## 8. 总结

通过这次标准化改造，项目将：
1. **完全符合Jekyll标准**：使用标准的目录结构和文件格式
2. **简化构建流程**：移除Node.js依赖，纯Jekyll方案
3. **提高可维护性**：标准化的文件组织和配置
4. **保持功能完整**：所有原有功能和样式保持不变
5. **优化性能**：更好的缓存和构建优化

改造完成后，项目将成为一个标准的Jekyll静态网站，易于维护和部署。