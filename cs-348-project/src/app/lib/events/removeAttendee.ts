'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const removeAttendee = async (event_id: string, attendee_id: string) : Promise<void> => {
    const client = await getPostgresClient();
    const res = await client.query(
        `
        DELETE FROM Attending WHERE event_id=$1 AND user_id=$2
        `,
        [event_id, attendee_id]
    )
    revalidatePath('/events/user')
    redirect('/events/user')
    return;
}

export default removeAttendee;