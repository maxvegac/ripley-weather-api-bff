## Demo

### Health
https://enigmatic-fortress-30409.herokuapp.com/

### Get Weather for coords -36.7136030457923 -65.7513199253682
https://enigmatic-fortress-30409.herokuapp.com/weather/-36.7136030457923/-65.7513199253682

You can look at the DarkSky's API docs to get more information about the response. (https://darksky.net/dev/docs)
## Running local

[Disclaimer] I prefer to use yarn instead of npm, you can use npm if you wish [/Disclaimer]

First, you need to configure the project in the configuration folder, setup the DarkSky API key and REDIS host.

Now, in the project directory, you can run:

### `yarn`
### `yarn dev`

Runs the app in the development mode.

## Running Docker

This project contains a Dockerfile to make it productive and, in the next releases, work in any environment without rebuilding.

If you need to run it as Docker, build and run the image:

`docker build -t weather-backend`

`docker run -p 3000:3000 -it weather-backend`

This docker runs a version of redis and the BFF! All in one.

## Heroku

This projects contains the heroku yml for it's initialization in heroku, you need to have the heroku CLI (https://devcenter.heroku.com/articles/heroku-cli) installed.

If you have the heroku CLI, then you must create the heroku project

`heroku create`

Set the heroku deployment to container, so we can use the docker image


`heroku stack:set container`

And now, push this repository to heroku

`git push heroku master`

This will start to build and finally run the docker image in Heroku. Remember to use `heroku info` to know the URL of the project.
