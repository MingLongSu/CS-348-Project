'use server'
import getPostgresClient from "@/app/lib/postgresClient";

const removeAttendee = async (event_id: string, attendee_id: string) : Promise<void> => {
    const client = await getPostgresClient();
    const res = await client.query(
        `
        DELETE FROM Attending WHERE event_id=$1 AND user_id=$2
        `,
        [event_id, attendee_id]
    )

    return;
}

export default removeAttendee;