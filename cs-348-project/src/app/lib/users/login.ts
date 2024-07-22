'use server'
import getPostgresClient from "@/app/lib/postgresClient";
import { ILogin, Iuser } from '@/app/lib/users/user';
import { cookies } from "next/headers";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const tryLogin = async (formData : ILogin) : Promise<Iuser[]> => {
    const client = await getPostgresClient();
    const query = `
        SELECT first_name, last_name, age, gender, strikes, u.user_id 
        FROM Credentials c, Users u
        WHERE c.username=$1 AND c.password=$2 AND u.user_id=c.user_id
        LIMIT 1;
    `;

    const values = [
        formData.username,
        formData.password
    ];

    const res = await client.query(query, values);
    const user: Iuser[] = [...res];
    if (user.length == 1) {
        cookies().set("userId", user[0].user_id);
        cookies().set("userName", user[0].first_name);
    }
    return user;
}

export default tryLogin;