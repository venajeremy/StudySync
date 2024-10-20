import React from 'react';
import uhh from './images/uhh.gif';
import explain from './images/explain.gif'
import business_stock_video from './images/business_stock_video.mp4'
import './Hero.css';

const Hero = () => {
  return (
    <div className="container">
      
      {/* <div className="hero-container" style={{ backgroundImage: `url(${business_stock_video})` }}> */} {/* use for image/gif*/}
      <div className="hero-container">

          <video autoPlay muted loop className="background-video">
            <source src={business_stock_video} type="video/mp4" />
          </video>
          
        <div className="overlay"/>
        <div className="hero-content">
          <h1>Welcome to StudySync</h1>
          <p>Find study buddies today!</p>
          <div id="centerBody">
            <a href="/login/" className="button-container">Login</a>
            <a href="/register/" className="button-container">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
