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

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.getElementById('scrollToTop');

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

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('[data-aos]');

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            revealOnScroll.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    revealOnScroll.observe(el);
});

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
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
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

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply observer to all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
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

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#22C55E';
        } else {
            link.style.color = 'inherit';
        }
    });
});

// ===== FEATURE CARD HOVER EFFECTS =====
document.querySelectorAll('.feature-card, .problem-card, .impact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

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

// ===== FADE IN HERO CONTENT =====
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-tagline, .hero-buttons');
    
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.animation = `slideUp 0.8s ease-out ${index * 0.1}s forwards`;
    });
});

// ===== CARD STAGGER ANIMATION =====
function staggerCards(selector, delay = 0.1) {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, index) => {
        card.style.animation = `slideInUp 0.6s ease-out ${index * delay}s forwards`;
        card.style.opacity = '0';
    });
}

// Apply stagger animation to different card types
window.addEventListener('load', () => {
    staggerCards('.problem-card', 0.1);
    staggerCards('.feature-card', 0.1);
    staggerCards('.impact-card', 0.1);
    staggerCards('.sdg-card', 0.08);
});

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
    if (e.key === 'Escape') {
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

// ===== TIMELINE ANIMATION =====
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideInUp 0.6s ease-out ${index * 0.2}s forwards`;
            entry.target.style.opacity = '0';
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

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
