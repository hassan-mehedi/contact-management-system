"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import CMSLogo from "@/../public/cms-logo.png";
import DeafultAvatar from "@/../public/default-avatar.jpg";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function NavBar() {
    const { isAuthenticated, user } = useKindeBrowserClient();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="relative bg-white shadow">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <Link onClick={handleMenu} href="/">
                            <Image src={CMSLogo} alt="CMS Logo" width="50" height="50" />
                        </Link>

                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                                aria-label="toggle menu"
                                onClick={handleMenu}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`w-6 h-6 ${!isMenuOpen && "hidden"}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`w-6 h-6 ${isMenuOpen && "hidden"}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div
                        className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
                            isMenuOpen && "hidden"
                        }`}
                    >
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                            <Link
                                onClick={handleMenu}
                                href="/"
                                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100"
                            >
                                Home
                            </Link>
                            <a
                                href="https://github.com/hassan-mehedi/contact-management-system"
                                target="_blank"
                                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100"
                            >
                                About Us
                            </a>
                            {isAuthenticated && (
                                <>
                                    <Link
                                        onClick={handleMenu}
                                        href="/contacts"
                                        className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100"
                                    >
                                        Contacts
                                    </Link>

                                    <LogoutLink className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100">
                                        Log out
                                    </LogoutLink>
                                </>
                            )}
                        </div>

                        {isAuthenticated && (
                            <div className="flex items-center mt-4 lg:mt-0">
                                <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                    <div className="w-12 h-12 overflow-hidden border-2 border-gray-400 rounded-full">
                                        <Image src={user.picture || DeafultAvatar} width={120} height={120} className="object-cover" alt="avatar" />
                                    </div>

                                    <h3 className="mx-2 text-gray-700 lg:hidden">{user.given_name}</h3>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
