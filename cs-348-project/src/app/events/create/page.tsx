"use client"
import { useState } from 'react';
import { ICreateEvent } from '@/app/lib/events/event';
import createEvent from '@/app/lib/events/createEvent';
import React from 'react';
import Link from 'next/link';

const CreateEventPage = () => {
  let user_id = localStorage.getItem('userId') || "29a6cd80-abaf-4964-a787-d05e245081b4";

  if (user_id == "29a6cd80-abaf-4964-a787-d05e245081b4") {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="container mx-auto relative">
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
        </div>
    </div>
    );
  }
  
  const [formData, setFormData] = useState<ICreateEvent>({
    name: '',
    city: '',
    address: '',
    curr_capacity: 0,
    max_capacity: 100,
    owner_id: user_id,
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
  const [city, setCity] = useState(formData.city)
  const [address, setAddress] = useState(formData.address)
  const [startTime, setStartTime] = useState(formData.start_time.toISOString().slice(0, 16))
  const [endTime, setEndTime] = useState(formData.end_time.toISOString().slice(0, 16))

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

  const validate_details_2 = () => { 
    // verify start time, end time, address city
    if (!city.trim() || !address.trim() || !startTime.trim() || !endTime.trim() || startTime >= endTime)
    {
      return false
    }
    else return true
  }

  const ready_data = () => { 
    setFormData(
      {
        name: eventName,
        city: city,
        address: address,
        curr_capacity: 0,
        max_capacity: isNaN(parseInt(maxCap)) ? 100 : parseInt(maxCap),
        // remember to replace this every time we generate new data, for testing purposes
        owner_id: user_id,
        category: category,
        description: desc,
        start_time: new Date(startTime),
        end_time: new Date(endTime),
        active: true,
      }
    )
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

  const render_content = () => {
    if (isFirstPage) 
    { 
      return ( 
        <div>
          <div className="absolute top-4 left-4">
            <Link legacyBehavior href="/">
              <a className="hover:bg-blue-600 transition-colors duration-300">
                <svg className="w-[35px] h-[35px] text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                </svg>
              </a>
            </Link>
          </div>
          { 
            // Fill event name field
          }
          <div className="w-full">
            <div>
              <label className={"block font-bold " + ((eventName.trim() === "") ? " text-red-500" : "text-gray-700")}>Event name</label>
              <input
                type="text"
                name="name"
                value={eventName}
                placeholder="Event name..."
                onChange={(event) => {
                  setEventName(event.target.value);
                  ready_data();
                }}
                required
                className={"w-full p-2 border rounded mt-1 bg-gray-100 " + ((eventName.trim() === "") ? " border-red-500 border-2" : "border-gray-300")}
                style={{ color:"black" }}
              />
              <p className={"text-sm text-red-500 italic " + ((eventName.trim() === "") ? "" : "hidden")}>*This field is required</p>
            </div>
            {
              // Fill event category and max cap fields
            }
            <div className="my-2 w-full flex flex-row justify-between space-x-2">
              <div>
                <label className={"block font-bold " + ((category.trim() === "") ? " text-red-500" : "text-gray-700")}>Category</label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  placeholder="Category..."
                  onChange={(event) => {
                    setCategory(event.target.value);
                    ready_data();
                  }}
                  required
                  className={"w-full p-2 border rounded mt-1 bg-gray-100 " + ((category.trim() === "") ? " border-red-500 border-2" : "border-gray-300")}
                  style={{ color:"black" }}
                />
                <p className={"text-sm text-red-500 italic " + ((category.trim() === "") ? "" : "hidden")}>*This field is required</p>
              </div>
              <div>
                <label className={"block font-bold " + ((maxCap.trim() === "") ? " text-red-500" : "text-gray-700")}>Max capacity</label>
                <input
                  type="text"
                  name="max_capacity"
                  value={maxCap}
                  placeholder="Capacity..."
                  onChange={(event) => {
                    var num = parseInt(event.target.value);
                    (!isNaN(num)) ? setMaxCap(event.target.value) : setMaxCap("");
                    ready_data();
                  }}
                  required
                  className={"w-full p-2 border rounded mt-1 bg-gray-100 " + ((maxCap.trim() === "") ? " border-red-500 border-2" : "border-gray-300")}
                  style={{ color:"black" }}
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
                value={desc}
                onChange={(event) => {
                  setDesc(event.target.value)
                  ready_data();
                }}
                required
                className="w-full p-2 h-24 border border-gray-300 rounded mt-1 bg-gray-100 overflow-y-auto resize-none"
                style={{ color:"black" }}
              ></textarea>
            </div>
          </div>
        </div>
      )
    }
    else 
    {
      return (
        <div>
          <div className="absolute top-4 left-4">
            <Link legacyBehavior href="/">
              <a className="hover:bg-blue-600 transition-colors duration-300">
                <svg className="w-[35px] h-[35px] text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                </svg>
              </a>
            </Link>
          </div>
          {
            // Fill event address and city
          }
          <div className="my-2 w-full flex flex-row justify-between space-x-2">
            <div>
              <label className={"block font-bold " + ((address.trim() === "") ? " text-red-500" : "text-gray-700")}>Address</label>
              <input
                type="text"
                name="address"
                value={address}
                placeholder="Address..."
                onChange={(event) => {
                  setAddress(event.target.value);
                  ready_data();
                }}
                required
                className={"w-full p-2 border rounded mt-1 bg-gray-100 " + ((address.trim() === "") ? " border-red-500 border-2" : "border-gray-300")}
                style={{ color:"black" }}
               />
              <p className={"text-sm text-red-500 italic " + ((address.trim() === "") ? "" : "hidden")}>*This field is required</p>
            </div>
            <div>
                <label className={"block font-bold" + ((city.trim() === "") ? " text-red-500" : "text-gray-700")}>City</label>
                <input
                  type="text"
                  name="max_capacity"
                  value={city}
                  placeholder="City..."
                  onChange={(event) => {
                    setCity(event.target.value);
                    ready_data();
                  }}
                  required
                  className={"w-full p-2 border rounded mt-1 bg-gray-100 " + ((city.trim() === "") ? " border-red-500 border-2" : "border-gray-300")}
                  style={{ color:"black" }}
                />
                <p className={"text-sm text-red-500 italic " + ((city.trim() === "") ? "" : "hidden")}>*This field is required</p>
              </div>
            </div>
          {
            // Fill event start time and end time
          }
          <div className="my-2 w-full flex flex-col justify-between space-y-2">
            <div>
              <label className="block text-black">Start Time</label>
              <input
                type="datetime-local"
                name="start_time"
                value={startTime}
                onChange={ (event) => { 
                  // Update minEndTime when start_time changes
                  setMinEndTime(new Date(event.target.value).toISOString().slice(0, 16));
                  setStartTime(new Date(event.target.value).toISOString().slice(0, 16))
                  ready_data();
                }}
                required
                className={"w-full p-2 border border-gray-300 rounded mt-1 bg-gray-100" + ((startTime === endTime) ? " border-red-500 border-2" : " border-gray-300")}
                style={{ color:"black" }}
              />
            </div>
            <div>
              <label className="block text-black">End Time</label>
              <input
                type="datetime-local"
                name="end_time"
                value={endTime}
                min={minEndTime} 
                onChange={ (event) => {
                  setEndTime(new Date(event.target.value).toISOString().slice(0, 16))
                  ready_data();
                }}
                required
                className={"w-full p-2 border border-gray-300 rounded mt-1 bg-gray-100" + ((startTime === endTime) ? " border-red-500 border-2" : " border-gray-300")}
                style={{ color:"black" }}
              />
            </div>
            <p className={"text-sm text-red-500 italic " + ((startTime === endTime) ? "" : "hidden")}>*Cannot start and end at exact same time</p>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-slate-100 p-8 rounded-lg shadow-lg w-full max-w-lg flex-row">
        <div className="w-full flex flex-col gap-y-2">
          <h1 className="font-bold text-2xl text-black">What's your event about?</h1>
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
        <form className="space-y-2" method='post'>
          {
            render_content()
          }
          <div className={"w-full flex flex-row mt-4 " + ((isFirstPage) ? "justify-end": "justify-between")}>
            <button onClick={ () => {
              setIsFirstPage(!isFirstPage)
            }} type='button' className={"hover:bg-slate-200 text-black font-bold py-2 px-6 border-b-4 border-gray-200 hover:border-gray-300 rounded transition ease-in-out " + ((isFirstPage) ? "hidden": "")}>Back</button>
            <button type={ (isFirstPage ? "button" : "button") } onClick={ async () => {
              if (isFirstPage && validate_details()) 
              {
                setIsFirstPage(!isFirstPage)
              }
              else if (!isFirstPage && validate_details() && validate_details_2())
              {
                console.log(validate_details_2())
                // Set the form data to the fields supplied
                console.log(formData);
                await createEvent(formData);
              }
            }} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 border-b-4 border-blue-700 hover:border-blue-500 rounded transition ease-in-out " >{isFirstPage ? "Next" : "Submit" }</button>
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