# torch-rnn web server

This is a simple Docker-based web server for presenting data generated using [torch-rnn](https://github.com/jcjohnson/torch-rnn). It works on Dokku and probably on Heroku as well.

It allows you to do stupid shit like [this page that creates new book titles for Harlequin Romance](http://harlequin.dokku.kvitebjorn.com/).

Out of the box this runs a simple node.js-powered web server that fetches data from torch-rnn, caches it and then presents it in a web page. There is also a script for tweeting output from the neural network.

## How to create checkpoint files

Once you have your input data, refer the documentation for [torch-rnn](https://github.com/jcjohnson/torch-rnn) and/or [docker-torch-rnn](https://github.com/crisbal/docker-torch-rnn) where all this is thoroughly explained.

## How to use

Once you have trained a torch-rnn neural network and have generated your `checkpoint_xxxx.t7`-file, put it in the `app`-folder. Edit `index.js` (and `tweet.js` if you want to tweet) to refer to the correct checkpoint file. The Docker image can now be built and run, if you want to run it on Dokku or Heroku, commit and push and that _should_ maybe possibly “just” work!

## Why to use

That's not for me to say
