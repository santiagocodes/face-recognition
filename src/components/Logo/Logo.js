import React from 'react';
import Tilt from 'react-tilt';
import faceLogo from './faceLogo.png';
import './Logo.css';

const Logo = () => {
   return (
      <div className="ma4 mto">
         <Tilt
            className="Tilt br2 shadow-2"
            options={{ max: 25 }}
            style={{ height: 250, width: 250 }}
         >
            <div className="Tilt-inner pa3">
               <img
                  src={faceLogo}
                  alt="face recognition logo"
                  style={{ paddingTop: '5px' }}
               />
            </div>
         </Tilt>
      </div>
   );
};

export default Logo;
