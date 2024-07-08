'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import {Iuser} from '@/app/lib/users/user';

const getAttendees = async (event_id: string) : Promise<Iuser[]> => {
    const client = await getPostgresClient();
    const result = await client.query<Iuser>(
        `
        SELECT *
        FROM Attending NATURAL JOIN Users
        WHERE event_id = $1;
        `,
        [event_id]
    )
    let users_attending : Iuser[]= [...result]
    return users_attending;
}

export default getAttendees;