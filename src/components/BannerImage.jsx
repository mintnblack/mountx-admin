import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants/applicationConstants";
import imageCompression from "browser-image-compression";
import Design from "./BannerImage.module.css";
import bannerPlaceholder from "../images/bannerPlaceholder.jpeg";
import addPhoto from "../images/addPhoto.svg";

export default function BannerImage(props) {
  const { existingImage, onImageSelected } = props;
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef(null);
  const placeholder= existingImage ? existingImage : bannerPlaceholder;

  // const onUploadImageToServer = (image) => {
  //   axios
  //     .post(`${BASE_URL}/upload/file`, 
  //     {file : image},
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //     )
  //     .then((response) => {
  //       if (response.status === 200) {
  //         onImageSelected(response.data.url);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleImageUpload = async () => {
  //   const options = {
  //     maxSizeMB: 0.2,
  //     maxWidthOrHeight: 1920,
  //     useWebWorker: true,
  //   };
  //   try {
  //     const compressedFile = await imageCompression(image, options);
  //     onUploadImageToServer(compressedFile);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (image) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       console.log("base64")
  //       console.log(reader.result)
  //       setPreview(reader.result);
  //     };
  //     reader.readAsDataURL(image);
  //     handleImageUpload();
  //   } else {
  //     setPreview(null);
  //   }
  // }, [image]);

  useEffect(() => {
    if(image){
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        console.log("base64Data : ",base64Data)
        setPreview(base64Data);
        onImageSelected(base64Data)
      };
      reader.readAsDataURL(image);
    }
  }, [image])
  

  return (
    <div className={Design.editPhoto}>
      <div className={Design.uploadedImageSection}>
        <div className={Design.uploadImage}>
          <img src={preview ? preview : placeholder} alt="banner" />
        </div>

        <div
          className={Design.photoEditBtn}
          onClick={(event) => {
            event.preventDefault();
            fileInputRef.current.click();
          }}
        >
          <img src={addPhoto} alt="addPhoto" />
          <p className={Design.addPhotoText}>Place Image</p>
        </div>
      </div>
      <input
        required
        accept=".png, .jpg, .jpeg"
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(event) => {
          const file = event.target.files[0];
          if (file) {
            setImage(file);
          } else {
            setImage(null);
          }
        }}
      />
    </div>
  );
}
