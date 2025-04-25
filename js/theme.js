// Theme handling
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Function to update theme icons visibility with smoother transitions and animations
    const updateThemeIcons = (isDark) => {
        const lightIcon = themeToggle.querySelector('.light-icon');
        const darkIcon = themeToggle.querySelector('.dark-icon');
        
        // Use opacity and transform for smoother transitions
        if (isDark) {
            lightIcon.style.opacity = '0';
            lightIcon.style.transform = 'translate(-50%, -50%) scale(0.5)';
            darkIcon.style.opacity = '1';
            darkIcon.style.transform = 'translate(-50%, -50%) scale(1)';
        } else {
            lightIcon.style.opacity = '1';
            lightIcon.style.transform = 'translate(-50%, -50%) scale(1)';
            darkIcon.style.opacity = '0';
            darkIcon.style.transform = 'translate(-50%, -50%) scale(0.5)';
        }
    };

    // Enhanced function to set theme with more visual feedback
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcons(theme === 'dark');
        
        // Add transition class after a small delay to prevent initial transition
        setTimeout(() => {
            document.body.classList.add('theme-transition');
        }, 100);
        
        // Visual feedback - subtle flash effect on theme change
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = theme === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '9999';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(overlay);
        
        // Flash effect
        setTimeout(() => {
            overlay.style.opacity = '0.5';
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            }, 100);
        }, 0);
    };

    // Check system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get initial theme
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (systemPrefersDark.matches ? 'dark' : 'light');
    
    // Apply initial theme without transition
    document.body.classList.remove('theme-transition');
    setTheme(initialTheme);

    // Handle theme toggle click with enhanced animations
    themeToggle.addEventListener('click', () => {
        // Add a physical press effect
        themeToggle.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            themeToggle.style.transform = '';
            
            // Toggle theme with a slight delay for better user experience
            setTimeout(() => {
                const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
            }, 50);
        }, 150);
    });

    // Apply subtle shine effect to logo in dark mode
    const applyLogoEffects = () => {
        const brandText = document.querySelector('.brand-text');
        if (!brandText) return;
        
        if (html.getAttribute('data-theme') === 'dark') {
            // Add shine effect for dark mode
            const shine = document.createElement('span');
            shine.className = 'logo-shine';
            shine.style.position = 'absolute';
            shine.style.top = '0';
            shine.style.left = '-100%';
            shine.style.width = '50%';
            shine.style.height = '100%';
            shine.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)';
            shine.style.transform = 'skewX(-20deg)';
            shine.style.animation = 'shine 3s infinite';
            
            brandText.style.position = 'relative';
            brandText.style.overflow = 'hidden';
            brandText.appendChild(shine);
            
            // Add the animation to document if it doesn't exist
            if (!document.getElementById('logo-shine-animation')) {
                const style = document.createElement('style');
                style.id = 'logo-shine-animation';
                style.textContent = `
                    @keyframes shine {
                        0% { left: -100%; }
                        20% { left: 100%; }
                        100% { left: 100%; }
                    }
                `;
                document.head.appendChild(style);
            }
        } else {
            // Remove shine effect for light mode
            const shine = brandText.querySelector('.logo-shine');
            if (shine) brandText.removeChild(shine);
        }
    };

    // Listen for system theme changes
    systemPrefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
            applyLogoEffects();
        }
    });

    // Mobile navigation handling with improved accessibility
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.setAttribute('aria-label', 'Mobile navigation');
    mobileNav.innerHTML = `
        <div class="flex items-center justify-between p-4 border-b">
            <a href="/" class="flex items-center gap-2 font-bold text-xl">
                <!-- Modern CarRental logo with badge design -->
                <svg class="h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="2"/>
                    <path d="M18 38h28a3 3 0 003-3v-2a3 3 0 00-3-3h-2l-3-10a4 4 0 00-4-3H27a4 4 0 00-4 3l-3 10h-2a3 3 0 00-3 3v2a3 3 0 003 3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M18 33v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M46 33v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="24" cy="38" r="3" fill="currentColor"/>
                    <circle cx="40" cy="38" r="3" fill="currentColor"/>
                    <path d="M22 30h20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <span class="brand-text">CarRental</span>
            </a>
            <button 
                class="close-nav rounded-md p-2 hover:bg-accent transition-colors" 
                aria-label="Close navigation menu"
            >
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
        <nav class="p-4 flex flex-col space-y-1">
            <a href="/about" class="block py-2 text-sm font-medium hover:text-primary transition-colors">About</a>
            <a href="/contact" class="block py-2 text-sm font-medium hover:text-primary transition-colors">Contact</a>
            <a href="/auth/login" class="flex items-center mt-4 py-2 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
                <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
                </svg>
                Login
            </a>
        </nav>
    `;
    
    document.body.appendChild(mobileNav);

    // Handle mobile nav toggle with accessibility improvements
    mobileNavToggle.addEventListener('click', () => {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when nav is open
        
        // Focus on close button for better keyboard navigation
        setTimeout(() => {
            const closeButton = mobileNav.querySelector('.close-nav');
            closeButton.focus();
        }, 100);
    });

    // Handle mobile nav close
    const closeNav = mobileNav.querySelector('.close-nav');
    closeNav.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
        mobileNavToggle.focus(); // Return focus to toggle button
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileNavToggle.contains(e.target) && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Close mobile nav on escape key press for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            document.body.style.overflow = ''; // Restore scrolling
            mobileNavToggle.focus(); // Return focus to toggle button
        }
    });

    // Initialize the theme icons based on current theme
    updateThemeIcons(initialTheme === 'dark');
    
    // Apply logo effects on page load and theme changes
    applyLogoEffects();
    themeToggle.addEventListener('click', applyLogoEffects);
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-fadeInUp');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Run animate on scroll on page load and scroll events
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});
