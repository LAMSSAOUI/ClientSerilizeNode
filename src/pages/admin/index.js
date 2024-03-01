import { useState } from "react";
// export default function Admin() {
//   return (
//     <div style={{ height: '97vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <div style={{backgroundColor: '#34D399', padding: '1.9rem', color: 'white' , fontSize: '1.5rem' }}>
//          Hello to notes sharing app
//       </div>

//     </div>
//   );
// }
// export default function Admin() {
//   return (
//     <div>
//       <button >
//         create Image
//       </button> 
//        after cliking on this image load a form to upload an image for the admin user 
//       <image>
//         the image added by the admin
//       </image>   
//     </div>
//   );
// }
import React from 'react';

export default function Admin() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      console.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const responseData = await response.text(); // Assuming the server returns text
      setUploadResponse(responseData); 

      // const responseData = await response.json();
      console.log('Image uploaded successfully:', responseData);
      // Handle success response as needed
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error response as needed
    }
  };

  return (
    <div className="flex justify-center bg-[#819EF1] h-screen items-center">
      <div className="flex flex-col gap-8 h-60 w-fit bg-[#FFFFFF] rounded-sm p-9 ">
          <h1 className=" text-center font-bold  text-3xl tracking-wider ">You can upload your image </h1>
          <div className="flex flex-col justify-center  gap-8 w-full">
            <input onChange={handleImageChange} className="block w-72 mx-auto text-lg text-gray-900 border border-gray-300  rounded-lg cursor-pointer bg-[#E8E8E8] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-200 dark:placeholder-slate-50" id="large_size" type="file"/>
            <button onClick={handleSubmit} className="rounded text-white font-semibold   bg-green-400  hover:bg-green-600 w-40 px-2 py-2 mx-auto ">Envoyer</button>
          </div>
          {uploadResponse && <p className="text-center text-white">{uploadResponse}</p>} 
      </div>
    </div>
  );
}


