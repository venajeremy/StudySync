import './App.css'
import React, { useEffect } from 'react';



function App() {

  const Get2FACodeParam = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const token = searchParams.get('token')
    emailValidationAuth(token)
  };

  const emailValidationAuth = (inputToken) => {

    // create account request
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authToken: inputToken })
    }

    // create account request
    fetch('/users/auth', requestOptions).then(
      response => {
        if (response.status==200){
          window.location.href="/login/"
        } else {
          return response.json().then(data => {
            // display the message returned by backend
            document.getElementById("loginBackendResponse").textContent = "Error: "+data.message
          })

        }
      }
    )
  }

  useEffect(() => {
    Get2FACodeParam();
  }, []);

  return ( 
    <>
      <div> 
        Processing Registration...
      </div>
      <div id="loginBackendResponse">
  
      </div>
    </>
  )

  
}

export default App
