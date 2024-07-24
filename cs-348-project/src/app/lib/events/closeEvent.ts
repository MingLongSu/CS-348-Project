'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function closeEvent(event_id: string) {
    const client = await getPostgresClient();
    const res = await client.query(       
            `UPDATE Events
            SET active = false
            WHERE event_id = $1;`, [event_id]);     
    revalidatePath(`/events/user`);
    redirect(`/events/user`);
}
