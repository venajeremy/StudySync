import express from 'express'
import path from 'path';
import session from 'express-session';
import { deleteUser, getUserDatabaseInfo, getUserInformation, accountExist, createUser, login } from './database.js'

// working directory
const dir = process.cwd();

const app = express()

// Set up session cookies
app.use(session({
    secret: 'blah blah blah',
    cookie: { maxAge: 10800000},
    resave: true,
    saveUninitialized: false
}))

app.use(express.json())

// Serve static files from the dist folder
app.use(express.static(path.join(dir, 'dist')));

// Catch-all route to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(dir, 'dist', 'index.html'));
});


// -------------------------------------- Admin Requests -----------------------------------



app.post("/users/deleteUser", async (req, res) =>{
    if (req.session.authenticated) {

        try {
            const { id } = req.body    // sets details to parameters from post request body

            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id,
                usertype: fullInfo.usertype
            }

            if (selectInfo.usertype === 3){
                console.log("Admin: "+selectInfo.user+" is deleting user with id="+id)

                const { status, message } = await deleteUser( id )

                res.status(status).send(message);
            } else {
                res.status(401).send("Nice try buddy");
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.post("/users/adminInfo", async (req, res) =>{
    if (req.session.authenticated) {

        try {
            const {  } = req.body    // sets details to parameters from post request body

            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user,
                id: fullInfo.id,
                usertype: fullInfo.usertype
            }

            if (selectInfo.usertype === 3){
                console.log("Admin: "+selectInfo.user+" is requesting user information")

                const { status, message } = await getUserDatabaseInfo(  )

                res.status(status).send(message);
            } else {
                res.status(401).send("Nice try buddy");
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Unauthorized');
    }
})


// -------------------------------------- User Info Retrival Api Handlers -----------------------------------

// Return Username of Session Cookie
app.post("/users/getUser", async (req, res) => {
    if (req.session.authenticated) {
        try{
            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                user: fullInfo.user
            }
            res.status(200).send(selectInfo)
        } catch (error) {
            console.log(error)
        }
        
    } else {
        res.status(401).send('Unauthorized');
    }
})

app.post("/users/getUserInfo", async (req, res) => {
    if (req.session.authenticated) {
        try {
            const userData = req.session.user;
            const userName = userData.username;

            const userExists = await accountExist(userName)
            if(!userExists){
                req.session.destroy(); // Destroy the current session
                res.clearCookie('session-id'); // Clear the session cookie
                res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
                return null;
            }
            const fullInfo = await getUserInformation(userName)
        
            
            const selectInfo = {
                email: fullInfo.email,
                user: fullInfo.user,
                usertype: fullInfo.usertype
            }
            res.status(200).send(selectInfo)
        } catch (error) {
            console.log(error)
        }
        
    } else {
        res.status(401).send('Unauthorized');
    }
})

// -------------------------------------- Account Creation Api Handlers -----------------------------------

// User registration backend api handler
app.post("/users/register", async (req, res) => {
    const { email, username, password, password2 } = req.body    // sets details to parameters from post request body

    if(password===password2){
        const { message, status } = await createUser(email, username, password)  // uses our database function to create an sql entry
        
        res.status(status).type('text').send({ message })  // returns to our user what our database function returned to us. status 201 indicates item created
    } else {
        const doNotMatch = {
            message: "Passwords do not match!"
        }
        res.status(401).type('text').send(doNotMatch)
    }
})

// user login backend api handler
app.post("/users/login", async (req, res) => {
    
    const { username, password } = req.body    // sets details to parameters from post request body
    console.log(username+" "+password);
    const { message, status, authed } = await login(username, password)  // uses our database function to create an sql entry
    
    // Give user session if login is valid
    if(authed){
        // Store the session in the backend
        req.session.authenticated = true;
        // Store the username tied to the session
        try{
            req.session.user = {
                username: username
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        // If authentication is not successful des
        req.session.destroy(); // Destroy the current session
        res.clearCookie('session-id'); // Clear the session cookie
    }

    res.status(status).type('text').send({ message })  // returns to our user what our database function returned to us. status 201 indicates item created
})

app.post("/users/signout", async (req, res) => {
    if(req.session.authenticated){
        try {
            // If authentication is successful 
            req.session.destroy(); // Destroy the current session
            res.clearCookie('session-id'); // Clear the session cookie
            res.status(200).type('text').send("Signed Out!");  // returns to our user what our database function returned to us. status 201 indicates item created
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).type('text').send("You are not logged in!");  // returns to our user what our database function returned to us. status 201 indicates item created
    }

})


// -------------------------------------- Configure and Start -----------------------------------

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// server start
app.listen(8080, () => {
    console.log('Server is running on port 8080')
})