/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}


const createTweetElement = (tweetObj) => {

  let name = null;
  let avatar = null;
  let handle = null;
  let tweet = null;
  let timestamp = null;

  const dataArrays = Object.entries(tweetObj);
  for (const array of dataArrays) {
    if (array[0] === 'user') {
      name = array[1].name;
      avatar = array[1].avatars;
      handle = array[1].handle;
    }
    else if (array[0] === 'content') {
      tweet = array[1].text;
    } else {
      timestamp = array[1];
    }
  }
  console.log(name, avatar, handle, tweet, timestamp);
};

createTweetElement(tweetData);

