import React from "react";
import DropZone from "react-dropzone";
import axiosInstance from "../utils/axios";

const FileUpload = async ({ onImageChange, images }) => {
  const handleDrop = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);
  };

  try {
    const response = await axiosInstance.post(
      `/acticles/img`,
      formData,
      config
    );
    onImageChange([...images, response.data.fileName]);
  } catch (err) {
    console.error(err);
  }

  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    onImageChange(newImages);
  };

  return (
    <div>
      <DropZone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => {
          <div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>+</p>
            </div>
          </div>;
        }}
      </DropZone>

      <div>
        {images.map((image) => (
          <div key={image} onClick={() => handleDelete(image)}>
            <img src={`$${import.meta.env.SERVERL_URL}/${image}`} alt={image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
