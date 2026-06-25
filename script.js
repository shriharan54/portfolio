document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // THEME SWITCHER
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check local storage for saved theme preference, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================================================
    // TYPEWRITER EFFECT
    // ==========================================================================
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "B.Sc. Software Systems Student",
        "Aspiring Game Developer",
        "Full-Stack Developer"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50; // Deleting is faster
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at the end of word
            typeDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typeDelay);
    }
    
    if (typewriterElement) {
        typeEffect();
    }

    // ==========================================================================
    // MOBILE NAVIGATION MENU
    // ==========================================================================
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // ==========================================================================
    // SCROLLSPY (ACTIVE NAV LINKS ON SCROLL)
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    function scrollSpy() {
        const scrollPosition = window.scrollY + 120; // offset for navbar height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);

    // ==========================================================================
    // BACK TO TOP BUTTON
    // ==========================================================================
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // ==========================================================================
    // PROJECT FILTERING
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                // Fade animation
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(5px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // ==========================================================================
    // CONTACT FORM VALIDATION & SUBMISSION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const submitBtn = document.getElementById('form-submit-btn');
    const resetBtn = document.getElementById('form-reset-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check form validity
            if (!contactForm.checkValidity()) {
                return;
            }
            
            // Change submit button state to loading
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API Request (1.5 seconds)
            setTimeout(() => {
                // Reset form inputs
                contactForm.reset();
                
                // Hide form, show success element
                contactForm.style.display = 'none';
                formSuccess.style.display = 'flex';
                
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            formSuccess.style.display = 'none';
            contactForm.style.display = 'block';
        });
    }

    // ==========================================================================
    // FOOTER DYNAMIC YEAR
    // ==========================================================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
