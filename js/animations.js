// animations.js - Enhanced with Framer Motion-like animations

document.addEventListener('DOMContentLoaded', () => {
    // Page transition effect
    const pageTransition = () => {
        document.body.classList.add('page-transition-enter');
        setTimeout(() => {
            document.body.classList.add('page-transition-enter-active');
        }, 10);
        
        setTimeout(() => {
            document.body.classList.remove('page-transition-enter');
            document.body.classList.remove('page-transition-enter-active');
        }, 500);
    };
    
    // Run page transition on load
    pageTransition();
    
    // Intersection Observer for scroll animations
    const createScrollObserver = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const handleIntersect = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const delay = target.dataset.delay || 0;
                    
                    // Apply animations based on data attributes
                    setTimeout(() => {
                        if (target.dataset.animation === 'fadeInLeft') {
                            target.classList.add('animate-fadeInLeft');
                        } else if (target.dataset.animation === 'fadeInRight') {
                            target.classList.add('animate-fadeInRight');
                        } else if (target.dataset.animation === 'fadeInScale') {
                            target.classList.add('animate-fadeInScale');
                        } else {
                            target.classList.add('animate-fadeInUp');
                        }
                    }, delay);
                    
                    observer.unobserve(target);
                }
            });
        };
        
        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        
        // Observe elements with data-animate attribute
        document.querySelectorAll('[data-animate]').forEach(element => {
            observer.observe(element);
        });
    };
    
    // Staggered animations for container children
    const setupStaggeredAnimations = () => {
        const containers = document.querySelectorAll('[data-stagger]');
        
        containers.forEach(container => {
            const children = container.querySelectorAll('[data-stagger-child]');
            const staggerDelay = parseInt(container.dataset.staggerDelay || 100);
            
            children.forEach((child, index) => {
                child.style.opacity = '0';
                child.dataset.delay = index * staggerDelay;
            });
        });
    };
    
    // Enhanced hover effects
    const setupEnhancedHoverEffects = () => {
        // Card hover effects
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                const icon = card.querySelector('.feature-icon');
                if (icon) icon.style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                const icon = card.querySelector('.feature-icon');
                if (icon) icon.style.transform = '';
            });
        });
        
        // Button hover effects with magnetic pull
        document.querySelectorAll('.btn-gradient').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const offsetX = (x - centerX) / centerX * 3;
                const offsetY = (y - centerY) / centerY * 3;
                
                button.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.02)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
        
        // Icon spin on hover
        document.querySelectorAll('.icon-spin-hover').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transition = 'transform 0.5s ease';
                icon.style.transform = 'rotate(360deg)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transition = 'transform 0.5s ease';
                icon.style.transform = 'rotate(0deg)';
            });
        });
    };
    
    // Add parallax effect to hero section
    const setupParallax = () => {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroElements = heroSection.querySelectorAll('.parallax');
            
            heroElements.forEach(element => {
                const speed = parseFloat(element.dataset.speed || 0.1);
                element.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    };
    
    // Create wave effect for CTA section
    const createWaveEffect = () => {
        const ctaSection = document.querySelector('.cta-section');
        if (!ctaSection) return;
        
        const wave = document.createElement('div');
        wave.classList.add('wave');
        wave.innerHTML = `<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" fill-opacity="1" d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,181.3C960,160,1056,96,1152,74.7C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>`;
        
        ctaSection.appendChild(wave);
    };
    
    // Create typing effect for heading text
    const createTypingEffect = () => {
        const elements = document.querySelectorAll('[data-typing]');
        
        elements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '3px solid';
            
            let i = 0;
            const typeSpeed = parseInt(element.dataset.typingSpeed || 50);
            
            function typeWriter() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, typeSpeed);
                } else {
                    element.style.borderRight = 'none';
                }
            }
            
            setTimeout(() => {
                typeWriter();
            }, parseInt(element.dataset.typingDelay || 500));
        });
    };
    
    // Initialize all animation functions
    const initAnimations = () => {
        setupStaggeredAnimations();
        createScrollObserver();
        setupEnhancedHoverEffects();
        setupParallax();
        createWaveEffect();
        createTypingEffect();
        
        // Add animation classes to pre-defined elements
        document.querySelectorAll('.hero-section h1').forEach(el => {
            el.setAttribute('data-animate', '');
            el.setAttribute('data-animation', 'fadeInLeft');
        });
        
        document.querySelectorAll('.hero-section p').forEach(el => {
            el.setAttribute('data-animate', '');
            el.setAttribute('data-animation', 'fadeInLeft');
            el.setAttribute('data-delay', '200');
        });
        
        document.querySelectorAll('.hero-section .btn, .hero-section a').forEach(el => {
            el.setAttribute('data-animate', '');
            el.setAttribute('data-animation', 'fadeInLeft');
            el.setAttribute('data-delay', '400');
        });
        
        document.querySelectorAll('.hero-section .image-container').forEach(el => {
            el.setAttribute('data-animate', '');
            el.setAttribute('data-animation', 'fadeInScale');
            el.setAttribute('data-delay', '300');
        });
        
        // Add staggered animations to features section
        const featuresGrid = document.querySelector('.features-grid');
        if (featuresGrid) {
            featuresGrid.setAttribute('data-stagger', '');
            featuresGrid.setAttribute('data-stagger-delay', '100');
            featuresGrid.querySelectorAll('.feature-card').forEach(card => {
                card.setAttribute('data-stagger-child', '');
                card.setAttribute('data-animate', '');
            });
        }
        
        // Add animation to CTA section
        document.querySelectorAll('.cta-section h2').forEach(el => {
            el.setAttribute('data-animate', '');
            el.setAttribute('data-animation', 'fadeInUp');
        });
        
        document.querySelectorAll('.cta-section p').forEach(el => {
            el.setAttribute('data-animate', '');
            el.setAttribute('data-animation', 'fadeInUp');
            el.setAttribute('data-delay', '100');
        });
        
        document.querySelectorAll('.cta-section .btn, .cta-section a').forEach(el => {
            el.setAttribute('data-animate', '');
            el.setAttribute('data-animation', 'fadeInUp');
            el.setAttribute('data-delay', '200');
        });
    };
    
    // Call init function after a small delay to ensure DOM is ready
    setTimeout(initAnimations, 100);
});
