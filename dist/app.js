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

    /*
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
     */
    var $body = $('body');
    var $navbar = $(".navbar-fixed-top");
    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $body.addClass('show-list');
            $navbar.addClass("top-nav-collapse");
        } else {
            $body.removeClass('show-list');
            $body.removeClass('show-video');
            $navbar.removeClass("top-nav-collapse");
        }
    });

    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    $('#list').on('click', '.video-list-item', function (e) {
        e.preventDefault();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uICgpIHtcbiAgICAvL2ZhZGUgaW5pdGlhbCBwYWdlIHNob3dcbiAgICAkKCdodG1sJykuYW5pbWF0ZSh7XG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9LCAxMDAwKTtcblxuICAgIC8valF1ZXJ5IHRvIGNvbGxhcHNlIHRoZSBuYXZiYXIgb24gc2Nyb2xsXG4gICAgLyogICAgXG4gICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgICBpZiAoJChcIi5uYXZiYXJcIikub2Zmc2V0KCkudG9wID4gNTApIHtcbiAgICAgJChcIi5uYXZiYXItZml4ZWQtdG9wXCIpLmFkZENsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICAgfSBlbHNlIHtcbiAgICAgJChcIi5uYXZiYXItZml4ZWQtdG9wXCIpLnJlbW92ZUNsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICAgfVxuICAgICB9KTtcbiAgICAgKiAqL1xuICAgIC8valF1ZXJ5IGZvciBwYWdlIHNjcm9sbGluZyBmZWF0dXJlIC0gcmVxdWlyZXMgalF1ZXJ5IEVhc2luZyBwbHVnaW5cbiAgICAkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnYS5wYWdlLXNjcm9sbCcpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgJGFuY2hvciA9ICQodGhpcyk7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCgkYW5jaG9yLmF0dHIoJ2hyZWYnKSkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICB9LCAxNTAwLCAnZWFzZUluT3V0RXhwbycpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIHZhciB3aW5TaXplID0gJyc7XG4gICAgd2luZG93Lm9ucmVzaXplID0gb25XaW5kb3dSZXNpemU7XG4gICAgZnVuY3Rpb24gb25XaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIHZhciB3aW5kb3dXaWR0aCA9ICQodGhpcykud2lkdGgoKTtcbiAgICAgICAgdmFyIG5ld1dpblNpemUgPSAneHMnOyAvLyBkZWZhdWx0IHZhbHVlLCBjaGVjayBmb3IgYWN0dWFsIHNpemVcbiAgICAgICAgaWYgKHdpbmRvd1dpZHRoID49IDEyMDApIHtcbiAgICAgICAgICAgIG5ld1dpblNpemUgPSAnbGcnO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvd1dpZHRoID49IDk5Mikge1xuICAgICAgICAgICAgbmV3V2luU2l6ZSA9ICdtZCc7XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93V2lkdGggPj0gNzY4KSB7XG4gICAgICAgICAgICBuZXdXaW5TaXplID0gJ3NtJztcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3V2luU2l6ZSAhPT0gd2luU2l6ZSkge1xuICAgICAgICAgICAgd2luU2l6ZSA9IG5ld1dpblNpemU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25XaW5kb3dSZXNpemUoKTtcblxuICAgIC8vaGlkZSBuYXZiYXIgb24gbWVudSBjbGljayhvbmx5IG9uIG1vYmlsZXN8IHhzKVxuICAgICQoJy5uYXYgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHdpblNpemUgPT09ICd4cycpIHtcbiAgICAgICAgICAgICQoJy5uYXZiYXItdG9nZ2xlJykuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLypcbiAgICAgdmFyIHdheXBvaW50ID0gbmV3IFdheXBvaW50KHtcbiAgICAgZWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbWUnKSxcbiAgICAgb2Zmc2V0OiAnLTUwcHgnLFxuICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgIGNvbnNvbGUubG9nKCd3b3JrcycsIGRpcmVjdGlvbik7XG4gICAgIHZhciAkYm9keSA9ICQoJ2JvZHknKTtcbiAgICAgdmFyICRuYXZiYXIgPSAkKFwiLm5hdmJhci1maXhlZC10b3BcIik7XG4gICAgIGlmICgnZG93bicgPT09IGRpcmVjdGlvbikge1xuICAgICAkYm9keS5hZGRDbGFzcygnc2hvdy1saXN0Jyk7XG4gICAgICRuYXZiYXIuYWRkQ2xhc3MoXCJ0b3AtbmF2LWNvbGxhcHNlXCIpO1xuICAgICBcbiAgICAgfSBlbHNlIHtcbiAgICAgJGJvZHkucmVtb3ZlQ2xhc3MoJ3Nob3ctbGlzdCcpO1xuICAgICAkYm9keS5yZW1vdmVDbGFzcygnc2hvdy12aWRlbycpO1xuICAgICAkbmF2YmFyLnJlbW92ZUNsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICAgfVxuICAgICB9XG4gICAgIH0pO1xuICAgICAqL1xuICAgIHZhciAkYm9keSA9ICQoJ2JvZHknKTtcbiAgICB2YXIgJG5hdmJhciA9ICQoXCIubmF2YmFyLWZpeGVkLXRvcFwiKTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCQoXCIubmF2YmFyXCIpLm9mZnNldCgpLnRvcCA+IDUwKSB7XG4gICAgICAgICAgICAkYm9keS5hZGRDbGFzcygnc2hvdy1saXN0Jyk7XG4gICAgICAgICAgICAkbmF2YmFyLmFkZENsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRib2R5LnJlbW92ZUNsYXNzKCdzaG93LWxpc3QnKTtcbiAgICAgICAgICAgICRib2R5LnJlbW92ZUNsYXNzKCdzaG93LXZpZGVvJyk7XG4gICAgICAgICAgICAkbmF2YmFyLnJlbW92ZUNsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB2YXIgdG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApO1xuXG4gICAgJCgnI2xpc3QnKS5vbignY2xpY2snLCAnLnZpZGVvLWxpc3QtaXRlbScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGJvZHkuYWRkQ2xhc3MoJ3Nob3ctdmlkZW8nKTtcbiAgICAgICAgdG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuZXdUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFdmVudCBGaXJlZCcsIHRvcCwgbmV3VG9wKTtcbiAgICAgICAgaWYgKG5ld1RvcCAhPT0gdG9wKSB7XG4gICAgICAgICAgICAkYm9keS5yZW1vdmVDbGFzcygnc2hvdy12aWRlbycpO1xuXG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLypcbiAgICAgLy9hZGQgcG9wb3ZlciB0byBzbGlkZXIgZ2FsbGVyeVxuICAgICAvL3JlcXVpcmVzIGh0bWxcbiAgICAgJCgnYVtkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgdmFyIGltZ19zcmMgPSAkKHRoaXMpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpO1xuICAgICAkKCcjbW9kYWxpbWFnZXByZXZpZXcnKS5hdHRyKCdzcmMnLCBpbWdfc3JjKTsgLy8gaGVyZSBhc2lnbiB0aGUgaW1hZ2UgdG8gdGhlIG1vZGFsIHdoZW4gdGhlIHVzZXIgY2xpY2sgdGhlIGVubGFyZ2UgbGlua1xuICAgICAkKCcjaW1hZ2Vtb2RhbCcpLm1vZGFsKCdzaG93Jyk7IC8vIGltYWdlbW9kYWwgaXMgdGhlIGlkIGF0dHJpYnV0ZSBhc3NpZ25lZCB0byB0aGUgYm9vdHN0cmFwIG1vZGFsLCB0aGVuIGkgdXNlIHRoZSBzaG93IGZ1bmN0aW9uXG4gICAgIH0pO1xuICAgICBcbiAgICAgLy9mb3JtXG4gICAgICQoXCJib2R5XCIpLm9uKFwiaW5wdXQgcHJvcGVydHljaGFuZ2VcIiwgXCIuZmxvYXRpbmctbGFiZWwtZm9ybS1ncm91cFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiZmxvYXRpbmctbGFiZWwtZm9ybS1ncm91cC13aXRoLXZhbHVlXCIsICEhJChlLnRhcmdldCkudmFsKCkpO1xuICAgICB9KS5vbihcImZvY3VzXCIsIFwiLmZsb2F0aW5nLWxhYmVsLWZvcm0tZ3JvdXBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAkKHRoaXMpLmFkZENsYXNzKFwiZmxvYXRpbmctbGFiZWwtZm9ybS1ncm91cC13aXRoLWZvY3VzXCIpO1xuICAgICB9KS5vbihcImJsdXJcIiwgXCIuZmxvYXRpbmctbGFiZWwtZm9ybS1ncm91cFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJmbG9hdGluZy1sYWJlbC1mb3JtLWdyb3VwLXdpdGgtZm9jdXNcIik7XG4gICAgIH0pO1xuICAgICAqL1xufSk7XG5cblxuLypkZWJ1ZyovXG5mdW5jdGlvbiBpbmNsdWRlQ3NzRGVidWcoZSkge1xuICAgIHZhciBldnRvYmogPSB3aW5kb3cuZXZlbnQgPyBldmVudCA6IGVcbiAgICBpZiAoZXZ0b2JqLmtleUNvZGUgPT0gOTAgJiYgZXZ0b2JqLmN0cmxLZXkpIHtcblxuICAgICAgICB2YXIgY3NzSWQgPSAnZGVidWctYm9vdHN0cmFwJzsgIC8vIHlvdSBjb3VsZCBlbmNvZGUgdGhlIGNzcyBwYXRoIGl0c2VsZiB0byBnZW5lcmF0ZSBpZC4uXG4gICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICAgICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgICAgIGxpbmsuaWQgPSBjc3NJZDtcbiAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdzcmMvY3NzL2Jvb3RzdHJhcC1yZXNwb25zaXZlLWRlYnVnLmNzcyc7XG4gICAgICAgICAgICBsaW5rLm1lZGlhID0gJ2FsbCc7XG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmRvY3VtZW50Lm9ua2V5ZG93biA9IGluY2x1ZGVDc3NEZWJ1ZztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
