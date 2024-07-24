'use server'
import getPostgresClient from "@/app/lib/postgresClient";
const checkBanList = async (user_id : string) : Promise<boolean> => {
    const client = await getPostgresClient();
    const result = await client.query<String>("select * from banlist")
    let bannedUsers : String[]= [...result]
    bannedUsers = bannedUsers.map(obj => obj.user_id)
    return bannedUsers.includes(user_id);
}

export default checkBanList;