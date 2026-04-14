document.addEventListener('DOMContentLoaded', () => {
    // 1. 移动端菜单切换
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        
        // 为移动端菜单添加简单的显示/隐藏效果
        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'block';
            navLinks.style.position = 'absolute';
            navLinks.style.top = 'var(--header-height)';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = '#fff';
            navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            
            const ul = navLinks.querySelector('ul');
            ul.style.flexDirection = 'column';
            ul.style.padding = '20px';
            
            const liItems = navLinks.querySelectorAll('li');
            liItems.forEach(li => {
                li.style.margin = '10px 0';
                li.style.textAlign = 'center';
            });
        } else {
            navLinks.style.display = 'none';
        }
    });

    // 2. 平滑滚动
    const links = document.querySelectorAll('.nav-links a, .hero-btns a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // 如果是内部锚点
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // 移动端点击后关闭菜单
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenu.classList.remove('open');
                        navLinks.style.display = 'none';
                    }
                }
            }
        });
    });

    // 3. 滚动时激活导航菜单项
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            
            if (pageYOffset >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
                item.style.color = 'var(--primary-color)';
            } else {
                item.style.color = 'var(--dark-color)';
            }
        });
    });

    // 4. 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert(`感谢您的留言，${name}！我们会尽快通过邮箱 ${email} 与您联系。`);
                contactForm.reset();
            } else {
                alert('请填写完整的表单信息。');
            }
        });
    }

    // 5. 简单的进入动画 (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 为需要动画的元素添加监听
    const animateElements = document.querySelectorAll('.news-item, .student-card, .section-title');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // 动画类样式注入
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
