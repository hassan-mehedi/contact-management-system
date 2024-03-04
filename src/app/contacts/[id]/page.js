"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SaveContactButton from "@/components/save";
import { getContact, updateContact } from "../../../../server/actions";

export default function ContactEditPage({ params }) {
    const router = useRouter();
    const [data, setData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
    });

    useEffect(() => {
        getContact(params.id).then(response => {
            if (response.success) {
                setData(response.data);
            }
        });
    }, [params.id]);

    const handleInputChange = event => {
        let value = event.target.value;
        setData({ ...data, [event.target.name]: value });
    };

    return (
        <section className="max-w-4xl p-6 my-12 mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">Contact Details</h2>

            <form
                action={async formData => {
                    const response = await updateContact(data.id, formData);
                    if (response.success) {
                        router.push("/contacts");
                    } else {
                        throw new Error(response.message);
                    }
                }}
            >
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            onInput={handleInputChange}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            onInput={handleInputChange}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 " htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            value={data.phoneNumber}
                            onInput={handleInputChange}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 " htmlFor="address">
                            Address
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={data.address}
                            onInput={handleInputChange}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        />
                    </div>
                </div>

                <SaveContactButton label="Update Contact" loading="Updating..." />
            </form>
        </section>
    );
}
