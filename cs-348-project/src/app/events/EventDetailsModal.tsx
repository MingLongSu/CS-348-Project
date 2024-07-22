'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Iuser } from "@/app/lib/users/user";
import getAttendees from "@/app/lib/events/getAttendees";
import removeAttendee from '../lib/events/removeAttendee';

export default function EventDetailsModal({ event_id, owner_id, user_id }: { event_id: string, owner_id: string, user_id: string }) {
    let [isOpen, setIsOpen] = useState(false)
    let [attending, setAttending] = useState<Iuser[]>([])
    let [isOwner, setIsOwner] = useState(owner_id == user_id)
    let [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    let [selectedAttendee, setSelectedAttendee] = useState<Iuser | null>(null)

    async function openModal() {
        setAttending(await getAttendees(event_id))
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openDeleteConfirm(attendee: Iuser) {
        setSelectedAttendee(attendee)
        setDeleteConfirmOpen(true)
    }

    function closeDeleteConfirm() {
        setDeleteConfirmOpen(false)
        setSelectedAttendee(null)
    }

    async function handleDelete() {
        if (selectedAttendee) {
            // Implement the logic to delete the attendee from the event
            // After deletion, update the attending list
            await removeAttendee(event_id, selectedAttendee.user_id)
            setAttending(attending.filter(attendee => attendee.user_id !== selectedAttendee.user_id))
            closeDeleteConfirm()
        }
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
                        <div className="fixed inset-0 bg-black/25" />
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
                                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-gray-700">First Name</th>
                                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-gray-700">Last Name</th>
                                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-gray-700">Age</th>
                                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-gray-700">Gender</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {attending.map((attendee, index) => (
                                                        <tr key={index}
                                                            className={`text-center transition-colors duration-300 ${isOwner ? "hover:bg-red-500 cursor-pointer" : "hover:bg-gray-50"}`}
                                                            onClick={() => isOwner && openDeleteConfirm(attendee)}>
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

            {/* Delete Confirmation Dialog */}
            <Transition appear show={deleteConfirmOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeDeleteConfirm}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
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
                                        Confirm Deletion
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to remove {selectedAttendee?.first_name} {selectedAttendee?.last_name} from this event?
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={handleDelete}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v10a3 3 0 003 3h4a3 3 0 003-3V7a3 3 0 00-3-3H8zm5 0a2 2 0 11-4 0h4zm-1.293 7.707a1 1 0 010-1.414l.293-.293-.293-.293a1 1 0 011.414-1.414l.293.293.293-.293a1 1 0 011.414 1.414l-.293.293.293.293a1 1 0 01-1.414 1.414l-.293-.293-.293.293a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                            onClick={closeDeleteConfirm}
                                        >
                                            Cancel
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
