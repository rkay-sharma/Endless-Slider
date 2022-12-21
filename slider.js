'use strict';

var slider = function(obj) {
    var setting = {
        selector: '.slider',
        desktopSlide: 5,
        mobileSlide: 2,
        tabletSlide: 3,
        animationSpeed: 600
    }
    if (obj) {
        if (obj.selector && typeof obj.selector == 'string' && obj.selector.length > 0) {
            setting['selector'] = obj.selector;
        }
        if (obj.desktopSlide && typeof obj.desktopSlide == 'number' && obj.desktopSlide > 0) {
            setting['desktopSlide'] = obj.desktopSlide;
        }
        if(obj.mobileSlide && typeof obj.mobileSlide == 'number' && obj.mobileSlide > 0) {
            setting['mobileSlide'] = obj.mobileSlide;
        }
        if(obj.tabletSlide && typeof obj.tabletSlide == 'number' && obj.tabletSlide > 0) {
            setting['tabletSlide'] = obj.tabletSlide;
        }
        if(obj.animationSpeed && typeof obj.animationSpeed == 'number' && obj.animationSpeed >= 10) {
            setting['animationSpeed'] = obj.animationSpeed;
        }
    }
    var slider = $('body').find(setting.selector);
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

    // var sliderContainer = $('body').find('.slider-container')
    // var next = sliderContainer.find('.next');
    // var prev = sliderContainer.find('.prev');

    //To dsplay number of slides on different screen resolution
    if (screen.width < 768) {
        var itemDisplay = setting.mobileSlide;
        if(setting.mobileSlide >= item.length) {
            slider.parents('.slider-container').find('.next').remove();
            slider.parents('.slider-container').find('.prev').remove();
        }
    } else if (screen.width >=768 && screen.width <=1024) {
        var itemDisplay = setting.tabletSlide;
        if(setting.tabletSlide >= item.length) {
            slider.parents('.slider-container').find('.next').remove();
            slider.parents('.slider-container').find('.prev').remove();
        }
    } else {
        var itemDisplay = setting.desktopSlide;
        if(setting.desktopSlide > item.length) {
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
    $('.next').on('click', function () {
        var btnParentEle = $(this).parents('.slider-container').find(slider);
        $(this).css({ pointerEvents: 'none' });
        if (itemWidthNum % 1 === 1) {
            counter = (itemWithNum / 2);
        } else if (itemDisplay % 1 === .5) {
            counter = ((itemWidthNum / 2)+2);
        }
        counter += (screen.width - (slides));
        $(this).css({ pointerEvents: '' });
        btnParentEle.animate({
            left: -(counter)
        }, setting.animationSpeed, function () {
            btnParentEle.find('.item:lt(' + slides + ')').clone().appendTo(slider);
            counter = 0;
            btnParentEle.css({ left: counter, marginLeft: '5px' });
            btnParentEle.find('.item:lt(' + slides + ')').remove();
        });
    });
    // Previous Event
    $('.prev').on('click', function () {
        var btnParentEle = $(this).parents('.slider-container').find(slider);
        btnParentEle.find('.item:nth-last-child(-n+' + slides + ')').clone().prependTo(slider);
        btnParentEle.css({ marginLeft: -screen.width})
        counter -= (screen.width + (slides + 3));
        btnParentEle.animate({
            left: -(counter),
            justifyContent: 'flex-end'
        }, setting.animationSpeed, function (){
            btnParentEle.find('.item:nth-last-child(-n+' + slides + ')').remove();
            counter = 0;
            btnParentEle.css({ left: counter, marginLeft: '7px' });
        });
    });
};
