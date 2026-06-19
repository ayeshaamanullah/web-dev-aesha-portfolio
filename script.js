// script.js - Theme Toggle, FAQ Accordion, Navbar Effects, Active Section Detection

document.addEventListener('DOMContentLoaded', () => {
    // === FAQ Accordion ===
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // === Navbar Scroll Effect ===
    const navbar = document.getElementById('navbar');

    function updateNavbarOnScroll() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    }

    window.addEventListener('scroll', updateNavbarOnScroll);

    // === Active Section Detection ===
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileNavLinks = document.querySelectorAll('.mobile-menu .nav-link');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update desktop nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === currentSection) {
                link.classList.add('active');
            }
        });

        // Update mobile nav links
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // === Mobile Menu Toggle ===
    const hamburger = document.getElementById('hamburger');
    const navWrapper = document.querySelector('.nav-wrapper');

    // Create mobile menu element
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.id = 'mobileMenu';

    // Clone nav links for mobile menu
    const desktopNavLinks = document.getElementById('navLinks');
    if (desktopNavLinks) {
        const linksClone = desktopNavLinks.cloneNode(true);

        // remove desktop class
        linksClone.classList.remove('nav-links');

        // add mobile class
        linksClone.classList.add('mobile-nav-links');

        mobileMenu.appendChild(linksClone);
    }

    navWrapper.appendChild(mobileMenu);

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        // Update aria-expanded
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when a link is clicked
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.closest('.nav-link')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === "#") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Intersection Observer for Fade-in Animations ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate cards on scroll
    document.querySelectorAll('.learn-card, .highlight-card, .audience-card, .faq-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Initial call to set active nav link
    updateActiveNavLink();
});