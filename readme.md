# torch-rnn web server

This is a simple Docker-based web server for presenting data generated using [torch-rnn](https://github.com/jcjohnson/torch-rnn). It works on Dokku and probably on Heroku as well.

It allows you to do stupid shit like [this page that creates new book titles for Harlequin Romance](http://harlequin.dokku.kvitebjorn.com/).

Out of the box this runs a simple node.js-powered web server that fetches data from torch-rnn, caches it and then presents it in a web page. There is also a script for tweeting output from the neural network.

## How to create checkpoint files

Once you have your input data, refer the documentation for [torch-rnn](https://github.com/jcjohnson/torch-rnn) and/or [docker-torch-rnn](https://github.com/crisbal/docker-torch-rnn) where all this is thoroughly explained.

## How to use

The app ships with a sample checkpoint from torch-rnn ()trained on all book titles from Harlequin Romance), which is referenced in the `index.js` file by default. Replace this with your own checkpoint file when you have one.

To build and run the docker image:

1. `cd torch-rnn-web-server`
2. Run `docker build .` -- the output of this command should end with **"Successfully built CONTAINER_ID"**
3. Copy the CONTAINER_ID and run `docker run -p 8000:80 CONTAINER_ID`
4. You can now point your browser to <http://localhost:8000> and view the neural network output in all its glory.

The data processing that happens in `index.js` and all the HTML/CSS in `template.html` can of course be edited to your heart's content.

## Why to use

That's not for me to say
