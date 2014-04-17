'use strict';

$(document).ready(function () {
    $('.menu').dropit();
});

$(document).ready(function () {
    

    $(window).scroll(function () {
        var stickyNavTop = $('#main').offset().top;
        var scrollTop = $(window).scrollTop();

        if (scrollTop > 30) {
            $('#main-header').addClass('sticky');
        } else {
            $('#main-header').removeClass('sticky');
        }
    });
    
});

$(document).ready(function () {
    $('#myGallery').rtg({
        spacing: 7,
        categories: true,
        categoryOptions: {
            defaultCategory: false,
            enableHashLinking: false,
            includeAll: true
        },
        lightbox: true,
        center: true,
    });
});
