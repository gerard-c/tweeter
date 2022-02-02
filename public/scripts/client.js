$(() => { // page must load before anything else happens

  // used to prevent users from injecting JS via tweet textarea
  const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
      <p class="tweet-body">${escape(tweet)}</p>
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
    $('.error-text').hide();
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {

        console.log('Success: ', tweets);
        renderTweets(tweets);
      });
  };


  loadTweets();

  $('form').submit(function(event) {
    event.preventDefault(); // prevent page reload

    const hackerTest = $('#tweet-text').text();
    console.log(hackerTest);
    const newTweetText = $(this).children('#tweet-text').val();

    // hidden error HTML element is shown, written on either error
    if (newTweetText === '') {
      $('.error-text').html(' 🛑 Error: You have to enter a tweet to post a tweet! 🛑 ');
      $('.error-text').slideDown(250, () => {
        console.log('Error: empty textarea');
      });

      return;

    } else if (newTweetText.length > 140) {
      $('.error-text').html(' 🛑 Error: Tweet must be 140 characters or less! 🛑 ');
      $('.error-text').slideDown(250, () => {
        console.log('Error: over character limit');
      });

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