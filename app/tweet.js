const { exec } = require('child_process');
const schedule = require('node-schedule');
const Twitter = require('twitter');

const { readFileSync } = require('fs');

// Fill in your own
let client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

module.exports = function() {
  // This will tweet every day at 10, 11 and 12
  schedule.scheduleJob('0 0 10,11,12 * * *', function() {
    try {
      exec('cd /root/torch-rnn && th sample.lua -checkpoint /app/CHECKPOINT_NAME.t7 -length 2000 -gpu -1', function(err, str) {
        if (err) {
          console.error(err);
        } else {
          // Strip the first and last lines, filter out too long and too short lines
          const parts = str.split(/\n+/)
              .slice(1, -1)
              .filter(s => s.length <= 140 && s.length > 3);

          if (parts.length) {
            // Tweet a random line
            const tweet = parts[Math.floor(Math.random() * parts.length)];
            client.post('statuses/update', { status: tweet }, function(error, tweet, response) {
              if (error) {
                console.error(error);
              }
            });
          }
        }
      });
    } catch (e) {
      console.error(e);
    }
  });
};
