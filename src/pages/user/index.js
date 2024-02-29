import React, { useState, useEffect } from 'react';

const index = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Function to fetch the image from the server
    const fetchImage = async () => {
      try {
        const response = await fetch('http://localhost:3000/file/1');
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const imageData = await response.blob();
        const url = URL.createObjectURL(imageData);
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    // Call the fetchImage function when the component mounts
    fetchImage();

    // Clean up function to revoke the URL object when component unmounts
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Fetched Image" />}
    </div>
  );
};

export default index;
