// Theme Toggle Functionality with System Theme Detection
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Function to apply theme
function applyTheme(theme) {
    htmlElement.classList.remove('dark-theme', 'light-theme');
    htmlElement.classList.add(theme);
}

// Function to get default theme preference
function getSystemTheme() {
    return 'dark-theme';
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    if (savedTheme) {
        // If user has manually set a theme, use that
        applyTheme(savedTheme);
    } else {
        // Otherwise, use dark theme by default
        applyTheme('dark-theme');
    }
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
    initializeTheme();
}

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
        const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
        
        applyTheme(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });
}

// Listen for system theme changes
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeQuery.addEventListener('change', (e) => {
    // Only update theme if user hasn't manually set a preference
    if (!localStorage.getItem('portfolio-theme')) {
        const newTheme = e.matches ? 'dark-theme' : 'light-theme';
        applyTheme(newTheme);
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            }
        }
    });
});

// 3D Tilt Effect on Profile Card
const profileCard = document.querySelector('.profile-card');

if (profileCard) {
    profileCard.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    profileCard.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
}

// Parallax Effect on Hero Section
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.style.backgroundPosition = `0 ${scrollPos * 0.5}px`;
    }
});

// Scroll Animation for Elements
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

// Observe all cards and sections
document.querySelectorAll('.project-card, .skill-category, .stat-card, .info-box').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: this.children[0].value,
            email: this.children[1].value,
            message: this.children[2].value
        };
        
        // Show success message
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Message Sent! ✓';
        button.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
        
        // Reset form
        this.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isDarkMode = htmlElement.classList.contains('dark-theme') || 
                       (!htmlElement.classList.contains('light-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (window.scrollY > 50) {
        navbar.style.background = isDarkMode 
            ? 'rgba(15, 14, 23, 0.98)' 
            : 'rgba(248, 249, 250, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(108, 92, 231, 0.1)';
    } else {
        navbar.style.background = isDarkMode 
            ? 'rgba(15, 14, 23, 0.95)' 
            : 'rgba(248, 249, 250, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    }
});

// Add touch support for mobile 3D effect
let touchStartX = 0;
let touchStartY = 0;

if (profileCard) {
    profileCard.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    profileCard.addEventListener('touchmove', (e) => {
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const deltaX = (touchEndX - touchStartX) / 50;
        const deltaY = (touchEndY - touchStartY) / 50;
        
        profileCard.style.transform = `rotateX(${deltaY}deg) rotateY(${deltaX}deg) scale(1.02)`;
    });

    profileCard.addEventListener('touchend', () => {
        profileCard.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
}

// Skill tags animation on hover
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Project cards stagger animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Performance optimization: throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
        }, 100);
    }
});

console.log('Portfolio JS loaded successfully! 🚀');
