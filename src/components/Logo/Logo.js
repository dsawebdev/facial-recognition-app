import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import LogoImage from './dsa_logo.png';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt" options={{ max : 35 }} style={{ height: 200, width: 200 }} >
        <div className="Tilt-inner pa3">
          <img src={LogoImage} className="pt5 " alt="DSA Logo" />
        </div>
      </Tilt>
    </div>
  )
}

export default Logo;