import React from "react";
import "./ImageLinkForm.css"
import "bootstrap/dist/css/bootstrap.css";

const ImageLinkForm = ({ onInputChange, onButtonClick }) => {
  return (
    <div> 
      <p className="f3 white">{"This Api will detect a face in picture. Go on and give it a try"}</p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input onChange={onInputChange} className="f4 pa2 w-70 center" type="text"/>
          <button onClick={onButtonClick} className="m-2 w-30 grow f3 link br3 ba ph3 pv2 dib white bg-purple">Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;