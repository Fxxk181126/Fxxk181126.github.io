#!/bin/bash

# Jekyll构建测试脚本
echo "开始Jekyll构建测试..."

# 检查必要文件
echo "检查必要文件..."
if [ ! -f "_config.yml" ]; then
    echo "❌ _config.yml 文件不存在"
    exit 1
fi

if [ ! -f "index.md" ]; then
    echo "❌ index.md 文件不存在"
    exit 1
fi

echo "✅ 基础文件检查通过"

# 检查目录结构
echo "检查目录结构..."
required_dirs=("_layouts" "_includes" "_data" "_posts" "assets")
for dir in "${required_dirs[@]}"; do
    if [ ! -d "$dir" ]; then
        echo "❌ $dir 目录不存在"
        exit 1
    fi
done

echo "✅ 目录结构检查通过"

# 检查SCSS文件
echo "检查SCSS文件..."
if [ ! -f "assets/css/style.scss" ]; then
    echo "❌ assets/css/style.scss 文件不存在"
    exit 1
fi

if [ ! -f "assets/css/main.css" ]; then
    echo "❌ assets/css/main.css 文件不存在，需要编译SCSS"
    exit 1
fi

echo "✅ SCSS文件检查通过"

# 检查JavaScript文件
echo "检查JavaScript文件..."
if [ ! -f "assets/js/main.js" ]; then
    echo "❌ assets/js/main.js 文件不存在"
    exit 1
fi

echo "✅ JavaScript文件检查通过"

# 检查页面文件
echo "检查页面文件..."
pages=("about.md" "projects.md" "blog.md" "contact.md")
for page in "${pages[@]}"; do
    if [ ! -f "$page" ]; then
        echo "❌ $page 文件不存在"
        exit 1
    fi
done

echo "✅ 页面文件检查通过"

# 检查布局文件
echo "检查布局文件..."
layouts=("default.html" "page.html" "post.html" "projects.html" "blog.html" "contact.html")
for layout in "${layouts[@]}"; do
    if [ ! -f "_layouts/$layout" ]; then
        echo "❌ _layouts/$layout 文件不存在"
        exit 1
    fi
done

echo "✅ 布局文件检查通过"

# 检查包含文件
echo "检查包含文件..."
includes=("head.html" "navbar.html" "footer.html")
for include in "${includes[@]}"; do
    if [ ! -f "_includes/$include" ]; then
        echo "❌ _includes/$include 文件不存在"
        exit 1
    fi
done

echo "✅ 包含文件检查通过"

# 检查数据文件
echo "检查数据文件..."
if [ ! -f "_data/skills.yml" ]; then
    echo "❌ _data/skills.yml 文件不存在"
    exit 1
fi

echo "✅ 数据文件检查通过"

# 检查博客文章
echo "检查博客文章..."
post_count=$(find _posts -name "*.md" | wc -l)
if [ $post_count -eq 0 ]; then
    echo "❌ 没有找到博客文章"
    exit 1
fi

echo "✅ 找到 $post_count 篇博客文章"

# 模拟构建检查
echo "模拟构建检查..."

# 检查YAML front matter
echo "检查YAML front matter..."
yaml_errors=0

for file in *.md _posts/*.md; do
    if [ -f "$file" ]; then
        # 排除README.md和LICENSE.md
        if [[ "$file" == "README.md" || "$file" == "LICENSE.md" ]]; then
            continue
        fi
        
        # 检查是否有front matter
        if ! head -1 "$file" | grep -q "^---$"; then
            echo "⚠️  $file 缺少YAML front matter"
            yaml_errors=$((yaml_errors + 1))
        fi
    fi
done

if [ $yaml_errors -gt 0 ]; then
    echo "❌ 发现 $yaml_errors 个YAML front matter问题"
    exit 1
fi

echo "✅ YAML front matter检查通过"

# 检查Liquid语法
echo "检查Liquid语法..."
liquid_errors=0

# 简单检查是否有未闭合的标签
for file in _layouts/*.html _includes/*.html; do
    if [ -f "$file" ]; then
        # 检查是否有基本的Liquid语法错误
        if grep -q "{{[^}]*$" "$file" || grep -q "{%[^%]*$" "$file"; then
            echo "⚠️  $file 可能有未闭合的Liquid标签"
            liquid_errors=$((liquid_errors + 1))
        fi
    fi
done

if [ $liquid_errors -gt 0 ]; then
    echo "❌ 发现 $liquid_errors 个可能的Liquid语法问题"
    exit 1
fi

echo "✅ Liquid语法检查通过"

echo ""
echo "🎉 Jekyll构建测试完成！"
echo "✅ 所有检查都通过了"
echo ""
echo "网站结构完整，可以进行部署："
echo "- 配置文件: ✅"
echo "- 页面文件: ✅"
echo "- 布局文件: ✅"
echo "- 样式文件: ✅"
echo "- 脚本文件: ✅"
echo "- 博客文章: ✅"
echo "- 数据文件: ✅"
echo ""
echo "建议的部署步骤："
echo "1. 推送代码到GitHub仓库"
echo "2. 在GitHub Pages设置中启用Pages"
echo "3. 选择源分支（通常是main或gh-pages）"
echo "4. 等待自动构建完成"
echo ""