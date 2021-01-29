import React from "react";
import Tilt from "react-tilt";
import "./Logo.css"
import Brain from "./Brain.png";

const Logo = () => {
  return (
    <div className='ma4 mt0'> 
      <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: '175px', width: '175px' }} >
        <div className="Tilt-inner">
          <img className="p-2" style={{}} alt="logo" src={Brain}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;