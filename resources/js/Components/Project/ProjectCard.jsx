import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function ProjectCard({ name, ksloc, time, people, cost, isDraft }) {
    return (
        <Link
            href="#"
            className={`flex flex-col px-6 py-4 transition ${isDraft ? 'bg-indigo-300' : 'bg-white'} bg-opacity-50 bg-right-top bg-no-repeat rounded-lg shadow bg-origin-content bg-10 bg-project-pattern hover:bg-indigo-100`}
        >
            <h5 className="text-xl font-bold">{name}</h5>
            <div className="grid grid-cols-2 gap-2 mt-4">
                <div>
                    <dd className="text-xs font-semibold text-slate-500">
                        KSLOC
                    </dd>
                    <dt className="font-bold text-slate-950">{ksloc}</dt>
                </div>
                <div>
                    <dd className="text-xs font-semibold text-slate-500">
                        Time Estimation
                    </dd>
                    <dt className="font-bold text-slate-950">{time} Months</dt>
                </div>
                <div>
                    <dd className="text-xs font-semibold text-slate-500">
                        Staff Estimation
                    </dd>
                    <dt className="font-bold text-slate-950">
                        {people} People
                    </dt>
                </div>
                <div>
                    <dd className="text-xs font-semibold text-slate-500">
                        Cost Estimation
                    </dd>
                    <dt className="font-bold text-slate-950">Rp. {cost}</dt>
                </div>
            </div>
        </Link>
    );
}
