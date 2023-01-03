'use strict';

function EndlessSlider(options) {
    var defaultOptions = {
        selector: '.slider',
        desktopSlide: 5,
        mobileSlide: 2,
        tabletSlide: 3,
        animationSpeed: 600
    }
    if (options) {
        if (options.selector && typeof options.selector == 'string' && options.selector.length > 0) {
            defaultOptions['selector'] = options.selector;
        }
        if (options.desktopSlide && typeof options.desktopSlide == 'number' && options.desktopSlide > 0) {
            defaultOptions['desktopSlide'] = options.desktopSlide;
        }
        if (options.mobileSlide && typeof options.mobileSlide == 'number' && options.mobileSlide > 0) {
            defaultOptions['mobileSlide'] = options.mobileSlide;
        }
        if (options.tabletSlide && typeof options.tabletSlide == 'number' && options.tabletSlide > 0) {
            defaultOptions['tabletSlide'] = options.tabletSlide;
        }
        if (options.animationSpeed && typeof options.animationSpeed == 'number' && options.animationSpeed >= 10) {
            defaultOptions['animationSpeed'] = options.animationSpeed;
        }
    }

    this.init = function () {
        var slider = $('body').find(defaultOptions.selector);
        var itemDisplay;
        var item = slider.find('div').addClass('item');
        var margin = 6;
        var counter = 0;
        var itemWidth;

        //Setup
        slider.css({
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '5px 0',
            gap: '5px',
            position: 'absolute',
            width: 'inherit'
        })
        item.css({
            backgroundColor: '#fff',
            flexGrow: 0,
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '250px',
            boxShadow: '0px 1px 5px rgb(0 0 0 / 10%)',
            borderRadius: '5px'
        });
        slider.parent().closest('div').addClass('slider-container');
        $('div.item').find('.item').removeClass('item');
        slider.parent().closest('div').append('<a class="next" href="#!"></a>');
        slider.parent().closest('div').append('<a class="prev" href="#!"></a>');

        //To dsplay number of slides on different screen resolution
        if (screen.width < 768) {
            var itemDisplay = defaultOptions.mobileSlide;
            if (defaultOptions.mobileSlide >= item.length) {
                slider.parents('.slider-container').find('.next').remove();
                slider.parents('.slider-container').find('.prev').remove();
            }
        } else if (screen.width >= 768 && screen.width <= 1024) {
            var itemDisplay = defaultOptions.tabletSlide;
            if (defaultOptions.tabletSlide >= item.length) {
                slider.parents('.slider-container').find('.next').remove();
                slider.parents('.slider-container').find('.prev').remove();
            }
        } else {
            var itemDisplay = defaultOptions.desktopSlide;
            if (defaultOptions.desktopSlide > item.length) {
                slider.parents('.slider-container').find('.next').remove();
                slider.parents('.slider-container').find('.prev').remove();
            }
        }
        //To set the item width
        for (var i = 0; i < item.length; i++) {
            itemWidth = item[i].style.maxWidth = (screen.width / itemDisplay) - margin + 'px';
            item[i].style.flexBasis = (itemWidth);
        }
        //To add the index number to data-index attribute
        item.each(function (index) {
            $(this).attr('data-index', index);
        });

        var slides = Math.ceil(itemDisplay); // To get non floating value
        var itemWidthNum = parseInt(itemWidth);// To get number value and remove 'px'

        //Next Event
        this.next = function () {
            $('.next').on('click', function () {
                var btnParentEle = $(this).parents('.slider-container').find(slider);
                $(this).css({ pointerEvents: 'none' });
                if (itemWidthNum % 1 === 1) {
                    counter = (itemWithNum / 2);
                } else if (itemDisplay % 1 === .5) {
                    counter = ((itemWidthNum / 2) + 2);
                }
                counter += (screen.width - (slides));
                $(this).css({ pointerEvents: '' });
                btnParentEle.animate({
                    left: -(counter)
                }, defaultOptions.animationSpeed, function () {
                    btnParentEle.find('.item:lt(' + slides + ')').clone().appendTo(slider);
                    counter = 0;
                    btnParentEle.css({ left: counter, marginLeft: '5px' });
                    btnParentEle.find('.item:lt(' + slides + ')').remove();
                });
            });
        };
        // Previous Event
        this.prev = function () {
            $('.prev').on('click', function () {
                var slider = $('body').find(defaultOptions.selector);
                var btnParentEle = $(this).parents('.slider-container').find(slider);
                btnParentEle.find('.item:nth-last-child(-n+' + slides + ')').clone().prependTo(slider);
                btnParentEle.css({ marginLeft: -screen.width })
                counter -= (screen.width + (slides + 3));
                btnParentEle.animate({
                    left: -(counter),
                    justifyContent: 'flex-end'
                }, defaultOptions.animationSpeed, function () {
                    btnParentEle.find('.item:nth-last-child(-n+' + slides + ')').remove();
                    counter = 0;
                    btnParentEle.css({ left: counter, marginLeft: '7px' });
                });
            });
        };
        this.next();
        this.prev();
    };
    this.init();
};
