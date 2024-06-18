"use server"

import { useEffect, useState } from 'react';
import {IEvent} from '@/app/lib/events/event';
import listActiveEvents from '@/app/lib/events/listEvent';

const EventsPage = async () => {
  const events : IEvent[] = await listActiveEvents();
  console.log(events.length)
  return (
    <div className="container mx-auto p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {events.map((event) => (
        <div
          key={event.event_id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <h3 className="text-xl text-gray-600 font-bold mb-2">{event.name}</h3>
          <p className="text-gray-600 mb-1">{event.location}</p>
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
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default EventsPage;