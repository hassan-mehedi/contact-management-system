import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Contacts() {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();

    const contacts = [
        {
            id: 1,
            name: "Mehedi",
            address: "Dhaka, Bangladesh",
            email: "mehedi@gmail.com",
            phone: "+880171XXXXXXX",
        },
        {
            id: 2,
            name: "Sakib",
            address: "Chittagong, Bangladesh",
            email: "sakib@gmail.com",
            phone: "+880171YYYYYYY",
        },
        {
            id: 3,
            name: "Rakib",
            address: "Sylhet, Bangladesh",
            email: "rakib@gmail.com",
            phone: " +880171ZZZZZZZ",
        },
        {
            id: 4,
            name: "Ashraf",
            address: "Sylhet, Bangladesh",
            email: "ashraf@gmail.com",
            phone: " +880171SSSSSSSS",
        },
    ];

    if (!isLoggedIn) {
        redirect("/api/auth/login");
    }

    return (
        <div className="overflow-x-auto p-10">
            <div className="p-2 w-full flex flex-row-reverse">
                <button className="btn btn-outline btn-success">Add New</button>
            </div>
            <table className="table table-zebra">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th className="py-6"></th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => {
                        return (
                            <tr key={contact.id}>
                                <td>{contact.id}</td>
                                <td>{contact.name}</td>
                                <td>{contact.address}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <td className="py-4 text-sm whitespace-nowrap">
                                    <div className="flex items-center gap-x-6">
                                        <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>

                                        <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
