$(() => { // page must load before anything else happens

  const createTweetElement = (tweetObj) => {

    // variables to be reassigned using tweet data
    let name = null;
    let avatar = null;
    let handle = null;
    let tweet = null;
    let timestamp = null;

    // data from objects moved to [key, value] nested arrays for simpler iteration
    const dataArrays = Object.entries(tweetObj);

    for (const array of dataArrays) { // tweet data assigned to appropriate variables
      if (array[0] === 'user') {
        name = array[1].name;
        avatar = array[1].avatars;
        handle = array[1].handle;
      } else if (array[0] === 'content') {
        tweet = array[1].text;
      } else {

        // timeago linked on HTML page; converts "created_at" data to be human readable and refer to present (x years/months/days ago)
        timestamp = timeago.format(array[1]);
      }
    }

    // HTML data recognized by tweets.css
    return `
    <article class="tweet">
      <header>
        <div>
          <img src=${avatar}>
          <p>${name}</p>
        </div>
        <p class="handle">${handle}</p>
      </header>
      <p class="tweet-body">${tweet}</p>
      <footer>
        <p>${timestamp}</p>
        <div>
          <i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i> <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`;
  };

  const renderTweets = (tweetArray) => {
    for (const tweet of tweetArray) { //iterates through multiple tweets
      $('.tweets').prepend(createTweetElement(tweet)); // adds tweets to page
    }
  };

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {

        console.log('Success: ', tweets);
        renderTweets(tweets);
      });
  };

  loadTweets();

  $('form').submit(function(event) {
    event.preventDefault(); // prevent page reload

    const newTweetText = $(this).children('#tweet-text').val();

    // placeholder validation
    if (newTweetText === '') {
      alert('You need to write a tweet to post a tweet!');
      return;
    } else if (newTweetText.length > 140) {
      alert('Your tweet must be under 140 characters in length!');
      return;
    }

    const tweetQueryString = $(this).serialize();

    $.post('/tweets', tweetQueryString)
      .done(function() {
        console.log('Success: ', tweetQueryString);
        $('#tweet-text').val('');
        $('.counter').html(140);
        loadTweets();
      });
  });
});