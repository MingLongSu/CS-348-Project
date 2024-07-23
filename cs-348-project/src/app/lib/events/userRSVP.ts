'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const userRSVP = async (event_id: string, user_id: string) : Promise<void> => {
    const client = await getPostgresClient();
    const res = await client.query(
        `
        INSERT INTO Attending (event_id, user_id)
        VALUES ($1, $2);
        `,
        [event_id, user_id]
    )
    revalidatePath('/events')
    redirect('/events')
    return;
}

export default userRSVP;