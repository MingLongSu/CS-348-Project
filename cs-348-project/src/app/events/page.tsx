"use server"

import { IEvent } from '@/app/lib/events/event';
import listActiveEvents from '@/app/lib/events/listEvent';
import updateEventsStatus from '@/app/lib/events/updateEventStatus';
import EventDetailsModal from "@/app/events/EventDetailsModal";
import UserModal from "@/app/events/UserModal";
import Link from 'next/link';
import { cookies } from 'next/headers';
import RsvpButton from '@/app/events/RsvpButton';
import listActiveUNRSVPEDEvents from '@/app/lib/events/listEventsNotAttending';

const EventsPage = async () => {
  await updateEventsStatus();
  const userId = cookies().get("userId")?.value;
  const userName = cookies().get("userName")?.value;
  const events: IEvent[] = await listActiveUNRSVPEDEvents(userId);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto relative">
        {userId ? (
          <>
          <h1 className="text-4xl font-bold mb-8 text-center">Current Events</h1>
            <div className="absolute top-4 right-4">
              <UserModal userName={userName} />
            </div>
            <div className="absolute top-4 left-4">
              <Link legacyBehavior href="/">
                <a className="hover:bg-blue-600 transition-colors duration-300">
                  <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                  </svg>
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {events.map((event) => (
                <div
                  key={event.event_id} 
                  className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 relative"
                >
                  <RsvpButton event_id={event.event_id} user_id={userId} />
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
                      <EventDetailsModal event_id={event.event_id} owner_id={event.owner_id} user_id={userId} />
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h2 className="text-3xl font-bold mb-8">Find local events in your area</h2>
            <div className="space-x-4">
              <Link legacyBehavior href="/signup">
                <a className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300">
                  Sign Up
                </a>
              </Link>
              <Link legacyBehavior href="/login">
                <a className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300">
                  Login
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
