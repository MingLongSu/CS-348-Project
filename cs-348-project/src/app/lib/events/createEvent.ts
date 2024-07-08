'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import {ICreateEvent} from '@/app/lib/events/event';
import { randomUUID } from "crypto";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";


const createEvent = async (formData : FormData) : Promise<void> => {

    const client = await getPostgresClient();
    const query = `
    INSERT INTO events (
        event_id,
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
        active
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
    );
`;

const values = [
    randomUUID(),
    formData.get('name'),
    formData.get('city'),
    formData.get('address'),
    formData.get('curr_capacity'),
    formData.get('max_capacity'),
    formData.get('owner_id'),
    formData.get('category'),
    formData.get('description'),
    new Date(formData.get('start_time') as string),
    new Date(formData.get('end_time') as string),
    formData.get('active')
];

  await client.query(query, values);
  console.log('Event inserted successfully');
  revalidatePath('/events');
  redirect('/events')
}

export default createEvent;