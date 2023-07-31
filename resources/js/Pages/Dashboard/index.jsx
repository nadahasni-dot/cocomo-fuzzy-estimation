import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import SummaryCard from "@/Components/Dashboard/SummaryCard";
import ProjectCard from "@/Components/Project/ProjectCard";

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
                        <SummaryCard
                            title="Draft Projects"
                            value="2 Projects"
                        />
                    </div>
                </div>

                <div className="px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-xl font-bold">
                            Your Latest Calculations
                        </h2>
                        <Link
                            href={route("projects")}
                            className="px-3 py-2 text-sm font-bold transition rounded-lg hover:bg-indigo-200"
                        >
                            See All
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <ProjectCard
                            name="Test Project"
                            ksloc={2000}
                            time={5}
                            people={6}
                            cost={1000000}
                        />
                        <ProjectCard
                            name="Test Project"
                            ksloc={2000}
                            time={5}
                            people={6}
                            cost={1000000}
                        />
                        <ProjectCard
                            name="Test Project"
                            ksloc={2000}
                            time={5}
                            people={6}
                            cost={1000000}
                        />
                        <ProjectCard
                            name="Test Project"
                            ksloc={2000}
                            time={5}
                            people={6}
                            cost={1000000}
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
