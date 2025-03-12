// Main JavaScript file for Abdallah Ayman Kassem's portfolio

document.addEventListener('DOMContentLoaded', function () {
    // Initialize preloader
    initPreloader();

    // Initialize dark mode
    initDarkMode();

    // Initialize scroll features
    initScrollToTop();
    initScrollProgressIndicator();

    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initParticles();
    initTypingEffect();
    initCursorFollow();
    initProjectCards();
    initSkillIcons();
    initContactAnimation();
    initBackgroundShapes();
    initScrollDownIndicator();
    initGlitchText();

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking a link
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
        });
    });

    // Add floating animation to profile picture
    const profilePic = document.querySelector('#home .rounded-full');
    if (profilePic) {
        profilePic.classList.add('floating', 'profile-pic');
    }

    // Add shine effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('shine');
    });

    // Add glow effect to social icons
    const socialIcons = document.querySelectorAll('footer .flex.space-x-6 a');
    socialIcons.forEach(icon => {
        icon.classList.add('glow-on-hover');
    });

    // Add rotating effect to skill icons
    const skillIcons = document.querySelectorAll('.skill-card .inline-flex i');
    skillIcons.forEach(icon => {
        icon.classList.add('rotate-icon');
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('a.bg-primary, a.border-2, a.bg-white');
    buttons.forEach(button => {
        button.classList.add('ripple');
    });

    // Add contact card animation
    const contactCard = document.querySelector('#contact .bg-gray-100');
    if (contactCard) {
        contactCard.classList.add('contact-card');
    }

    // Add gradient text animation to section headings
    const sectionHeadings = document.querySelectorAll('section h2 span');
    sectionHeadings.forEach(heading => {
        heading.classList.add('gradient-text');
    });

    // Add background pattern to certain sections
    document.querySelector('#home').classList.add('bg-pattern');
    document.querySelector('footer').classList.add('bg-pattern');

    // Add contact icon animations
    const contactIcons = document.querySelectorAll('#contact .mt-10 a');
    contactIcons.forEach(icon => {
        icon.classList.add('contact-icon');
    });

    // Scroll animation using Framer Motion if available
    if (window.framerMotion) {
        initFramerMotionAnimations();
    } else {
        // Fallback for scroll animations
        initScrollAnimations();
    }

    // Add particles background effect to home section
    initParticles();

    // Add typing effect to the main heading
    initTypingEffect();
});

// ===== SCROLL TO TOP FUNCTIONALITY =====
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (!scrollToTopBtn) return;

    // Show button when scrolling down past a threshold
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgressIndicator() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', function () {
        const windowScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / windowHeight) * 100;

        progressBar.style.width = scrolled + '%';
    });
}

// ===== PRELOADER FUNCTIONALITY =====
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Wait for the page to finish loading
    window.addEventListener('load', () => {
        // Add a slight delay for a smoother experience
        setTimeout(() => {
            preloader.classList.add('fade-out');

            // Remove the preloader after the fade-out animation completes
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    });
}

// ===== DARK MODE FUNCTIONALITY =====
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const body = document.body;

    // Check if user has previously set a preference
    const darkMode = localStorage.getItem('darkMode');

    // Set initial state
    if (darkMode === 'enabled') {
        enableDarkMode();
    }

    // Toggle dark mode when buttons are clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);
    }

    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleDarkMode);
    }

    function toggleDarkMode() {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }

    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');

        // Update icon
        updateIcons('fa-sun');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', null);

        // Update icon
        updateIcons('fa-moon');
    }

    function updateIcons(iconClass) {
        if (themeToggle) {
            themeToggle.querySelector('i').className = `fas ${iconClass}`;
        }

        if (themeToggleMobile) {
            themeToggleMobile.querySelector('i').className = `fas ${iconClass}`;
        }
    }
}

// Handle contact form submission
function handleFormSubmit(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    const formContainer = document.getElementById('contact-form').parentNode;
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success mt-4';
    successMessage.innerHTML = `
        <p class="font-bold">Message Sent Successfully!</p>
        <p>Thank you ${name} for reaching out. I'll get back to you soon.</p>
    `;

    // Replace the form with success message
    document.getElementById('contact-form').classList.add('hidden');
    formContainer.appendChild(successMessage);

    // Reset form (in case we want to show it again later)
    document.getElementById('contact-form').reset();
}

// Initialize scroll animations using Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Initial check for elements in viewport
    checkElementsInViewport();

    // Check elements when scrolling
    window.addEventListener('scroll', checkElementsInViewport);

    function checkElementsInViewport() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;

            // If element is in viewport
            if (elementTop < windowHeight - elementHeight / 2) {
                element.classList.add('visible');
            }
        });
    }

    // Parallax effect for background elements
    window.addEventListener('scroll', function () {
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.3;
            const scrollPosition = window.pageYOffset;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
}

// Initialize Framer Motion animations
function initFramerMotionAnimations() {
    // Use Framer Motion for animations if available
    const { motion, useAnimation } = window.framerMotion;

    // This is a simplified version - in a real app, we would integrate more fully with Framer Motion
    // Since we're using it as a script tag and not in a React app, we'll just use some of its utilities
    console.log('Framer Motion is available for enhanced animations');
}

// Add a particle effect to the home section
function initParticles() {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '0';

    homeSection.insertBefore(particlesContainer, homeSection.firstChild);

    const particleCount = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }

    function createParticle(container) {
        const particle = document.createElement('div');

        // Randomize particle properties
        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.1;

        // Set particle styles
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = '#3E6699';
        particle.style.top = `${posY}%`;
        particle.style.left = `${posX}%`;
        particle.style.opacity = opacity;

        // Add animation
        particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
        particle.style.transform = 'translateY(0)';

        // Add to container
        container.appendChild(particle);
    }

    // Add keyframes for particle animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-100px) translateX(20px); }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Add typing effect to main heading
function initTypingEffect() {
    const element = document.querySelector('.typing-text');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';

    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 100);
}

// Handle smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Smooth scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-primary', 'font-medium');

        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('text-primary', 'font-medium');
        }
    });
});

// Add parallax effect to home section
window.addEventListener('scroll', function () {
    const home = document.getElementById('home');
    const scrollPosition = window.pageYOffset;

    if (home && scrollPosition < home.offsetHeight) {
        // Move background at a different rate than foreground for parallax effect
        home.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// Initialize tilt effect on project cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;

            const rotateX = (mouseY / (cardRect.height / 2)) * 5; // Max 5 degrees
            const rotateY = -(mouseX / (cardRect.width / 2)) * 5; // Max 5 degrees

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Call tilt effect initialization
setTimeout(initTiltEffect, 1000); // Delay to ensure DOM is fully loaded

// ===== NAVIGATION =====
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }

            // Get the target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active section in navigation
    window.addEventListener('scroll', function () {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = 80;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - navHeight - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== CURSOR FOLLOW EFFECT =====
function initCursorFollow() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-follow');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Add hover effect on links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .social-icon');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.borderColor = 'rgba(62, 102, 153, 0.8)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.borderColor = 'rgba(62, 102, 153, 0.4)';
        });
    });
}

// ===== PROJECT CARDS =====
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // Tilt effect
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = x / rect.width - 0.5;
            const yPercent = y / rect.height - 0.5;

            const rotateX = yPercent * -10;
            const rotateY = xPercent * 10;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
                translateY(-8px)
            `;

            // Add shine effect based on mouse position
            const shine = card.querySelector('.shine');
            if (shine) {
                shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
            }
        });

        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            const shine = card.querySelector('.shine');
            if (shine) {
                shine.style.background = '';
            }
        });

        // Add ripple effect on click
        card.addEventListener('click', e => {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple-effect');

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== SKILL ICONS =====
function initSkillIcons() {
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        // Rotate icon on hover
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.fas, .fab, .skill-icon');
            if (icon) {
                icon.style.animation = 'rotate 2s linear infinite';
            }
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.fas, .fab, .skill-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
}

// ===== CONTACT ANIMATION =====
function initContactAnimation() {
    const contactContainer = document.querySelector('.contact-container');
    if (!contactContainer) return;

    const contactItems = contactContainer.querySelectorAll('.contact-item');

    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Show contact items when scrolled into view
    window.addEventListener('scroll', () => {
        const containerTop = contactContainer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (containerTop < windowHeight - 100) {
            contactItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
        }
    });
}

// ===== BACKGROUND SHAPES =====
function initBackgroundShapes() {
    // Add skills section circles
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsCircles = document.createElement('div');
        skillsCircles.classList.add('skills-circles');
        skillsSection.insertBefore(skillsCircles, skillsSection.firstChild);
    }

    // Add projects section shapes
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        const projectsShapes = document.createElement('div');
        projectsShapes.classList.add('projects-shapes');
        projectsSection.insertBefore(projectsShapes, projectsSection.firstChild);
    }

    // Add animated background lines to home section
    const homeSection = document.getElementById('home');
    if (homeSection) {
        const bgLines = document.createElement('div');
        bgLines.classList.add('animated-bg-lines');
        homeSection.insertBefore(bgLines, homeSection.firstChild);
    }
}

// ===== SCROLL DOWN INDICATOR =====
function initScrollDownIndicator() {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-down-indicator');
    scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
    homeSection.appendChild(scrollIndicator);

    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            window.scrollTo({
                top: aboutSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}

// ===== GLITCH TEXT EFFECT =====
function initGlitchText() {
    const glitchTexts = document.querySelectorAll('.glitch-text');

    glitchTexts.forEach(text => {
        text.setAttribute('data-text', text.textContent);
    });

    // Also initialize calm dark text effect
    const calmDarkTexts = document.querySelectorAll('.calm-dark-text');

    calmDarkTexts.forEach(text => {
        text.setAttribute('data-text', text.textContent);
    });
}

// ===== Add ripple effect to buttons =====
document.addEventListener('click', function (e) {
    const target = e.target;

    if (target.classList.contains('btn-primary') || target.classList.contains('btn-secondary')) {
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        target.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// ===== FLOATING SKILL TAGS =====
function addFloatingTags() {
    const profileContainer = document.querySelector('.profile-container');
    if (!profileContainer) return;

    // Skip if tags are already added (since we're calling this in multiple places)
    if (profileContainer.querySelector('.floating-tag')) return;

    const skills = ['Selenium', 'Jira', 'Agile', 'Python'];
    const classes = ['tag-selenium', 'tag-jira', 'tag-agile', 'tag-python'];

    skills.forEach((skill, index) => {
        const tag = document.createElement('div');
        tag.classList.add('floating-tag', classes[index]);
        tag.textContent = skill;
        profileContainer.appendChild(tag);
    });
}

// Call this function after DOM is loaded
window.addEventListener('load', addFloatingTags); 