import React,{useState, createRef} from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

import { Button,Row,Col } from "reactstrap";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

function ImageUpload(props) {
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    props.avatar ? defaultAvatar : defaultImage
  );
  const fileInput = createRef();
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  // const handleSubmit = e => {
  // e.preventDefault();
  // this.state.file is the file/image uploaded
  // in this function you can save the image (this.state.file) on form submit
  // you have to call it yourself
  // };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };
  return (
    <div className="fileinput">
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <Row>
	  	  <Col>
	  	  {file === null ? (
          <Button className="pt-0 pb-0" color="default" outline size="sm" onClick={handleClick}>
            Add Image
          </Button>) : (
          <Button className="pt-0 pb-0" color="danger" outline size="sm" onClick={handleRemove}>
	          Remove
          </Button>)}
		    </Col>
      	<Col className="thumbnail">
      	  <img src={imagePreviewUrl} alt="..." style={{width:'40px',borderRadius:'unset'}}/>
        </Col>
      </Row>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
};

export default ImageUpload;
