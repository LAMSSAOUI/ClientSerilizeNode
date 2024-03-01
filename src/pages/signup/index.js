'use client'
import { useState , useEffect } from "react";
import serialize from "node-serialize";
import Cookies from "js-cookie"; // Import the js-cookie library
import { useRouter } from 'next/navigation'


export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);

  const router = useRouter()

  const goTologin = () => {
    router.push('/login');
  };

  useEffect(() => {
    if (userData && userData.length > 0) {
      router.push('/login');
    }
  }, [userData, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Serialize the data
    const serializedData = serialize.serialize({ username, password });
    console.log(serializedData)
   
    try {
      // Send serialized data to the server
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:  serializedData 
      });

      if (response.ok) {
        // Save username and password in cookies
        Cookies.set('username', username);
        Cookies.set('password', password);

        // Handle success
        console.log('Data sent successfully');

        const jsonData = await response.json();
        setUserData(jsonData); 
        console.log('the user data from the server is ' , userData);
      } else {
        // Handle error
        console.error('Failed to send data to the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <div className="flex justify-center items-center h-screen ">
      <div className="flex max-w-2xl mx-auto shadow border-b  flex-col gap-4 w-fit p-10">
          <h2 className="text-center font-thin  text-2xl tracking-wider">Sign up</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col  gap-4">
              <label className="block text-gray-600 text-sm  font-normal ">Username:</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className=" border h-10 w-96 mt-2 p-2"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="block text-gray-600 text-sm  font-normal ">Password:</label>
              <input 
                type="text" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="border h-10 w-96 mt-2  p-2"
              />
            </div>
            <button type="submit" className=" rounded text-white font-semibold  mr-3 bg-green-400  hover:bg-green-600 px-2 py-2 w-full" onClick={goTologin}>Submit</button>
          </form>
      </div>
    </div>
  )
}