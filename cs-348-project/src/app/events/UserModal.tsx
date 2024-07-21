"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const UserModal = ({userName}: { userName: string }) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
        // Clear cookies
        document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.clear();
        router.push('/');
    };

  return (
    <div className="relative">
      <button onClick={toggleModal} className="focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A4.002 4.002 0 018 16h8a4.002 4.002 0 012.879 1.804M15 12a3 3 0 10-6 0 3 3 0 006 0zM4 6a4 4 0 118 0 4 4 0 01-8 0zM2 20a10 10 0 0120 0H2z" />
        </svg>
      </button>
      {isModalOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 text-gray-900 z-50">
          <p className="font-bold">Hello, {userName}</p>
          <button onClick={handleLogout} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserModal;
