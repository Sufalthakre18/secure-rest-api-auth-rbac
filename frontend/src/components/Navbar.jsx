'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-white text-2xl font-bold">Task Manager</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}