// ===================================
// ENERGY HIVE - INTERACTIVE JAVASCRIPT
// ===================================

// ===== THEME TOGGLE (Dark/Light Mode) =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon();
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        updateThemeIcon();
    });
}

function updateThemeIcon() {
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    if (icon) {
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ANIMATED COUNTERS =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .impact-number');
    
    counters.forEach(counter => {
        const targetAttr = counter.getAttribute('data-target');
        
        // Only animate if data-target exists and is a number
        if (!targetAttr || isNaN(parseInt(targetAttr))) {
            return; // Skip non-numeric counters
        }
        
        const target = parseInt(targetAttr);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Use Intersection Observer to start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Call counter animation on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateCounters);
} else {
    animateCounters();
}

// Scroll Reveal system replaced with unified observer below

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// ===== IMPACT SIMULATOR =====
const simulatorPresets = {
    market: { households: 120, outage: 6, cooling: 75 },
    clinic: { households: 80, outage: 9, cooling: 90 },
    school: { households: 150, outage: 5, cooling: 70 }
};

const householdInput = document.getElementById('householdInput');
const outageInput = document.getElementById('outageInput');
const coolingInput = document.getElementById('coolingInput');
const householdValue = document.getElementById('householdValue');
const outageValue = document.getElementById('outageValue');
const coolingValue = document.getElementById('coolingValue');
const foodValue = document.getElementById('foodValue');
const backupValue = document.getElementById('backupValue');
const co2Value = document.getElementById('co2Value');
const scoreValue = document.getElementById('scoreValue');
const simulatorMessage = document.getElementById('simulatorMessage');
const runSimulationBtn = document.getElementById('runSimulation');
const scenarioButtons = document.querySelectorAll('.scenario-pill');

function animateValue(element, endValue, suffix = '') {
    const startValue = parseFloat(element.textContent) || 0;
    const duration = 700;
    const startTime = performance.now();

    function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = startValue + (endValue - startValue) * progress;
        element.textContent = `${Math.round(value)}${suffix}`;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

function updateSimulator() {
    const households = Number(householdInput.value);
    const outageHours = Number(outageInput.value);
    const coolingDemand = Number(coolingInput.value);

    const foodPreserved = Math.round(households * 7.2 * (coolingDemand / 100));
    const backupHours = Math.round(outageHours * 1.1 + households / 80);
    const co2Avoided = Math.round(households * 2.1 * (coolingDemand / 100));
    const score = Math.min(99, Math.round((households / 5) + outageHours * 4 + coolingDemand * 0.3));

    householdValue.textContent = households;
    outageValue.textContent = outageHours;
    coolingValue.textContent = coolingDemand;

    animateValue(foodValue, foodPreserved, ' kg');
    animateValue(backupValue, backupHours, ' hrs');
    animateValue(co2Value, co2Avoided, ' kg');
    animateValue(scoreValue, score);

    if (score >= 90) {
        simulatorMessage.textContent = 'A strong community-wide impact';
    } else if (score >= 75) {
        simulatorMessage.textContent = 'Reliable energy for everyday life';
    } else {
        simulatorMessage.textContent = 'A meaningful first step toward resilience';
    }
}

if (householdInput && outageInput && coolingInput && runSimulationBtn) {
    [householdInput, outageInput, coolingInput].forEach(input => {
        input.addEventListener('input', updateSimulator);
    });

    runSimulationBtn.addEventListener('click', updateSimulator);

    scenarioButtons.forEach(button => {
        button.addEventListener('click', () => {
            scenarioButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const preset = simulatorPresets[button.dataset.scenario];
            householdInput.value = preset.households;
            outageInput.value = preset.outage;
            coolingInput.value = preset.cooling;
            updateSimulator();
        });
    });

    updateSimulator();
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        const recipient = 'pandey28siddhant@gmail.com';
        const mailSubject = `Energy Hive Feedback: ${subject}`;
        const mailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
        const mailToLink = `mailto:${recipient}?subject=${encodeURIComponent(mailSubject)}&body=${mailBody}`;

        window.location.href = mailToLink;
        showNotification('Opening your mail app to send the message...', 'success');
        contactForm.reset();
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInDown 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== UNIFIED SCROLL REVEAL ANIMATIONS =====
const animatableElements = document.querySelectorAll(
    '.problem-card, .feature-card, .impact-card, .sdg-card, .timeline-item, .gallery-item, .process-step, .section-title, .section-subtitle, .simulator-shell, .team-content, .mission-statement, .competition-info, .contact-form-wrapper, .contact-info, .info-panel'
);

animatableElements.forEach(el => {
    el.classList.add('reveal-item');
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    const intersecting = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);

    intersecting.forEach((entry, index) => {
        const el = entry.target;
        const staggerDelay = index * 100;
        
        setTimeout(() => {
            el.classList.add('reveal-visible');
        }, staggerDelay);
        
        observer.unobserve(el);
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
});

animatableElements.forEach(el => {
    revealObserver.observe(el);
});

// ===== ACTIVE HASH NAVIGATION =====
// Multi-page navigation keeps its active state; this only updates same-page hash links.
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    if (!current) return;

    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// ===== 3D CARD INTERACTIONS =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
    document.querySelectorAll('.feature-card, .problem-card, .impact-card, .sdg-card, .process-step, .timeline-item, .info-panel').forEach(card => {
        card.classList.add('tilt-card');
        card.addEventListener('pointermove', (event) => {
            const bounds = card.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            card.style.setProperty('--card-rotate-x', `${y * -6}deg`);
            card.style.setProperty('--card-rotate-y', `${x * 7}deg`);
        });
        card.addEventListener('pointerleave', () => {
            card.style.setProperty('--card-rotate-x', '0deg');
            card.style.setProperty('--card-rotate-y', '0deg');
        });
    });
}

// ===== PARALLAX EFFECT ON HERO =====
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const parallaxElements = hero.querySelectorAll('.solar-animation, .energy-particles');
        
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    });
}

// ===== 3D HERO INTERACTION =====
const hiveScene = document.querySelector('[data-tilt]');
if (hiveScene && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    hiveScene.addEventListener('pointermove', (event) => {
        const bounds = hiveScene.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        hiveScene.style.setProperty('--tilt-x', `${y * -10}deg`);
        hiveScene.style.setProperty('--tilt-y', `${x * 12}deg`);
    });

    hiveScene.addEventListener('pointerleave', () => {
        hiveScene.style.setProperty('--tilt-x', '0deg');
        hiveScene.style.setProperty('--tilt-y', '0deg');
    });
}

// ===== FADE IN HERO CONTENT =====
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-tagline, .hero-buttons');
    
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.animation = `slideUp 0.8s ease-out ${index * 0.1}s forwards`;
    });
});

// Cards reveal handled by unified observer

// ===== HOVER GLOW EFFECT FOR BUTTONS =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.3)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// ===== COUNTER ANIMATION ON VIEW =====
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.stat-number, .impact-number');
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !el.classList.contains('animated')) {
            el.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu) {
        navMenu.classList.remove('active');
    }
});

// ===== ACTIVE STATES FOR NAVIGATION =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.style.opacity = '0.7');
        this.style.opacity = '1';
    });
});

// ===== PRELOAD IMAGES =====
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const loadImg = new Image();
        loadImg.src = img.src;
    });
}

window.addEventListener('load', preloadImages);

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== DYNAMIC GRADIENT ANIMATION =====
function animateGradient() {
    const gradientElements = document.querySelectorAll('[class*="gradient"]');
    gradientElements.forEach(el => {
        el.style.backgroundPosition = '0% center';
        el.style.animation = 'gradient 8s ease infinite';
        el.style.backgroundSize = '200% 200%';
    });
}

window.addEventListener('load', animateGradient);

// ===== MOBILE OPTIMIZATION =====
if (window.innerWidth <= 768) {
    // Disable hover effects on mobile
    document.querySelectorAll('.feature-card, .problem-card, .impact-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });

        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ===== INTERSECTION OBSERVER FOR LAZY LOADING =====
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===== LOG INITIALIZATION =====
console.log('Energy Hive Website Loaded Successfully!');
console.log('Theme:', localStorage.getItem('theme') || 'light');

// ===== FORM VALIDATION HELPER =====
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#EF4444';
            isValid = false;
        } else {
            input.style.borderColor = 'inherit';
        }
    });

    return isValid;
}

// ===== CUSTOM SCROLLBAR ANIMATION =====
window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    document.documentElement.style.setProperty('--scroll', scrolled + '%');
});

// ===== PAGE LOAD COMPLETE ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-out';

// ===== SOCIAL MEDIA LINKS HANDLING =====
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
        if (this.href === '#') {
            e.preventDefault();
            alert('Social media links can be configured in the HTML');
        }
    });
});

// ===== GALLERY PLACEHOLDER INTERACTION =====
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // Can be used to open a modal or lightbox
        console.log('Gallery item clicked');
    });
});

// Timeline reveal handled by unified observer

// ===== SMOOTH PAGE TRANSITION =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});

// ===== PRINT STYLES =====
window.addEventListener('beforeprint', () => {
    document.body.style.color = '#000';
    document.body.classList.remove('dark-mode');
});

window.addEventListener('afterprint', () => {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add ARIA labels to interactive elements
document.querySelectorAll('.btn').forEach(btn => {
    if (!btn.getAttribute('aria-label')) {
        btn.setAttribute('aria-label', btn.textContent);
    }
});

// ===== PERFORMANCE MONITORING =====
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    });
}

// ===== END OF SCRIPT =====
