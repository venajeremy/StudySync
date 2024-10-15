import React, { useEffect, useState } from 'react';
import studysynclogo from '../assets/StudySyncTransparent.png';
import profileicon from '../assets/Profile Icon.png'
import './NavBar.css';


const NavBar = ({totalItems}) => {

    //("Nav bar has: "+totalItems+" total items")

    const [accountHref , accountHrefState] = useState("/login/")


    // Method to display account button as username if logged in
    const loadAccount = () => {
  
      // create account request
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
      }
  
      // create account request
      fetch('/users/getUser', requestOptions).then(
        response => {
          if (response.status==200){
            // We have a session !
            // Make account button link to the account page
            accountHrefState("/AccountPage/")
            cartPageState("/Cart/")
            // Resolve promise and return username
            return response.json().then(data => data.user);
            
  
          } else {
            // No session ;(
            // Make account button link to login page
            accountHrefState("/login/")
            cartPageState("/login/")
            return "Account"
            
          }
        }
      ).then(
        data => {
  
          // display the message returned by backend
          document.getElementById("accountButton").textContent = data
          
        }
      )
  
    }



  return(
    
    <nav className='navbar'>                                          
        <a href="/MainPage/">
            <img src={studysynclogo} className='logo'/>
        </a>
        
        
        <div className='spacer'></div>
        <ul>
            <li>
                <div className='icon-text'>
                    <a id="accountButtonRedirect" href={accountHref} onLoad={loadAccount}>
                    <img src={profileicon} className='Profile_Icon'/>
                    <span id="accountButton" className='text'>Account</span>
                    </a>
                </div>
            </li>
        </ul>
    </nav>
    
  );
};

export default NavBar;