import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import Avatar from "@/../public/avatar.jpg";
import { isUserAuthenticated, getUserDetails } from "../../server/actions";

export default async function NavBar() {
    const authenticated = await isUserAuthenticated();
    let user;

    if (authenticated) {
        user = await getUserDetails();
    }

    return (
        <div className="navbar bg-base-100 sticky top-0 shadow-lg">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">
                    daisyUI
                </Link>
            </div>
            <div className="flex-none">
                <div className="navbar-center lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {authenticated && (
                            <li>
                                <Link href="/contacts">Contacts</Link>
                            </li>
                        )}
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                    </ul>
                </div>
                {authenticated && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Image alt="Tailwind CSS Navbar component" src={user.picture || Avatar} width={40} height={40} />
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
