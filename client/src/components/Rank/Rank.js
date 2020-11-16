import React from 'react';

const Rank = ({ name, entries, imageUrl }) => {
   return (
      <div className="pa1">
         {imageUrl === '' ? ( 
            <div>
               <p className="white f1">Welcome to Face Recognition <span className="ttc">{`${name}!`}</span></p>
               <p className="white f3">{`The Web App will detect the faces of the pictures you submit. Your picture entry count is currently ${entries}.`}</p>
            </div>
         ) : (
            <p className="white f3 ma0"><span className="ttc">{`${name}`}</span>, your picture entry count is currently <span>{`${entries}.`}</span></p>
         )}
      </div> 
         )
};

export default Rank;
