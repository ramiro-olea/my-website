// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add slight delay to follower
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .skill-card, .project-card, .stat-item');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section, .skill-card, .project-card, .timeline-item, .stat-item').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Initialize EmailJS with your public key
emailjs.init("RSg2Djk8sVxqsKtth"); // Replace with your actual EmailJS public key

// Function to send email
async function sendEmail(e) {
    e.preventDefault();
    
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');
    
    // Show loading state
    statusDiv.className = 'form-status loading';
    statusDiv.textContent = 'Sending message...';
    statusDiv.style.display = 'block';
    
    try {
        const templateParams = {
            from_name: form.name.value,
            from_email: form.email.value,
            message: form.message.value,
            to_name: 'Ramiro Olea'
        };

        await emailjs.send('service_bsb720o', 'template_lyq922k', templateParams);
        
        // Show success message
        statusDiv.className = 'form-status success';
        statusDiv.textContent = 'Message sent successfully! I will get back to you soon.';
        
        // Reset form
        form.reset();
        
    } catch (error) {
        // Show error message
        statusDiv.className = 'form-status error';
        statusDiv.textContent = 'Failed to send message. Please try again later.';
        console.error('Error sending email:', error);
    }
    
    // Hide status message after 5 seconds
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 5000);
    
    return false;
}

// Add typing effect to hero section
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    const text = glitchText.getAttribute('data-text');
    let currentText = '';
    let currentIndex = 0;
    
    function typeText() {
        if (currentIndex < text.length) {
            currentText += text[currentIndex];
            glitchText.textContent = currentText;
            currentIndex++;
            setTimeout(typeText, 100);
        }
    }
    
    // Start typing effect when hero section is in view
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeText();
            heroObserver.unobserve(entries[0].target);
        }
    }, observerOptions);
    
    heroObserver.observe(document.querySelector('#hero'));
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('#hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Add CSS classes for animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .success-message {
            background-color: #10B981;
            color: white;
            padding: 1rem;
            border-radius: 5px;
            margin-top: 1rem;
            text-align: center;
        }
        
        .error-message {
            background-color: #EF4444;
            color: white;
            padding: 1rem;
            border-radius: 5px;
            margin-top: 1rem;
            text-align: center;
        }
        
        .navbar.scroll-down {
            transform: translateY(-100%);
        }
        
        .navbar.scroll-up {
            transform: translateY(0);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
    </style>
`);

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Update animated name for mobile
const animatedName = document.querySelector('.animated-name');
if (animatedName) {
    const text = animatedName.getAttribute('data-text') || animatedName.textContent;
    let index = 0;
    let typing = true;
    let loopTimeout;
    let isMobile = window.innerWidth <= 768;

    function typeWriter() {
        if (typing) {
            if (index <= text.length) {
                if (isMobile) {
                    // For mobile, use a simpler animation without word wrapping
                    animatedName.textContent = text.substring(0, index);
                } else {
                    animatedName.textContent = text.substring(0, index);
                }
                index++;
                loopTimeout = setTimeout(typeWriter, isMobile ? 120 : 90); // Slower on mobile
            } else {
                typing = false;
                loopTimeout = setTimeout(typeWriter, isMobile ? 2000 : 1200); // Longer pause on mobile
            }
        } else {
            if (index >= 0) {
                if (isMobile) {
                    animatedName.textContent = text.substring(0, index);
                } else {
                    animatedName.textContent = text.substring(0, index);
                }
                index--;
                loopTimeout = setTimeout(typeWriter, isMobile ? 60 : 40); // Slower on mobile
            } else {
                typing = true;
                loopTimeout = setTimeout(typeWriter, isMobile ? 1000 : 600); // Longer pause on mobile
            }
        }
    }

    // Update mobile status on resize and handle animation
    function handleResize() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        
        // Only restart animation if mobile state changed
        if (wasMobile !== isMobile) {
            clearTimeout(loopTimeout);
            index = 0;
            typing = true;
            animatedName.textContent = '';
            typeWriter();
        }
    }

    window.addEventListener('resize', handleResize);

    // Start the animation
    typeWriter();
}

// Project image modal functionality
function openProjectModal(imgElem) {
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('projectModalImg');
    modalImg.src = imgElem.src;
    modalImg.alt = imgElem.alt;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal(event) {
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('projectModalImg');
    // Only close if clicking outside the image or on the close button
    if (event.target === modal || event.target.classList.contains('project-modal-close')) {
        modal.classList.remove('active');
        modalImg.src = '';
        document.body.style.overflow = '';
    }
} 