// test data
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense, donc je suis"
    },
    "created_at": 1461113959088
  }
];


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
  $(document).ready(function() { // doesnt do anything until the page is loaded

    for (const tweet of tweetArray) { //iterates through multiple tweets
      $('.tweets').append(createTweetElement(tweet)); // adds tweets to page
    }
  });
};

renderTweets(data);