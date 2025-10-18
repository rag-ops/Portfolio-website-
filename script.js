// --- 1. THEME TOGGLE AND INITIAL SETUP ---
document.addEventListener('DOMContentLoaded', () => {
    // Variables for elements
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement; 
    const scrollUpBtn = document.getElementById('scroll-to-top');
    const header = document.getElementById('header');
    
    // Mobile menu elements
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle ? menuToggle.querySelector('.menu-icon') : null;
    const closeIcon = menuToggle ? menuToggle.querySelector('.close-icon') : null;


    // Theme logic - RESTORED AND FIXED
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update icons: Hide sun (light) in dark mode, hide moon (dark) in light mode
        const sunIcon = themeToggle ? themeToggle.querySelector('.sun-icon') : null;
        const moonIcon = themeToggle ? themeToggle.querySelector('.moon-icon') : null;

        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                moonIcon.style.opacity = '1'; 
                sunIcon.style.opacity = '0'; 
            } else {
                moonIcon.style.opacity = '0'; 
                sunIcon.style.opacity = '1'; 
            }
        }
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme('light');
    } else {
        setTheme('dark'); // Default to dark
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
    
    // --- MOBILE MENU TOGGLE LOGIC ---
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const isOpen = navLinks.classList.contains('open');

            // Toggle visibility of icons (menu icon vs. close icon)
            if (menuIcon && closeIcon) {
                menuIcon.style.display = isOpen ? 'none' : 'block';
                closeIcon.style.display = isOpen ? 'block' : 'none';
            }
        });

        // Close menu when a navigation link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if(navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    if (menuIcon && closeIcon) {
                        menuIcon.style.display = 'block';
                        closeIcon.style.display = 'none';
                    }
                }
            });
        });
    }


    // --- 2. DYNAMIC TITLE ROTATION (Hero Section) ---
    const titles = [
        "Front-End Developer",
        "AI Enthusiast",
        "AI Agent Builder",
        "Web Developer",
        "Canva Expert",
        "Generative AI Explorer"
    ];
    const dynamicTitleEl = document.getElementById('dynamic-title');
    let titleIndex = 0;

    function rotateTitle() {
        if (!dynamicTitleEl) return;
        dynamicTitleEl.style.opacity = 0; // Fade out

        setTimeout(() => {
            dynamicTitleEl.textContent = titles[titleIndex];
            dynamicTitleEl.style.opacity = 1; // Fade in

            titleIndex = (titleIndex + 1) % titles.length;
        }, 500); // Wait for fade out transition to finish

        setTimeout(rotateTitle, 4000); // Rotate every 4 seconds
    }

    // Start rotation after the initial typing animation is done (approx 3.5s)
    setTimeout(rotateTitle, 3500);


    // --- 3. SCROLL-TRIGGERED ANIMATIONS (Intersection Observer) ---
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-scroll-reveal').forEach(element => {
        observer.observe(element);
    });


    // --- 4. STICKY HEADER AND SCROLL-TO-TOP BUTTON VISIBILITY ---
    
    window.addEventListener('scroll', () => {
        // Sticky Header Effect
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Scroll-to-Top Button Visibility
        if (scrollUpBtn) {
            if (window.scrollY > 300) {
                scrollUpBtn.style.display = 'block';
            } else {
                scrollUpBtn.style.display = 'none';
            }
        }
    });
    
    // Smooth scroll for button
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 5. CONTACT FORM SUBMISSION LOGIC ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Submission logic (using Formspree endpoint from HTML)
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const nameInput = contactForm.querySelector('[name="name"]').value;
                alert(`Transmission Success! Thank you for reaching out, ${nameInput}! Your message has been sent to the command center. Raghav will connect with you soon.`);
                contactForm.reset();
            } else {
                alert('CRITICAL ERROR: Failed to initiate transmission. Please check system logs and try again later.');
            }
        });
    }
    
    // Feather Icons Initialization - Must be run after the DOM is ready
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}); 
