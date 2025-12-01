
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const contentSections = document.querySelectorAll('.content-section');
        const footerLinks = document.querySelectorAll('.footer-link');

        // Hamburger menu toggle
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Navigation click handler
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links and sections
                navLinks.forEach(l => l.classList.remove('active'));
                contentSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Show corresponding section
                const sectionId = link.getAttribute('data-section');
                document.getElementById(sectionId).classList.add('active');
                
                // Close mobile menu after clicking
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                // Scroll to top of the section
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });

        // Footer link navigation
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links and sections
                navLinks.forEach(l => l.classList.remove('active'));
                contentSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const sectionId = link.getAttribute('data-section');
                document.querySelector(`.nav-link[data-section="${sectionId}"]`).classList.add('active');
                
                // Show corresponding section
                document.getElementById(sectionId).classList.add('active');
                
                // Scroll to top of the section
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });

        // Close menu when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!e.target.closest('.navbar')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });

        // Gallery Lightbox Functionality
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightboxModal = document.getElementById('lightbox-modal');
        const lightboxImage = lightboxModal.querySelector('.lightbox-image');
        const lightboxCaption = lightboxModal.querySelector('.lightbox-caption');
        const lightboxClose = lightboxModal.querySelector('.lightbox-close');
        const lightboxPrev = lightboxModal.querySelector('.lightbox-prev');
        const lightboxNext = lightboxModal.querySelector('.lightbox-next');
        
        let currentImageIndex = 0;
        const images = Array.from(galleryItems).map(item => ({
            src: item.querySelector('.gallery-image').src,
            caption: item.querySelector('.gallery-caption').textContent
        }));

        // Open lightbox when gallery image is clicked
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentImageIndex = index;
                updateLightbox();
                lightboxModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Update lightbox content
        function updateLightbox() {
            lightboxImage.src = images[currentImageIndex].src;
            lightboxCaption.textContent = images[currentImageIndex].caption;
        }

        // Close lightbox
        lightboxClose.addEventListener('click', () => {
            lightboxModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });

        // Navigation between images
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateLightbox();
        });

        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightboxModal.style.display === 'block') {
                if (e.key === 'Escape') {
                    lightboxModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft') {
                    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                    updateLightbox();
                } else if (e.key === 'ArrowRight') {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    updateLightbox();
                }
            }
        });

        // Contact form submission
        const contactForm = document.querySelector('.queries-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                // Simple validation
                if (!name || !email || !subject || !message) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                // Show success message
                alert('Thank you for your message! We will get back to you within 24-48 hours.');
                
                // Reset form
                contactForm.reset();
                
                // Scroll to top of form
                contactForm.scrollIntoView({ behavior: 'smooth' });
            });
        }
    
