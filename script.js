```javascript
// Enhanced JavaScript for Portfolio Website
document.addEventListener('DOMContentLoaded', function () {

    // DOM Elements
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const heroSubtitle = document.getElementById('rotating-profession');
    const ctaBtn = document.querySelector('.cta-btn');
    const hireBtns = document.querySelectorAll('.hire-btn');
    const aboutBtn = document.querySelector('.about-btn');
    const socialIcons = document.querySelectorAll('.social-icon');

    // Professions
    const professions = [
        'Full-Stack Developer',
        'Frontend Engineer',
        'Backend Developer',
        'UI/UX Enthusiast',
        'Problem Solver',
        'Tech Innovator'
    ];

    // Typewriter Effect
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeWriter() {

        if (!heroSubtitle) return;

        const currentProfession = professions[professionIndex];

        if (isDeleting) {

            heroSubtitle.innerHTML =
                "I'm a " +
                currentProfession.substring(0, charIndex - 1) +
                '<span class="cursor">|</span>';

            charIndex--;
            typingSpeed = 75;

        } else {

            heroSubtitle.innerHTML =
                "I'm a " +
                currentProfession.substring(0, charIndex + 1) +
                '<span class="cursor">|</span>';

            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentProfession.length) {

            typingSpeed = 2000;
            isDeleting = true;

        } else if (isDeleting && charIndex === 0) {

            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Mobile Menu
    function toggleMobileMenu() {

        hamburger?.classList.toggle('active');
        navMenu?.classList.toggle('active');

        document.body.style.overflow =
            navMenu?.classList.contains('active')
                ? 'hidden'
                : 'auto';
    }

    // Smooth Scroll
    function smoothScroll(event) {

        event.preventDefault();

        const targetId = this.getAttribute('href');

        if (targetId && targetId.startsWith('#')) {

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                const headerHeight = header?.offsetHeight || 80;

                const offsetTop =
                    targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                if (navMenu?.classList.contains('active')) {
                    toggleMobileMenu();
                }

                updateActiveNavLink(targetId);
            }
        }
    }

    // Active Nav
    function updateActiveNavLink(activeId) {

        navLinks.forEach(link => {

            link.classList.remove('active');

            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
    }

    // Header Scroll
    function handleScroll() {

        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    }

    // Active Nav on Scroll
    function updateActiveNavFromScroll() {

        const sections = document.querySelectorAll('section[id]');

        const scrollPosition =
            window.scrollY + (header?.offsetHeight || 80);

        let activeSection = null;

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                activeSection = section;
            }
        });

        if (activeSection) {

            const id =
                '#' + activeSection.getAttribute('id');

            updateActiveNavLink(id);

        } else if (scrollPosition < 100) {

            updateActiveNavLink('#home');
        }
    }

    // Scroll Listener
    let scrollTimeout;

    window.addEventListener('scroll', () => {

        clearTimeout(scrollTimeout);

        scrollTimeout =
            setTimeout(updateActiveNavFromScroll, 50);
    });

    // Animation Observer
    const animationObserver =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = '1';
                    entry.target.style.transform =
                        'translateY(0)';
                }
            });

        }, {
            threshold: 0.1
        });

    // Setup Animations
    function setupAnimations() {

        const animatedElements =
            document.querySelectorAll(
                '.hero-stats .stat, .about-highlights .highlight, .floating-card, .social-icon'
            );

        animatedElements.forEach((el, index) => {

            el.style.opacity = '0';

            el.style.transform =
                'translateY(30px)';

            el.style.transition =
                'all 0.6s ease';

            el.style.transitionDelay =
                `${index * 0.1}s`;

            animationObserver.observe(el);
        });
    }

    // Button Click Handler
    function handleButtonClick(event) {

        const button = event.currentTarget;

        // IMPORTANT FIX FOR CV DOWNLOAD
        if (button.hasAttribute('download')) {
            return;
        }

        // Ripple Effect
        const ripple =
            document.createElement('span');

        const rect =
            button.getBoundingClientRect();

        const size =
            Math.max(rect.width, rect.height);

        const x =
            event.clientX - rect.left - size / 2;

        const y =
            event.clientY - rect.top - size / 2;

        ripple.style.width =
            ripple.style.height = size + 'px';

        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Hire Button Action
        if (
            button.classList.contains('cta-btn') ||
            button.textContent.includes('Hire')
        ) {

            const contactSection =
                document.querySelector('#contact');

            if (contactSection) {

                contactSection.scrollIntoView({
                    behavior: 'smooth'
                });

            } else {

                showNotification(
                    'Contact section coming soon!',
                    'info'
                );
            }
        }
    }

    // Notification
    function showNotification(message, type = 'info') {

        const notification =
            document.createElement('div');

        notification.className =
            `notification notification-${type}`;

        notification.innerHTML = `
            <span>${message}</span>
        `;

        Object.assign(notification.style, {

            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#111827',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: '0.3s ease'
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform =
                'translateX(0)';
        }, 100);

        setTimeout(() => {

            notification.style.transform =
                'translateX(100%)';

            setTimeout(() => {
                notification.remove();
            }, 300);

        }, 3000);
    }

    // Keyboard
    function handleKeyboard(event) {

        if (
            event.key === 'Escape' &&
            navMenu?.classList.contains('active')
        ) {
            toggleMobileMenu();
        }
    }

    // Resize
    let resizeTimeout;

    function handleResize() {

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {

            if (
                window.innerWidth >= 769 &&
                navMenu?.classList.contains('active')
            ) {
                toggleMobileMenu();
            }

        }, 250);
    }

    // Initialize Nav
    function initializeActiveNav() {

        const hash =
            window.location.hash || '#home';

        updateActiveNavLink(hash);
    }

    // Event Listeners
    hamburger?.addEventListener(
        'click',
        toggleMobileMenu
    );

    navLinks.forEach(link => {

        link.addEventListener(
            'click',
            smoothScroll
        );
    });

    // FIXED BUTTON LISTENERS
    [ctaBtn, ...hireBtns, aboutBtn].forEach(btn => {

        if (btn) {

            // Skip CV download links
            if (btn.hasAttribute('download')) {
                return;
            }

            btn.addEventListener(
                'click',
                handleButtonClick
            );
        }
    });

    // Social Icons
    socialIcons.forEach(icon => {

        icon.addEventListener(
            'mouseenter',
            function () {

                this.style.transform =
                    'translateY(-3px) scale(1.1)';
            }
        );

        icon.addEventListener(
            'mouseleave',
            function () {

                this.style.transform =
                    'translateY(0) scale(1)';
            }
        );
    });

    // Global Events
    window.addEventListener(
        'scroll',
        handleScroll
    );

    window.addEventListener(
        'resize',
        handleResize
    );

    document.addEventListener(
        'keydown',
        handleKeyboard
    );

    // Outside Click
    document.addEventListener(
        'click',
        (event) => {

            if (
                navMenu?.classList.contains('active') &&
                !navMenu.contains(event.target) &&
                !hamburger?.contains(event.target)
            ) {
                toggleMobileMenu();
            }
        }
    );

    // Init
    function init() {

        if (heroSubtitle) {
            typeWriter();
        }

        setupAnimations();
        initializeActiveNav();
        handleScroll();

        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);

        console.log(
            'Portfolio initialized 🚀'
        );
    }

    // Contact Form
    const contactForm =
        document.getElementById('contactForm');

    if (contactForm) {

        contactForm.addEventListener(
            'submit',
            function (e) {

                e.preventDefault();

                const formData =
                    new FormData(this);

                const data =
                    Object.fromEntries(formData);

                if (
                    !data.name ||
                    !data.email ||
                    !data.subject ||
                    !data.message
                ) {

                    showNotification(
                        'Please fill all fields',
                        'error'
                    );

                    return;
                }

                console.log(
                    'Form submitted:',
                    data
                );

                showNotification(
                    'Message sent successfully!',
                    'success'
                );

                this.reset();
            }
        );
    }

    // Start App
    init();

    // Dynamic CSS
    const style =
        document.createElement('style');

    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        button {
            position: relative;
            overflow: hidden;
        }

        .loaded {
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;

    document.head.appendChild(style);
});

// Utility Functions
function debounce(func, wait) {

    let timeout;

    return function executedFunction(...args) {

        const later = () => {

            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);

        timeout = setTimeout(
            later,
            wait
        );
    };
}

function throttle(func, limit) {

    let inThrottle;

    return function () {

        const args = arguments;
        const context = this;

        if (!inThrottle) {

            func.apply(context, args);

            inThrottle = true;

            setTimeout(() =>
                inThrottle = false,
                limit
            );
        }
    };
}

// Performance
if ('performance' in window) {

    window.addEventListener('load', () => {

        setTimeout(() => {

            const perfData =
                performance.timing;

            const pageLoadTime =
                perfData.loadEventEnd -
                perfData.navigationStart;

            console.log(
                `Page loaded in ${pageLoadTime}ms`
            );

        }, 0);
    });
}

// Errors
window.addEventListener(
    'error',
    (event) => {

        console.error(
            'JavaScript Error:',
            event.error
        );
    }
);

window.addEventListener(
    'unhandledrejection',
    (event) => {

        console.error(
            'Unhandled Promise Rejection:',
            event.reason
        );
    }
);
```
