import React from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

const FileUpload = ({ onImageChange, images }) => {
  const handleDrop = async (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    try {
      const response = await axiosInstance.post(
        "/articles/image",
        formData,
        config
      );
      onImageChange([...images, response.data.fileName]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    onImageChange(newImages);
  };

  return (
    <div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={{
              border: "1px solid gray",
              padding: "10px",
              cursor: "pointer",
              borderRadius: "10px",
              backgroundColor: "rgb(230, 230, 230)",
              width: "200px",
              height: "150px",
              marginTop: "20px",
            }}
          >
            <input {...getInputProps()} />
            <p>이미지를 드래그하거나 클릭하여 업로드하세요.</p>
          </div>
        )}
      </Dropzone>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <div
            key={image}
            onClick={() => handleDelete(image)}
            style={{ margin: "10px", cursor: "pointer" }}
          >
            <img
              src={`http://localhost:4000/${image}`}
              alt={image}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
