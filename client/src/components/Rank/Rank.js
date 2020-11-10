import React from 'react';

const Rank = ({ name, entries }) => {
   return (
      <div className="pa1">
         <p className="white f1">{`Welcome to Face Recognition ${name}!`}</p>
         <p className="white f3 mh5">{`The Web App will detect faces in your pictures. Your current picture entry count is ${entries}.`}</p>
      </div>
   );
};

export default Rank;
