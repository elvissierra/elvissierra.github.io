/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
	//	breakpoints.on('<=medium', function() {
	//		$footer.insertAfter($main);
	//	});

	//	breakpoints.on('>medium', function() {
	//		$footer.appendTo($header);
	//	});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {
				let ticking = false;
				let lastScrollY = 0;
				const header = $header[0];

				breakpoints.on('<=medium', function() {
					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');
				});

				breakpoints.on('>medium', function() {
					$header.css('background-position', 'center 0px');

					$window.on('scroll.strata_parallax', function() {
						if (!ticking) {
							window.requestAnimationFrame(function() {
								const currentScrollY = $window.scrollTop();
								const delta = currentScrollY - lastScrollY;
								
								// Only update if scroll amount is significant
								if (Math.abs(delta) > 1) {
									$header.css('background-position', 'center ' + (-1 * (currentScrollY / settings.parallaxFactor)) + 'px');
									lastScrollY = currentScrollY;
								}
								
								ticking = false;
							});
							ticking = true;
						}
					});
				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});
			}

	// Main Sections: Two.

			const projectsData = {
				1: [
					{ src: "images/fulls/card1/01.gif", caption: " Creating a new record for keyword searches." },
					{ src: "images/fulls/card1/02.gif", caption: " Using a previous record to search for keywords within the video." },
				],
				2: [
					{ src: "images/fulls/card2/orgoverview.gif", caption: " Organizational Layout " },
					{ src: "images/fulls/card2/labels.gif", caption: " Labeling and tagging system " },
					{ src: "images/fulls/card2/media.gif", caption: " Media discussions " },
					{ src: "images/fulls/card2/teams.gif", caption: " Team based " },
				],
				3: [
					{ src: "images/fulls/card3/cre8ion.gif", caption: " Model Ranking " },
					{ src: "images/fulls/card3/02.gif", caption: " Teaching AI " },
					{ src: "images/fulls/card3/03.gif", caption: " Model upload and library " },
				],
				4: [
					{ src: "images/fulls/card4/brainstorm.gif", caption: "Brainstorm - Slide 1" },
					{ src: "images/fulls/card4/02.gif", caption: "Brainstorm - Slide 2" },
					{ src: "images/fulls/card4/03.gif", caption: "Brainstorm - Slide 3" },
				]
			};
			

			$(document).ready(function() {
				initializeProjectModal();
			});
			
			// Initialize Swiper
			let projectSwiper = null;

			function initializeSwiper() {
				if (projectSwiper) {
					projectSwiper.destroy();
				}
				
				projectSwiper = new Swiper('.swiper-container', {
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					loop: true,
					effect: 'fade',
					fadeEffect: {
						crossFade: true
					},
					keyboard: {
						enabled: true,
						onlyInViewport: true,
					},
					autoplay: {
						delay: 5000,
						disableOnInteraction: true,
					},
					on: {
						init: function() {
							// Ensure images are loaded
							const images = document.querySelectorAll('.swiper-slide img');
							images.forEach(img => {
								if (img.complete) {
									img.style.opacity = '1';
								} else {
									img.style.opacity = '0';
									img.onload = function() {
										this.style.opacity = '1';
									};
								}
							});
						}
					}
				});
			}

			// Project Gallery Modal
			const projectModal = document.getElementById('projectModal');
			const closeProjectModal = document.querySelector('#projectModal .close');

			document.querySelectorAll('.project-thumbnail img').forEach(img => {
				img.addEventListener('click', function(e) {
					e.preventDefault();
					const projectItem = this.closest('.project-item');
					const projectId = projectItem.getAttribute('data-project');
					currentProjectId = projectId;
					const swiperWrapper = projectModal.querySelector('.swiper-wrapper');
					
					// Get project position
					const projectRect = projectItem.getBoundingClientRect();
					const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
					
					// Position modal relative to project
					const modalContent = projectModal.querySelector('.modal-content');
					modalContent.style.position = 'absolute';
					modalContent.style.top = `${projectRect.top + scrollTop}px`;
					modalContent.style.left = '50%';
					modalContent.style.transform = 'translateX(-50%)';
					
					// Adjust modal size based on viewport
					const viewportHeight = window.innerHeight;
					const modalHeight = Math.min(viewportHeight * 0.8, 800);
					modalContent.style.maxHeight = `${modalHeight}px`;
					
					swiperWrapper.innerHTML = '';
					
					if (projectsData[projectId]) {
						projectsData[projectId].forEach(slide => {
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
							
							// Preload image
							const tempImg = new Image();
							tempImg.src = slide.src;
							tempImg.onload = function() {
								imgElement.style.opacity = '1';
							};
						});
					}
					
					showModal(projectModal);
					setTimeout(() => {
						initializeSwiper();
					}, 100);
				});
			});

			// Update modal position on window resize
			window.addEventListener('resize', () => {
				if (projectModal.style.display === 'block') {
					const activeProject = document.querySelector('.project-item[data-project="' + currentProjectId + '"]');
					if (activeProject) {
						const projectRect = activeProject.getBoundingClientRect();
						const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
						const modalContent = projectModal.querySelector('.modal-content');
						modalContent.style.top = `${projectRect.top + scrollTop}px`;
					}
				}
			});

			// Store current project ID
			let currentProjectId = null;

			// Update showModal function
			function showModal(modal) {
				// Store current scroll position
				const scrollY = window.scrollY;
				
				// Prevent body scrolling
				document.body.style.position = 'fixed';
				document.body.style.top = `-${scrollY}px`;
				document.body.style.width = '100%';
				
				modal.style.display = "block";
				// Trigger reflow
				modal.offsetHeight;
				modal.classList.add('show');
			}

			// Update hideModal function
			function hideModal(modal) {
				// Get the scroll position from body
				const scrollY = document.body.style.top;
				
				modal.classList.remove('show');
				setTimeout(() => {
					modal.style.display = "none";
					
					// Restore body scrolling
					document.body.style.position = '';
					document.body.style.top = '';
					document.body.style.width = '';
					
					// Restore scroll position
					window.scrollTo(0, parseInt(scrollY || '0') * -1);
				}, 300);
			}

			closeProjectModal.addEventListener('click', () => {
				hideModal(projectModal);
			});

			// Technical Details Modal
			const techModal = document.getElementById('techModal');
			const techDetails = document.querySelector('.tech-details');
			const techButtons = document.querySelectorAll('.tech-details-btn');
			const closeTechModal = document.querySelector('#techModal .close');

			const projectTechDetails = {
				1: {
					title: "Keyword Video Search",
					details: `
						<h4>Technical Implementation</h4>
						<ul>
							<li>Utilized OpenAI's Whisper API for accurate video transcription</li>
							<li>Implemented efficient keyword search algorithm with timestamp tracking</li>
							<li>Built with Python for optimal performance and easy integration</li>
							<li>Features real-time search results and video preview</li>
						</ul>
						<h4>Key Technologies</h4>
						<ul>
							<li>Python</li>
							<li>OpenAI Whisper API</li>
							<li>FFmpeg for video processing</li>
							<li>SQLite for data storage</li>
						</ul>
					`
				},
				2: {
					title: "Media Co-Lab",
					details: `
						<h4>Technical Implementation</h4>
						<ul>
							<li>Full-stack social media platform with real-time collaboration features</li>
							<li>Implemented secure user authentication and authorization</li>
							<li>Built with React for frontend and Node.js for backend</li>
							<li>Features real-time updates and team collaboration tools</li>
						</ul>
						<h4>Key Technologies</h4>
						<ul>
							<li>React.js</li>
							<li>Node.js</li>
							<li>MongoDB</li>
							<li>Socket.io for real-time features</li>
						</ul>
					`
				},
				3: {
					title: "Cre8ion",
					details: `
						<h4>Technical Implementation</h4>
						<ul>
							<li>CAD model platform with user-friendly interface</li>
							<li>Implemented secure file upload and download system</li>
							<li>Built with Django for robust backend functionality</li>
							<li>Features 3D model preview and basic editing capabilities</li>
						</ul>
						<h4>Key Technologies</h4>
						<ul>
							<li>Python</li>
							<li>Django</li>
							<li>PostgreSQL</li>
							<li>Three.js for 3D rendering</li>
						</ul>
					`
				},
				4: {
					title: "Brainstorm",
					details: `
						<h4>Coming Soon</h4>
						<p>Technical details will be available soon.</p>
					`
				}
			};

			techButtons.forEach(button => {
				button.addEventListener('click', () => {
					const projectId = button.getAttribute('data-project');
					const project = projectTechDetails[projectId];
					
					if (project) {
						techDetails.innerHTML = project.details;
						showModal(techModal);
					}
				});
			});

			closeTechModal.addEventListener('click', () => {
				hideModal(techModal);
			});

			// Close modals when clicking outside
			window.addEventListener('click', (event) => {
				if (event.target === projectModal) {
					hideModal(projectModal);
				}
				if (event.target === techModal) {
					hideModal(techModal);
				}
			});

			// Close modals with Escape key
			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					hideModal(projectModal);
					hideModal(techModal);
				}
			});
			
			
		

})(jQuery);