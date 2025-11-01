// Vue.js inspired personal website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const navbarToggler = document.getElementById('navbar-toggler');
    const navbarMobile = document.getElementById('navbar-mobile');
    const mobileClose = document.getElementById('mobile-close');
    const themeToggle = document.getElementById('theme-toggle');
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Mobile menu toggle
    function toggleMobileMenu() {
        navbarMobile.classList.toggle('show');
        document.body.style.overflow = navbarMobile.classList.contains('show') ? 'hidden' : '';
    }
    
    function closeMobileMenu() {
        navbarMobile.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    if (navbarMobile) {
        navbarMobile.addEventListener('click', function(e) {
            if (e.target === navbarMobile) {
                closeMobileMenu();
            }
        });
    }
    
    // Close mobile menu when clicking nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Theme toggle functionality
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }
    
    function updateThemeIcon(theme) {
        const themeIcons = document.querySelectorAll('.theme-icon');
        themeIcons.forEach(icon => {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        });
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Initialize theme
    initTheme();
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('消息发送成功！我会尽快回复您。', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 5000);
    }
    
    // Project filter functionality
    const projectFilters = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectFilters.length > 0) {
        projectFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Update active filter
                projectFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => card.classList.add('show'), 100);
                    } else {
                        card.classList.remove('show');
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }
    
    // Blog search functionality
    const blogSearch = document.getElementById('blog-search');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (blogSearch) {
        blogSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            blogCards.forEach(card => {
                const title = card.querySelector('.blog-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L12 20M12 4L6 10M12 4L18 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    backToTop.setAttribute('aria-label', '回到顶部');
    backToTop.setAttribute('title', '回到顶部');
    document.body.appendChild(backToTop);

    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }

    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(toggleBackToTop, 10);
    });

    toggleBackToTop();
    
    backToTop.addEventListener('click', function () {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});