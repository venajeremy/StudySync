
# Study Sync

## Table of contents

1. Install and Setup Guide

## Install and Setup Guide:

If you have any issues setting up the project contact: jeremy.greatorex@sjsu.edu

### Requirements:

Install Node.js LTS

Install Git
(to try pulling from our repo if the zipped file does not run)

Install MySql
(i needed to add mysql to path
to do this navigate to mysql bin directory
probably at C:\Program Files\MySQL Server 8.0\bin
once you find it copy this path should look something like such above
hit windows
type env
click edit the system environment variables
click Enviroment Variables
in bottom half in system variables find variable path
click that
edit
new
past in the path)

(remember the password you give mysql we will remove later it for the sake of development)

### Pre-Setup (USE IF ZIPPED FILES DON'T WORK):

Make folder for project

Open terminal

Navigate to folder

run: git init

run: git remote add origin git@github.com:bazayd/OnlineFoodStore

run: git pull origin main (if this doesn't work try running git branch main and then try again)

### MySQL-Set-Up:

Open VSCode (this is what we used, any terminal is fine)

Open the folder you created

Double check you see client and server folders (as well as aditional txt files)

Open two integrated terminals

Navigate one to server folders

Navigate the other to vite-project folder within the client folder (these will run the backend node.js and frontend react development server respectively)

Go to terminal in server directory

run: mysql -u root -p

Enter the password you gave it earlier

Should be within the mysql server

run: SET PASSWORD FOR root@localhost='';         (this removes the password on the mysql database, there is an .env file that the node.js server uses to authenticate. You can instead set the MYSQL_USER and MYSQL_PASSWORD in this .env file located at /WebProject/server/.env to authenticate into your mysql database with an actual username and password)

In VSCode in the server folder find schema.sql   (contains all the commands to generate our database, tables, and inventory)

Copy everything inside

Click back into mysql terminal

Paste everything w/ right click (should do multiple commands at once to create database and table)

Make sure to press enter to run last command

run: show databaes;

Make sure there is the studysync database

run: use studysync;

run: show tables;

Should respond with the following tables:

With at least the users table

run: select * from users;

Make sure it returns the default users

run: exit

### Node.js-Set-Up:

Get in server directory

run: npm run dev       (this starts backend node.js server)

Allow any permissions

#### NOTE: In this tutorial we are going to be using our webpage via the react development server (the one we run from /WebProject/client/vite-project). Though we can "compile" the react and run the webserver soley from the node.js backend server.  THIS IS NOT MANDITORY TO SEE FUNCTIONALITY OF SITE: To do this in the /WebProject/client/vite-project run: npm run build.  This will generate a new dist folder located WebProject/client/vite-project/dist.  To run the webpage in development drag this dist folder into WebProject/server.  Additionally you will have to copy in all images.  To do this copy all images from the client/vite-project/src/assets folder into the new assets folder within the dist folder now in /WebProject/server.  Now to access the webpage (after starting node.js backend) in the browser url use localhost:8080 port of the backend rather than the localhost:5173 port of the react development server

### Vite&React-Set-Up:

Click onto vite-project (within client folder) terminal

run: npm install        (npm should install all dependencies in the package.json file located /WebProject/client/vite-project/package.json)
(if anything goes wrong its probably going to be this)

Wait

run: npm run dev

Should start frontend development server

Copy the local url (http://localhost:5173) & slap it into your browser

If all works well the webpage should be successfully up and running. if any errors occur please send me a screenshot the error (if any) in the browser development console, a screenshot of the react development server terminal, and a screenshot of the node.js backend server terminal.  This will greatly help me identify what went wrong!


## Main Topic Header

![Registration page image](Images/RegisterPage.png)

#### More info. 

> [!NOTE]
>  Some note. 

![Login page image](Images/LoginPage.png)


