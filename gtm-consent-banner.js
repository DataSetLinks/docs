(function () {
  // Initialize GTM with default consent settings

  // Define dataLayer and the gtag function.
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  if (typeof gtag !== "undefined") {
    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });
  }

  // Check existing consent
  const consent = localStorage.getItem("cookieConsent");

  // Show banner if no consent given
  if (!consent) {
    showConsentBanner();
  } else {
    handleConsentLevel(consent);
  }

  function showConsentBanner() {

    const banner = document.createElement("div");
    banner.id = "gtm-consent-banner";
    banner.innerHTML = `
            <div class="consent-banner-overlay">
                <div class="consent-banner-modal">
                    <div class="consent-banner-grid">
                        <span class="cookie-icon">🍪</span>
                        
                        <p>We use cookies to analyze our traffic and improve your experience. You can choose which cookies to accept.</p>

                        <div class="consent-options">
                            <label>
                                <input type="checkbox" id="necessary-cookies" checked disabled> Necessary Cookies (Required)
                            </label>
                            <label>
                                <input type="checkbox" id="analytics-cookies"> Analytics Cookies
                            </label>
                        </div>
                        <div class="consent-buttons">
                            <button id="reject-all-cookies" class="cookie-btn cookie-btn-reject">Reject All</button>
                            <button id="accept-selected-cookies" class="cookie-btn cookie-btn-selected">Accept Selected</button>
                            <button id="accept-all-cookies" class="cookie-btn cookie-btn-accept">Accept All</button>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        `;

    document.body.appendChild(banner);

    // Event listeners
    document.getElementById("accept-all-cookies").onclick = () => handleConsentLevel("all");
    document.getElementById("accept-selected-cookies").onclick = () => acceptSelected();
    document.getElementById("reject-all-cookies").onclick = () => handleConsentLevel("reject");
  }

  function handleConsentLevel(level) {
    localStorage.setItem("cookieConsent", level);

    if (level === "all") {
      gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    } else if (level === "necessary") {
      gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    } else if (level === "analytics") {
      gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    } else if (level === "reject") {
      // Reject all cookies
      gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    if (!consent) {
      document.getElementById("gtm-consent-banner").remove();
    }
    return;
  }

  function acceptSelected() {
    const analyticsAccepted = document.getElementById("analytics-cookies").checked;

    if (analyticsAccepted) {
      handleConsentLevel("analytics");
      return;
    }

    handleConsentLevel("necessary");
    return;
  }
})();
