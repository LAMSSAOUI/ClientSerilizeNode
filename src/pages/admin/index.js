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

      const responseData = await response.json();
      console.log('Image uploaded successfully:', responseData);
      // Handle success response as needed
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error response as needed
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col ">
          <h1 className="p-4">Admin Panel</h1>
          <div className="flex flex-col items-start gap-6">
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleSubmit}>Envoyer</button>
          </div>
          
        </div>
    </div>
    
    
  );
}

