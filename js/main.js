/**
 * TR CONSTRUCTION - Luxury Architecture & Construction
 * Interactive Frontend Logic: Navigation, Filtering, Lightbox, Form Validation & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollSpy();
  initProjectFiltering();
  initProjectModal();
  initContactForm();
  initScrollAnimations();
  initBackToTop();
});

/* ===================================================================
   1. STICKY HEADER & SCROLL BEHAVIOR
=================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ===================================================================
   2. RESPONSIVE MOBILE MENU DRAWER
=================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-menu-drawer');
  const backdrop = document.querySelector('.mobile-menu-backdrop');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const navLinks = document.querySelectorAll('.mobile-nav-item a, .mobile-drawer-cta');

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ===================================================================
   3. SCROLL SPY (ACTIVE NAV HIGHLIGHT)
=================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if (!sections.length || !desktopLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ===================================================================
   4. FEATURED PROJECTS FILTERING
=================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ===================================================================
   5. PROJECT DETAILS LIGHTBOX MODAL
=================================================================== */
const projectData = {
  '1': {
    title: 'The Grand Vihar Estate',
    category: 'Residential Architecture',
    location: 'Sarita Vihar Sector, Purnia',
    area: '6,200 Sq. Ft.',
    scope: 'Full Architectural Planning & Structural Execution',
    image: 'assets/images/project-1.jpg',
    description: 'A striking contemporary private estate synthesizing geometric cantilever terraces, bespoke teak louvers, and expansive floor-to-ceiling glazing. Designed for natural cross-ventilation and thermal efficiency while reflecting luxury aesthetics.'
  },
  '2': {
    title: 'Apex Horizon Commercial Hub',
    category: 'Commercial Construction',
    location: 'Line Bazar Commercial District, Purnia',
    area: '18,500 Sq. Ft.',
    scope: 'Turnkey Commercial Design & Construction',
    image: 'assets/images/project-2.jpg',
    description: 'A landmark multi-tier commercial complex with energy-efficient curtain wall glazing, earthquake-resilient column grids, and flexible corporate retail layouts tailored for high footfall urban commerce.'
  },
  '3': {
    title: 'The Sovereign Minimalist Penthouse',
    category: 'Interior Design',
    location: 'Madhopara, Purnia',
    area: '3,800 Sq. Ft.',
    scope: 'Bespoke Luxury Interior Architecture & Lighting',
    image: 'assets/images/project-3.jpg',
    description: 'An understated luxury interior curated with polished micro-cement, Italian marble backdrops, integrated ambient architectural cove lighting, and acoustic millwork that creates an aura of quiet sophistication.'
  },
  '4': {
    title: 'The Cantilever Glass Pavilion',
    category: 'Modern Architecture',
    location: 'Purnia Outer Boulevard',
    area: '5,400 Sq. Ft.',
    scope: 'Experimental Architectural Design & Structural Steel',
    image: 'assets/images/project-4.jpg',
    description: 'A bold architectural study featuring floating horizontal volumes supported by engineered steel frames, infinity water reflection pools, and seamless indoor-outdoor courtyard transitions.'
  },
  '5': {
    title: 'Madhopara Courtyard Residence',
    category: 'Residential Construction',
    location: 'Ruigola / Madhopara, Purnia',
    area: '4,500 Sq. Ft.',
    scope: 'Architectural Blueprint & Complete Build',
    image: 'assets/images/project-5.jpg',
    description: 'Blending classic Bihari courtyard ventilation traditions with sleek modern facades, this duplex family residence offers privacy, sun-shaded balconies, and sustainable rainwater harvesting.'
  },
  '6': {
    title: 'Sarita Vihar Corporate Plaza',
    category: 'Commercial Construction',
    location: 'Near Sarita Vihar, Purnia',
    area: '14,000 Sq. Ft.',
    scope: 'Commercial Planning & High-Strength RCC Construction',
    image: 'assets/images/project-6.jpg',
    description: 'Engineered for modern retail showrooms and executive offices with heavy-duty structural standards, dedicated service cores, and an imposing metallic-accented facade.'
  },
  '7': {
    title: 'Executive Suite & Boardroom Studio',
    category: 'Interior Design',
    location: 'Central Purnia',
    area: '2,200 Sq. Ft.',
    scope: 'Commercial Interior Styling & Acoustic Fitout',
    image: 'assets/images/project-7.jpg',
    description: 'Crafted for high-level business consultation with fluted walnut paneling, brass architectural trims, ergonomic spatial zoning, and custom concealed lighting.'
  },
  '8': {
    title: 'Vertex Modernist Villa',
    category: 'Modern Architecture',
    location: 'Purnia Enclave',
    area: '5,800 Sq. Ft.',
    scope: 'Custom Architectural Elevation & Building Execution',
    image: 'assets/images/project-8.jpg',
    description: 'An avant-garde residential elevation exhibiting dramatic geometric overhangs, slate stone cladding, perimeter landscaped courts, and premium thermal-insulated glass.'
  }
};

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const projectCards = document.querySelectorAll('.project-card');

  const modalImg = modal.querySelector('#modalImage');
  const modalCategory = modal.querySelector('#modalCategory');
  const modalTitle = modal.querySelector('#modalTitle');
  const modalDesc = modal.querySelector('#modalDesc');
  const modalLocation = modal.querySelector('#modalLocation');
  const modalArea = modal.querySelector('#modalArea');
  const modalScope = modal.querySelector('#modalScope');

  const openModal = (id) => {
    const data = projectData[id];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;
    modalLocation.textContent = data.location;
    modalArea.textContent = data.area;
    modalScope.textContent = data.scope;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      openModal(id);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ===================================================================
   6. CONTACT FORM VALIDATION & DEMO SUBMISSION STATE
=================================================================== */
function initContactForm() {
  const form = document.getElementById('enquiryForm');
  const feedbackCard = document.getElementById('formFeedback');
  const resetBtn = document.getElementById('btnSubmitAnother');

  if (!form || !feedbackCard) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#clientName').value.trim();
    const phone = form.querySelector('#clientPhone').value.trim();
    const email = form.querySelector('#clientEmail').value.trim();
    const projectType = form.querySelector('#projectType').value;
    const message = form.querySelector('#clientMessage').value.trim();

    // Frontend validation
    if (name.length < 2) {
      alert('Please enter your full name (minimum 2 characters).');
      form.querySelector('#clientName').focus();
      return;
    }

    const phoneRegex = /^[0-9+\s-]{8,15}$/;
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number (digits only, e.g. 062013 51334).');
      form.querySelector('#clientPhone').focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      form.querySelector('#clientEmail').focus();
      return;
    }

    if (!projectType) {
      alert('Please select your project type.');
      form.querySelector('#projectType').focus();
      return;
    }

    if (message.length < 6) {
      alert('Please briefly share your project requirements (minimum 6 characters).');
      form.querySelector('#clientMessage').focus();
      return;
    }

    // Submit Simulation State
    const submitBtn = form.querySelector('#submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Processing Demo Enquiry...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      // Update feedback summary
      document.getElementById('feedbackClientName').textContent = name;
      document.getElementById('feedbackClientPhone').textContent = phone;
      document.getElementById('feedbackProjectType').textContent = projectType;

      form.style.display = 'none';
      feedbackCard.style.display = 'block';

      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Scroll smoothly to feedback card
      feedbackCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 700);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      feedbackCard.style.display = 'none';
      form.style.display = 'flex';
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
}

/* ===================================================================
   7. SCROLL-REVEAL ANIMATIONS
=================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.reveal-fade-up');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ===================================================================
   8. BACK TO TOP
=================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
