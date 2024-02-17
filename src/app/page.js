'use client'
import { useState } from "react";
import serialize from "node-serialize"; // Make sure to install node-serialize package

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // {
    //   "username": "_$$ND_FUNC$$_function(){ return 'Hello'; }()",
    //   "gender": "Male",
    //   "Age": 40
    // };

    // Serialize the data
    const serializedData = serialize.serialize({ username, password });

    console.log(serializedData)

    try {
      // Send serialized data to the server
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: serializedData })

      });
      // body: JSON.stringify({ data: serializedData })

      if (response.ok) {
        // Handle success
        console.log('Data sent successfully');
      } else {
        // Handle error
        console.error('Failed to send data to the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Generate Credentials</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-4">
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="border-2"
          />
        </div>
        <div className="flex flex-row gap-4">
          <label>Password:</label>
          <input 
            type="text" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="border-2"
          />
        </div>
        <button type="submit">Generate New Credentials</button>
      </form>
    </div>
  )
}

