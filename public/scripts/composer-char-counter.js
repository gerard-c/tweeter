$(document).ready(function() {
  $('form').keyup(function() { // updates counter every time user lets go of pressed key

    const newTweetText = $(this).find('#tweet-text').val();
    let remainingCharacters = 140 - newTweetText.length; // 140 refers to max characters in a tweet

    $('.counter').html(remainingCharacters);

    if (remainingCharacters < 0) {
      $('.counter').css('color', '#FF0000'); // color counter red when over limit
    } else {
      $('.counter').css('color', 'inherit'); // maintains normal color otherwise
    }

  });
});