import React from 'react';
import './Footer.css';

const Footer = () => {
   return (
      <footer className='footer'>
          <p className='f4 fw6 tracked-tight'>You may view the <a href="https://github.com/santiagocodes/face-recognition" className='pink hover-light-pink' target="_blank" rel="noopener noreferrer">Source Code</a> behind this project on Github.</p>
          <p className='f5 fw9 '>Made with <span className='pink'>❤</span> by <a href="https://santiagocodes.com/" className='pink hover-light-pink' target="_blank" rel="noopener noreferrer">santiagocodes</a></p>
      </footer>
   );
};

export default Footer;