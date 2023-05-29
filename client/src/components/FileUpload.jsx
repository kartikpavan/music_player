import React from "react";
import { BiUpload } from "react-icons/bi";
import { firebaseStorage } from "../config/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const FileUpload = ({ isImage, isUploading, isPresent }) => {
   const uploadFiletoFireStore = (e) => {
      isUploading(true);
      const uploadedFile = e.target.files[0];
      // reference to the storage service
      const storageRef = ref(
         firebaseStorage,
         `${isImage ? "images" : "audio"}/${Date.now()}-${uploadedFile.name}`
      );
      // Upload the file and metadata
      const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
      uploadTask.on(
         "state_changed",
         (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         },
         (error) => {
            // Handle unsuccessful uploads
            console.log(error);
            isUploading(false);
         },
         () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               isPresent(downloadURL);
               isUploading(false);
            });
         }
      );
   };

   return (
      <label>
         <div className="flex items-center justify-center h-full">
            <div className="flex flex-col justify-center items-center cursor-pointer">
               <p className="font-bold text-2xl">
                  <BiUpload className="text-textColor" />
               </p>
               <p className="text-textColor text-lg tracking-wide">
                  {isImage ? "Upload Image" : "Upload Audio"}
               </p>
            </div>
         </div>
         <input
            type="file"
            name="upload-file"
            accept={isImage ? "image/*" : "audio/*"}
            className="w-0 h-0"
            onChange={uploadFiletoFireStore}
         />
      </label>
   );
};

export default FileUpload;
