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
    // Touch detection
    // ---------------------------------------------------------------------
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
    // Project gallery (Swiper) and modals
    // ---------------------------------------------------------------------

    const projectsData = {
        1: [
            { src: 'images/fulls/card1/ReportingAuto1.png', caption: 'Analysis recipe builder: configure data, columns, and rules, then run a report' },
            { src: 'images/fulls/card1/ReportingAuto2.png', caption: 'Rule setup and advanced analyses: key drivers, outliers, summary stats, time series' },
            { src: 'images/fulls/card1/ReportingAuto3.png', caption: 'Generated report with category distributions and correlation insights' },
            { src: 'images/fulls/card1/ReportingAuto4.png', caption: 'Crosstab insights exported alongside distribution reports' }
        ],
        2: [
            { src: 'images/fulls/card2/Logger1.png', caption: 'Weekly planner with daily plan and a running project timer' },
            { src: 'images/fulls/card2/Logger2.png', caption: 'Per-project boards tracking entries against the 40-hour week' },
            { src: 'images/fulls/card2/Logger3.png', caption: 'Weekly log grid grouped by project' },
            { src: 'images/fulls/card2/Logger4.png', caption: 'Dark mode' },
            { src: 'images/fulls/card2/Logger5.png', caption: 'Quick-add entries and timers across the week' },
            { src: 'images/fulls/card2/Logger6.png', caption: 'Project priority and notes' },
            { src: 'images/fulls/card2/Logger7.png', caption: 'Entry editor: job title, project code, activity, and time range' }
        ],
        3: [
            { src: 'images/fulls/card3/ShopFloor1.png', caption: 'Operations dashboard: departments, work centers, and parts at a glance' },
            { src: 'images/fulls/card3/ShopFloor2.png', caption: 'Interactive floor map with zones drawn per floor' },
            { src: 'images/fulls/card3/ShopFloor3.png', caption: 'Department management with search and floor-map shortcuts' },
            { src: 'images/fulls/card3/ShopFloor4.png', caption: 'Work centers linked to their departments' }
        ],
        4: [
            { src: 'images/fulls/card4/MediaColab2.gif', caption: 'Organizational layout' },
            { src: 'images/fulls/card4/MediaColab3.gif', caption: 'Labeling and tagging system' },
            { src: 'images/fulls/card4/MediaColab4.gif', caption: 'Media discussions' },
            { src: 'images/fulls/card4/MediaColab5.gif', caption: 'Team-based views' }
        ]

        // Template for next project — uncomment, fill in, and add a comma after the entry above.
        // ,5: [
        //     { src: 'images/fulls/card5/ProjectName1.png', caption: 'Caption for this slide' },
        //     { src: 'images/fulls/card5/ProjectName2.png', caption: 'Caption for this slide' }
        // ]
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

        // Just show the modal; let the page keep its current scroll position
        modal.style.display = 'flex';
        void modal.offsetHeight; // force reflow so the CSS transition applies
        modal.classList.add('show');
    }

    function hideModal(modal) {
        if (!modal) return;
        
        modal.classList.remove('show');
        setTimeout(function () {
            modal.style.display = 'none';
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
            title: 'ReportingAuto',
            details: `
                <h4>Technical Implementation</h4>
                <ul>
                    <li>Recipe-driven analysis engine: configure column rules, correlations, crosstabs, and advanced analyses (key drivers, outliers, summary stats, time series)</li>
                    <li>Runs reports over CSV inputs and emits report + insights outputs tagged with run IDs for traceability</li>
                    <li>Recipes and headers are importable/exportable for repeatable, shareable reporting</li>
                    <li>Pandas-based ETL, validation, and aggregation logic behind each rule</li>
                </ul>
                <h4>Key Technologies</h4>
                <ul>
                    <li>Python</li>
                    <li>Pandas</li>
                    <li>ETL pipelines</li>
                </ul>
            `
        },
        2: {
            title: 'Logger',
            details: `
                <h4>Technical Implementation</h4>
                <ul>
                    <li>Weekly planning and time logging: daily plan, per-project boards, and a drag-and-drop weekly grid</li>
                    <li>Start/stop timer state machine: stops the running entry, rounds its end time up to a clean increment, and starts the next entry exactly where the last one stopped, so there's no gap and no overlap</li>
                    <li>Projects auto-provision from a typed code the first time it's used, no separate "create project" step</li>
                    <li>FastAPI backend with a Vue 3 frontend, cookie-based auth throughout</li>
                </ul>
                <h4>Architecture &amp; Trade-offs</h4>
                <ul>
                    <li>Auth is the most production-grade part of the app: HttpOnly cookies (not localStorage) close off XSS token theft, and refresh tokens rotate on every use with reuse detection per RFC 6819, so replaying an old token burns the entire session family</li>
                    <li>Hit and fixed a real race during development: a burst of concurrent 401s each tried to refresh independently, and the second call always looked like token reuse. Fixed with a single-flight guard so concurrent requests share one refresh call</li>
                    <li>Honest gap, named plainly: "only one running timer per user" is enforced with a check-then-act query, not a database constraint. A real concurrency race under load, with a known fix (a partial unique index) not yet shipped</li>
                </ul>
                <h4>Key Technologies</h4>
                <ul>
                    <li>Python</li>
                    <li>FastAPI</li>
                    <li>Vue.js</li>
                    <li>PostgreSQL</li>
                    <li>Docker</li>
                </ul>
            `
        },
        3: {
            title: 'ShopFloor',
            details: `
                <h4>Technical Implementation</h4>
                <ul>
                    <li>Manufacturing execution system: departments own parts, parts get quality-checked and can carry logged defects; a second layer models work orders, routings, and bills of materials</li>
                    <li>Floor-plan editor: click-to-draw polygon zones on an SVG plant layout, snapped to a grid, linked to real work centers and departments</li>
                    <li>Single FastAPI + Strawberry GraphQL endpoint over 16 SQLAlchemy models, with a Vue 3 frontend</li>
                </ul>
                <h4>Architecture &amp; Trade-offs</h4>
                <ul>
                    <li>Deliberately flat GraphQL schema (no nested relational fields): every resolver is a single indexed query with zero N+1 risk, at the cost of pushing multi-entity joins onto the client</li>
                    <li>Repository + service layer split so validation and error codes live in one place, independent of the HTTP/resolver layer</li>
                    <li>Found via self-audit, not a live incident: the Alembic migration history hadn't been regenerated after the schema grew, so 10 of 16 tables wouldn't exist on a genuinely fresh deploy. Traced the gap, confirmed the fix was a single command away, and documented it before it could surprise anyone</li>
                </ul>
                <h4>Key Technologies</h4>
                <ul>
                    <li>Python</li>
                    <li>FastAPI &amp; GraphQL</li>
                    <li>Vue.js</li>
                    <li>PostgreSQL</li>
                </ul>
            `
        },
        4: {
            title: 'Media Co-Lab',
            details: `
                <h4>Technical Implementation</h4>
                <ul>
                    <li>Multi-tenant collaboration platform: organizations contain teams, teams upload and label media, and every media item carries a comment feed plus a live WebSocket relay</li>
                    <li>Django + DRF backend exposing authenticated REST APIs; Vue 3 SPA mirroring the resource tree via Vuex</li>
                    <li>Two-sided human approval workflow (platform admins approve orgs, org admins approve members) gates access before any query runs</li>
                    <li>Typed labeling system with a validated custom-type escape hatch enforced at the model layer, so every write path inherits the same invariant</li>
                </ul>
                <h4>Architecture &amp; Trade-offs</h4>
                <ul>
                    <li>Isolation is layered three ways, an approval-status gate, scoped ORM query paths back to the org, and explicit object-level ownership checks on writes, rather than resting on a single filter</li>
                    <li>Chose Knox (server-side, revocable) over JWTs so an admin revoking access takes effect immediately, at the cost of a stateful token store</li>
                    <li>Honest gap: the WebSocket relay doesn't yet authenticate connections. Bounded by the fact that nothing sent over the socket persists and room names are unguessable UUIDs, but it's the top item on the hardening list</li>
                    <li>Caught and fixed a live bug via self-audit: an endpoint treated a many-to-many manager as a single object, causing a 500 on every call. Fixed, with a regression test in place</li>
                </ul>
                <h4>Key Technologies</h4>
                <ul>
                    <li>Python</li>
                    <li>Django &amp; Django REST Framework</li>
                    <li>Vue.js</li>
                    <li>PostgreSQL</li>
                    <li>Docker</li>
                </ul>
            `
        }

        // Template for next project — uncomment, fill in, and add a comma after the entry above.
        // ,5: {
        //     title: 'ProjectName',
        //     details: `
        //         <h4>Technical Implementation</h4>
        //         <ul>
        //             <li>Brief bullet on what this project does or how it's built</li>
        //         </ul>
        //         <h4>Key Technologies</h4>
        //         <ul>
        //             <li>Tech 1</li>
        //             <li>Tech 2</li>
        //         </ul>
        //     `
        // }
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
})();

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

// Stats bar — animated counters
(function () {
    var statsBar = document.querySelector('.stats-bar');
    if (!statsBar || !('IntersectionObserver' in window)) return;

    function animateCounter(el, target, duration) {
        var start = performance.now();
        function step(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    var statsObs = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-number').forEach(function (el) {
                    animateCounter(el, parseInt(el.dataset.target, 10), 1200);
                });
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObs.observe(statsBar);
})();

// Scroll progress bar
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