# torch-rnn web server

This is a simple Docker-based web server for presenting data generated using [torch-rnn](https://github.com/jcjohnson/torch-rnn). It works on Dokku and probably on Heroku as well.

Out of the box this runs a simple node.js-powered web server that fetches data from torch-rnn, caches it and then presents it in a web page. There is also a script for tweeting output from the neural network.

## How to use

Once you have trained a torch-rnn neural network (this can be done using the [docker-torch-rnn](https://github.com/crisbal/docker-torch-rnn) Docker image, on which this web server is based) and have generated your `checkpoint_xxxx.t7`-file, put it in the `app`-folder. Edit `index.js` (and `tweet.js` if you want to tweet) to refer to the correct checkpoint file. The Docker image can now be built and run, if you want to run it on Dokku or Heroku, commit and push and that _should_ maybe possibly work!

## Why to use

That's not for me to say
