GrapeOut
========

An example Server and Client for managing user data using Grape API and KnockoutJS

## Dev dependencies
* Ruby 1.9.3
* Goliath
* Postgres
* Node.js

## Running Locally

Grab a copy of the project: `git clone https://github.com/jaredmoran/grapeout.git`

### API

Install dependencies:

    bundle install

Create the database:

    rake db:setup

Start the API server:

    ruby server.rb -vs

API will be available at: http://localhost:9000/v1/

#### API endpoints

* `/users/` - list all users
* `/users/:id` - list details for user with user.id == :id
* `/users/create` - create new user (POST)
* `/users/update/:id` - update user with user.id == :id (POST)
* `/users/delate/:id` - delete user with user.id == :id (POST)

### The Client

Now it's time to set up the front end build process and assets.

Grab Node dependencies - from the web/ directory, run:

    npm install

Front end assets are compiled using GruntJS.  The following commands are currently available:

    grunt - default command will run JSHint, concat, and Compass compilation of SASS
    grunt lint - runs JSHint
    grunt build - JSHint, concat, uglify and Compass compilation with production environment settings
    grunt watch - watch and compile assets as they change

#### Client access

Currently, the client is set up to hit a deployed version of the API at http://grapeout.herokuapp.com/.  The app will put itself to sleep at times, so be aware that some API calls may take several seconds to respond.

If you wish to change the API to access your local setup, be sure to update API_HOST in app.js with your local API url.

The client can be opened directly at web/index.html.  You can also start up your own local webserver with a command such as `python -m SimpleHTTPServer` which will make the client available at http://localhost:8000


