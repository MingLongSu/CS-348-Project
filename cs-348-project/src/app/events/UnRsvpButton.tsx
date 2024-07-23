"use client"
import userUNRSVP from '@/app/lib/events/userUnRsvp';

const UnRsvpButton = ({event_id, user_id}: { event_id: string, user_id: string}) => {

    async function UNRSVP(event_id: string, user_id:string) {
        await userUNRSVP(event_id, user_id)
    }

    return (
        <div className="relative">
           <button className="absolute top-0 right-0 inline-block bg-orange-500 text-white px-3 py-1 rounded text-sm ml-2 hover:bg-orange-300" onClick={() => UNRSVP(event_id, user_id)}> 
                    UN-RSVP
            </button>
        </div>
        
    );
};

export default UnRsvpButton;