# Setup Instructions
To start clone the repo and run yarn install.

## NestJS Setup
Once you have forked the repo and cloned it locally just cd into both the backend
and frontend folders and run `yarn install` in both.

## MongoDB Setup
You will need to either have a local install of MongoDB running or setup a Mongo
Atlus account. I personally run Mongo in a Docker instance.

To setup a local MongoDB instance using docker use the following commands in your
terminal.

```docker pull mongo:latest```

```docker run --name mongodb -p 27017:27017 -v /my/own/datadir:/data/db mongo:latest```

Make sure to replace "/my/own/datadir" with the directory you would like to keep your
data stored so that when you stop the container or remove it you keep your data.

Once you have either setup a local install of Mongo or have created a database on Atlus
you will need to create your own .env file in the backend folder and add the following line
`MONGO_URL=urlgoeshere` replacing "urlgoeshere" with the address to your MongoDB.

## Running the Project
Once all of the above has been completed all you have to do is cd into the backend
directory and run `yarn run start:dev` to run the app in watch mode.
