'use client'
import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import {Iuser} from "@/app/lib/users/user";
import getAttendees from "@/app/lib/events/getAttendees";


export default function EventDetailsModal({event_id}: { event_id: string }) {
    let [isOpen, setIsOpen] = useState(false)
    let [attending, setAttending] = useState<Iuser[]>([])

    async function openModal() {
        setAttending(await getAttendees(event_id))
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }


    return (
        <>

            <button
                type="button"
                onClick={openModal}
                className="inline-block bg-green-500 text-white px-3 py-1 rounded text-sm ml-2 hover:bg-green-300">
                See Event Attendees
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Attendees
                                    </Dialog.Title>
                                    <div className="container mx-auto p-4">
                                        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Attendees List</h1>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full bg-white rounded-lg shadow-md">
                                                <thead>
                                                <tr>
                                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-gray-700">First
                                                        Name
                                                    </th>
                                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-gray-700">Last
                                                        Name
                                                    </th>
                                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-gray-700">Age</th>
                                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-gray-700">Gender</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {attending.map((attendee, index) => (
                                                    <tr key={index}
                                                        className="text-center hover:bg-gray-50 transition-colors duration-300">
                                                        <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{attendee.first_name}</td>
                                                        <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{attendee.last_name}</td>
                                                        <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{attendee.age}</td>
                                                        <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{attendee.gender}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
