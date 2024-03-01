import React, { useState, useEffect } from 'react';

const index = () => {
  const [imageUrl, setImageUrl] = useState('');

  const [note, setNote] = useState('');

  const handleChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = () => {
    // Serialize data
    const data = { imageUrl: imageUrl, note: note };

    // Send data via fetch POST
    fetch('http://localhost:3000/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response)
      .then(data => {
        console.log('Success:', data);
        // Handle success if needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error if needed
      });
  };

  useEffect(() => {
    // Function to fetch the image from the server
    const fetchImage = async () => {
      try {
        const response = await fetch('http://localhost:3000/file');
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
    <div className='flex flex-col justify-center'>
        <div className='flex justify-center'>Make a note on this image</div>

        <div className='flex  justify-center'>
            <div className='w-96 h-40 '>
            {imageUrl && <img src={imageUrl} alt="Fetched Image" />}
            </div>
        </div>
         <input type='text' value={note} onChange={handleChange}  className='border-dotted border-red'/>
         <input 
                type="text" 
                value={note} 
                onChange={handleChange}
                className="border h-10 w-96 mt-2  p-2"
        />

        <button onClick={handleSubmit}>Envoyer</button>
    </div>
  );
};

export default index;
