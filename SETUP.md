# Setup Instructions
To start clone the repo and run yarn install.

## NestJS setup
Once you have forked the repo and cloned it locally just run `yarn install`

## MongoDB Setup
You will need to either have a local install of MongoDB running or setup a Mongo
Atlus account. I personally run Mongo in a Docker instance.

To setup a local MongoDB instance using docker use the following commands in your
terminal

```docker pull mongo:latest```

```docker run --name mongodb -p 27017:27017 -v /my/own/datadir:/data/db mongo:latest```

Make sure to replace "/my/own/datadir" with the directory you would like to keep your
data stored so that when you stop the container or remove it you keep your data.
