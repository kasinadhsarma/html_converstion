/**
 * components-loader.js
 * Handles the dynamic loading of header and footer components
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Components loader initialized");
    
    // Get the base URL for GitHub Pages compatibility
    const baseUrl = getBaseUrl();
    console.log("Base URL:", baseUrl);
    
    // Load components
    loadHeader();
    loadFooter();
    
    /**
     * Get the base URL for GitHub Pages compatibility
     * @returns {string} Base URL for the site
     */
    function getBaseUrl() {
        // For GitHub Pages, we need to adjust paths based on the repository name
        const pathSegments = window.location.pathname.split('/');
        if (pathSegments[1] === 'html_converstion') {
            // GitHub Pages deployment
            return '/html_converstion';
        } else {
            // Local development or other deployment
            return '';
        }
    }
    
    /**
     * Load the header component
     */
    function loadHeader() {
        const headerContainer = document.getElementById('header');
        if (!headerContainer) {
            console.error('Header container not found');
            return;
        }
        
        // Use GitHub Pages compatible paths
        const headerPaths = [
            `${baseUrl}/assets/pages/components/header.html`,
            'assets/pages/components/header.html',
            '../assets/pages/components/header.html',
            '../components/header.html',
            '../../components/header.html',
        ];
        
        loadComponent(headerContainer, headerPaths)
            .then(() => {
                console.log('Header loaded successfully');
                // Fix header links for GitHub Pages
                fixHeaderLinks();
                initializeThemeToggle();
                initializeMobileNavigation();
            })
            .catch(error => {
                console.error('Failed to load header:', error);
                // Create a basic header if loading fails
                headerContainer.innerHTML = `
                <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
                    <div class="container flex h-16 items-center justify-between">
                        <div class="flex items-center">
                            <button id="mobile-nav-toggle" class="mr-4 md:hidden rounded-md p-2 hover:bg-accent transition-colors">
                                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                            <a href="${baseUrl}/" class="flex items-center gap-2 font-bold text-xl">
                                <svg class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="8"/>
                                    <path d="M11 8h2v8h-2z"/>
                                </svg>
                                <span>CarRental</span>
                            </a>
                        </div>
                        <nav class="hidden md:flex gap-8">
                            <a href="${baseUrl}/assets/pages/about.html" class="text-sm font-medium hover:text-primary transition-colors">About</a>
                            <a href="${baseUrl}/assets/pages/contact.html" class="text-sm font-medium hover:text-primary transition-colors">Contact</a>
                        </nav>
                        <div class="flex items-center gap-4">
                            <button id="theme-toggle" class="rounded-full p-2 hover:bg-accent">
                                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                            </button>
                            <a href="${baseUrl}/assets/pages/auth/login.html" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90">
                                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                    <polyline points="10 17 15 12 10 7"></polyline>
                                    <line x1="15" y1="12" x2="3" y2="12"></line>
                                </svg>
                                Login
                            </a>
                        </div>
                    </div>
                </header>
                `;
                fixHeaderLinks();
                initializeThemeToggle();
                initializeMobileNavigation();
            });
    }
    
    /**
     * Load the footer component
     */
    function loadFooter() {
        const footerContainer = document.getElementById('footer');
        if (!footerContainer) {
            console.error('Footer container not found');
            return;
        }
        
        // Use GitHub Pages compatible paths
        const footerPaths = [
            `${baseUrl}/assets/pages/components/footer.html`,
            'assets/pages/components/footer.html',
            '../assets/pages/components/footer.html',
            '../components/footer.html',
            '../../components/footer.html',
        ];
        
        loadComponent(footerContainer, footerPaths)
            .then(() => {
                console.log('Footer loaded successfully');
                // Fix footer links for GitHub Pages
                fixFooterLinks();
                // Add click event for footer theme toggle if it exists
                const footerThemeToggle = document.getElementById('footer-theme-toggle');
                if (footerThemeToggle) {
                    footerThemeToggle.addEventListener('click', toggleTheme);
                }
            })
            .catch(error => {
                console.error('Failed to load footer:', error);
                // Create a basic footer if loading fails
                footerContainer.innerHTML = `
                <footer class="bg-gray-900 text-white py-12">
                    <div class="container px-4 md:px-6">
                        <div class="flex flex-col md:flex-row justify-between items-center">
                            <div class="mb-6 md:mb-0">
                                <a href="${baseUrl}/" class="flex items-center gap-2 font-bold text-xl">
                                    <svg class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="24" height="24" fill="none" rx="0" ry="0"></rect>
                                        <path fill="currentColor" d="M12 4a8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8zm-1 3h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
                                    </svg>
                                    <span>CarRental</span>
                                </a>
                                <p class="mt-2 text-gray-400 text-sm max-w-md">
                                    Premium car rental service providing luxury and comfort for your journeys since 2025.
                                </p>
                            </div>
                            <div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
                                <div>
                                    <h3 class="font-semibold mb-3">About</h3>
                                    <ul class="space-y-2 text-sm">
                                        <li><a href="${baseUrl}/assets/pages/about.html" class="text-gray-400 hover:text-white">About</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="font-semibold mb-3">Support</h3>
                                    <ul class="space-y-2 text-sm">
                                        <li><a href="${baseUrl}/assets/pages/contact.html" class="text-gray-400 hover:text-white">Contact</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="font-semibold mb-3">Account</h3>
                                    <ul class="space-y-2 text-sm">
                                        <li><a href="${baseUrl}/assets/pages/auth/login.html" class="text-gray-400 hover:text-white">Login</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                `;
            });
    }
    
    /**
     * Fix links in the header for GitHub Pages compatibility
     */
    function fixHeaderLinks() {
        const header = document.querySelector('header');
        if (!header) return;
        
        // Fix all links in the header
        const links = header.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith(baseUrl)) {
                link.setAttribute('href', `${baseUrl}${href}`);
            }
        });
    }
    
    /**
     * Fix links in the footer for GitHub Pages compatibility
     */
    function fixFooterLinks() {
        const footer = document.querySelector('footer');
        if (!footer) return;
        
        // Fix all links in the footer
        const links = footer.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith(baseUrl)) {
                link.setAttribute('href', `${baseUrl}${href}`);
            }
        });
    }
    
    /**
     * Load a component from an array of possible paths
     * @param {HTMLElement} container - The container to load the component into
     * @param {Array<string>} paths - Array of possible paths to try
     * @returns {Promise} - Promise that resolves when component is loaded
     */
    function loadComponent(container, paths) {
        return new Promise((resolve, reject) => {
            // Try each path in sequence until one works
            tryNextPath(0);
            
            function tryNextPath(index) {
                if (index >= paths.length) {
                    reject(new Error('All paths failed'));
                    return;
                }
                
                const path = paths[index];
                console.log(`Trying to load from: ${path}`);
                
                fetch(path)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(html => {
                        container.innerHTML = html;
                        console.log(`Successfully loaded from ${path}`);
                        resolve();
                    })
                    .catch(error => {
                        console.log(`Failed to load from ${path}: ${error.message}`);
                        tryNextPath(index + 1);
                    });
            }
        });
    }
    
    /**
     * Helper function to toggle theme
     */
    function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        console.log(`Theme changed to ${newTheme}`);
    }
    
    /**
     * Initialize theme toggle functionality
     */
    function initializeThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeDropdown = document.getElementById('theme-dropdown');
        const themeLight = document.getElementById('theme-light');
        const themeDark = document.getElementById('theme-dark');
        const themeSystem = document.getElementById('theme-system');
        const html = document.documentElement;
        
        if (!themeToggle) {
            console.warn('Theme toggle button not found');
            return;
        }
        
        // Function to update theme
        const setTheme = (theme) => {
            if (theme === 'system') {
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                html.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
            } else {
                html.setAttribute('data-theme', theme);
            }
            
            localStorage.setItem('theme', theme);
            if (themeDropdown) themeDropdown.classList.add('hidden');
        };
        
        // Get initial theme
        const savedTheme = localStorage.getItem('theme') || 'system';
        
        // Apply initial theme
        setTheme(savedTheme);
        
        // Handle theme toggle click
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (themeDropdown) {
                themeDropdown.classList.toggle('hidden');
            } else {
                // Simple toggle if dropdown doesn't exist
                toggleTheme();
            }
        });
        
        // Handle theme option clicks if options exist
        if (themeLight) themeLight.addEventListener('click', () => setTheme('light'));
        if (themeDark) themeDark.addEventListener('click', () => setTheme('dark'));
        if (themeSystem) themeSystem.addEventListener('click', () => setTheme('system'));
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', () => {
            if (themeDropdown) themeDropdown.classList.add('hidden');
        });
        
        // Prevent dropdown from closing when clicking inside it
        if (themeDropdown) {
            themeDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
    
    /**
     * Initialize mobile navigation
     */
    function initializeMobileNavigation() {
        const mobileNavToggle = document.getElementById('mobile-nav-toggle');
        if (!mobileNavToggle) {
            console.warn('Mobile navigation toggle not found');
            return;
        }
        
        // Add sidenav containers if they don't exist
        const sidenav = document.getElementById('sidenav') || createSidenavContainer();
        const overlay = document.getElementById('sidenav-overlay') || createOverlayContainer();
        
        // Try loading the sidenav content
        const sidenavPaths = [
            `${baseUrl}/assets/pages/components/sidenav.html`,
            'assets/pages/components/sidenav.html',
            '../assets/pages/components/sidenav.html',
            '../components/sidenav.html',
            '../../components/sidenav.html',
        ];
        
        // Load sidenav content when menu button is clicked
        mobileNavToggle.addEventListener('click', () => {
            // If sidenav is empty, load content first
            if (sidenav.children.length === 0) {
                loadComponent(sidenav, sidenavPaths)
                    .then(() => {
                        openSidenav(sidenav, overlay);
                        initializeSidenavInteractions();
                    })
                    .catch(error => {
                        console.error('Failed to load sidenav:', error);
                        // Create a minimal sidenav if loading fails
                        sidenav.innerHTML = `
                            <div class="flex flex-col h-full">
                                <div class="p-4 border-b border-border flex items-center justify-between">
                                    <div>Menu</div>
                                    <button id="close-sidenav" class="p-2 rounded-md hover:bg-accent">
                                        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        `;
                        openSidenav(sidenav, overlay);
                        initializeSidenavInteractions();
                    });
            } else {
                // If already loaded, just open it
                openSidenav(sidenav, overlay);
            }
        });
        
        // Close when clicking overlay
        overlay.addEventListener('click', () => {
            closeSidenav(sidenav, overlay);
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !sidenav.classList.contains('-translate-x-full')) {
                closeSidenav(sidenav, overlay);
            }
        });
    }

    /**
     * Initialize interactions within the sidenav
     */
    function initializeSidenavInteractions() {
        // Add event listener to close button
        const closeBtn = document.getElementById('close-sidenav');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                const sidenav = document.getElementById('sidenav');
                const overlay = document.getElementById('sidenav-overlay');
                if (sidenav && overlay) {
                    closeSidenav(sidenav, overlay);
                }
            });
        }
        
        // Add event listener to mobile theme toggle
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', toggleTheme);
        }
    }
    
    /**
     * Create sidenav container if it doesn't exist
     */
    function createSidenavContainer() {
        const sidenav = document.createElement('div');
        sidenav.id = 'sidenav';
        sidenav.className = 'fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-lg transform -translate-x-full transition-transform duration-300 ease-in-out';
        document.body.appendChild(sidenav);
        return sidenav;
    }
    
    /**
     * Create overlay container if it doesn't exist
     */
    function createOverlayContainer() {
        const overlay = document.createElement('div');
        overlay.id = 'sidenav-overlay';
        overlay.className = 'fixed inset-0 bg-black/50 z-40 hidden transition-opacity duration-300 opacity-0';
        document.body.appendChild(overlay);
        return overlay;
    }
    
    /**
     * Open the sidenav
     */
    function openSidenav(sidenav, overlay) {
        sidenav.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.remove('opacity-0');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Close the sidenav
     */
    function closeSidenav(sidenav, overlay) {
        sidenav.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }
});