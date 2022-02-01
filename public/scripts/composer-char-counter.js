$(document).ready(function() {
  $('.new-tweet form').keypress(function() {
    const pressedKey = document.getElementById('tweet-text').value;
    const remainingCharacters = $('.button-area .counter').html();
  });
});