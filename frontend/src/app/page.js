'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    
    setTimeout(() => {
      router.push(token ? '/dashboard' : '/login');
    }, 1000);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-700">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Task Manager</h1>
        <p className="text-xl">Welcome! Redirecting...</p>
      </div>
    </div>
  );
}