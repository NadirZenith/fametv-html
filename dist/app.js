$(function () {
    //fade initial page show
    $('html').animate({
        opacity: 1
    }, 1000);

    //jQuery to collapse the navbar on scroll
    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });
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
        element: document.getElementById('list'),
        offset: '70%',
        handler: function (direction) {
            console.log('works', direction);
            /*            
             if ('down' === direction) {
             $('body').addClass('main-img-left');
             $('#main-img').attr('src', 'img/twist.png');
             } else {
             $('body').removeClass('main-img-left');
             $('#main-img').attr('src', 'img/normal.png');
             }
             * */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uICgpIHtcbiAgICAvL2ZhZGUgaW5pdGlhbCBwYWdlIHNob3dcbiAgICAkKCdodG1sJykuYW5pbWF0ZSh7XG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICB9LCAxMDAwKTtcblxuICAgIC8valF1ZXJ5IHRvIGNvbGxhcHNlIHRoZSBuYXZiYXIgb24gc2Nyb2xsXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKFwiLm5hdmJhclwiKS5vZmZzZXQoKS50b3AgPiA1MCkge1xuICAgICAgICAgICAgJChcIi5uYXZiYXItZml4ZWQtdG9wXCIpLmFkZENsYXNzKFwidG9wLW5hdi1jb2xsYXBzZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoXCIubmF2YmFyLWZpeGVkLXRvcFwiKS5yZW1vdmVDbGFzcyhcInRvcC1uYXYtY29sbGFwc2VcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvL2pRdWVyeSBmb3IgcGFnZSBzY3JvbGxpbmcgZmVhdHVyZSAtIHJlcXVpcmVzIGpRdWVyeSBFYXNpbmcgcGx1Z2luXG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2EucGFnZS1zY3JvbGwnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyICRhbmNob3IgPSAkKHRoaXMpO1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQoJGFuY2hvci5hdHRyKCdocmVmJykpLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgfSwgMTUwMCwgJ2Vhc2VJbk91dEV4cG8nKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICB2YXIgd2luU2l6ZSA9ICcnO1xuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IG9uV2luZG93UmVzaXplO1xuICAgIGZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xuICAgICAgICB2YXIgd2luZG93V2lkdGggPSAkKHRoaXMpLndpZHRoKCk7XG4gICAgICAgIHZhciBuZXdXaW5TaXplID0gJ3hzJzsgLy8gZGVmYXVsdCB2YWx1ZSwgY2hlY2sgZm9yIGFjdHVhbCBzaXplXG4gICAgICAgIGlmICh3aW5kb3dXaWR0aCA+PSAxMjAwKSB7XG4gICAgICAgICAgICBuZXdXaW5TaXplID0gJ2xnJztcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3dXaWR0aCA+PSA5OTIpIHtcbiAgICAgICAgICAgIG5ld1dpblNpemUgPSAnbWQnO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvd1dpZHRoID49IDc2OCkge1xuICAgICAgICAgICAgbmV3V2luU2l6ZSA9ICdzbSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1dpblNpemUgIT09IHdpblNpemUpIHtcbiAgICAgICAgICAgIHdpblNpemUgPSBuZXdXaW5TaXplO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uV2luZG93UmVzaXplKCk7XG5cbiAgICAvL2hpZGUgbmF2YmFyIG9uIG1lbnUgY2xpY2sob25seSBvbiBtb2JpbGVzfCB4cylcbiAgICAkKCcubmF2IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh3aW5TaXplID09PSAneHMnKSB7XG4gICAgICAgICAgICAkKCcubmF2YmFyLXRvZ2dsZScpLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciB3YXlwb2ludCA9IG5ldyBXYXlwb2ludCh7XG4gICAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0JyksXG4gICAgICAgIG9mZnNldDogJzcwJScsXG4gICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3b3JrcycsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAvKiAgICAgICAgICAgIFxuICAgICAgICAgICAgIGlmICgnZG93bicgPT09IGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbWFpbi1pbWctbGVmdCcpO1xuICAgICAgICAgICAgICQoJyNtYWluLWltZycpLmF0dHIoJ3NyYycsICdpbWcvdHdpc3QucG5nJyk7XG4gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21haW4taW1nLWxlZnQnKTtcbiAgICAgICAgICAgICAkKCcjbWFpbi1pbWcnKS5hdHRyKCdzcmMnLCAnaW1nL25vcm1hbC5wbmcnKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgKiAqL1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8qXG4gICAgIC8vYWRkIHBvcG92ZXIgdG8gc2xpZGVyIGdhbGxlcnlcbiAgICAgLy9yZXF1aXJlcyBodG1sXG4gICAgICQoJ2FbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgIHZhciBpbWdfc3JjID0gJCh0aGlzKS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKTtcbiAgICAgJCgnI21vZGFsaW1hZ2VwcmV2aWV3JykuYXR0cignc3JjJywgaW1nX3NyYyk7IC8vIGhlcmUgYXNpZ24gdGhlIGltYWdlIHRvIHRoZSBtb2RhbCB3aGVuIHRoZSB1c2VyIGNsaWNrIHRoZSBlbmxhcmdlIGxpbmtcbiAgICAgJCgnI2ltYWdlbW9kYWwnKS5tb2RhbCgnc2hvdycpOyAvLyBpbWFnZW1vZGFsIGlzIHRoZSBpZCBhdHRyaWJ1dGUgYXNzaWduZWQgdG8gdGhlIGJvb3RzdHJhcCBtb2RhbCwgdGhlbiBpIHVzZSB0aGUgc2hvdyBmdW5jdGlvblxuICAgICB9KTtcbiAgICAgXG4gICAgIC8vZm9ybVxuICAgICAkKFwiYm9keVwiKS5vbihcImlucHV0IHByb3BlcnR5Y2hhbmdlXCIsIFwiLmZsb2F0aW5nLWxhYmVsLWZvcm0tZ3JvdXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhcImZsb2F0aW5nLWxhYmVsLWZvcm0tZ3JvdXAtd2l0aC12YWx1ZVwiLCAhISQoZS50YXJnZXQpLnZhbCgpKTtcbiAgICAgfSkub24oXCJmb2N1c1wiLCBcIi5mbG9hdGluZy1sYWJlbC1mb3JtLWdyb3VwXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImZsb2F0aW5nLWxhYmVsLWZvcm0tZ3JvdXAtd2l0aC1mb2N1c1wiKTtcbiAgICAgfSkub24oXCJibHVyXCIsIFwiLmZsb2F0aW5nLWxhYmVsLWZvcm0tZ3JvdXBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZmxvYXRpbmctbGFiZWwtZm9ybS1ncm91cC13aXRoLWZvY3VzXCIpO1xuICAgICB9KTtcbiAgICAgKi9cbn0pO1xuXG5cbi8qZGVidWcqL1xuZnVuY3Rpb24gaW5jbHVkZUNzc0RlYnVnKGUpIHtcbiAgICB2YXIgZXZ0b2JqID0gd2luZG93LmV2ZW50ID8gZXZlbnQgOiBlXG4gICAgaWYgKGV2dG9iai5rZXlDb2RlID09IDkwICYmIGV2dG9iai5jdHJsS2V5KSB7XG5cbiAgICAgICAgdmFyIGNzc0lkID0gJ2RlYnVnLWJvb3RzdHJhcCc7ICAvLyB5b3UgY291bGQgZW5jb2RlIHRoZSBjc3MgcGF0aCBpdHNlbGYgdG8gZ2VuZXJhdGUgaWQuLlxuICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNzc0lkKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgICAgICAgICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgICAgICBsaW5rLmlkID0gY3NzSWQ7XG4gICAgICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgICAgICBsaW5rLmhyZWYgPSAnc3JjL2Nzcy9ib290c3RyYXAtcmVzcG9uc2l2ZS1kZWJ1Zy5jc3MnO1xuICAgICAgICAgICAgbGluay5tZWRpYSA9ICdhbGwnO1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5kb2N1bWVudC5vbmtleWRvd24gPSBpbmNsdWRlQ3NzRGVidWc7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
