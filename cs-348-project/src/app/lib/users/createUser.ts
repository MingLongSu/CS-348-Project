'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import {Iuser} from '@/app/lib/users/user';
import { cookies } from "next/headers";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const createUser = async (formData : Iuser) : Promise<void> => {
    console.log(formData);
    cookies().set("userId", formData.user_id);
    cookies().set("userName", formData.first_name);
    const client = await getPostgresClient();
    const query = `
        INSERT INTO users (
            user_id,
            first_name,
            last_name, 
            age,
            gender,
            strikes
        ) VALUES ($1, $2, $3, $4, $5, $6);
    `;

    const values = [
        formData.user_id,
        formData.first_name,
        formData.last_name,
        formData.age,
        formData.gender,
        formData.strikes
    ];

    const res = await client.query(query, values);
    console.log(res)
    console.log('User inserted successfully');
    revalidatePath('/events');
    redirect('/events')
}

export default createUser;