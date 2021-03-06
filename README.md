# DGM3790 - Comic Caption App

###Team Members:

John Perl <johnrperl@gmail.com>

Sheresa Roo Wight <roux252@gmail.com>

Travis Hoki <hokirocko@gmail.com>

Dayton Rohner <daytroh@gmail.com>

Tyler Maynard <tymayn@gmail.com>

Random Hero <hero@random.com>

## Steps to setup project:

First you'll need to grab the repository, this will get all the necesarry files.
+ `git clone https://github.com/TylersDesk/dgm3790-gp.git`

Change directory into the newly downloaded folder. `cd dgm3790-gp`.

Now you will need to switch to the develop branch. As this has the latest changes, if you don't do this you may not get all of the latest edits I have made.

+ `git checkout -f master`

Next you need to `npm install`. This reads the package.json and installs node modules

+ `npm install`

Now you can simply tell node to run the server:

+ `node app.js`

You should see the server running. If you don't check the following steps above. Go check out the app:

+ `http:\\www.localhost.com:3000` - In a browser

## CouchDB Configuration

#### Note -  This is no longer needed as we have moved the app to use a production couchDB server. You can still use the information below to replicate for development purposes.

By default the app will try and sync with a local instance of couch, specifically a DB located at `http://127.0.0.1/dgm3790_gp/`. This means you should replicate an instance of this database based off of Tyler's own couchDB instance.

+ Make sure you have CouchDB installed

+ Browse to the replicator page on CouchDB

+ Left Side -> Replicate Changes From: Remote Database `http://blog.pirho.com:5984/dgm3790_gp/`
+ Right Side -> to: Local Databse `dgm3790_gp`

It may prompt you to create the database, just accept and you should see the event window populate once the replicator has finished.

## Want to play with the code?

If you want to play with the code, please create a new branch. I will go over this with the team on Tuesday in class, but if you want to get into things before that follow these steps.


First run a git status, and make sure your on 'develop'

- `git status`

This should say something like `# On branch develop`. If it says master then you need to run `git checkout -f develop`.

Now create your own personal branch with your name:

- `git checkout -b YOURNAME`

This should create and checkout a new branch. Run `git status` again to make sure your on the new branch.

- `git status` -> should say something like `# On branch YOURNAME`

Now you free to play around, change code and all that. I will go over adding those changes back into the DEVELOP branch on Tuesday.
