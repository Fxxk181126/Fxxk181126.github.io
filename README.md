# Jekyll Instagram Portfolio Theme

Clean, minimalistic and responsive portfolio theme for Jekyll powered by Bootstrap 4.
For the portfolio section is used Instagram widget, but you can easily update it with another content source.

## Live Demo

https://portfolio-central.github.io/jekyll-instagram-portfolio-theme/
![Jekyll Instagram Portfolio Theme](./assets/images/screenshot.png "Jekyll Instagram Portfolio Theme")

## Showcase

The best usage examples:

- [Pavel Guzenko](http://guzenko.org.ua)
- [Victor Mikitenko](https://mikitenko-org-ua.github.io/site/)
- [Anthony Fuentes](http://anthonyfuentes.us/)
- [Serhii Grytsyshyn](https://grserhii.github.io/)

To add your example: fork the repo, add new line to the list above and create a pull request.

## Featured on

- [Template.net](https://www.template.net/cms-templates/jekyll/jekyll-themes-templates/)
- [JekyllThemes.org](http://jekyllthemes.org/themes/instagram-portfolio-theme/)

## Powered by

- [Jekyll](https://jekyllrb.com/)
- [Bootstrap 4](http://v4-alpha.getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [SnapWidget](https://snapwidget.com)
- [Google Fonts: Lobster](https://fonts.google.com/specimen/Lobster)
- [Font Awesome](http://fontawesome.io/)

## 项目结构

```
├── .gitignore              # Git 忽略文件配置
├── Gemfile                 # Ruby 依赖管理
├── Gemfile.lock           # 锁定的依赖版本
├── LICENSE.md             # 项目许可证
├── README.md              # 项目说明文档
├── _config.yml            # Jekyll 主配置文件
├── _data/                 # 数据文件目录
├── _includes/             # 可重用的页面组件
├── _layouts/              # 页面布局模板
├── _posts/                # 博客文章目录
├── assets/                # 静态资源目录
│   ├── css/              # 样式文件
│   ├── images/           # 图片资源（包含 PWA 图标）
│   └── js/               # JavaScript 文件
├── docs/                  # 项目文档目录
├── favicon.ico            # 网站图标
├── feed.xml              # RSS 订阅源
├── index.md              # 网站首页
├── pages/                # 静态页面目录
├── robots.txt            # 搜索引擎爬虫配置
├── site.webmanifest      # PWA 应用清单
└── sitemap.xml           # 网站地图
```

### 目录说明

- **Jekyll 标准目录**：`_config.yml`, `_data/`, `_includes/`, `_layouts/`, `_posts/` 遵循 Jekyll 标准结构
- **页面组织**：`pages/` 目录集中管理所有静态页面，`index.md` 保留在根目录作为首页
- **静态资源**：`assets/` 目录包含所有 CSS、JavaScript 和图片文件
- **SEO 优化**：`robots.txt`, `sitemap.xml`, `feed.xml` 提供搜索引擎优化支持
- **PWA 支持**：`site.webmanifest` 和相关图标文件支持渐进式 Web 应用
- **项目文档**：`docs/` 目录包含技术文档和项目说明

## Installation
Install Jekyll:

```
gem install jekyll bundler
```

Install bundle dependiencies:

```
bundle install
```

When finished, run the dev server:

```
bundle exec jekyll serve
```

or just:

```
jekyll serve

```
To stop the server, use `CTRL+C`.

## 样式编译

Jekyll 内置了 SCSS 编译功能，无需额外的构建工具：

- SCSS 文件位于 `assets/css/` 目录
- Jekyll 会自动编译 `.scss` 文件为 CSS
- 运行 `bundle exec jekyll serve` 时会自动处理样式文件
- 修改 SCSS 文件后，Jekyll 会自动重新编译
