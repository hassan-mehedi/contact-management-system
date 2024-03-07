"use client";

import React from "react";

export default function SaveContactButton({ label, loading, isLoading }) {
    return (
        <div className="flex justify-end mt-6">
            <button
                disabled={isLoading}
                type="submit"
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
                {isLoading ? loading : label}
            </button>
        </div>
    );
}
