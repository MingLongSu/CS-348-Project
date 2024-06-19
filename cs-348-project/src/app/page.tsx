'use client'
import { useRouter } from 'next/navigation';
import './page.css';

export default function Home() {
  const router = useRouter();

  const handleViewEvents = () => {
    router.push('/events');
  };

  const handleCreateEvent = () => {
    router.push('/events/create');
  };

  return (
    <div className='centeredContainer'>
      <p className='centeredText'>
        WELCOME TO eVENT.io
      </p>
      <div className='functionButtons'>
        <button 
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={handleViewEvents}
        >
          View Events
        </button>
        <button 
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" 
          onClick={handleCreateEvent}
        >
          Create Event
        </button>
      </div>
    </div>
  );
}
