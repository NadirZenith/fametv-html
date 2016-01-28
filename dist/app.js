$(function () {
    //fade initial page show
    $('html').animate({
        opacity: 1
    }, 1000);

    //jQuery to collapse the navbar on scroll
    /*    
     $(window).scroll(function () {
     if ($(".navbar").offset().top > 50) {
     $(".navbar-fixed-top").addClass("top-nav-collapse");
     } else {
     $(".navbar-fixed-top").removeClass("top-nav-collapse");
     }
     });
     * */
    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });


    var winSize = '';
    window.onresize = onWindowResize;
    function onWindowResize() {
        var windowWidth = $(this).width();
        var newWinSize = 'xs'; // default value, check for actual size
        if (windowWidth >= 1200) {
            newWinSize = 'lg';
        } else if (windowWidth >= 992) {
            newWinSize = 'md';
        } else if (windowWidth >= 768) {
            newWinSize = 'sm';
        }
        if (newWinSize !== winSize) {
            winSize = newWinSize;
        }
    }
    onWindowResize();

    //hide navbar on menu click(only on mobiles| xs)
    $('.nav a').on('click', function () {
        if (winSize === 'xs') {
            $('.navbar-toggle').click();
        }
    });


    var waypoint = new Waypoint({
        element: document.getElementById('home'),
        offset: '-50px',
        handler: function (direction) {
            console.log('works', direction);
            var $body = $('body');
            var $navbar = $(".navbar-fixed-top");
            if ('down' === direction) {
                $body.addClass('show-list');
                $navbar.addClass("top-nav-collapse");

            } else {
                $body.removeClass('show-list');
                $body.removeClass('show-video');
                $navbar.removeClass("top-nav-collapse");
            }
        }
    });

    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    var $body = $('body');

    $('.video-list-item').on('click', function () {
        $body.addClass('show-video');
        top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    });

    $(window).on('scroll', function () {
        var newTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        console.log('Event Fired', top, newTop);
        if (newTop !== top) {
            $body.removeClass('show-video');

        }
    });


    /*
     //add popover to slider gallery
     //requires html
     $('a[data-toggle="popover"]').on("click", function () {
     var img_src = $(this).find('img').attr('src');
     $('#modalimagepreview').attr('src', img_src); // here asign the image to the modal when the user click the enlarge link
     $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
     });
     
     //form
     $("body").on("input propertychange", ".floating-label-form-group", function (e) {
     $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
     }).on("focus", ".floating-label-form-group", function () {
     $(this).addClass("floating-label-form-group-with-focus");
     }).on("blur", ".floating-label-form-group", function () {
     $(this).removeClass("floating-label-form-group-with-focus");
     });
     */
});


/*debug*/
function includeCssDebug(e) {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {

        var cssId = 'debug-bootstrap';  // you could encode the css path itself to generate id..
        if (!document.getElementById(cssId))
        {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'src/css/bootstrap-responsive-debug.css';
            link.media = 'all';
            head.appendChild(link);
        }

    }
}

document.onkeydown = includeCssDebug;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKSB7XG4gICAgLy9mYWRlIGluaXRpYWwgcGFnZSBzaG93XG4gICAgJCgnaHRtbCcpLmFuaW1hdGUoe1xuICAgICAgICBvcGFjaXR5OiAxXG4gICAgfSwgMTAwMCk7XG5cbiAgICAvL2pRdWVyeSB0byBjb2xsYXBzZSB0aGUgbmF2YmFyIG9uIHNjcm9sbFxuICAgIC8qICAgIFxuICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgaWYgKCQoXCIubmF2YmFyXCIpLm9mZnNldCgpLnRvcCA+IDUwKSB7XG4gICAgICQoXCIubmF2YmFyLWZpeGVkLXRvcFwiKS5hZGRDbGFzcyhcInRvcC1uYXYtY29sbGFwc2VcIik7XG4gICAgIH0gZWxzZSB7XG4gICAgICQoXCIubmF2YmFyLWZpeGVkLXRvcFwiKS5yZW1vdmVDbGFzcyhcInRvcC1uYXYtY29sbGFwc2VcIik7XG4gICAgIH1cbiAgICAgfSk7XG4gICAgICogKi9cbiAgICAvL2pRdWVyeSBmb3IgcGFnZSBzY3JvbGxpbmcgZmVhdHVyZSAtIHJlcXVpcmVzIGpRdWVyeSBFYXNpbmcgcGx1Z2luXG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2EucGFnZS1zY3JvbGwnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyICRhbmNob3IgPSAkKHRoaXMpO1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQoJGFuY2hvci5hdHRyKCdocmVmJykpLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgfSwgMTUwMCwgJ2Vhc2VJbk91dEV4cG8nKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICB2YXIgd2luU2l6ZSA9ICcnO1xuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IG9uV2luZG93UmVzaXplO1xuICAgIGZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xuICAgICAgICB2YXIgd2luZG93V2lkdGggPSAkKHRoaXMpLndpZHRoKCk7XG4gICAgICAgIHZhciBuZXdXaW5TaXplID0gJ3hzJzsgLy8gZGVmYXVsdCB2YWx1ZSwgY2hlY2sgZm9yIGFjdHVhbCBzaXplXG4gICAgICAgIGlmICh3aW5kb3dXaWR0aCA+PSAxMjAwKSB7XG4gICAgICAgICAgICBuZXdXaW5TaXplID0gJ2xnJztcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3dXaWR0aCA+PSA5OTIpIHtcbiAgICAgICAgICAgIG5ld1dpblNpemUgPSAnbWQnO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvd1dpZHRoID49IDc2OCkge1xuICAgICAgICAgICAgbmV3V2luU2l6ZSA9ICdzbSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1dpblNpemUgIT09IHdpblNpemUpIHtcbiAgICAgICAgICAgIHdpblNpemUgPSBuZXdXaW5TaXplO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uV2luZG93UmVzaXplKCk7XG5cbiAgICAvL2hpZGUgbmF2YmFyIG9uIG1lbnUgY2xpY2sob25seSBvbiBtb2JpbGVzfCB4cylcbiAgICAkKCcubmF2IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh3aW5TaXplID09PSAneHMnKSB7XG4gICAgICAgICAgICAkKCcubmF2YmFyLXRvZ2dsZScpLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgdmFyIHdheXBvaW50ID0gbmV3IFdheXBvaW50KHtcbiAgICAgICAgZWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbWUnKSxcbiAgICAgICAgb2Zmc2V0OiAnLTUwcHgnLFxuICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnd29ya3MnLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgdmFyICRib2R5ID0gJCgnYm9keScpO1xuICAgICAgICAgICAgdmFyICRuYXZiYXIgPSAkKFwiLm5hdmJhci1maXhlZC10b3BcIik7XG4gICAgICAgICAgICBpZiAoJ2Rvd24nID09PSBkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAkYm9keS5hZGRDbGFzcygnc2hvdy1saXN0Jyk7XG4gICAgICAgICAgICAgICAgJG5hdmJhci5hZGRDbGFzcyhcInRvcC1uYXYtY29sbGFwc2VcIik7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGJvZHkucmVtb3ZlQ2xhc3MoJ3Nob3ctbGlzdCcpO1xuICAgICAgICAgICAgICAgICRib2R5LnJlbW92ZUNsYXNzKCdzaG93LXZpZGVvJyk7XG4gICAgICAgICAgICAgICAgJG5hdmJhci5yZW1vdmVDbGFzcyhcInRvcC1uYXYtY29sbGFwc2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgdmFyIHRvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKTtcbiAgICB2YXIgJGJvZHkgPSAkKCdib2R5Jyk7XG5cbiAgICAkKCcudmlkZW8tbGlzdC1pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkYm9keS5hZGRDbGFzcygnc2hvdy12aWRlbycpO1xuICAgICAgICB0b3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5ld1RvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0V2ZW50IEZpcmVkJywgdG9wLCBuZXdUb3ApO1xuICAgICAgICBpZiAobmV3VG9wICE9PSB0b3ApIHtcbiAgICAgICAgICAgICRib2R5LnJlbW92ZUNsYXNzKCdzaG93LXZpZGVvJyk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvKlxuICAgICAvL2FkZCBwb3BvdmVyIHRvIHNsaWRlciBnYWxsZXJ5XG4gICAgIC8vcmVxdWlyZXMgaHRtbFxuICAgICAkKCdhW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICB2YXIgaW1nX3NyYyA9ICQodGhpcykuZmluZCgnaW1nJykuYXR0cignc3JjJyk7XG4gICAgICQoJyNtb2RhbGltYWdlcHJldmlldycpLmF0dHIoJ3NyYycsIGltZ19zcmMpOyAvLyBoZXJlIGFzaWduIHRoZSBpbWFnZSB0byB0aGUgbW9kYWwgd2hlbiB0aGUgdXNlciBjbGljayB0aGUgZW5sYXJnZSBsaW5rXG4gICAgICQoJyNpbWFnZW1vZGFsJykubW9kYWwoJ3Nob3cnKTsgLy8gaW1hZ2Vtb2RhbCBpcyB0aGUgaWQgYXR0cmlidXRlIGFzc2lnbmVkIHRvIHRoZSBib290c3RyYXAgbW9kYWwsIHRoZW4gaSB1c2UgdGhlIHNob3cgZnVuY3Rpb25cbiAgICAgfSk7XG4gICAgIFxuICAgICAvL2Zvcm1cbiAgICAgJChcImJvZHlcIikub24oXCJpbnB1dCBwcm9wZXJ0eWNoYW5nZVwiLCBcIi5mbG9hdGluZy1sYWJlbC1mb3JtLWdyb3VwXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJmbG9hdGluZy1sYWJlbC1mb3JtLWdyb3VwLXdpdGgtdmFsdWVcIiwgISEkKGUudGFyZ2V0KS52YWwoKSk7XG4gICAgIH0pLm9uKFwiZm9jdXNcIiwgXCIuZmxvYXRpbmctbGFiZWwtZm9ybS1ncm91cFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICQodGhpcykuYWRkQ2xhc3MoXCJmbG9hdGluZy1sYWJlbC1mb3JtLWdyb3VwLXdpdGgtZm9jdXNcIik7XG4gICAgIH0pLm9uKFwiYmx1clwiLCBcIi5mbG9hdGluZy1sYWJlbC1mb3JtLWdyb3VwXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImZsb2F0aW5nLWxhYmVsLWZvcm0tZ3JvdXAtd2l0aC1mb2N1c1wiKTtcbiAgICAgfSk7XG4gICAgICovXG59KTtcblxuXG4vKmRlYnVnKi9cbmZ1bmN0aW9uIGluY2x1ZGVDc3NEZWJ1ZyhlKSB7XG4gICAgdmFyIGV2dG9iaiA9IHdpbmRvdy5ldmVudCA/IGV2ZW50IDogZVxuICAgIGlmIChldnRvYmoua2V5Q29kZSA9PSA5MCAmJiBldnRvYmouY3RybEtleSkge1xuXG4gICAgICAgIHZhciBjc3NJZCA9ICdkZWJ1Zy1ib290c3RyYXAnOyAgLy8geW91IGNvdWxkIGVuY29kZSB0aGUgY3NzIHBhdGggaXRzZWxmIHRvIGdlbmVyYXRlIGlkLi5cbiAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjc3NJZCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICAgICAgbGluay5pZCA9IGNzc0lkO1xuICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICAgICAgbGluay5ocmVmID0gJ3NyYy9jc3MvYm9vdHN0cmFwLXJlc3BvbnNpdmUtZGVidWcuY3NzJztcbiAgICAgICAgICAgIGxpbmsubWVkaWEgPSAnYWxsJztcbiAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZG9jdW1lbnQub25rZXlkb3duID0gaW5jbHVkZUNzc0RlYnVnO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
