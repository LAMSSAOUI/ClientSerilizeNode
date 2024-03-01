"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // Redirect to /login
  }, []);

  return null; // You can return null as there's no content to render in this page
}

export default Page;


