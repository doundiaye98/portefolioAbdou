document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveal();
    initContactForm();
    initThemeToggle();
    initTypingEffect();
});

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 72,
                    behavior: 'smooth'
                });
            }
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }, { passive: true });
}

function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
        statsObserver.observe(el);
    });
}

function animateCounters(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
    }, 30);
}

function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        showNotification('Message envoyé avec succès !', 'success');
        form.reset();
    });
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <span>${message}</span>
        <button aria-label="Fermer">&times;</button>
    `;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '90px',
        right: '24px',
        background: type === 'success' ? '#34d399' : '#7c3aed',
        color: '#fff',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontWeight: '600',
        fontSize: '0.9rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        zIndex: '10001',
        transform: 'translateX(120%)',
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'DM Sans', sans-serif"
    });

    const btn = notification.querySelector('button');
    Object.assign(btn.style, {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '1.2rem',
        cursor: 'pointer',
        opacity: '0.8'
    });

    document.body.appendChild(notification);
    requestAnimationFrame(() => { notification.style.transform = 'translateX(0)'; });

    const close = () => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 400);
    };

    btn.addEventListener('click', close);
    setTimeout(close, 5000);
}

function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.body.classList.remove('light-mode');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.classList.add('light-mode');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    toggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        toggle.innerHTML = isLight
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

function initTypingEffect() {
    const nameEl = document.querySelector('.title-name');
    if (!nameEl) return;

    const text = nameEl.textContent;
    nameEl.textContent = '';
    nameEl.style.opacity = '1';

    let i = 0;
    const type = () => {
        if (i < text.length) {
            nameEl.textContent += text.charAt(i++);
            setTimeout(type, 80);
        }
    };
    setTimeout(type, 600);
}
