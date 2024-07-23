"use server"

import { revalidatePath } from "next/cache"

export const revalidateEvents = () => {
    revalidatePath("/events")
    
}