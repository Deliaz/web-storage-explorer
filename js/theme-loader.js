const LINK_TAG_SELECTOR = '.js-link-theme';

(() => {
    /**
     * Set CSS URL by theme name
     * @param themeName {string} - theme name ['auto' | 'light' | 'dark']
     */
    function loadTheme(themeName) {
        if (themeName === 'auto') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                themeName = 'dark';
            } else {
                themeName = 'light';
            }
        }

        let themeURL = chrome.runtime.getURL(`css/theme/${themeName}.css`);
        let linkElement = document.querySelector(LINK_TAG_SELECTOR);

        if (linkElement) {
            linkElement.setAttribute('href', themeURL);
        } else {
            console.error('Style tag not found');
        }
    }

    /*
     * Load theme from localStorage or set default
     */
    loadTheme(localStorage.getItem('theme') || DEFAULT_THEME_NAME);

    /*
     * Observe for theme changes
     */
    window.addEventListener('storage', e => {
        if(e.key === 'theme' && e.newValue !== e.oldValue) {
            loadTheme(e.newValue);
        }
    });
})();

