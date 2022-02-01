$(document).ready(function() {
  $('.new-tweet form').keyup(function() {

    const newTweetText = document.getElementById('tweet-text').value;
    let remainingCharacters = $('.button-area .counter').html();

    remainingCharacters = 140 - newTweetText.length;
    $('.button-area .counter').html(remainingCharacters);
  });
});