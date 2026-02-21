document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mobile Menu Logic
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('.nav-links a, .btn-nav').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Image Modal Logic
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('imgFull');
    const closeBtn = document.querySelector('.close-modal');

    document.querySelectorAll('.review-image').forEach(img => {
        img.addEventListener('click', () => {
            if (modal && modalImg) {
                modal.style.display = "flex";
                modalImg.src = img.src;
                document.body.style.overflow = "hidden"; // Prevent scrolling
            }
        });
    });

    const closeModal = () => {
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Restore scrolling
        }
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the image
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Add animation classes to elements
    document.querySelectorAll('.problem-card, .solution-item, .review-image').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.05}s`;
        observer.observe(el);
    });
});
