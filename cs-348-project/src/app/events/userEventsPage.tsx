"use server"

import { IEvent } from '@/app/lib/events/event';
import { IUser } from '../lib/events/user';
import listUserEvents from '@/app/lib/events/listUserEvents';
import listUserDetails from '../lib/events/listUserInfo';
import EventDetailsModal from "@/app/events/EventDetailsModal";
import UserModal from "@/app/events/UserModal";
import Link from 'next/link';
import { cookies } from 'next/headers';

const UserEventsPage = async () => {
  const userId = cookies().get("userId")?.value;
  const userName = cookies().get("userName")?.value;

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 flex justify-center items-center">
        <Link legacyBehavior href="/signup">
          <a className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300">
            Sign Up Now
          </a>
        </Link>
      </div>
    );
  }

  const events: IEvent[] = await listUserEvents(userId);
  const usersInfo: IUser[] = await listUserDetails(userId);
  const userInfo = usersInfo[0]; 

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto relative">
        <h1 className="text-4xl font-bold mb-8 text-center">My Events</h1>
        <div className="absolute top-4 right-4">
          <UserModal userName={userName} />
        </div>
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-bold mb-2">{userInfo.first_name} {userInfo.last_name}</h2>
          {/* Display additional user details here */}
          <p className="text-gray-400">Age: {userInfo.age}</p>
          <p className="text-gray-400">Gender: {userInfo.gender}</p>
          <p className="text-gray-400">Strikes: {userInfo.strikes}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.event_id}
              className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl text-white font-bold mb-2">{event.name}</h3>
              <p className="text-gray-400 mb-1">{event.address}, {event.city}</p>
              <p className="text-gray-400 mb-4">
                {event.start_time.toLocaleDateString()} - {event.end_time.toLocaleDateString()}
              </p>
              <p className="text-gray-300 mb-4">{event.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-gray-400">
                  {event.curr_capacity}/{event.max_capacity} attending
                </div>
                <div>
                  <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {event.category}
                  </span>
                  <EventDetailsModal event_id={event.event_id} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link legacyBehavior href="/events/create">
          <a className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default UserEventsPage;
