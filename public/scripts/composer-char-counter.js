$(() => { // page must load before anything else happens

  $('form').keyup(function() { // updates counter every time user lets go of pressed key

    const newTweetText = $(this).find('#tweet-text').val();
    let remainingCharacters = 140 - newTweetText.length; // 140 refers to max characters in a tweet

    $('.counter').html(remainingCharacters);

    if (remainingCharacters < 0) {
      if (!$('.counter').hasClass('over-limit')) {
        $('.counter').addClass('over-limit'); // color counter red when over limit
      }
      
    } else {
      $('.counter').removeClass('over-limit'); // maintains normal color otherwise
    }

  });



  $(window).scroll(function() {
    // checks if window is scrolled down at all and hides/shows buttons appropriately
    if ($(this).scrollTop()) {
      $('.scroll-up').fadeIn();
      $('.nav-tools').fadeOut();
    } else {
      $('.scroll-up').fadeOut();
      $('.nav-tools').fadeIn();
    }
  });

  // clicking button will scroll all the way up and show the "new tweet" UI
  $('.scroll-up').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 250);
    $('.new-tweet').slideDown(250, function() {});
  });
});