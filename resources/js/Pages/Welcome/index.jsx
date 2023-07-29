import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex justify-center min-h-screen bg-gray-100 items-top sm:items-center sm:pt-0">
                {/* NAV BAR */}
                <nav className="fixed top-0 w-full px-6 py-4 text-right bg-white sm:block">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <img
                            src="/icons/cocomo.svg"
                            alt={appName}
                            width={250}
                        />
                        <div>
                            {props.auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="px-4 py-2 text-sm font-semibold text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="px-4 py-2 text-sm font-semibold text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href={route("register")}
                                        className="px-4 py-2 ml-4 text-sm font-semibold text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8"></div>
            </div>
        </>
    );
}
