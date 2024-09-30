import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()

// use accounts database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


export async function deleteUser (userId) {
    try {
        const [deleteAccount] = await pool.query(`
        DELETE FROM users WHERE id=?
        `,[userId]);

        const [deleteLocations] = await pool.query(`
        DELETE FROM locations WHERE usersId=?
        `,[userId]);

        const [deleteCart] = await pool.query(`
        DELETE FROM cart WHERE user=?
        `,[userId]);

        const [deleteOrderItems] = await pool.query(`
        DELETE FROM orderItems WHERE user=?
        `,[userId]);

        const [deleteOrders] = await pool.query(`
        DELETE FROM orders WHERE user=?
        `,[userId]);

        console.log("Successfully deleted all user information for user: "+userId)
        return { status: 200, message: "Successfully deleted all user information"}

    } catch (error){
        console.log("Error fufilling admin request of deleting user "+userId+". Error: "+error)
        return { status: 500, message: []}
    }
}

export async function getUserDatabaseInfo () {
    try {
        const [result] = await pool.query(`
        SELECT id, email, user, pass, usertype FROM users
        `);

        return { status: 200, message: result}

    } catch (error){
        console.log("Error retrieving user database information for admin: "+userId+". Error: "+error)
        return { status: 500, message: []}
    }
}



export async function getUserInformation(username){

    console.log("User retrieving information for username: "+username)

    try{
        const [rows] = await pool.query(`
        SELECT * FROM users WHERE user=?
        `, [username])
        
        return rows[0] // always returns array, we just grab first item
        
        
    } catch (error){
        console.log("Error finding user data: "+error)
    }

}

export async function accountExist(username){

    try{
        const [checkUsername] = await pool.query(`
        SELECT id FROM users WHERE user=(?)
        `, [username])
        
        if(checkUsername[0]!=null){
            return true;
        } else {
            return false;
        }
        
    } catch (error){
        console.log("Error finding user data: "+error)
    }

}

export async function createUser(email, username, password){ // prepared statement using input for query

    

    // we need to check if username already exists
    try {
        const [checkUsername] = await pool.query(`
        SELECT id FROM users WHERE user=(?)
        `, [username])
        
        if(checkUsername[0]!=null){
            console.log("Acount with username "+username+" already exists in database.")
            
            return{status: 401, message: "Account with that username already exists!"} 
        }

    } catch(error) {
        // some error occured checking for username in database
        console.log("Error Checking for Username, "+error)

        return{error: 500, message: "Encountered database error, sorry ;("}
    }



    // Username avaible! Enter user into database
    try {
        // Create admin account if password matches certain string (terrible for security, great for testing)
        if(password === "iamanadmin") {
            const [result] = await pool.query(`
            INSERT INTO users (email, user, pass, usertype)
            VALUES (?, ?, ?, ?)
            `, [email, username, password, 2])
            console.log("Admin account was created! Username: " + username +" Password: "+password)
        } else {
            const [result] = await pool.query(`
            INSERT INTO users (email, user, pass, usertype)
            VALUES (?, ?, ?, ?)
            `, [email, username, password, 1])
            console.log("Account was created! Username: " + username +" Password: "+password)
        }

    } catch (error) {
        // some error occured creating the new user (most likely the username already existed and we did not check propperly before)
        console.log("Error Adding To Database, "+error)

        // tell user that some database error happened
        return{error: 500, message: "Encountered database error, sorry ;("}

    }

    // tell user their account was generated
    return {status: 200, message: "Hello "+username+", your account has been created!"}
}


export async function login(username, password, authed) {

    // check if username exists
    try {
        const [checkUsername] = await pool.query(`
        SELECT id FROM users WHERE user=(?)
        `, [username])
        
        if(checkUsername[0]==null){
            console.log("Acount with username "+username+" does not exist in database.")
            
            return{status: 401, message: "Username or password is incorrect", authed: false} 
        }

    } catch(error) {
        // some error occured creating the new user (most likely the username already existed and we did not check propperly before)
        console.log("Error Checking for Username, "+error)

        return{error: 500, message: "Encountered database error, sorry ;(", authed: false}
    }

    // Username in database, attempt login
    try {
        const [tryLogin] = await pool.query(`
        SELECT id FROM users WHERE user=(?) AND pass=(?)
        `, [username, password])

        console.log("User logging in with Username: "+username+" Password: "+password)

        // check if user and password was found
        if(tryLogin[0]==null){
            console.log("Acount with Username: "+username+" and Password: "+password+" does not exist in database")
            
            return{status: 401, message: "Username or password is incorrect", authed: false} 
        } else {
            // LOGIN SUCCESS  <--------------------------------------------------------------------------------------------------------------- provide user some form of login session
            return {status: 200, message: "Hello "+username+", you have been successfully logged in!", authed: true}
        }

    } catch (error) {
        // some error occured creating the new user (most likely the username already existed and we did not check propperly before)
        console.log("Error checking credentials on database, "+error)

        // tell user that some database error happened
        return{error: 500, message: 'Encountered database error, sorry ;(', authed: false}
    }

}


