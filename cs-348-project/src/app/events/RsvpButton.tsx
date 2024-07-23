"use client"
import userRSVP from '@/app/lib/events/userRSVP';

const RsvpButton = ({event_id, user_id}: { event_id: string, user_id: string}) => {
    
    async function RSVP(event_id: string, user_id:string) {
        await userRSVP(event_id, user_id)
    }

    return (
        <div className="relative">
            <button className="absolute top-0 right-0 inline-block bg-red-500 text-white px-3 py-1 rounded text-sm ml-2 hover:bg-red-300" onClick={() => RSVP(event_id, user_id)}> 
                    RSVP
            </button>
        </div>
        
    );
};

export default RsvpButton;
