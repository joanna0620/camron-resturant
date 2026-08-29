const WHATSAPP_NUMBER = '919922483479';

const siteLoader = document.getElementById('siteLoader');
window.addEventListener('load', () => {
  setTimeout(() => siteLoader?.classList.add('hidden'), 450);
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

function closeMobileMenu() {
  mobileNav?.classList.remove('open');
  menuToggle?.classList.remove('active');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

function openMobileMenu() {
  mobileNav?.classList.add('open');
  menuToggle?.classList.add('active');
  menuToggle?.setAttribute('aria-expanded', 'true');
}

menuToggle?.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  mobileNav?.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});

// Optional: Close menu automatically when clicking any link inside it
document.querySelectorAll('.mobile-nav-drawer a').forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

// Reliable mobile navigation: close the drawer first, then explicitly scroll to the target.
mobileNav?.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    closeMobileMenu();
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    }, 60);
  });
});

// Review behavior: hover turns a card black on desktop; tap/click activates one card on touch devices.
const reviewCards = document.querySelectorAll('.review-card');
reviewCards.forEach(card => {
  card.addEventListener('click', event => {
    event.stopPropagation();
    reviewCards.forEach(item => item.classList.remove('active'));
    card.classList.add('active');
  });
});
document.addEventListener('click', () => reviewCards.forEach(card => card.classList.remove('active')));

// Enquiry -> WhatsApp.
document.getElementById('enquiryForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const lines = [
    'Hello Camron Restaurant & Bar, I would like to make an enquiry.',
    '',
    `Name: ${form.get('name') || 'Not provided'}`,
    `Phone: ${form.get('phone') || 'Not provided'}`,
    `Email: ${form.get('email') || 'Not provided'}`,
    `Date: ${form.get('date') || 'Not provided'}`,
    `Guests: ${form.get('guests') || 'Not provided'}`,
    `Enquiry: ${form.get('type') || 'Not provided'}`,
    `Message: ${form.get('message') || 'Not provided'}`
  ];
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

// Footer links get a subtle click state in addition to their hover animation.
document.querySelectorAll('.footer a').forEach(link => {
  link.addEventListener('click', () => {
    link.classList.add('footer-link-clicked');
    window.setTimeout(() => link.classList.remove('footer-link-clicked'), 350);
  });
});

// ==========================================
// FOOLPROOF SCROLL UP & DOWN CONTROLS
// ==========================================
const scrollToTopButton = document.getElementById('scrollToTop');
const scrollToBottomButton = document.getElementById('scrollToBottom');

function updatePageScrollControls() {
  const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  const maxScroll = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight
  ) - window.innerHeight;
  
  const atTop = scrollY <= 5;
  const atBottom = scrollY >= maxScroll - 15;

  if (scrollToTopButton) {
    scrollToTopButton.classList.toggle('is-disabled', atTop);
  }
  if (scrollToBottomButton) {
    scrollToBottomButton.classList.toggle('is-disabled', atBottom);
  }
}

if (scrollToTopButton) {
  const triggerScrollTop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Smoothly scroll back to the absolute top of the body/header
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  scrollToTopButton.addEventListener('click', triggerScrollTop);
  scrollToTopButton.addEventListener('touchend', triggerScrollTop);
}

if (scrollToBottomButton) {
  const triggerScrollBottom = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Look for a footer or the last section on your page to lock onto
    const footer = document.querySelector('footer') || document.querySelector('.footer') || document.body.lastElementChild;
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  };
  scrollToBottomButton.addEventListener('click', triggerScrollBottom);
  scrollToBottomButton.addEventListener('touchend', triggerScrollBottom);
}

window.addEventListener('scroll', updatePageScrollControls, { passive: true });
window.addEventListener('resize', updatePageScrollControls);
window.addEventListener('load', updatePageScrollControls);
updatePageScrollControls();


