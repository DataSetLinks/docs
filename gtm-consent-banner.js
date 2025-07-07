(function() {
// Initialize GTM with default consent settings
    console.log('Initializing GTM');

    if (typeof gtag !== 'undefined') {
        console.log('GTM initialized');
        gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'wait_for_update': 500
        });
    }

    // Check existing consent
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
        console.log('consent accepted');
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted'
            });
        }
        return;
    }

    // Show banner if no consent given
    if (!consent) {
        showConsentBanner();
    }

    function showConsentBanner() {
        const banner = document.createElement('div');
        banner.id = 'gtm-consent-banner';
        banner.innerHTML = `
            <div class="consent-banner-overlay">
                <div class="consent-banner-modal">
                    <h3>Cookie Preferences</h3>
                    <p>We use cookies to analyze our traffic and improve your experience. You can choose which cookies to accept.</p>
                    <div class="consent-options">
                        <label>
                            <input type="checkbox" id="necessary-cookies" checked disabled>
                            Necessary Cookies (Required)
                        </label>
                        <label>
                            <input type="checkbox" id="analytics-cookies">
                            Analytics Cookies
                        </label>
                    </div>
                    <div class="consent-buttons">
                        <button id="accept-all-cookies">Accept All</button>
                        <button id="accept-selected-cookies">Accept Selected</button>
                        <button id="reject-all-cookies">Reject All</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Event listeners
        document.getElementById('accept-all-cookies').onclick = () => acceptConsent(true);
        document.getElementById('accept-selected-cookies').onclick = () => acceptSelected();
        document.getElementById('reject-all-cookies').onclick = () => acceptConsent(false);
    }

    function acceptConsent(acceptAll) {
        localStorage.setItem('cookieConsent', acceptAll ? 'accepted' : 'declined');

        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': acceptAll ? 'granted' : 'denied',
                'ad_storage': acceptAll ? 'granted' : 'denied'
            });
        }

        document.getElementById('gtm-consent-banner').remove();
    }

    function acceptSelected() {
        const analyticsAccepted = document.getElementById('analytics-cookies').checked;
        localStorage.setItem('cookieConsent', analyticsAccepted ? 'accepted' : 'declined');

        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': analyticsAccepted ? 'granted' : 'denied',
                'ad_storage': analyticsAccepted ? 'granted' : 'denied'
            });
        }

        document.getElementById('gtm-consent-banner').remove();
    }
})();