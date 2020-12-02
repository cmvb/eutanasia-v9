$(function () {
    var idioma = 0;
    var objServiceSesion = sessionStorage.getItem('objServiceSesion');
    if (objServiceSesion !== undefined && objServiceSesion !== null) {
        idioma = JSON.parse(objServiceSesion).idioma;
    }
    debugger;
    $('#WAButton').floatingWhatsApp({
        phone: '+573219315302', //WhatsApp Business phone number
        headerTitle: idioma == 0 ? '¡Chatea con la banda por Whatsapp!' : 'Chat with the band on WhatsApp!', //Popup Title
        popupMessage: idioma == 0 ? 'Hola, ¿En qué te ayudo?' : 'Hello, how can we help you?', //Popup Message
        showPopup: true, //Enables popup display
        buttonImage: '<img src="assets/images/wpp.png" />', //Button Image
        //headerColor: 'crimson', //Custom header color
        //backgroundColor: 'crimson', //Custom background button color
        position: "right" //Position: left | right
    });
});

(function ($) {
    "use strict"
    ///////////////////////////
    // Scrollspy
    $('body').scrollspy({
        target: '#nav',
        offset: $(window).height() / 2
    });

    ///////////////////////////
    // Smooth scroll
    $("#nav .main-nav a[href^='#']").on('click', function (e) {
        e.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top
        }, 600);
    });

    $('#back-to-top').on('click', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
    });

    ///////////////////////////
    // Btn nav collapse
    $('#nav .nav-collapse').on('click', function () {
        $('#nav').toggleClass('open');
    });

    ///////////////////////////
    // Mobile dropdown
    $('.has-dropdown a').on('click', function () {
        $(this).parent().toggleClass('open-drop');
    });

    ///////////////////////////
    // On Scroll
    $(window).on('scroll', function () {
        var wScroll = $(this).scrollTop();

        // Fixed nav
        wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

        // Hide audio play
        wScroll > 60 ? $('#demoEutanasia').fadeOut() : $('#demoEutanasia').fadeIn();

        // Back To Top Appear
        wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
    });

    ///////////////////////////
    // magnificPopup
    $('.work').magnificPopup({
        delegate: '.lightbox',
        type: 'image'
    });

    ///////////////////////////
    // Owl Carousel
    $('#about-slider').owlCarousel({
        items: 1,
        loop: true,
        margin: 15,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        dots: true,
        autoplay: true,
        animateOut: 'fadeOut'
    });

    $('#testimonial-slider').owlCarousel({
        loop: true,
        margin: 15,
        dots: true,
        nav: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });

})(jQuery);
