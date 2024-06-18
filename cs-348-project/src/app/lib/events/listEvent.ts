'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import { IEvent } from "./event";

const listActiveEvents = async () : Promise<IEvent[]> => {
    const client = await getPostgresClient();
    const result = await client.query<Event>(
        "select * from events where active=True"
    )
    let events : Event[]= [...result]
    return events;
}

export default listActiveEvents;