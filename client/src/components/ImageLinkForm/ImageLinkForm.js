import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onValidImageUrl }) => {
   return (
      <div>
         <div className="center">
            <div className="form center pa2 mv2 br3 shadow-5">
               <input className="f5 pa1 w-70" type="text" onChange={onInputChange} />
               <button
                  className="w-30 grow f4 link pv1 dib light-gray bg-light-purple"
                  onClick={onValidImageUrl}
               >
                  Detect
               </button>
            </div>
         </div>
      </div>
   );
};

export default ImageLinkForm;
