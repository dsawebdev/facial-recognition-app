import React from 'react'
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div>
    <p className="f2">
        {`Instructions:`}
      </p> 
      <p className="f3">
        {`Copy the image address from any link on the web and paste it into the field below `}
      </p> 
      <div className='center'>
        <div className="pa4 br3 shadow-5 form center">
          <input 
            type="text" 
            className="f4 pa2 w-70 center" 
            onChange={onInputChange}
            placeholder="enter your image address here..."
          />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue" onClick={onPictureSubmit}>Click to Analyze</button>
        </div>
      </div>    
    </div>
  )
}


export default ImageLinkForm

