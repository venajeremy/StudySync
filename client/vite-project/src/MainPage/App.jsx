import React, { useEffect, useState } from 'react';
import './App.css'


const assetPath = '../assets/'
const loadImage = (name) => {
  if(name.includes("http")){
    return name
  } else {
    return assetPath+name+'.png'
  }
}

const MainPage = () => {

  return(
    <p>Hello!!</p>
  )
  

}




export default MainPage