// Enhanced Theme Toggle Functionality with Dynamic Color Adjustments
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-mode', currentTheme === 'dark');

// Function to apply dynamic dark tone adjustments
function applyDarkToneAdjustments(isDarkMode) {
    const root = document.documentElement;
    
    if (isDarkMode) {
        // Apply darker tones to all UI elements dynamically
        root.style.setProperty('--dark-factor', '0.3');
        
        // Update CSS custom properties for darker tones
        root.style.setProperty('--primary-blue', '#1e40af');
        root.style.setProperty('--primary-blue-hover', '#1e3a8a');
        root.style.setProperty('--accent-yellow', '#d97706');
        root.style.setProperty('--accent-yellow-hover', '#b45309');
        root.style.setProperty('--text-primary', '#e5e7eb');
        root.style.setProperty('--text-secondary', '#d1d5db');
        root.style.setProperty('--text-muted', '#9ca3af');
        root.style.setProperty('--bg-primary', '#111827');
        root.style.setProperty('--bg-secondary', '#1f2937');
        root.style.setProperty('--bg-tertiary', '#374151');
        root.style.setProperty('--border-color', '#4b5563');
        root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)');
        root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #4c1d95 0%, #581c87 100%)');
        
        // Apply darker tones to elements that don't have specific dark mode styles
        const elementsToAdjust = document.querySelectorAll('.hero, .footer, .project-image');
        elementsToAdjust.forEach(element => {
            if (element.classList.contains('hero')) {
                element.style.background = 'linear-gradient(135deg, #4c1d95 0%, #581c87 100%)';
            } else if (element.classList.contains('footer')) {
                element.style.background = '#0f172a';
            } else if (element.classList.contains('project-image')) {
                element.style.background = 'linear-gradient(135deg, #4c1d95 0%, #581c87 100%)';
            }
        });
    } else {
        // Reset to light mode colors
        root.style.setProperty('--dark-factor', '1');
        root.style.setProperty('--primary-blue', '#2563eb');
        root.style.setProperty('--primary-blue-hover', '#1d4ed8');
        root.style.setProperty('--accent-yellow', '#fbbf24');
        root.style.setProperty('--accent-yellow-hover', '#f59e0b');
        root.style.setProperty('--text-primary', '#333');
        root.style.setProperty('--text-secondary', '#6b7280');
        root.style.setProperty('--text-muted', '#9ca3af');
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f8fafc');
        root.style.setProperty('--bg-tertiary', '#f3f4f6');
        root.style.setProperty('--border-color', '#e5e7eb');
        root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.05)');
        root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
        
        // Reset elements to light mode
        const elementsToReset = document.querySelectorAll('.hero, .footer, .project-image');
        elementsToReset.forEach(element => {
            if (element.classList.contains('hero')) {
                element.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            } else if (element.classList.contains('footer')) {
                element.style.background = '#1f2937';
            } else if (element.classList.contains('project-image')) {
                element.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        });
    }
}

// Initialize navbar state and apply dark tone adjustments
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Apply initial dark tone adjustments
    applyDarkToneAdjustments(isDarkMode);
    
    if (isDarkMode) {
        navbar.style.background = 'rgba(17, 24, 39, 0.95)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Enhanced theme toggle click handler
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save theme preference
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Apply dynamic dark tone adjustments
    applyDarkToneAdjustments(isDark);
    
    // Update navbar state immediately
    const navbar = document.querySelector('.navbar');
    if (isDark) {
        navbar.style.background = 'rgba(17, 24, 39, 0.95)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    // Add click animation
    themeToggle.style.transform = 'scale(0.8)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links with enhanced curtain effect (only TO home)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const curtain = document.querySelector('.curtain-overlay');
        
        // Check if we're navigating TO the home section
        const isNavigatingToHome = target && target.id === 'home';
        
        if (target) {
            if (isNavigatingToHome) {
                // Add fade out effect to current content
                const currentSection = document.querySelector('section:not(.transitioning)');
                if (currentSection) {
                    currentSection.classList.add('content-fade-out');
                }
                
                // Show curtain after fade out starts
                setTimeout(() => {
                    curtain.classList.add('active');
                    
                    // Add transitioning class
                    if (currentSection) {
                        currentSection.classList.add('transitioning');
                        currentSection.classList.remove('content-fade-out');
                    }
                    
                    // Wait for curtain to cover screen, then scroll
                    setTimeout(() => {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Hide curtain after scroll
                        setTimeout(() => {
                            curtain.classList.remove('active');
                            
                            // Remove transitioning class
                            if (currentSection) {
                                currentSection.classList.remove('transitioning');
                            }
                        }, 300);
                    }, 250);
                }, 150);
            } else {
                // Regular smooth scroll for all other navigation
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form submission handling with Formspree
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Let the form submit naturally to Formspree
        // We'll just add some visual feedback
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Add a small delay to show the loading state
        setTimeout(() => {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Enhanced scroll effect to navbar with dynamic color adjustments
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (window.scrollY > 100) {
        if (isDarkMode) {
            navbar.style.background = 'rgba(17, 24, 39, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    } else {
        if (isDarkMode) {
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Add intersection observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
