'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const userUNRSVP = async (event_id: string, user_id: string) : Promise<void> => {
    const client = await getPostgresClient();
    const res = await client.query(
        `
        DELETE FROM Attending WHERE event_id = $1 AND user_id = $2;
        `,
        [event_id, user_id]
    )
    revalidatePath('/events/rsvp')
    redirect('/events/rsvp')
    return;
}

export default userUNRSVP;