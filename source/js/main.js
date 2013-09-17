//= require vendor/jquery.min.js
//= require plugins.js

var App;

$(function () {
    'use strict';
    App = {
        init: function () {
            this.cacheElements();
            this.onLoad();
            this.scrollContent();
            this.scrollByClick();
        },
        cacheElements: function () {
            this.$w = $(window);
            this.$navLink = $('.nav__list').find('.nav__link');
        },
        onLoad: function () {
            this.$w.on('load', function() {
                var firstNavLink = $('.nav__list').find('.nav__link').first(),
                    firstArticle = $('.content').find('.article').first();

                firstNavLink.addClass('nav__link--active');
                firstArticle.addClass('is__active');
            });
        },
        scrollContent: function() {
            var allArticles = $('.content').find('.article');

            this.$w.on('scroll', function() {
                allArticles.each(function () {
                    var $oneArticle         = $(this),
                        activeClass         = 'is__active',
                        navItemActiveClass  = 'nav__link--active',

                        dataIdArticle       = $oneArticle.attr('data-id'),
                        allNavLinks         = $('.nav__list').find('.nav__link'),
                        oneNavLink          = $('.nav__list').find('.nav__link[data-link=' + dataIdArticle + ']'),

                        windowScrollTop     = $(window).scrollTop(),
                        scrolltopPlusHeight = windowScrollTop + $(window).height(),
                        offsetHeaderHeight  = 107,
                        topOffset           = $oneArticle.offset().top - windowScrollTop - offsetHeaderHeight;

                    if (topOffset <= 250) {
                        allArticles.removeClass(activeClass);
                        $oneArticle.addClass(activeClass);

                        allNavLinks.removeClass(navItemActiveClass);
                        oneNavLink.addClass(navItemActiveClass);
                    }
                });
            });
        },
        scrollByClick: function() {
            this.$navLink.on('click', function() {
                var allNavLinks         = $('.nav__list').find('.nav__link'),
                    navLink             = $(this),
                    linkName            = navLink.data('link'),

                    allArticles         = $('.content').find('.article'),
                    oneArticle          = $('.content').find('.article[data-id="' + linkName + '"]'),
                    activeClass         = 'is__active',
                    navItemActiveClass  = 'nav__link--active',

                    animateContainer    = $('body'),
                    offsetHeaderHeight  = 107;

                event.preventDefault();

                allNavLinks.removeClass(activeClass);
                navLink.addClass(activeClass);

                allArticles.removeClass(activeClass);
                oneArticle.addClass(activeClass);

                animateContainer.animate({
                    scrollTop: oneArticle.offset().top - offsetHeaderHeight
                }, 200);
            });
        }
    };
    App.init();
});
