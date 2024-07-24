'use client';

import { closeEvent } from "../lib/events/closeEvent";

export default function CloseEventButton({event_id}: {event_id: string}) {
    return (
        <button 
            onClick={() => closeEvent(event_id)}
            className="inline-block bg-red-500 text-white px-3 py-1 rounded text-sm ml-2"
        >
            Close Event
        </button>
    );
}