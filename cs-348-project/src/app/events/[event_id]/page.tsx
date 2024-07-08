'use server'

import getAttendees from '@/app/lib/events/getAttendees';
import { useParams } from 'next/navigation'
import {Iuser} from '@/app/lib/users/user';

 
const EventDetailsPage = async ({params}) => {
    const attending : Iuser[] = await getAttendees(params.event_id);
    console.log(attending);
    return (
<div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Attendees List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-gray-700">First Name</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-gray-700">Last Name</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-gray-700">Age</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-gray-700">Gender</th>
            </tr>
          </thead>
          <tbody>
            {attending.map((attendee, index) => (
              <tr key={index} className="text-center hover:bg-gray-50 transition-colors duration-300">
                <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{attendee.first_name}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{attendee.last_name}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{attendee.age}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{attendee.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
}

export default EventDetailsPage;