import React from "react";

export default function FormInput({ label, type, name, value, onChange }) {
    return (
        <div>
            <label className="text-gray-700" htmlFor={name}>
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
        </div>
    );
}
