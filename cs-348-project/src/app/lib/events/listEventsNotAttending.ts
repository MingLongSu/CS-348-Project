'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import { IEvent } from "./event";

const listActiveUNRSVPEDEvents = async (user_id: string) : Promise<IEvent[]> => {
    const client = await getPostgresClient();
    const result = await client.query<Event>(
        `SELECT e.event_id, e.name, e.address, e.city, e.start_time, e.end_time, e.curr_capacity, e.max_capacity, e.category, e.description, e.active 
        FROM Events e 
        LEFT JOIN Attending a ON e.event_id = a.event_id AND a.user_id = $1
        WHERE a.user_id IS NULL AND e.active = true;
        `,
        [user_id]
    )
    let events : Event[]= [...result]
    return events;
}

export default listActiveUNRSVPEDEvents;