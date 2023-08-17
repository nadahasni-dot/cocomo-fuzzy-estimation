import ProjectCard from "@/Components/Project/ProjectCard";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Projects(props) {
    const { draftProjects, projects } = props;

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Proyek
                </h2>
            }
        >
            <Head title="Proyek" />

            <div className="py-12">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-end">
                        <Link
                            href={route("projects.create")}
                            className="px-3 py-2 text-sm font-bold transition bg-indigo-200 rounded-lg shadow hover:bg-indigo-100"
                        >
                            + Add Project
                        </Link>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                        <h2 className="text-xl font-bold">Draf Proyek</h2>
                    </div>
                    {draftProjects.length === 0 && (
                        <div className="py-10 text-center">
                            Belum Ada Draf Proyek Tersimpan
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-1 py-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {draftProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                name={project.name}
                                effort={project.est_effort}
                                time={project.est_time}
                                people={project.est_staff}
                                cost={project.est_cost}
                                isDraft={project.status === 0}
                                href={route("projects.show", project)}
                            />
                        ))}
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                        <h2 className="text-xl font-bold">
                            Proyek Ter-estimasi
                        </h2>
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
                                effort={project.est_effort}
                                time={project.est_time}
                                people={project.est_staff}
                                cost={project.est_cost}
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
