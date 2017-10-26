$(function() {

	$.fn.hopupModal = function( options ) {
		var modalStatus = "closed";
		var triggerElement = $(this);

		$.fn.showCtaModal = function(){
			$(triggerElement).css("display", "block").animate({ opacity: 1 }, 200, function() { /* Animation complete. */ });
			$(triggerElement).find('.hopup-modal-inner').delay(400).animate({ opacity: 1, top: "-=20" }, 200, function() { /* Animation complete. */ });
			modalStatus = "open";
		}

		$.fn.slideCtaModal = function(){
			$(triggerElement).css("display", "block").animate({ opacity: 1 }, 200, function() { /* Animation complete. */ });
			$(triggerElement).find('.hopup-modal-inner').animate({ opacity: 1, right: "20" }, 200, function() { /* Animation complete. */ });
			modalStatus = "open";
		}

		$.fn.slideOutCtaModal = function(){
			$(triggerElement).find('.hopup-modal-inner').animate({ opacity: 0, right: "-=500" }, 200, function() { /* Animation complete. */ });
			$(triggerElement).delay(200).animate({ opacity: 0 }, 200, function() {
				$(triggerElement).css("display", "none");
			});
			modalStatus = "closed";
		}

		$(triggerElement).find('.hopup-modal-close').click(function(){
			$(triggerElement).find('.hopup-modal-inner').animate({ opacity: 0, top: "+=20" }, 200, function() { /* Animation complete. */ });
			$(triggerElement).delay(200).animate({ opacity: 0 }, 200, function() {
				$(triggerElement).css("display", "none");
			});
			modalStatus = "closed";
		});

		// Default settings
		var settings = $.extend({
			triggerPosition: '70',
			triggerTime: '10',
			showOnce: 'false',
		}, options);

		return this.each( function() {

			if ( settings.showOnce != "true" ) {
				sessionStorage.removeItem('alreadySeen');
			}

			if (settings.trigger == "exit") {
				$(document).mousemove(function(e) {
				  var mousePos = (e.pageY - $(document).scrollTop());
					if((modalStatus == "closed") && (mousePos <= 7) && (!sessionStorage.alreadySeen)) {
						$(triggerElement).showCtaModal();
						if ( settings.showOnce == "true" ) {
			        sessionStorage.alreadySeen = 1;
						}
					}
				});
			}
			if (settings.trigger == "scroll") {
				var modalClosed = 0;
				$(window).scroll(function(){
					if ((modalStatus == "closed") && (modalClosed == 0) && ($(window).scrollTop() + ($(window).height()/2) > $('body').height() * settings.triggerPosition / 100) && (!sessionStorage.alreadySeen)) {
						$(triggerElement).showCtaModal();
						modalClosed = 1;
						if ( settings.showOnce == "true" ) {
			        sessionStorage.alreadySeen = 1;
						}
					}
				});
			}
			if ((settings.trigger == "timer") && (modalStatus == "closed")) {
				function modalTimer(){
					$(triggerElement).showCtaModal();
					if ( settings.showOnce == "true" ) {
						sessionStorage.alreadySeen = 1;
					}
				}
				setTimeout(modalTimer, settings.triggerTime * 1000);
			}
			if (settings.trigger == "slide") {
				var modalClosed = 0;
				$(window).scroll(function(){
					if ((modalStatus == "closed") && (modalClosed == 0) && ($(window).scrollTop() + ($(window).height()/2) > $('body').height() * settings.triggerPosition / 100) && (!sessionStorage.alreadySeen)) {
						$(triggerElement).addClass('slide').slideCtaModal();
						modalClosed = 1;
						if ( settings.showOnce == "true" ) {
			        sessionStorage.alreadySeen = 1;
						}
					} else if ((modalStatus == "open") && ($(window).scrollTop() + ($(window).height()/2) < $('body').height() * settings.triggerPosition / 100)) {
						$(triggerElement).slideOutCtaModal();
						modalClosed = 0;
					}
				});
			}
		});
	};
});
