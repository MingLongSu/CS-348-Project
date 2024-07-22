'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import { IEvent } from "./event";

const listUserEvents = async (user_id : String) : Promise<IEvent[]> => {
    const client = await getPostgresClient();
    const result = await client.query<Event>(
        "select * from events where active=True and owner_id=$1", [user_id]
    )
    let events : Event[]= [...result]
    return events;
}

export default listUserEvents;