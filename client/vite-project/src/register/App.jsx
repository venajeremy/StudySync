import { useEffect, useState } from 'react'
import studysynclogo from '../assets/StudySyncTransparent.png'
import './App.css'



function App() {

  const [showBackToLogin, setShowBackToLogin] = useState(false);

  const createAccount = (inputemail, inputusername, inputpassword, inputpassword2, inputaddress, inputcity, inputstate, inputzipcode) => {

    // create account request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: inputemail, username: inputusername, password: inputpassword, password2: inputpassword2, address: inputaddress, city: inputcity, state: inputstate, zipcode: inputzipcode})
    }

    fetch('/users/register', requestOptions).then(
      response => {
        if (response.status==200){
          
          setShowBackToLogin(true);
          return response.json()
        } else {
        
          setShowBackToLogin(false);
          return response.json()
        }
      }
    ).then(
      data => {

        // display the message returned by backend
        document.getElementById("registerBackendResponse").textContent = data.message
        
      }
    )
  }

  return ( 
    <>
      <div>
        <a href="/MainPage/">
          <img src={studysynclogo} alt="studysynclogo" id="studysynclogo"/>
        </a>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          console.log("asdf");
          //(email, username, password, address, city, state, zipcode)
          createAccount(e.target.email.value, e.target.username.value, e.target.password.value, e.target.password2.value); // Call postNote function with form values
        }}>
          <div className='parentContainer'>
            <div className='childContainer1'>
              <input type="email" name="email" placeholder='Email' required/>
              <br></br>
              <input type="text" name="username" placeholder='Username' required/>
              <br />
              <input type="password" name="password" placeholder='Password' required/>
              <br />
              <input type="password" name="password2" placeholder='Confirm Password' required/>
              <br />
            </div>
          </div>
          <input id="registerBtn" type="submit" value="Register" /> 
        </form>
        <div id="registerBackendResponse"></div>
        
        { // In react you have to use this method to dynamically show objects
        showBackToLogin && (
        <div id="backToLogin">
          <br></br>
          <a href="/login/">
            <button type="button">Login</button>
          </a>
        </div>
        ) }

      </div>
    </>
  )

  
}

export default App
