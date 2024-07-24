'use server'
import getPostgresClient from "@/app/lib/postgresClient";

export async function checkInAttendee(event_id: string, user_id: string) {
    const client = await getPostgresClient();
    const res = await client.query(        `
            INSERT INTO CheckIn (event_id, user_id, check_in_time)
            SELECT $1, $2, NOW()
            WHERE NOT EXISTS (
                SELECT 1 FROM CheckIn
                WHERE event_id = $1 AND user_id = $2
            )
        `,
        [event_id, user_id]
    )
    return;
}