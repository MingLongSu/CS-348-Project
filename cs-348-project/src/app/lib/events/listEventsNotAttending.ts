'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import { IEvent } from "./event";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

let offset = 0;
export const changeOffset = async (offset_change: number) => {
    offset = Math.max(0, offset + offset_change);
    console.log(offset);
    revalidatePath('/events');
    redirect('/events');
}

export const listActiveUNRSVPEDEvents = async (user_id: string, query: string) : Promise<IEvent[]> => {
    const client = await getPostgresClient();
    const result = await client.query<Event>(
        `SELECT e.event_id, e.name, e.address, e.city, e.start_time, e.end_time, e.curr_capacity, e.max_capacity, e.category, e.description, e.active 
        FROM Events e 
        LEFT JOIN Attending a ON e.event_id = a.event_id AND a.user_id = $1
        WHERE a.user_id IS NULL AND e.active = true AND (e.name=$3 OR $3 = '')
        ORDER BY e.event_id
        LIMIT 6
        OFFSET $2;
        `,
        [user_id, offset, query]
    )
    let events : Event[]= [...result]
    return events;
}
