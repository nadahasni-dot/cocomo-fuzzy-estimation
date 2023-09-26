import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import SummaryCard from "@/Components/Dashboard/SummaryCard";
import ProjectCard from "@/Components/Project/ProjectCard";

export default function Dashboard(props) {
    const { projects, projectsCount, draftProjectsCount } = props;

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
                        <SummaryCard
                            title="Proyek"
                            value={`${projectsCount} Proyek`}
                            redirect={route("projects")}
                        />
                        <SummaryCard
                            title="Draf Proyek"
                            value={`${draftProjectsCount} Proyek`}
                            redirect={route("projects")}
                        />
                    </div>
                </div>

                <div className="px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-xl font-bold">
                            Kalkulasi Terbaru Anda
                        </h2>
                        <Link
                            href={route("projects")}
                            className="px-3 py-2 text-sm font-bold transition rounded-lg hover:bg-indigo-200"
                        >
                            Lihat Semua
                        </Link>
                    </div>
                    {projects.length === 0 && (
                        <div className="py-10 text-center">
                            Belum Ada Proyek Terkalkulasi
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-1 py-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                name={project.name}
                                effort={project.est_effort_fuzzy}
                                time={project.est_time_fuzzy}
                                people={project.est_staff_fuzzy}
                                cost={project.est_cost_fuzzy}
                                isDraft={project.status === 0}
                                href={route("projects.show", project)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
