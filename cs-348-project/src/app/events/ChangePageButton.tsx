"use client"

import { Button } from "@headlessui/react";
import { changeOffset } from "@/app/lib/events/listEventsNotAttending";

export const PrevPageButton = ({change}: {change: number}) => {
    const move_prev_page = async () => {
        await changeOffset(-change);
    }

    return (
        <Button onClick={move_prev_page}>
            <div className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors duration-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>
        </Button>

    )
}


export const NextPageButton = ({change}: {change: number}) => {
    const move_next_page = async () => {
        await changeOffset(change);
    }

    return (
        <Button onClick={move_next_page}>
            <div className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors duration-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Button>
    )
}