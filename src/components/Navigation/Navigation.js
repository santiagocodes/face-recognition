import React from 'react';
import faceLogo from './Media/faceLogo.png';

const Navigation = ({ onRouteChange, isSignedIn }) => {
   if (isSignedIn) {
      return (
         <nav className="flex items-center justify-between">
            {/* logo */}
            <div className="f3 pa3 flex items-center">
               <img src={faceLogo} alt="face recognition logo" className="h3" />
               <p className="ttu b">Face Recognition</p>
            </div>
            {/* sign out */}
            <p
               onClick={() => onRouteChange('signout')}
               className="f3 link dim black underline pa3 pointer"
            >
               Sign Out
            </p>
         </nav>
      );
   } else {
      return (
         <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p
               onClick={() => onRouteChange('signin')}
               className="f3 link dim black underline pa3 pointer"
            >
               Sign In
            </p>
            <p
               onClick={() => onRouteChange('register')}
               className="f3 link dim black underline pa3 pointer"
            >
               Register
            </p>
         </nav>
      );
   }
};

export default Navigation;
