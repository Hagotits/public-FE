import React from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";
import { BsImages } from "react-icons/bs";

const FileUpload = ({ onImageChange, images }) => {
  const handleDrop = async (files) => {
    if (images.length >= 10) {
      alert("이미지는 최대 10장까지 업로드 가능합니다.");
      return;
    }
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    try {
      const response = await axiosInstance.post(
        "/products/image",
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
              border: "1px solid lightgray",
              padding: "10px",
              cursor: "pointer",
              borderRadius: "10px",
              width: "150px",
              height: "150px",
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <input {...getInputProps()} />
            <BsImages
              style={{
                width: "40%",
                height: "40%",
                color:"lightgray",
              }}
            />
          </div>
        )}
      </Dropzone>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <div className="overflow-hidden"
            key={image}
            onClick={() => handleDelete(image)}
            style={{ border: "1px dashed gray", borderRadius: "5px", marginTop: "10px", marginRight: "10px", cursor: "pointer" }}
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
