"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function SaveContactButton({ label, loading }) {
    const { pending } = useFormStatus();

    return (
        <div className="flex justify-end mt-6">
            <button
                disabled={pending}
                type="submit"
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
                {pending ? loading : label}
            </button>
        </div>
    );
}
