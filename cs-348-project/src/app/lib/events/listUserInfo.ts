'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import { IUser } from "./user";

const listUserDetails = async (user_id : String) : Promise<IUser[]> => {
    const client = await getPostgresClient();
    const result = await client.query<Event>(
        "select * from users where user_id=$1", [user_id]
    )
    let events : Event[]= [...result]
    return events;
}

export default listUserDetails;