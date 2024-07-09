"use server"

import {IEvent} from '@/app/lib/events/event';
import listActiveEvents from '@/app/lib/events/listEvent';
import updateEventsStatus from '@/app/lib/events/updateEventStatus';
import EventDetailsModal from "@/app/events/EventDetailsModal";
import Link from 'next/link';

const EventsPage = async () => {
  await updateEventsStatus();
  const events : IEvent[] = await listActiveEvents();
  return (
    <div className="container mx-auto p-4 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event.event_id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
              <h3 className="text-xl text-gray-600 font-bold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-1">{event.address}, {event.city}</p>
              <p className="text-gray-600 mb-4">
                {event.start_time.toLocaleDateString()} - {event.end_time.toLocaleDateString()}
              </p>
              <p className="text-gray-800 mb-4">{event.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-gray-600">
                  {event.curr_capacity}/{event.max_capacity} attending
                </div>
                <div>
                  <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {event.category}
                  </span>
                  <EventDetailsModal event_id={event.event_id}/>
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
  );
};

export default EventsPage;
