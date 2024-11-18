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

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			})

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
			
			function initializeProjectModal() {
				$('.project-thumbnail img').on('click', function() {
					let modal = document.getElementById("projectModal");
					let swiperWrapper = modal.querySelector('.swiper-wrapper');
			
					swiperWrapper.innerHTML = '';
			
					let projectId = $(this).closest('.project-item').data('project');
			
					if (projectsData[projectId]) {
						projectsData[projectId].forEach(slide => {
							swiperWrapper.innerHTML += `
								<div class="swiper-slide">
									<img src="${slide.src}" alt="${slide.caption}">
									<div class="slide-caption">${slide.caption}</div>
								</div>`;
						});
					}
			
					if (window.projectSwiper) {
						window.projectSwiper.update();
					} else {
						window.projectSwiper = new Swiper('.swiper-container', {
							navigation: {
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev',
							},
							loop: true
						});
					}
			
					modal.style.display = "block";
				});
			
				$('.close').on('click', function() {
					$('#projectModal').hide();
				});
			
				$(window).on('click', function(event) {
					let modal = document.getElementById("projectModal");
					if (event.target === modal) {
						modal.style.display = "none";
					}
				});
			}
			
			
		

})(jQuery);