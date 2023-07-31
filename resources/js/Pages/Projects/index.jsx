import ProjectCard from "@/Components/Project/ProjectCard";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Projects(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-end">
                        <Link href="#" className="px-3 py-1 text-sm font-bold transition bg-indigo-200 rounded-lg shadow hover:bg-indigo-100">+ Add Project</Link>
                    </div>
                    <div className="grid grid-cols-1 gap-1 mt-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
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
