import React from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";
import { BsImages } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

const FileUpload = ({ handleImagesSave, images }) => {
  // 드래그 앤 드롭 이미지 여러 장 한 번에 올리기 가능
  const handleDrop = async (acceptedFiles) => {
    if (images.length + acceptedFiles.length > 10) {
      alert("이미지는 최대 10장까지 업로드 가능합니다.");
      return;
    }
    
    const newImages = [];
    for (let file of acceptedFiles) {
      let formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axiosInstance.post("/products/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        newImages.push(response.data.fileName);
      } catch (err) {
        console.error(err);
      }
    }

    handleImagesSave([...images, ...newImages]);
  };

  // 이미지 삭제 함수
  const handleDelete = (image) => {
    const updatedImages = images.filter((img) => img !== image);
    handleImagesSave(updatedImages);
  };

  return (
    <div>
      <Dropzone onDrop={handleDrop} multiple>
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
                color: "lightgray",
              }}
            />
          </div>
        )}
      </Dropzone>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {images.map((image) => (
          <div
            key={image}
            style={{
              position: "relative",
              marginTop: "10px",
              marginRight: "10px",
              border: "1px dashed gray",
              borderRadius: "5px",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <img
              src={`http://localhost:4000/${image}`}
              alt={image}
              style={{ width: "100px", height: "100px" }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트 버블링 방지
                handleDelete(image);
              }}
              style={{
                position: "absolute",
                top: "1px",
                right: "1px",
                border: "none",
                borderRadius: "50%",
                color: "white",
                cursor: "pointer",
              }}
            >
              <TiDelete size={25} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;


// import React from "react";
// import Dropzone from "react-dropzone";
// import axiosInstance from "../utils/axios";
// import { BsImages } from "react-icons/bs";
// import { TiDelete } from "react-icons/ti";

// const FileUpload = ({ onImageChange, images }) => {
//   const handleDrop = async (files) => {
//     if (images.length >= 10) {
//       alert("이미지는 최대 10장까지 업로드 가능합니다.");
//       return;
//     }
//     let formData = new FormData();

//     const config = {
//       header: { "content-type": "multipart/form-data" },
//     };

//     formData.append("file", files[0]);

//     try {
//       const response = await axiosInstance.post(
//         "/products/image",
//         formData,
//         config
//       );
//       onImageChange([...images, response.data.fileName]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 이미지 삭제
//   const handleDelete = (image) => {
//     const currentIndex = images.indexOf(image);
//     let newImages = [...images];
//     newImages.splice(currentIndex, 1);
//     onImageChange(newImages);
//   };

//   return (
//     <div>
//       <Dropzone onDrop={handleDrop}>
//         {({ getRootProps, getInputProps }) => (
//           <div
//             {...getRootProps()}
//             style={{
//               border: "1px solid lightgray",
//               padding: "10px",
//               cursor: "pointer",
//               borderRadius: "10px",
//               width: "150px",
//               height: "150px",
//               marginTop: "20px",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               position: "relative",
//             }}
//           >
//             <input {...getInputProps()} />
//             <BsImages
//               style={{
//                 width: "40%",
//                 height: "40%",
//                 color:"lightgray",
//               }}
//             />
//           </div>
//         )}
//       </Dropzone>

//       <div style={{ display: "flex", flexWrap: "wrap" }}>
//         {images.map((image) => (
//           <div className="overflow-hidden"
//             key={image}
//             onClick={() => handleDelete(image)}
//             style={{ border: "1px dashed gray", borderRadius: "5px", marginTop: "10px", marginRight: "10px", cursor: "pointer" }}
//           >
//             <img
//               src={`http://localhost:4000/${image}`}
//               alt={image}
//               style={{ width: "100px", height: "100px" }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FileUpload;