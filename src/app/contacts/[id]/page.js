"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SaveContactButton from "@/components/save";
import AlertComponent from "@/components/alert";
import FormInput from "@/components/input";

import { getContact, updateContact } from "../../../../server/actions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function ContactEditPage({ params }) {
    if (params.id.length != 24) {
        throw new Error("Page not found");
    }

    const { isAuthenticated, isLoading } = useKindeBrowserClient();
    const router = useRouter();

    const [formData, setFormData] = useState({ name: "", email: "", phoneNumber: "", address: "" });
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [isButtonLoadin, setIsButtonLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.push("/api/auth/login");
        }
    }, [isLoading]);

    useEffect(() => {
        getContact(params.id).then(response => {
            if (response.success) {
                setFormData(response.data);
            } else {
                // throw new Error(response.message);
            }
        });
    }, [params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (!formData.name) {
            setAlertType({ success: false, warning: true, error: false });
            setAlertMessage("Please fill the contact name");
            setShowAlert(true);
            return;
        }

        if (formData.name.length < 3 || formData.name.length > 25) {
            setAlertType({ success: false, warning: true, error: false });
            setAlertMessage("Please enter a valid name");
            setShowAlert(true);
            return;
        }

        if (!formData.email && !formData.phoneNumber && !formData.address) {
            setAlertType({ success: false, warning: true, error: false });
            setAlertMessage("Please fill at least one of the contact details");
            setShowAlert(true);
            return;
        }

        try {
            setIsButtonLoading(true);

            const response = await updateContact(params.id, formData);

            setIsButtonLoading(false);

            if (response.success) {
                setAlertType("success");
            } else {
                setAlertType("error");
            }

            setAlertMessage(response.message);
            setShowAlert(true);
        } catch (error) {
            setAlertType("error");
            setAlertMessage("An error occurred while updating the contact.");
            setShowAlert(true);
        }
    };

    return (
        <section className="max-w-4xl p-6 my-12 mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">Contact Details</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <FormInput label="Name" type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    <FormInput label="Phone Number" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                    <FormInput label="Address" type="text" name="address" value={formData.address} onChange={handleInputChange} />
                </div>
                <SaveContactButton label="Update Contact" loading="Updating..." isLoading={isButtonLoadin} />
                {showAlert && <AlertComponent type={alertType} message={alertMessage} setShowAlert={setShowAlert} />}
            </form>
        </section>
    );
}
