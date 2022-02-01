$(document).ready(function() {
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
});