const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const { readFileSync } = require('fs');
const unique = require('array-unique');
const request = require('request');
const app = express()

var router = express.Router();
var path = __dirname + '/views/';

const apiKey = '255e7671aa223e4745f9f269945bbd87';
              //255e7671aa223e4745f9f269945bbd87

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});
/*
app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  console.log(url);
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})
*/
app.post('/', function(req, res) {
  let autor = req.body.city;
  console.log(autor);

    console.log("wywolane gemnerowanie");
    let temperature = 1;

    /*if (req.query.t && req.query.t.match(/^\d+(\.\d+)?$/)) {
      temperature = req.query.t;
    }*/
    console.log('wszedłem1');
    // Fetch data
    generateData('/home/ozymandias/torch-rnn/cv/checkpoint_172200.t7', '2000', temperature, function(str) {
    console.log('wszedłem2');
      // Split into lines, remove the first and last lines and any duplicates
      const parts = unique(str.split('\n').slice(1, -1))
          .filter(s => s.length > 1)     // Remove lines 1 character or less
          .slice(0, 10)                  // Take a maximum of 10 lines
          .map(s => s); // Wrap in paragraph tags

          const title = 'Title:';
      // Podstawia wygenerowany tekst pod element "demo"

     /*
      let weatherText = '{"name":"Sienkiewicz", "text":"' + parts.join("\n") + '"}';
      console.log('wygenerowano: ' + weatherText);
      var obj = JSON.parse(weatherText);
      let fullText = 'Autor: ${obj.name} Text: ${obj.text} .';
      res.render('index', {weather: fullText, error: null});
     */

    console.log(parts.join("\n"));

      res.render('index', {weather: parts, error: null});





      // Render template
      /*res.send(
        template
          .replace(/\{\{title\}\}/g, title)
          .replace('{{content}}', parts.join("\n"))
      );
    });*/
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

  //app.listen(80);


  let when = {};
  let cached = {};

  function generateData(cp, l, t, cb) {
    const now = Date.now();
    const key = `${cp}${t}`;
    console.log('wszedłem3');
    if (!when[key]) {
      when[key] = 0;
    }

    // Cache results for 10 seconds
    if (now - when[key] > 10000 || !cached[key]) {
      when[key] = now;
      try {
        console.log(`cd /root/torch-rnn && th sample.lua -checkpoint ${cp} -length ${l} -gpu -1 -temperature ${t}`);
        exec(`cd /home/ozymandias/torch-rnn && th sample.lua -checkpoint ${cp} -length ${l} -gpu -1 -temperature ${t}`, function(err, str) {
          if (err) {
            console.error(err);
            cb('');
          } else {
            cached[key] = str;
            cb(cached[key]);
          }
        });
      } catch (e) {
        console.error(e);
        cb('');
      }
    } else {
      cb(cached[key]);
    }
  }

  function randomize(it) {
    return it.reduce(function(s, a) {
      if (typeof a == 'string') {
        s += a;
      } else {
        s += a[Math.floor(Math.random() * a.length)];
      }
      return s;
    }, '');
  }