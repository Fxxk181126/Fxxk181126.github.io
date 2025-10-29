#!/bin/bash

echo "🚀 开始性能优化..."

# 1. 压缩CSS
echo "📦 压缩CSS文件..."
sass assets/css/style.scss assets/css/main.css --load-path=_web-src/scss --style=compressed --no-source-map

# 2. 检查文件大小
echo "📊 检查文件大小..."
echo "CSS文件大小:"
ls -lh assets/css/main.css | awk '{print $5 " - " $9}'

echo "JavaScript文件大小:"
ls -lh assets/js/main.js | awk '{print $5 " - " $9}'

# 3. 检查图片文件
echo "🖼️ 图片文件大小:"
find assets/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.svg" \) -exec ls -lh {} \; | awk '{print $5 " - " $9}'

# 4. 生成gzip压缩大小估算
echo "🗜️ Gzip压缩大小估算:"
echo "CSS (gzipped):"
gzip -c assets/css/main.css | wc -c | awk '{print $1/1024 " KB"}'

echo "JavaScript (gzipped):"
gzip -c assets/js/main.js | wc -c | awk '{print $1/1024 " KB"}'

# 5. 检查关键资源
echo "🔍 检查关键资源..."
echo "检查字体预加载..."
grep -n "preload.*font" _includes/head.html || echo "未找到字体预加载"

echo "检查DNS预取..."
grep -n "dns-prefetch" _includes/head.html || echo "未找到DNS预取"

# 6. 验证SEO文件
echo "🔍 验证SEO文件..."
if [ -f "robots.txt" ]; then
    echo "✅ robots.txt 存在"
else
    echo "❌ robots.txt 缺失"
fi

if [ -f "sitemap.xml" ]; then
    echo "✅ sitemap.xml 存在"
else
    echo "❌ sitemap.xml 缺失"
fi

if [ -f "site.webmanifest" ]; then
    echo "✅ site.webmanifest 存在"
else
    echo "❌ site.webmanifest 缺失"
fi

echo "✨ 性能优化检查完成！"