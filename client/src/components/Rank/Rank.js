import React from 'react';

const Rank = ({ name, entries, imageUrl }) => {
   return (
      <div className="pa1">
         {imageUrl === '' ? ( 
            <div>
               <p className="white f1">{`Welcome to Face Recognition ${name}!`}</p>
               <p className="white f3 mh6">{`The Web App will detect the faces of the pictures you submit. Your current picture entry count is ${entries}.`}</p>
            </div>
         ) : (
            <p className="white f3 mh6">{`${name}, your current picture entry count is ${entries}.`}</p>
         )}
      </div> 
         )
};

export default Rank;
