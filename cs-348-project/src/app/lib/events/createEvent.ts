import {v4 as uuidv4} from 'uuid';

function createEvent(
    name: string,
    location: string,
    event_time: string,
    curr_capacity: number,
    max_capacity: number,
    owner_id: string,
    category: string,
    description: string
  ): Event {
    // Generate a random UUID for the event_id
    const event_id = uuidv4();
  
    // Create the event object
    const event: Event = {
      event_id,
      name,
      location,
      event_time,
      curr_capacity,
      max_capacity,
      owner_id,
      category,
      description,
    };
  
    return event;
  }