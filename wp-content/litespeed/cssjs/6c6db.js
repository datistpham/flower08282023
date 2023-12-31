(function($, elementorFrontend) {
    "use strict";
    var JetWooProductGallery = {
        init: function() {
            var self = JetWooProductGallery,
                widgets = {
                    'jet-woo-product-gallery-grid.default': self.productGalleryGrid,
                    'jet-woo-product-gallery-modern.default': self.productGalleryModern,
                    'jet-woo-product-gallery-anchor-nav.default': self.productGalleryAnchorNav,
                    'jet-woo-product-gallery-slider.default': self.productGallerySlider,
                };
            $.each(widgets, function(widget, callback) {
                elementorFrontend.hooks.addAction('frontend/element_ready/' + widget, callback);
            });
            $(document).on('show_variation', function(form, variation) {
                self.showVariationImage(variation);
            });
            $(document).on('reset_image', function(form, variation) {
                self.showVariationImage(variation);
            });
        },
        showVariationImage: function(variation) {
            var $product = $(document).find('.product'),
                $product_gallery = $product.find('.jet-woo-product-gallery');
            $.each($product_gallery, function() {
                var variation_images_data = $(this).data('variation-images'),
                    $infiniteLoop = $(this).find('.jet-woo-slick').data('slick-settings');
                if ($infiniteLoop['enable-infinite-loop']) {
                    var $product_img_wrap = $(this).find('.jet-woo-product-gallery__image-item[data-slick-index = "0"]'),
                        $gallery_img = $(this).find('.jet-woo-slick-control-thumbs__item[data-slick-index = "0"] img');
                } else {
                    var $product_img_wrap = $(this).find('.jet-woo-product-gallery__image-item').eq(0),
                        $gallery_img = $(this).find('.jet-woo-slick-control-thumbs__item:eq(0) img');
                }
                var $product_img = $product_img_wrap.find('.wp-post-image'),
                    $product_link = $product_img_wrap.find('a').eq(0);
                if (variation && variation.image && variation.image.src && variation.image.src.length > 1) {
                    var variation_image_data = variation_images_data[variation.image_id];
                    setVariationImageAtts(variation, variation_image_data);
                } else {
                    resetVariationImageAtts();
                }

                function setVariationImageAtts(variation, variation_image_data) {
                    $product_img.wc_set_variation_attr('src', variation_image_data.src);
                    $product_img.wc_set_variation_attr('height', variation_image_data.src_h);
                    $product_img.wc_set_variation_attr('width', variation_image_data.src_w);
                    $product_img.wc_set_variation_attr('srcset', variation_image_data.srcset);
                    $product_img.wc_set_variation_attr('sizes', variation_image_data.sizes);
                    $product_img.wc_set_variation_attr('title', variation.image.title);
                    $product_img.wc_set_variation_attr('data-caption', variation.image.caption);
                    $product_img.wc_set_variation_attr('alt', variation.image.alt);
                    $product_img.wc_set_variation_attr('data-src', variation_image_data.full_src);
                    $product_img.wc_set_variation_attr('data-large_image', variation_image_data.full_src);
                    $product_img.wc_set_variation_attr('data-large_image_width', variation_image_data.full_src_w);
                    $product_img.wc_set_variation_attr('data-large_image_height', variation_image_data.full_src_h);
                    $product_img_wrap.wc_set_variation_attr('data-thumb', variation_image_data.src);
                    $product_link.wc_set_variation_attr('href', variation.image.full_src);
                    $gallery_img.wc_set_variation_attr('src', variation.image.thumb_src);
                    $gallery_img.wc_set_variation_attr('width', variation.image.thumb_src_w);
                    $gallery_img.wc_set_variation_attr('height', variation.image.thumb_src_h);
                    $gallery_img.wc_set_variation_attr('srcset', '');
                }

                function resetVariationImageAtts() {
                    $product_img.wc_reset_variation_attr('src');
                    $product_img.wc_reset_variation_attr('width');
                    $product_img.wc_reset_variation_attr('height');
                    $product_img.wc_reset_variation_attr('srcset');
                    $product_img.wc_reset_variation_attr('sizes');
                    $product_img.wc_reset_variation_attr('title');
                    $product_img.wc_reset_variation_attr('data-caption');
                    $product_img.wc_reset_variation_attr('alt');
                    $product_img.wc_reset_variation_attr('data-src');
                    $product_img.wc_reset_variation_attr('data-large_image');
                    $product_img.wc_reset_variation_attr('data-large_image_width');
                    $product_img.wc_reset_variation_attr('data-large_image_height');
                    $product_img_wrap.wc_reset_variation_attr('data-thumb');
                    $gallery_img.wc_reset_variation_attr('src');
                    $product_link.wc_reset_variation_attr('href');
                }
            });
            $(document).trigger('jet-woo-gallery-variation-image-change');
        },
        productGallerySlider: function($scope) {
            var slider = $scope.find('.jet-woo-slick'),
                settings = slider.data('slick-settings'),
                sliderShowBullets = (settings['show-pagination'] && "bullets" === settings['pagination-type']),
                sliderShowThumbnails = (settings['show-pagination'] && "thumbnails" === settings['pagination-type']),
                thumbnails = $scope.find('.jet-woo-slick-control-thumbs'),
                thumbnailsCount = $(thumbnails).find('.jet-woo-slick-control-thumbs__item').length;
            $(slider).on('init', function(event, slick) {
                JetWooProductGallery.productGallery($scope);
            });
            $(document).on('jet-woo-gallery-variation-image-change', function() {
                $(slider).slick('slickGoTo', 0);
                $(thumbnails).find('.slick-slide').removeClass('slick-current');
                $(thumbnails).find('.slick-slide').first().addClass('slick-current');
            });
            if (sliderShowThumbnails) {
                $(thumbnails).slick({
                    slidesToShow: settings['thumbnails-columns'],
                    slidesToScroll: 1,
                    vertical: ('vertical' === settings['pagination-direction']),
                    arrows: true,
                    fade: false,
                    infinite: settings['enable-infinite-loop'],
                    asNavFor: (settings['slider-enable-syncing'] && (settings['thumbnails-columns'] < thumbnailsCount)) ? slider : '',
                    dots: false,
                    adaptiveHeight: false,
                    appendArrows: $(this).find('.slick-list').selector,
                    nextArrow: settings['thumbnails-slider-next-arrow'],
                    prevArrow: settings['thumbnails-slider-prev-arrow'],
                    rtl: !('vertical' === settings['pagination-direction']) ? settings['rtl'] : false,
                    responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: settings['thumbnails-columns-tablet'] ? settings['thumbnails-columns-tablet'] : settings['thumbnails-columns'],
                        }
                    }, {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: settings['thumbnails-columns-mobile'] ? settings['thumbnails-columns-mobile'] : settings['thumbnails-columns'],
                        }
                    }, ]
                });
                $(thumbnails).find('.slick-slide').on('click', function() {
                    var $this = $(this),
                        index = $this.data('slick-index');
                    $this.siblings().removeClass('slick-current');
                    $this.addClass('slick-current');
                    $(slider).slick('slickGoTo', index);
                });
            }
            $(slider).slick({
                centerMode: settings['enable-center-mode'],
                slidesToShow: settings['center-mode-slides'] && settings['enable-center-mode'] ? settings['center-mode-slides'] : 1,
                centerPadding: settings['enable-center-mode'] ? settings['center-mode-padding'].size + settings['center-mode-padding'].unit : '0px',
                slidesToScroll: 1,
                arrows: settings['show-navigation'],
                fade: false,
                infinite: settings['enable-infinite-loop'],
                asNavFor: (settings['slider-enable-syncing'] && (settings['thumbnails-columns'] < thumbnailsCount)) ? thumbnails : '',
                dots: sliderShowBullets,
                dotsClass: 'jet-slick-dots',
                adaptiveHeight: true,
                nextArrow: settings['slider-next-arrow'],
                prevArrow: settings['slider-prev-arrow'],
                rtl: settings['rtl'],
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: settings['center-mode-slides-tablet'] && settings['enable-center-mode'] ? settings['center-mode-slides-tablet'] : 1,
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: settings['center-mode-slides-mobile'] && settings['enable-center-mode'] ? settings['center-mode-slides-mobile'] : 1,
                    }
                }, ]
            });
        },
        productGalleryGrid: function($scope) {
            JetWooProductGallery.productGallery($scope);
        },
        productGalleryModern: function($scope) {
            JetWooProductGallery.productGallery($scope);
        },
        productGalleryAnchorNav: function($scope) {
            var item = $scope.find('.jet-woo-product-gallery__image-item'),
                navItems = $scope.find('.jet-woo-product-gallery-anchor-nav-items'),
                navController = $scope.find('.jet-woo-product-gallery-anchor-nav-controller'),
                navControllerItem = navController.find('li a'),
                dataNavItems = [],
                active = 0,
                autoScroll = false,
                scrollOffset = 0,
                scrollPos = 0,
                $wpAdminBar = $('#wpadminbar');
            if ($wpAdminBar.length) {
                scrollOffset = $wpAdminBar.outerHeight();
            }
            JetWooProductGallery.productGallery($scope);
            setControllerItemsData();
            stickyNavController();
            $(window).scroll(function() {
                if (!autoScroll) {
                    setControllerItemsData();
                    scrollPos = $(document).scrollTop();
                    setCurrentControllerItem();
                }
            });
            scrollPos = $(document).scrollTop();
            setCurrentControllerItem();
            $(navControllerItem).on('click', function() {
                setCurrentControllerItem();
                var index = $(this).data('index'),
                    pos = dataNavItems[index];
                autoScroll = true;
                $(navController).find('a.current-item').removeClass('current-item');
                $(this).addClass('current-item');
                active = index;
                $('html, body').animate({
                    scrollTop: pos - scrollOffset + 1
                }, 'fast', function() {
                    autoScroll = false;
                });
                return false;
            });

            function setControllerItemsData() {
                $(item).each(function() {
                    var id = $(this).attr('id');
                    dataNavItems[id] = $(this).offset().top;
                });
            }

            function setCurrentControllerItem() {
                for (var index in dataNavItems) {
                    if (scrollPos >= (dataNavItems[index] - scrollOffset)) {
                        $(navController).find('a.current-item').removeClass('current-item');
                        $(navController).find('a[data-index="' + index + '"]').addClass('current-item');
                    }
                }
            }

            function stickyNavController() {
                var stickyActiveDown = false,
                    activeSticky = false,
                    bottomedOut = false;
                $(window).on('scroll', function() {
                    var windowTop = $(window).scrollTop(),
                        navItemsHeight = $(navItems).outerHeight(true),
                        navControllerHeight = $(navController).outerHeight(true),
                        navItemsTop = $(navItems).offset().top,
                        navControllerTop = $(navController).offset().top,
                        navItemsBottom = navItemsTop + navItemsHeight,
                        navControllerBottom = navControllerTop + navControllerHeight;
                    if (navItemsBottom - navControllerHeight - scrollOffset <= windowTop) {
                        return;
                    }
                    if (activeSticky === true && bottomedOut === false) {
                        $(navController).css({
                            "top": (windowTop - navItemsTop + scrollOffset) + 'px'
                        });
                    }
                    if (windowTop < navControllerTop && windowTop < navControllerBottom) {
                        stickyActiveDown = false;
                        activeSticky = true;
                        $(navController).css({
                            "top": (windowTop - navItemsTop + scrollOffset) + 'px'
                        });
                    }
                    if (stickyActiveDown === false && windowTop > navItemsTop) {
                        stickyActiveDown = true;
                        activeSticky = true;
                        bottomedOut = false;
                    }
                    if (stickyActiveDown === false && navItemsTop > windowTop) {
                        stickyActiveDown = false;
                        activeSticky = false;
                        bottomedOut = false;
                        $(navController).removeAttr("style");
                    }
                });
            }
        },
        productGallery: function($scope) {
            var id = $scope.data('id'),
                settings = $scope.find('.jet-woo-product-gallery').data('gallery-settings'),
                $galleryImages = $scope.find('.jet-woo-product-gallery__image:not(.image-with-placeholder)'),
                $galleryZoomImages = $scope.find('.jet-woo-product-gallery__image--with-zoom'),
                $galleryImagesData = getImagesData(),
                $galleryPhotoSwipeTrigger = $scope.find('.jet-woo-product-gallery__trigger'),
                galleryPhotoSwipeSettings = {
                    mainClass: 'jet-woo-product-gallery-' + id,
                    captionEl: settings.caption ? settings.caption : '',
                    fullscreenEl: settings.fullscreen ? settings.fullscreen : false,
                    zoomEl: settings.zoom ? settings.zoom : false,
                    shareEl: settings.share ? settings.share : false,
                    counterEl: settings.counter ? settings.counter : false,
                    arrowEl: settings.arrows ? settings.arrows : false
                },
                photoSwipeTemplate = $('.jet-woo-product-gallery-pswp')[0],
                $galleryVideoPopupTrigger = $scope.find('.jet-woo-product-video__popup-button'),
                $galleryVideoPopupOverlay = $scope.find('.jet-woo-product-video__popup-overlay'),
                $galleryVideoIframe = $scope.find('.jet-woo-product-video-iframe'),
                galleryVideoIframeSrc = $galleryVideoIframe[0] ? $galleryVideoIframe[0].src : false,
                $galleryVideoPlayer = $scope.find('.jet-woo-product-video-player')[0],
                $galleryVideoDefaultPlayer = $scope.find('.jet-woo-product-video-mejs-player'),
                galleryVideoDefaultPlayerControls = $galleryVideoDefaultPlayer.data('controls') || ['playpause', 'current', 'progress', 'duration', 'volume', 'fullscreen'],
                $galleryVideoOverlay = $scope.find('.jet-woo-product-video__overlay'),
                galleryVideoHasOverlay = $galleryVideoOverlay.length > 0,
                galleryVideoAutoplay = settings.videoAutoplay;
            if (settings.enableGallery) {
                $galleryPhotoSwipeTrigger.on('click.JetWooProductGallery', initPhotoSwipe);
                $(document).on('jet-woo-gallery-variation-image-change', function() {
                    $galleryImagesData = getImagesData();
                });
            }
            if (settings.enableZoom) {
                initZoom();
                $(document).on('jet-woo-gallery-variation-image-change', initZoom);
            }
            if (settings.hasVideo) {
                initProductVideo();
            }
            $('.jet-woo-product-gallery__image-item').find('img').on('click', function(e) {
                e.preventDefault();
            });

            function initPhotoSwipe(e) {
                e.preventDefault();
                if ($('body').hasClass('elementor-editor-active')) {
                    return;
                }
                var target = $(e.target),
                    hasPlaceholder = $scope.find('.jet-woo-product-gallery__image-item.featured').hasClass('no-image'),
                    clickedItem = target.parents('.jet-woo-product-gallery__image-item'),
                    index = $(clickedItem).index();
                if (hasPlaceholder) {
                    index -= 1;
                }
                galleryPhotoSwipeSettings.index = index;
                var photoSwipe = new PhotoSwipe(photoSwipeTemplate, PhotoSwipeUI_Default, $galleryImagesData, galleryPhotoSwipeSettings);
                photoSwipe.init();
            }

            function initZoom() {
                var flag = false,
                    zoomSettings = {
                        magnify: settings.zoomMagnify,
                        touch: false
                    };
                $galleryZoomImages.each(function(index, item) {
                    var image = $(item).find('img'),
                        galleryWidth = image.parent().width(),
                        imageWidth = image.data('large_image_width');
                    if (imageWidth > galleryWidth) {
                        flag = true;
                    }
                });
                if (flag) {
                    if ('ontouchstart' in document.documentElement) {
                        zoomSettings.on = 'click';
                    }
                    $galleryZoomImages.trigger('zoom.destroy');
                    $galleryZoomImages.zoom(zoomSettings);
                }
            }

            function initProductVideo() {
                switch (settings.videoIn) {
                    case 'content':
                        if ($galleryVideoOverlay[0]) {
                            $galleryVideoOverlay.on('click.JetWooProductGallery', function(event) {
                                if ($galleryVideoPlayer) {
                                    defaultPlayerStartPlay();
                                }
                                if ($galleryVideoIframe[0]) {
                                    iframePlayerStartPlay();
                                }
                            });
                            if (galleryVideoAutoplay && $galleryVideoIframe[0]) {
                                iframePlayerStartPlay();
                            }
                        }
                        if ($galleryVideoPlayer) {
                            $($galleryVideoPlayer).on('play.JetWooProductGallery', function(event) {
                                if (galleryVideoHasOverlay) {
                                    $galleryVideoOverlay.remove();
                                    galleryVideoHasOverlay = false;
                                }
                            });
                        }
                        if ($galleryVideoDefaultPlayer[0]) {
                            defaultPlayerInit();
                        }
                        break;
                    case 'popup':
                        defaultPlayerInit();
                        $galleryVideoPopupTrigger.on('click.JetWooProductGallery', function(event) {
                            videoPopupOpen();
                        });
                        $galleryVideoPopupOverlay.on('click.JetWooProductGallery', function(event) {
                            videoPopupClose();
                        });
                        break;
                }

                function videoPopupOpen() {
                    $galleryVideoPopupTrigger.siblings('.jet-woo-product-video__popup-content').addClass('jet-woo-product-video__popup--show');
                    if ($galleryVideoPlayer) {
                        $galleryVideoPlayer.play();
                        if (!galleryVideoAutoplay) {
                            $galleryVideoPlayer.pause();
                            $galleryVideoPlayer.currentTime = 0;
                        }
                    }
                    if ($galleryVideoIframe[0]) {
                        $galleryVideoIframe[0].src = galleryVideoIframeSrc;
                        if (galleryVideoAutoplay) {
                            $galleryVideoIframe[0].src = $galleryVideoIframe[0].src.replace('&autoplay=0', '&autoplay=1');
                        }
                    }
                }

                function videoPopupClose() {
                    $galleryVideoPopupTrigger.siblings('.jet-woo-product-video__popup-content').removeClass('jet-woo-product-video__popup--show');
                    if ($galleryVideoIframe[0]) {
                        $galleryVideoIframe[0].src = '';
                    }
                    if ($galleryVideoPlayer) {
                        $galleryVideoPlayer.currentTime = 0;
                        $galleryVideoPlayer.pause();
                    }
                }

                function defaultPlayerInit() {
                    $galleryVideoDefaultPlayer.mediaelementplayer({
                        videoVolume: 'horizontal',
                        hideVolumeOnTouchDevices: false,
                        enableProgressTooltip: false,
                        features: galleryVideoDefaultPlayerControls,
                        autoplay: false,
                    }).load();
                }

                function defaultPlayerStartPlay() {
                    $galleryVideoPlayer.play();
                    $galleryVideoOverlay.remove();
                    galleryVideoHasOverlay = false;
                }

                function iframePlayerStartPlay() {
                    if (!galleryVideoAutoplay) {
                        $galleryVideoIframe[0].src = $galleryVideoIframe[0].src.replace('&autoplay=0', '&autoplay=1');
                    }
                    $galleryVideoOverlay.remove();
                    galleryVideoHasOverlay = false;
                }
            }

            function getImagesData() {
                var data = [];
                if ($galleryImages.length > 0) {
                    $galleryImages.each(function(i, element) {
                        var img = $(element).find('img');
                        if (img.length) {
                            var largeImageSrc = img.attr('data-large_image'),
                                largeImageWidth = img.attr('data-large_image_width'),
                                largeImageHeight = img.attr('data-large_image_height'),
                                imageData = {
                                    src: largeImageSrc,
                                    w: largeImageWidth,
                                    h: largeImageHeight,
                                    title: img.attr('data-caption') ? img.attr('data-caption') : img.attr('title')
                                };
                            data.push(imageData);
                        }
                    });
                }
                return data;
            }
        },
    };
    $(window).on('elementor/frontend/init', JetWooProductGallery.init);
}(jQuery, window.elementorFrontend));