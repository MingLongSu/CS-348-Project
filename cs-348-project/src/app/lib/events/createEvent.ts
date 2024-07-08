'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import {ICreateEvent} from '@/app/lib/events/event';
import { randomUUID } from "crypto";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";


const createEvent = async (formData : ICreateEvent) : Promise<void> => {
    console.log('hello world')
    console.log(formData)
    const client = await getPostgresClient();
    const query = `
        INSERT INTO events (
            event_id,
            name,
            city, 
            address,
            start_time,
            end_time,
            curr_capacity,
            max_capacity,
            owner_id,
            category,
            description,
            active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
    `;

    const values = [
        randomUUID(),
        formData.name,
        formData.city,
        formData.address,
        formData.start_time,
        formData.end_time,
        formData.curr_capacity,
        formData.max_capacity,
        formData.owner_id,
        formData.category,
        formData.description,
        formData.active
    ];

    const res = await client.query(query, values);
    console.log(res)
    console.log('Event inserted successfully');
    revalidatePath('/events');
    redirect('/events')
}

export default createEvent;