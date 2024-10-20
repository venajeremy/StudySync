import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar.jsx'
import Hero from './Hero/Hero.jsx'
import Description from './Description.jsx'
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
    <div className="container">
      <Navbar/>
      <Hero/>
      <Description/>
    </div>
    
  )
  

}




export default MainPage