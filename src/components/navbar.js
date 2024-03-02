import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Avatar from "@/../public/avatar.jpg";

export default async function NavBar() {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();

    return (
        <div className="navbar bg-base-100 sticky shadow-lg">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {isLoggedIn && (
                            <li>
                                <Link href="/contacts">Contacts</Link>
                            </li>
                        )}
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                    </ul>
                </div>
                {isLoggedIn && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Image alt="Tailwind CSS Navbar component" src={Avatar} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 z-999">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li>
                                <LogoutLink>Log out</LogoutLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
