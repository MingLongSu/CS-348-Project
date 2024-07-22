'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import { ICreateUser } from '@/app/lib/users/user';
import { cookies } from "next/headers";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const createUser = async (formData : ICreateUser) : Promise<void> => {
    console.log(formData);
    const client = await getPostgresClient();
    const user_query = `
        INSERT INTO users (
            user_id,
            first_name,
            last_name, 
            age,
            gender,
            strikes
        ) VALUES ($1, $2, $3, $4, $5, $6);
    `;

    const user_values = [
        formData.user_id,
        formData.first_name,
        formData.last_name,
        formData.age,
        formData.gender,
        formData.strikes
    ];

    const res = await client.query(user_query, user_values);
    
    const credential_query  = `
    INSERT INTO credentials (
       username,
       password,
       user_id
    ) VALUES ($1, $2, $3);
    `;
    const credential_values = [
        formData.username,
        formData.password,
        formData.user_id,
    ];
    const res2 = await client.query(credential_query, credential_values);

    console.log(res)
    console.log(res2)

    console.log('User inserted successfully');
    cookies().set("userId", formData.user_id);
    cookies().set("userName", formData.first_name);
    revalidatePath('/events');
    redirect('/events')
}

export default createUser;