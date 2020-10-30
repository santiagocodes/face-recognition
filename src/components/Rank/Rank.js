import React from 'react';

const Rank = ({ name, entries }) => {
   return (
      <div>
         <div className="white f1 pa3">{`Welcome to Face Recognition ${name}!`}</div>
         <div className="white f2 pa1">{`Your current entry count is ${entries}.`}</div>
      </div>
   );
};

export default Rank;
