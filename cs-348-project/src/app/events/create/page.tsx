"use client"
import { useState } from 'react';
import {ICreateEvent} from '@/app/lib/events/event';
import createEvent from '@/app/lib/events/createEvent';

import React from 'react';


const CreateEventPage = () => {
  const [formData, setFormData] = useState<ICreateEvent>({
    name: '',
    location: '',
    curr_capacity: 0,
    max_capacity: 100,
    owner_id: '1f15f8cf-96b9-42b9-82fb-f370015017bb',
    category: '',
    description: '',
    start_time: new Date(),
    end_time: new Date(),
    active: false,
  });


  const is_valid_input = () => {
    const {
      name,
      location,
      curr_capacity,
      max_capacity,
      owner_id,
      category,
      description,
      start_time,
      end_time,
      active
    } = formData;
  
    // Check for non-empty required fields
    if (!name.trim() || !location.trim() || !category.trim() || !description.trim()) {
      return false;
    }
  
    // Check for a valid owner ID (UUID format - simple check)
    if (!owner_id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      return false;
    }
  

    if (curr_capacity < 0 || curr_capacity > max_capacity) {
      return false;
    }
  

    if (max_capacity < 1 || max_capacity > 1000) {
      return false;
    }
  

    if (!(start_time instanceof Date) || !(end_time instanceof Date) || start_time >= end_time) {
      return false;
    }
  

    if (typeof active !== 'boolean') {
      return false;
    }
  
    return true; 
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name;
    let value : any = e.target.value;
    if(name == "start_time" || name == "end_time"){
        value = new Date(value);
    }
    setFormData({
      ...formData,
      [name]: name === 'curr_capacity' || name === 'max_capacity' ? parseInt(value) : value,
    });
  };

  return (
    <div className="min-h-screen bg-black-100 flex items-center justify-center">
      <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Event</h1>
        <form action={createEvent} className="space-y-4">
          <div>
            <label className="block text-gray-700">Event Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-black"
            />
          </div>
          <div>
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-black"
            />
          </div>
          <div>
            <label className="block text-gray-700">Current Capacity</label>
            <input
              type="number"
              name="curr_capacity"
              value={formData.curr_capacity}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-black"
            />
          </div>
          <div>
            <label className="block text-gray-700">Max Capacity</label>
            <input
              type="number"
              name="max_capacity"
              value={formData.max_capacity}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-black"
            />
          </div>
          <div>
            <label className="block text-gray-700">Owner ID</label>
            <input
              type="text"
              name="owner_id"
              value={formData.owner_id}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-black"
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-black"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-black"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Start Time</label>
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time.toISOString().slice(0, 16)}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-black"
            />
          </div>
          <div>
            <label className="block text-gray-700">End Time</label>
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time.toISOString().slice(0, 16)}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-black"
            />
          </div>
          <div>
            <label className="block text-gray-700">Active</label>
            <select
              name="active"
              value={formData.active ? 'true' : 'false'}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-black"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-red-500" disabled={!is_valid_input()}>
              {!is_valid_input()? "FILL IT IN PROPERLY BEFORE SUBMITTING!" : "Submit Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
