import React from "react";
import SaveContactButton from "@/components/save";
import { createContact, isUserAuthenticated } from "../../../../server/actions";
import { redirect } from "next/navigation";

export default async function CreateContactPage() {
    const authenticated = await isUserAuthenticated();

    if (!authenticated) {
        redirect("/api/auth/login");
    }

    return (
        <section className="max-w-4xl p-6 my-12 mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">Contact Details</h2>

            <form
                action={async formData => {
                    "use server";
                    const response = await createContact(formData);
                    if (response.success) {
                        redirect("/contacts");
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
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        />
                    </div>
                </div>

                <SaveContactButton label="Save Contact" loading="Saving..." />
            </form>
        </section>
    );
}
