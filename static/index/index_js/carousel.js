$(document).ready(function() {
  // Number of items viewable at one time 
  var scrollerItemsViewable = 4.5;
  // Scroller speed in seconds
  var scrollerSpeed = 3;
  // Transition speed - must be <= scrollerSpeed
  var scrollerTransitionSpeed = 2;
  
  // Rebuild the element list to remove white space
  var scrollerItemsEl = '';
  $('.scrollerContainer > article').each(function(index) {
    //console.log( index + ": " + $( this ).text() );
    scrollerItemsEl += $(this).prop('outerHTML');
  });
  $('.scrollerContainer').html(scrollerItemsEl);
  
  // Wrap items in a box that is as wide as the all the elements combined.
  // This prevents the items from wrapping if wider than the scroller width
  $('.scrollerContainer > article').wrapAll('<div class="scrollerGroup" />');
  var scrollerCount = $('.scrollerContainer .scrollerGroup > article').length;
  var scrollerItemWidth = parseInt($('.scrollerContainer').css('width')) / scrollerItemsViewable;
  $('.scrollerContainer .scrollerGroup > article').css('width', scrollerItemWidth + 'px');
  $('.scrollerContainer .scrollerGroup').css('width',scrollerCount * scrollerItemWidth + 'px');
  $('.scrollerContainer .scrollerGroup > article').css('transition', 'margin ' + scrollerTransitionSpeed + 's');
  
  // Set Starting Values
  var scrollerLeftMargin = '-' + scrollerItemWidth + 'px';
  var scrollerFirstItem = true;
  
  scrollerAnimate(scrollerSpeed);
  
  function scrollerAnimate(speed) {
    setInterval(scrollerRotate, speed * 1000);
  }
  
  function scrollerRotate() {
    if (scrollerFirstItem) {
      scrollerFirstItem = false;
    } else {
      $('.scrollerContainer .scrollerGroup').append($('.scrollerContainer .scrollerGroup article:first-child'));
    }
    $('.scrollerContainer .scrollerGroup > article').css('margin-left', '0');
    $('.scrollerContainer .scrollerGroup > article:first-child').css('margin-left', scrollerLeftMargin);
  }
});