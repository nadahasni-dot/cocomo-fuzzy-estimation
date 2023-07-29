import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import SummaryCard from "@/Components/Dashboard/SummaryCard";

export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-2 md:gap-6 md:grid-cols-2">
                        <SummaryCard title="Projects" value="10 Projects" />
                        <SummaryCard title="Draft Projects" value="2 Projects" />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
