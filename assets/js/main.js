/*
    Main site script (vanilla JS)
    Originally based on Strata by HTML5 UP, refactored to remove jQuery and legacy helpers.
*/

(function () {
    'use strict';

    // ---------------------------------------------------------------------
    // Core DOM references
    // ---------------------------------------------------------------------
    const body = document.body;
    const header = document.getElementById('header');
    const main = document.getElementById('main');
    const footer = document.getElementById('footer');

    // ---------------------------------------------------------------------
    // Preload / touch detection
    // ---------------------------------------------------------------------
    const settings = {
        parallax: false,
        parallaxFactor: 20
    };

    const isMobile =
        'ontouchstart' in window ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0);

    // Remove preload class after initial load for smoother transitions
    window.addEventListener('load', function () {
        body.classList.remove('is-preload');
    });

    // Touch mode hint (kept for any legacy CSS hooks)
    if (isMobile) {
        body.classList.add('is-touch');

        // iOS height fix
        window.setTimeout(function () {
            window.scrollTo(window.pageXOffset, window.pageYOffset + 1);
        }, 0);
    }

    // ---------------------------------------------------------------------
    // Parallax header (vanilla, breakpoint-aware)
    // ---------------------------------------------------------------------
    if (header && settings.parallax) {
        let parallaxEnabled = false;
        let ticking = false;

        function updateHeaderBackground(scrollY) {
            header.style.backgroundPosition = 'center ' + (-1 * (scrollY / settings.parallaxFactor)) + 'px';
        }

        function handleScroll() {
            const scrollY =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                0;
            updateHeaderBackground(scrollY);
            ticking = false;
        }

        function onScroll() {
            if (!parallaxEnabled) return;
            if (!ticking) {
                window.requestAnimationFrame(handleScroll);
                ticking = true;
            }
        }

        function updateParallaxState() {
            // Enable parallax only on non-mobile and wider than 980px
            const shouldEnable = !isMobile && window.innerWidth > 980;

            if (shouldEnable && !parallaxEnabled) {
                parallaxEnabled = true;
                header.style.backgroundPosition = 'center 0px';
                window.addEventListener('scroll', onScroll);
                handleScroll();
            } else if (!shouldEnable && parallaxEnabled) {
                parallaxEnabled = false;
                window.removeEventListener('scroll', onScroll);
                header.style.backgroundPosition = '';
            }
        }

        updateParallaxState();
        window.addEventListener('resize', updateParallaxState);
    }

    // ---------------------------------------------------------------------
    // Project gallery (Swiper) and modals
    // ---------------------------------------------------------------------

    const projectsData = {
        1: [
            { src: 'images/fulls/card1/01.gif', caption: ' Creating a new record for keyword searches.' },
            { src: 'images/fulls/card1/02.gif', caption: ' Using a previous record to search for keywords within the video.' }
        ],
        2: [
            { src: 'images/fulls/card2/orgoverview.gif', caption: ' Organizational Layout ' },
            { src: 'images/fulls/card2/labels.gif', caption: ' Labeling and tagging system ' },
            { src: 'images/fulls/card2/media.gif', caption: ' Media discussions ' },
            { src: 'images/fulls/card2/teams.gif', caption: ' Team based ' }
        ],
        3: [
            { src: 'images/fulls/card3/cre8ion.gif', caption: ' Model Ranking ' },
            { src: 'images/fulls/card3/02.gif', caption: ' Teaching AI ' },
            { src: 'images/fulls/card3/03.gif', caption: ' Model upload and library ' }
        ],
        4: [
            { src: 'images/fulls/card4/brainstorm.gif', caption: 'Brainstorm - Slide 1' },
            { src: 'images/fulls/card4/02.gif', caption: 'Brainstorm - Slide 2' },
            { src: 'images/fulls/card4/03.gif', caption: 'Brainstorm - Slide 3' }
        ]
    };

    let projectSwiper = null;

    function initializeSwiper() {
        if (projectSwiper) {
            projectSwiper.destroy(true, true);
        }

        // Swiper is loaded globally via CDN script
        projectSwiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: true
            },
            on: {
                init: function () {
                    const images = document.querySelectorAll('.swiper-slide img');
                    images.forEach(function (img) {
                        if (img.complete) {
                            img.style.opacity = '1';
                        } else {
                            img.style.opacity = '0';
                            img.onload = function () {
                                img.style.opacity = '1';
                            };
                        }
                    });
                }
            }
        });
    }

    const projectModal = document.getElementById('projectModal');
    const closeProjectModal = projectModal ? projectModal.querySelector('.close') : null;
    let currentProjectId = null;

    // Generic modal helpers
    function showModal(modal) {
        if (!modal) return;

        const scrollY = window.scrollY || window.pageYOffset || 0;

        body.style.position = 'fixed';
        body.style.top = '-' + scrollY + 'px';
        body.style.width = '100%';

        modal.style.display = 'flex';
        void modal.offsetHeight;
        modal.classList.add('show');
    }

    function hideModal(modal) {
        if (!modal) return;

        const scrollY = body.style.top;

        modal.classList.remove('show');
        setTimeout(function () {
            modal.style.display = 'none';

            body.style.position = '';
            body.style.top = '';
            body.style.width = '';

            const y = parseInt(scrollY || '0', 10) * -1;
            window.scrollTo(0, y);
        }, 300);
    }

    if (projectModal) {
        const swiperWrapper = projectModal.querySelector('.swiper-wrapper');

        const thumbnails = document.querySelectorAll('.project-thumbnail');
        thumbnails.forEach(function (thumb) {
            thumb.style.cursor = 'pointer';
            thumb.addEventListener('click', function (event) {
                event.preventDefault();

                const projectItem = thumb.closest('.project-item');
                if (!projectItem) return;

                const projectId = projectItem.getAttribute('data-project');
                currentProjectId = projectId;

                swiperWrapper.innerHTML = '';

                if (projectsData[projectId]) {
                    projectsData[projectId].forEach(function (slide) {
                        const slideDiv = document.createElement('div');
                        slideDiv.className = 'swiper-slide';

                        const imgElement = document.createElement('img');
                        imgElement.src = slide.src;
                        imgElement.alt = slide.caption;
                        imgElement.style.opacity = '0';
                        imgElement.style.transition = 'opacity 0.3s ease';

                        const captionDiv = document.createElement('div');
                        captionDiv.className = 'slide-caption';
                        captionDiv.textContent = slide.caption;

                        slideDiv.appendChild(imgElement);
                        slideDiv.appendChild(captionDiv);
                        swiperWrapper.appendChild(slideDiv);

                        const tempImg = new Image();
                        tempImg.src = slide.src;
                        tempImg.onload = function () {
                            imgElement.style.opacity = '1';
                        };
                    });
                }

                showModal(projectModal);

                setTimeout(function () {
                    initializeSwiper();
                }, 100);
            });
        });

        if (closeProjectModal) {
            closeProjectModal.addEventListener('click', function () {
                hideModal(projectModal);
            });
        }
    }

    // ---------------------------------------------------------------------
    // Scroll reveal for experience and project cards
    // ---------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                function (entries, obs) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            obs.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.15 }
            );

            revealElements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback for older browsers: show everything immediately
            revealElements.forEach(function (el) {
                el.classList.add('is-visible');
            });
        }
    }

    // ---------------------------------------------------------------------
    // Technical details modal
    // ---------------------------------------------------------------------

    const techModal = document.getElementById('techModal');
    const techDetailsContainer = techModal ? techModal.querySelector('.tech-details') : null;
    const closeTechModal = techModal ? techModal.querySelector('.close') : null;
    const techButtons = document.querySelectorAll('.tech-details-btn');

    const projectTechDetails = {
        1: {
            title: 'Keyword Video Search',
            details: '\
                <h4>Technical Implementation</h4>\
                <ul>\
                    <li>Utilizes OpenAI Whisper for accurate video transcription with word-level timestamps</li>\
                    <li>Implements indexed keyword search mapped to exact time ranges in the video</li>\
                    <li>Python-based backend API exposed via Flask/FastAPI</li>\
                    <li>Stores transcripts and search metadata in PostgreSQL for reuse and analysis</li>\
                </ul>\
                <h4>Key Technologies</h4>\
                <ul>\
                    <li>Python</li>\
                    <li>Flask / FastAPI</li>\
                    <li>OpenAI Whisper</li>\
                    <li>PostgreSQL</li>\
                </ul>\
            '
        },
        2: {
            title: 'Media Co-Lab',
            details: '\
                <h4>Technical Implementation</h4>\
                <ul>\
                    <li>Full-stack collaboration platform for teams to upload and discuss media assets</li>\
                    <li>Django + DRF backend exposing authenticated REST APIs</li>\
                    <li>Vue.js SPA frontend for team views, media boards, and discussion threads</li>\
                    <li>Supports label-based prioritization, tagging, and team-scoped permissions</li>\
                </ul>\
                <h4>Key Technologies</h4>\
                <ul>\
                    <li>Python</li>\
                    <li>Django &amp; Django REST Framework</li>\
                    <li>Vue.js</li>\
                    <li>PostgreSQL</li>\
                    <li>Docker</li>\
                </ul>\
            '
        },
        3: {
            title: 'Cre8ion',
            details: '\
                <h4>Technical Implementation</h4>\
                <ul>\
                    <li>Web platform for sharing CAD models and managing uploads/downloads</li>\
                    <li>Django backend for user authentication and file management</li>\
                    <li>PostgreSQL database for storing model metadata and user info</li>\
                    <li>3D preview using Three.js and custom STL parsing</li>\
                </ul>\
                <h4>Key Technologies</h4>\
                <ul>\
                    <li>Python</li>\
                    <li>Django</li>\
                    <li>PostgreSQL</li>\
                    <li>Three.js</li>\
                </ul>\
            '
        },
        4: {
            title: 'Brainstorm',
            details: '\
                <h4>Coming Soon</h4>\
                <p>Technical details will be available soon.</p>\
            '
        }
    };

    if (techModal && techDetailsContainer) {
        techButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                const projectId = button.getAttribute('data-project');
                const project = projectTechDetails[projectId];
                if (project) {
                    techDetailsContainer.innerHTML = project.details;
                    showModal(techModal);
                }
            });
        });
        if (closeTechModal) {
            closeTechModal.addEventListener('click', function () {
                hideModal(techModal);
            });
        }
    }

    // Close modals when clicking outside
    window.addEventListener('click', function (event) {
        if (projectModal && event.target === projectModal) {
            hideModal(projectModal);
        }
        if (techModal && event.target === techModal) {
            hideModal(techModal);
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            hideModal(projectModal);
            hideModal(techModal);
        }
    });
    // Active section highlight in side nav
(function () {
  const sections = document.querySelectorAll('main section.section');
  const navLinks = document.querySelectorAll('#header .nav-links .nav-link');
  if (!sections.length || !navLinks.length) return;

  const navBySectionId = {};
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('#')) {
      const id = href.slice(1);
      navBySectionId[id] = link;
    }
  });

  const clearActive = () => {
    navLinks.forEach(link => link.classList.remove('active'));
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const activeLink = navBySectionId[id];
          if (activeLink) {
            clearActive();
            activeLink.classList.add('active');
          }
        }
      });
    },
    {
      root: null,
      threshold: 0.5
    }
  );

  sections.forEach(section => observer.observe(section));
})();

(function () {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
})();
})();