/*
 * MBP - Mobile boilerplate helper functions
 */

(function(document){

window.MBP = window.MBP || {};


/*
  * Fix for iPhone viewport scale bug
  * http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/
*/

MBP.viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]');
MBP.ua = navigator.userAgent;

MBP.scaleFix = function () {
  if (MBP.viewportmeta && /iPhone|iPad|iPod/.test(MBP.ua) && !/Opera Mini/.test(MBP.ua)) {
    MBP.viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
    document.addEventListener("gesturestart", MBP.gestureStart, false);
  }
};
MBP.gestureStart = function () {
  MBP.viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
};


/*
  * Normalized hide address bar for iOS & Android
  * (c) Scott Jehl, scottjehl.com
  * MIT License
*/

// If we split this up into two functions we can reuse
// this function if we aren't doing full page reloads.

// If we cache this we don't need to re-calibrate everytime we call
// the hide url bar
MBP.BODY_SCROLL_TOP = false;

// So we don't redefine this function everytime we
// we call hideUrlBar
MBP.getScrollTop = function(){
  var win = window,
      doc = document;

  return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
};

// It should be up to the mobile
MBP.hideUrlBar = function(){
    var win = window;

    // if there is a hash, or MBP.BODY_SCROLL_TOP hasn't been set yet, wait till that happens
    if( !location.hash && MBP.BODY_SCROLL_TOP !== false){
        win.scrollTo( 0, MBP.BODY_SCROLL_TOP === 1 ? 0 : 1 );
    }
};

MBP.hideUrlBarOnLoad = function () {
  var win = window,
      doc = win.document,
      bodycheck;

  // If there's a hash, or addEventListener is undefined, stop here
  if( !location.hash && win.addEventListener ) {

    //scroll to 1
    window.scrollTo( 0, 1 );
    MBP.BODY_SCROLL_TOP = 1;

    //reset to 0 on bodyready, if needed
    bodycheck = setInterval(function() {
      if( doc.body ) {
        clearInterval( bodycheck );
        MBP.BODY_SCROLL_TOP = MBP.getScrollTop();
        MBP.hideUrlBar();
      }
    }, 15 );

    win.addEventListener( "load", function() {
      setTimeout(function() {
        //at load, if user hasn't scrolled more than 20 or so...
        if( MBP.getScrollTop() < 20 ) {
          //reset to hide addr bar at onload
          MBP.hideUrlBar();
        }
      }, 0);
    } );
  }
};





/*
  * Autogrow
  * http://googlecode.blogspot.com/2009/07/gmail-for-mobile-html5-series.html
*/

MBP.autogrow = function (element, lh) {
  function handler(e){
    var newHeight = this.scrollHeight,
        currentHeight = this.clientHeight;
    if (newHeight > currentHeight) {
      this.style.height = newHeight + 3 * textLineHeight + "px";
    }
  }

  var setLineHeight = (lh) ? lh : 12,
      textLineHeight = element.currentStyle ? element.currentStyle.lineHeight :
                       getComputedStyle(element, null).lineHeight;

  textLineHeight = (textLineHeight.indexOf("px") == -1) ? setLineHeight :
                   parseInt(textLineHeight, 10);

  element.style.overflow = "hidden";
  element.addEventListener ? element.addEventListener('keyup', handler, false) :
                             element.attachEvent('onkeyup', handler);
};


/*
  * Enable active
  * Enable CSS active pseudo styles in Mobile Safari
  * http://miniapps.co.uk/blog/post/enable-css-active-pseudo-styles-in-mobile-safari/
*/

MBP.enableActive = function () {
  document.addEventListener("touchstart", function() {}, false);
};


/*
  * Prevent iOS from zooming onfocus
  * https://github.com/h5bp/mobile-boilerplate/pull/108
*/

MBP.preventZoom = function () {
  var formFields = document.querySelectorAll('input, select, textarea'),
      contentString = 'width=device-width,initial-scale=1,maximum-scale=',
      i = 0;
  for(i = 0; i < formFields.length; i++) {
    formFields[i].onfocus = function() {
      MBP.viewportmeta.content = contentString + '1';
    };
    formFields[i].onblur = function() {
      MBP.viewportmeta.content = contentString + '10';
    };
  }
};

/*
  * iOS Startup Image helper
*/
MBP.startupImage = function () {

    var portrait, landscape, pixelRatio, head, link1, link2;

    pixelRatio = window.devicePixelRatio;
    head = document.getElementsByTagName('head')[0];

    if (navigator.platform === 'iPad') {

        portrait = pixelRatio === 2 ? "img/startup/startup-tablet-portrait-retina.png" : "img/startup/startup-tablet-portrait.png";
        landscape = pixelRatio === 2 ? "img/startup/startup-tablet-landscape-retina.png" : "img/startup/startup-tablet-landscape.png";

        link1 = document.createElement('link');
        link1.setAttribute('rel', 'apple-touch-startup-image');
        link1.setAttribute('media', 'screen and (orientation: portrait)');
        link1.setAttribute('href', portrait);
        head.appendChild(link1);

        link2 = document.createElement('link');
        link2.setAttribute('rel', 'apple-touch-startup-image');
        link2.setAttribute('media', 'screen and (orientation: landscape)');
        link2.setAttribute('href', landscape);
        head.appendChild(link2);

    } else {

        portrait = pixelRatio === 2 ? "img/startup/startup-retina.png" : "img/startup/startup.png";

        link1 = document.createElement('link');
        link1.setAttribute('rel', 'apple-touch-startup-image');
        link1.setAttribute('href', portrait);
        head.appendChild(link1);
    }
};


/*
  * Original jQuery snippet for Prevent iOS from zooming onfocus
  *  http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/
*/
// $('input, select, textarea').bind('focus blur', function(event) {
//  MBP.viewportmeta.content = 'width=device-width,initial-scale=1,maximum-scale=' + (event.type == 'blur' ? 10 : 1);
// });

})(document);
