// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
document.getElementById('menu').onclick = () => {
    document.getElementById('nav').classList.toggle('active');
};

// Dark mode functionality
const darkModeBtn = document.getElementById('darkMode');
const body = document.body;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark');
    darkModeBtn.textContent = '☀️';
}

// Toggle dark mode
darkModeBtn.onclick = () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    darkModeBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Scroll to top functionality
const scrollBtn = document.getElementById('scrollTop');

function scrollToTop() {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}

// Show/hide scroll to top button based on scroll position
window.onscroll = () => {
    scrollBtn.classList.toggle('hidden', window.scrollY < 300);
};

scrollBtn.onclick = scrollToTop;

// Form utility functions
function showError(fieldId, message) {
    document.getElementById(fieldId + 'Error').textContent = message;
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
}

function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    setTimeout(() => element.textContent = '', 5000);
}

// Contact form submission
document.getElementById('contactForm').onsubmit = function(e) {
    e.preventDefault();
    clearErrors();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    let isValid = true;

    // Validate required fields
    if (!data.fullName || !data.fullName.trim()) {
        showError('fullName', 'Name is required');
        isValid = false;
    }

    if (!data.email || !data.email.trim()) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    if (!data.subject || !data.subject.trim()) {
        showError('subject', 'Subject is required');
        isValid = false;
    }

    if (!data.message || !data.message.trim()) {
        showError('message', 'Message is required');
        isValid = false;
    }

    if (isValid) {
        showSuccess('contactSuccess', 'Message sent! I\'ll get back to you soon.');
        this.reset();
    }
};

// Feedback form submission
document.getElementById('feedbackForm').onsubmit = function(e) {
    e.preventDefault();
    clearErrors();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    let isValid = true;

    // Validate required fields
    if (!data.rating) {
        showError('rating', 'Please select a rating');
        isValid = false;
    }

    if (!data.feedbackType) {
        showError('feedbackType', 'Please select feedback type');
        isValid = false;
    }

    if (!data.comments || !data.comments.trim()) {
        showError('comments', 'Comments are required');
        isValid = false;
    }

    if (!data.agreeTerms) {
        showError('agreeTerms', 'You must agree to the terms');
        isValid = false;
    }

    if (isValid) {
        showSuccess('feedbackSuccess', 'Thank you for your valuable feedback!');
        this.reset();
    }
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.onclick = function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };
});

// Project card hover effects and animations
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Initialize cards with fade-in animation
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});
