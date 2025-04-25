/**
 * theme.js
 * Handles theme initialization before components are loaded
 * Primary theme functionality moved to components-loader.js
 */

document.addEventListener('DOMContentLoaded', () => {
    // Set up initial theme based on saved preference
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'system';
    
    // Apply initial theme immediately to prevent flash of wrong theme
    if (savedTheme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    } else {
        html.setAttribute('data-theme', savedTheme);
    }
    
    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === 'system') {
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
});
