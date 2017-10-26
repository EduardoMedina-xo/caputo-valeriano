$(function(){
    
        var windowWidth = $(window).width();
    
        // ======================================
        // Prep
        // ======================================
    
        // Get section or article by href
        function getRelatedContent(el) {
            return $($(el).attr('href'));
        }
    
        // Get link by section or article id
        function getRelatedNavigation(el) {
            return $('.ebook-sidebar-nav a[href=#'+$(el).attr('id')+']');
        }
    
        // ======================================
        // Init
        // ======================================
    
        // Sidebar sticky
        function stickySidebar() {
            var windowWidth = $(window).width();
            if($(window).width() > 767) {
                $(".ebook-sidebar").stick_in_parent({
                    'parent': '.ebook-body .container',
                    'offset_top': 10,
                    'inner_scrolling': true
                });
            } else {
                $(".ebook-sidebar").trigger("sticky_kit:detach");
            }
        }
        $(window).on('load resize', function(){
            stickySidebar();
        });
    
        // Smooth scroll to content
        $('.ebook-sidebar-nav a').on('click',function(e){
            $('html,body').animate({scrollTop:getRelatedContent(this).offset().top});
            e.preventDefault();
        });
    
        // Waypoint
        var wpDefaults = {
            context: window,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
    
        if($(window).width() > 767) {
    
            $('.ebook-content .chapter').waypoint(function(direction) {
                    getRelatedNavigation(this).toggleClass('active', direction === 'down');
                }, { offset: '10%' }).waypoint(function(direction) {
                    getRelatedNavigation(this).toggleClass('active', direction === 'up');
                }, {
                    offset: function() {
                    return -$(this).height();
                }
            });
        }
    });