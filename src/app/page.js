import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { isUserAuthenticated } from "../../server/actions";

export default async function Home() {
    const authenticated = await isUserAuthenticated();

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut
                        repudiandae et a id nisi
                    </p>
                    {!authenticated && (
                        <div className="flex justify-center gap-2">
                            <button className="btn btn-outline btn-success">
                                <LoginLink>Sign in</LoginLink>
                            </button>
                            <button className="btn btn-outline btn-info">
                                <RegisterLink>Sign up</RegisterLink>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
