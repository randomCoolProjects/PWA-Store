function detectMob() {

    return ( window.innerWidth <= 750 ) && ( window.innerHeight <= 800 );

    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return ( window.innerWidth <= 700 ) && ( window.innerHeight <= 800 );
    });
}

function detectMobSystem() {

    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

const IsMobileSystem = detectMobSystem();
const IsMobile = detectMob();

function RemoveHoverForMobile()
{
    function hasTouch() {
        return 'ontouchstart' in document.documentElement
               || navigator.maxTouchPoints > 0
               || navigator.msMaxTouchPoints > 0;
    }
    
    if (hasTouch()) { // remove all the :hover stylesheets
        try { // prevent exception on browsers not supporting DOM styleSheets properly
            for (var si in document.styleSheets) {
                var styleSheet = document.styleSheets[si];
                if (!styleSheet.rules) continue;
    
                for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                    if (!styleSheet.rules[ri].selectorText) continue;
    
                    if (styleSheet.rules[ri].selectorText.match(':hover')) {
                        styleSheet.deleteRule(ri);
                    }
                }
            }
        } catch (ex) {}
    }
}

function PageLoad() {
    var hiddenMobile = document.getElementsByClassName('hidden-mobile');
    var hiddenDesk = document.getElementsByClassName('hidden-desktop');
    var mobileFullW = document.getElementsByClassName('mobile-fullw');

    if (IsMobile)
    {
        for (var i = 0; i < hiddenMobile.length; i ++)
            hiddenMobile[i].classList.add('hidden');

        for (var i = 0; i < mobileFullW.length; i ++)
            mobileFullW[i].setAttribute('style', 'min-width: 100%;')
    }

    if (!IsMobile)
    for (var i = 0; i < hiddenDesk.length; i ++)
        hiddenDesk[i].classList.add('hidden');


    if (typeof AfterPageLoad != 'undefined') AfterPageLoad();

    RemoveHoverForMobile();
}

// Hamburguer Menu

var hm_menu = document.querySelector('.hamburguer-menu');
var hm_open_close = document.querySelector('#hm-open-close');
var hm_state = false;

hm_open_close.addEventListener('click', () => {
    hm_state = !hm_state;
    if (hm_state)
    {
        hm_menu.classList.remove('hm-closed');
    }
    else
    {
        hm_menu.classList.add('hm-closed');
    }
});