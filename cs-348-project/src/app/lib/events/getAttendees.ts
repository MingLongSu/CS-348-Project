"use server";
import getPostgresClient from "@/app/lib/postgresClient";
import { IAttendee, Iuser } from "@/app/lib/users/user";

const getAttendees = async (event_id: string): Promise<IAttendee[]> => {
  const client = await getPostgresClient();
  const result = await client.query<IAttendee>(    `
        SELECT *, 
            EXISTS 
            (SELECT *
            FROM checkin c
            WHERE c.user_id = Attending.user_id 
            AND c.event_id = Attending.event_id) 
            AS is_checked_in
        FROM Attending NATURAL JOIN Users 
        WHERE event_id = $1;
        `,
    [event_id]
  );
  let users_attending: IAttendee[] = [...result];
  return users_attending;
};

export default getAttendees;
