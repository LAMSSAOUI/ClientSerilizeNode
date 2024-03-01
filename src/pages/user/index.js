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
    <div className='flex flex-col justify-center items-center bg-[#E8E8E8] h-screen '>
      <div className='bg-[#819EF1] flex flex-col gap-10 w-fit rounded p-11'>
        <div>
          <div className='flex justify-start text-start font-bold  text-2xl tracking-wider'>Make a note on this image</div>
          <div>Access has been requested</div>
        </div>
          
          <div className='flex flex-col items-center gap-10'>
              <div className='flex justify-center flex-col'>
                  {/* <div className='w-96 h-40 '> */}
                    
                  <img className="h-auto max-w-sm rounded-lg " src={imageUrl} alt="image description"/>
                  <div className='text-center p-4 border-2 rounded-lg border-t-0'>Confirmed by the Admin for your notes</div>

                  {/* {imageUrl && <img src={imageUrl} alt="Fetched Image"  className='rounded'/>} */}
                  {/* </div> */}
              </div>
              {/* <div className='flex flex-col justify-start w-full'> */}
              <div className='w-full'>
                  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Note</label>
                  <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={note} onChange={handleChange} placeholder="Write your thoughts here..."></textarea>
              </div>
                
              {/* </div> */}
              

              {/* <input 
                      type="text" 
                      value={note} 
                      onChange={handleChange}
                      className="border h-10 w-96 mt-2  p-2 "
              /> */}
              </div>
                
              <button onClick={handleSubmit}>Envoyer</button>
      </div>
    </div>
  );
};

export default index;
