import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { isUserAuthenticated } from "../../server/actions";
import Image from "next/image";

export default async function Home() {
    const authenticated = await isUserAuthenticated();

    return (
        <section className="bg-white">
            <div className="container flex flex-col items-center px-4 py-12 mx-auto xl:flex-row">
                <div className="flex justify-center xl:w-1/2">
                    <Image
                        className="h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover rounded-full"
                        width={700}
                        height={700}
                        src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
                        alt=""
                    />
                </div>

                <div className="flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0">
                    <h2 className="text-2xl font-semibold tracking-tight text-gray-800 xl:text-3x">Contact Management System</h2>

                    <p className="block max-w-2xl mt-4 text-gray-500">
                        Efficiently organize and manage your contacts with our Contact Management Software. Simplify communication, streamline
                        outreach, and boost sales!
                    </p>

                    {!authenticated && (
                        <div className="mt-6 sm:-mx-2">
                            <LoginLink className="inline-flex items-center justify-center w-full px-4 text-sm py-2.5 overflow-hidden text-white transition-colors duration-300 bg-gray-900 rounded-lg shadow sm:w-auto sm:mx-2 hover:bg-gray-700focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                                <span className="mx-2">Sign In</span>
                            </LoginLink>

                            <RegisterLink className="inline-flex items-center justify-center w-full px-4 text-sm py-2.5 mt-4 overflow-hidden text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                <span className="mx-2">Sign Up</span>
                            </RegisterLink>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
