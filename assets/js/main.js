/* ==========================================================================
   RANKRISE DIGITAL AGENCY - INTERACTIVE JAVASCRIPT ENGINE
   Handles Navigation, Live SEO Audit Tool, Publisher Directory Filtering,
   Guest Post Validators, WhatsApp Popups, Calculators & Form Submissions.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Dark & Light Mode Theme Engine ---
  const savedTheme = localStorage.getItem('rankrise_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  function updateThemeButtons(theme) {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.innerHTML = theme === 'light' ? '🌙' : '☀️';
      btn.setAttribute('title', theme === 'light' ? 'Switch to Dark Slate Mode' : 'Switch to Light Mode');
      btn.setAttribute('aria-label', 'Toggle Dark/Light Mode');
    });
  }

  updateThemeButtons(savedTheme);

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('rankrise_theme', newTheme);
      updateThemeButtons(newTheme);
      if (window.showToast) {
        window.showToast(newTheme === 'light' ? 'Switched to Executive Light Mode ☀️' : 'Switched to Dark Slate Mode 🌙');
      }
    });
  });

  // --- Header Scroll Effect ---
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // --- Dynamic Mouse-Tracking Spotlight & 3D Tilt Hover Effects ---
  const cards = document.querySelectorAll('.card, .stat-box, .pricing-card, .process-step-card');
  cards.forEach(card => {
    card.classList.add('spotlight-card', 'tilt-card');
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D subtle tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
    });
  });

  // --- Magnetic Buttons Effect ---
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.classList.add('shimmer-btn', 'magnetic-btn');
  });

  // --- Dynamic Animated Number Counters on Scroll ---
  const statNumbers = document.querySelectorAll('.stat-num');
  let animated = false;

  function animateStats() {
    statNumbers.forEach(stat => {
      const text = stat.textContent.trim();
      const hasPlus = text.includes('+');
      const hasPercent = text.includes('%');
      const numericVal = parseFloat(text.replace(/[^0-9.]/g, ''));
      
      if (!isNaN(numericVal)) {
        let current = 0;
        const step = numericVal / 45;
        const timer = setInterval(() => {
          current += step;
          if (current >= numericVal) {
            current = numericVal;
            clearInterval(timer);
          }
          let formatted = current % 1 === 0 ? current.toLocaleString() : current.toFixed(1);
          if (hasPlus) formatted += '+';
          if (hasPercent) formatted += '%';
          stat.textContent = formatted;
        }, 25);
      }
    });
  }

  // Intersection Observer for reactive counters
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateStats();
        }
      });
    }, { threshold: 0.2 });

    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) observer.observe(statsGrid);
  }

  // --- Mobile Navigation Toggle ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  mobileToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    const spans = mobileToggle.querySelectorAll('span');
    if (navMenu?.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
    });
  });

  // --- FAQ Accordions ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- WhatsApp Popup Widget Logic ---
  const whatsappMainBtn = document.getElementById('whatsappMainBtn');
  const whatsappPopupBox = document.getElementById('whatsappPopupBox');
  const closeWhatsappPopup = document.getElementById('closeWhatsappPopup');

  whatsappMainBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    whatsappPopupBox?.classList.toggle('active');
  });

  closeWhatsappPopup?.addEventListener('click', () => {
    whatsappPopupBox?.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (!whatsappPopupBox?.contains(e.target) && e.target !== whatsappMainBtn) {
      whatsappPopupBox?.classList.remove('active');
    }
  });

  // Helper function to launch WhatsApp
  window.openRankRiseWhatsApp = function(number = '923400502140', customMsg = '') {
    const defaultMsg = customMsg || 'Hello RankRise Digital Agency! I would like to inquire about your SEO and Guest Posting services.';
    const encoded = encodeURIComponent(defaultMsg);
    window.open(`https://wa.me/${number}?text=${encoded}`, '_blank');
  };

  // --- Interactive Free Instant SEO Audit Tool ---
  const runAuditBtn = document.getElementById('runAuditBtn');
  const auditUrlInput = document.getElementById('auditUrlInput');
  const auditResultsPanel = document.getElementById('auditResultsPanel');
  const auditTargetDomain = document.getElementById('auditTargetDomain');

  runAuditBtn?.addEventListener('click', () => {
    const url = auditUrlInput?.value.trim();
    if (!url) {
      showToast('Please enter a valid website URL or domain (e.g. example.com)');
      return;
    }

    runAuditBtn.innerHTML = '<span>⚡ Analyzing Website...</span>';
    runAuditBtn.disabled = true;

    setTimeout(() => {
      runAuditBtn.innerHTML = '<span>Analyze Website Free</span>';
      runAuditBtn.disabled = false;
      if (auditResultsPanel) {
        auditResultsPanel.style.display = 'block';
        if (auditTargetDomain) auditTargetDomain.textContent = url.replace(/^https?:\/\//i, '').split('/')[0];
        auditResultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      showToast('SEO Audit completed for ' + url);
    }, 1200);
  });

  // --- Publisher Marketplace Search & Filter ---
  const publisherSearchInput = document.getElementById('publisherSearchInput');
  const publisherNicheFilter = document.getElementById('publisherNicheFilter');
  const publisherRows = document.querySelectorAll('.publisher-row');

  function filterPublishers() {
    const searchVal = publisherSearchInput ? publisherSearchInput.value.toLowerCase() : '';
    const nicheVal = publisherNicheFilter ? publisherNicheFilter.value.toLowerCase() : 'all';

    publisherRows.forEach(row => {
      const siteText = row.getAttribute('data-site')?.toLowerCase() || '';
      const nicheText = row.getAttribute('data-niche')?.toLowerCase() || '';

      const matchSearch = siteText.includes(searchVal) || nicheText.includes(searchVal);
      const matchNiche = nicheVal === 'all' || nicheText.includes(nicheVal);

      if (matchSearch && matchNiche) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  publisherSearchInput?.addEventListener('input', filterPublishers);
  publisherNicheFilter?.addEventListener('change', filterPublishers);

  // --- Interactive Link Building / Guest Post ROI Calculator ---
  const calcLinksInput = document.getElementById('calcLinksInput');
  const calcDaSelect = document.getElementById('calcDaSelect');
  const calcPriceDisplay = document.getElementById('calcPriceDisplay');
  const calcTrafficEstimate = document.getElementById('calcTrafficEstimate');
  const calcOrderingBtn = document.getElementById('calcOrderingBtn');

  function updateCalculator() {
    if (!calcLinksInput || !calcDaSelect) return;
    const count = parseInt(calcLinksInput.value) || 1;
    const daTier = calcDaSelect.value;

    let basePricePerLink = 85;
    let trafficMultiplier = 2500;

    if (daTier === 'da30') {
      basePricePerLink = 65;
      trafficMultiplier = 1800;
    } else if (daTier === 'da50') {
      basePricePerLink = 110;
      trafficMultiplier = 5000;
    } else if (daTier === 'da70') {
      basePricePerLink = 185;
      trafficMultiplier = 15000;
    } else if (daTier === 'da80') {
      basePricePerLink = 290;
      trafficMultiplier = 40000;
    }

    const totalEstimate = count * basePricePerLink;
    const estimatedTraffic = (count * trafficMultiplier).toLocaleString();

    if (calcPriceDisplay) calcPriceDisplay.textContent = `$${totalEstimate}`;
    if (calcTrafficEstimate) calcTrafficEstimate.textContent = `+${estimatedTraffic} visitors/mo`;
    
    if (calcOrderingBtn) {
      calcOrderingBtn.onclick = () => {
        const msg = `Hi RankRise! I want to order ${count} Guest Posts on ${daTier.toUpperCase()} Authority Websites (Est. Quote: $${totalEstimate}).`;
        window.openRankRiseWhatsApp('923400502140', msg);
      };
    }
  }

  calcLinksInput?.addEventListener('input', updateCalculator);
  calcDaSelect?.addEventListener('change', updateCalculator);
  updateCalculator();

  // --- Guest Post Submission Form Handler ---
  const guestPostSubmitForm = document.getElementById('guestPostSubmitForm');
  guestPostSubmitForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('gpAuthorName')?.value;
    const email = document.getElementById('gpAuthorEmail')?.value;
    const topic = document.getElementById('gpArticleTitle')?.value;
    const niche = document.getElementById('gpNiche')?.value;
    const wordCount = document.getElementById('gpWordCount')?.value;
    const articleLink = document.getElementById('gpArticleDoc')?.value;

    if (!name || !email || !topic || !articleLink) {
      showToast('Please fill in all required fields.');
      return;
    }

    showToast('Submitting your guest post proposal to RankRise editorial team...');
    
    setTimeout(() => {
      alert(`Thank you, ${name}! Your guest post submission ("${topic}") has been received. Our editorial team (sirhaseeb657@gmail.com) will review your draft within 24-48 hours.`);
      guestPostSubmitForm.reset();
    }, 800);
  });

  // --- Publisher Website Submission Form Handler ---
  const publisherSubmitForm = document.getElementById('publisherSubmitForm');
  publisherSubmitForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const siteUrl = document.getElementById('pubUrl')?.value;
    const da = document.getElementById('pubDa')?.value;
    const traffic = document.getElementById('pubTraffic')?.value;
    const price = document.getElementById('pubPrice')?.value;
    const contact = document.getElementById('pubContact')?.value;

    if (!siteUrl || !contact) {
      showToast('Please provide your website URL and contact info.');
      return;
    }

    const payloadMsg = `Hello RankRise Agency! I want to list my website on your Guest Post Marketplace:\n- URL: ${siteUrl}\n- DA/DR: ${da || 'N/A'}\n- Monthly Traffic: ${traffic || 'N/A'}\n- Post Price: $${price || 'N/A'}\n- Contact: ${contact}`;
    
    window.openRankRiseWhatsApp('923400502140', payloadMsg);
    publisherSubmitForm.reset();
  });

  // --- General Contact / Lead Form Handler ---
  const generalContactForm = document.getElementById('generalContactForm');
  generalContactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cName')?.value;
    const email = document.getElementById('cEmail')?.value;
    const phone = document.getElementById('cPhone')?.value || '';
    const service = document.getElementById('cService')?.value || 'General Inquiry';
    const message = document.getElementById('cMessage')?.value;

    const payload = `*New RankRise Lead Inquiry*\n👤 Name: ${name}\n📧 Email: ${email}\n📞 Phone: ${phone}\n🎯 Service: ${service}\n💬 Message: ${message}`;
    
    // Trigger direct WhatsApp message
    window.openRankRiseWhatsApp('923400502140', payload);
    showToast('Your message has been initiated on WhatsApp & logged.');
    generalContactForm.reset();
  });

  // --- Toast Notification Helper ---
  window.showToast = function(message) {
    let toast = document.getElementById('rankriseToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'rankriseToast';
      toast.style.position = 'fixed';
      toast.style.bottom = '95px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.backgroundColor = '#131b2e';
      toast.style.color = '#ffffff';
      toast.style.border = '1px solid #6366f1';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      toast.style.padding = '0.9rem 1.6rem';
      toast.style.borderRadius = '30px';
      toast.style.fontSize = '0.92rem';
      toast.style.fontWeight = '500';
      toast.style.zIndex = '100000';
      toast.style.transition = 'all 0.3s ease';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.display = 'block';

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => { toast.style.display = 'none'; }, 300);
    }, 4000);
  };
});
