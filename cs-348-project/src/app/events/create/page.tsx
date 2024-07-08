"use client"
import { useState } from 'react';
import { ICreateEvent } from '@/app/lib/events/event';
import createEvent from '@/app/lib/events/createEvent';
import React from 'react';

const CreateEventPage = () => {
  const [formData, setFormData] = useState<ICreateEvent>({
    name: '',
    city: '',
    address: '',
    curr_capacity: 0,
    max_capacity: 100,
    // remember to replace this every time we generate new data, for testing purposes
    owner_id: '29a6cd80-abaf-4964-a787-d05e245081b4',
    category: '',
    description: '',
    start_time: new Date(),
    end_time: new Date(),
    active: true,
  });

  // State variables
  const [minEndTime, setMinEndTime] = useState(formData.start_time.toISOString().slice(0, 16));
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [eventName, setEventName] = useState(formData.name)
  const [category, setCategory] = useState(formData.category)
  const [maxCap, setMaxCap] = useState("")
  const [desc, setDesc] = useState(formData.description)

  const is_valid_input = () => {
    const {
      name,
      city, 
      address,
      curr_capacity,
      max_capacity,
      owner_id,
      category,
      description,
      start_time,
      end_time,
      active,
    } = formData;

    if (!name.trim() || !city.trim() || !address.trim() || !category.trim() || !description.trim()) {
      return false;
    }

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
  };

  const validate_details = () => { 
    var num = parseInt(maxCap)
    if (!eventName.trim() || !category.trim() || isNaN(num) || !isNaN(num) && num < 1) return false;
    else return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name;
    let value: any = e.target.value;
    if (name === 'start_time' || name === 'end_time') {
      value = new Date(value);
    }

    if (name === 'active') {
      value = value === 'true';
    }
    // Update minEndTime when start_time changes
    if (name === 'start_time') {
      setMinEndTime(new Date(value).toISOString().slice(0, 16));
    }
    setFormData({
      ...formData,
      [name]: name === 'curr_capacity' || name === 'max_capacity' ? parseInt(value) : value,
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-slate-100 p-8 rounded-lg shadow-lg w-full max-w-lg flex-row">
        <div className="w-full flex flex-col gap-y-2">
          <h1 className="font-bold text-2xl">What's your event about?</h1>
          <div className="flex flex-row justify-evenly space-x-4">
            <div className="w-full flex flex-col">
              <div className={"border border-none rounded-md h-1 " + (isFirstPage ? " bg-blue-500" : "bg-gray-300")}></div>
              <span className={(isFirstPage ? " text-blue-500" : "text-gray-300")}>Details</span>
            </div>
            <div className="w-full flex flex-col">
              <div className={"border border-none rounded-md h-1 " + (!isFirstPage ? " bg-blue-500" : "bg-gray-300")}></div>
              <span className={(!isFirstPage ? " text-blue-500" : "text-gray-300")}>Location and Time</span>
            </div>
          </div>
        </div>
        <form action={createEvent} className="space-y-2">
          { 
            // Fill event name field
          }
          <div className="w-full">
            <div>
              <label className={"block font-bold " + ((eventName.trim() === "") ? " text-red-500" : "text-gray-700")}>Event name</label>
              <input
                type="text"
                name="name"
                placeholder="Event name..."
                onChange={(event) => {setEventName(event.target.value)}}
                required
                className={"w-full p-2 border rounded mt-1 bg-gray-100 " + ((eventName.trim() === "") ? " border-red-500 border-2" : "border-gray-300")}
              />
              <p className={"text-sm text-red-500 italic " + ((eventName.trim() === "") ? "" : "hidden")}>*This field is required</p>
            </div>
            {
              // Fill event category and max cap fields
            }
            <div className="my-2 w-full flex flex-row justify-between space-x-2">
              <div>
                <label className={"block font-bold" + ((category.trim() === "") ? " text-red-500" : "text-gray-700")}>Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="Category..."
                  onChange={(event) => {setCategory(event.target.value)}}
                  required
                  className={"w-full p-2 border rounded mt-1 bg-gray-100 " + ((category.trim() === "") ? " border-red-500 border-2" : "border-gray-300")}
                />
                <p className={"text-sm text-red-500 italic " + ((category.trim() === "") ? "" : "hidden")}>*This field is required</p>
              </div>
              <div>
                <label className={"block font-bold" + ((maxCap.trim() === "") ? " text-red-500" : "text-gray-700")}>Max capacity</label>
                <input
                  type="text"
                  name="max_capacity"
                  placeholder="Capacity..."
                  onChange={(event) => {
                    var num = parseInt(event.target.value);
                    (!isNaN(num)) ? setMaxCap(event.target.value) : setMaxCap("");
                    console.log(num)
                  }}
                  required
                  className={"w-full p-2 border rounded mt-1 bg-gray-100 " + ((maxCap.trim() === "") ? " border-red-500 border-2" : "border-gray-300")}
                />
                <p className={"text-sm text-red-500 italic " + ((maxCap.trim() === "") ? "" : "hidden")}>*This field is required</p>
                <p className={"text-sm text-red-500 italic " + ((maxCap.trim() === "") ? "" : "hidden")}>*Must be a number</p>
              </div>
            </div>
            {
              // Fill event description
            }
            <div>
              <label className="block text-gray-700 font-bold">Description</label>
              <textarea
                name="description"
                placeholder='Description...'
                onChange={(event) => {setDesc(event.target.value)}}
                required
                className="w-full p-2 h-24 border border-gray-300 rounded mt-1 bg-gray-100 overflow-y-auto resize-none"
              ></textarea>
            </div>
          </div>
          <div className={"flex flex-row " + ((isFirstPage) ? "justify-end": "justify-between")} >
            <button className={"text-base bg-slate-100 text-black border border-gray-400 px-5 py-2 rounded-lg font-medium " + ((isFirstPage) ? "hidden": "")}>Back</button>
            <button onClick={ () => {
              if (validate_details()) {
                setIsFirstPage(!isFirstPage)
              }
            }} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 border-b-4 border-blue-700 hover:border-blue-500 rounded transition ease-in-out">Next</button>
          </div>
        </form>
      </div>
    </div>
    /*
    <div className="min-h-screen bg-black-100 flex items-center justify-center">
      <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-lg flex-row">
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
              value={formData.city}
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
              value={formData.address}
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
              min={minEndTime}  // Added this line
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
              {!is_valid_input() ? "FILL IT IN PROPERLY BEFORE SUBMITTING!" : "Submit Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
    */ 
  );
};

export default CreateEventPage;