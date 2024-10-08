import React, { useEffect, useState } from 'react';
import './App.css'



const MainPage = () => {

  const loadUserData = () => {
    // create account request
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
    }
  
    // create account request
    fetch('/users/getUserInfo', requestOptions).then(
        response => {
            if (response.status==200){
                // We have a session !
                // Display user data on page
                return response.json().then(data => {
                  document.getElementById("mainMessage").textContent = "Hello "+data.user+", welcome to Study Sync!"
                  if(data.usertype === 2){
                    setIsEmployee(true)
                  }
                })
            }
        }
    )
  
  }

  useEffect (() => {
    loadUserData()
  }, [])

  return(
    <>
      <p id="mainMessage">Welcome to StudySync!</p>
      <br></br>
      <a href="/login/">Login</a>
      <br></br>
      <a href="/register/">Register</a>
    </>
    
  )
  

}




export default MainPage