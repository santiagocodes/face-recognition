import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
   return (
      <div>
         <div className="center">
            <div className="form center pa3 mv2 br3 shadow-5">
               <input className="f4 pa2 w-70" type="text" onChange={onInputChange} />
               <button
                  className="w-20 grow f4 link ph3 pv2 dib light-gray bg-light-purple"
                  onClick={onPictureSubmit}
               >
                  Detect
               </button>
            </div>
         </div>
      </div>
   );
};

export default ImageLinkForm;
