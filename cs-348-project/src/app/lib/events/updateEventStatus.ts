'use server'
import getPostgresClient from "@/app/lib/postgresClient";

const updateEventsStatus = async (): Promise<void> => {
    const client = await getPostgresClient();
    const query = `
      UPDATE events
      SET active = false
      WHERE active = TRUE AND end_time < NOW();
    `;
  
    try {
      await client.query(query);
      console.log('Event statuses updated successfully');
    } catch (error) {
      console.error('Error updating event statuses:', error);
    } 
  };
  
  export default updateEventsStatus;


