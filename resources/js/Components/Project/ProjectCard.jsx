import { currencyFormat, roundNumber } from "@/Utils/number_format";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function ProjectCard({
    href,
    name,
    effort,
    time,
    people,
    cost,
    isDraft,
}) {
    return (
        <Link
            href={href}
            className={`flex flex-col px-6 py-4 transition ${
                isDraft ? "bg-indigo-300" : "bg-white"
            } bg-opacity-50 bg-right-top bg-no-repeat rounded-lg shadow bg-origin-content bg-10 bg-project-pattern hover:bg-indigo-100`}
        >
            <h5 className="text-xl font-bold">{name}</h5>
            <div className="grid grid-cols-2 gap-2 mt-4">
                <div>
                    <dd className="text-xs font-semibold text-slate-500">
                        Estimasi Usaha
                    </dd>
                    <dt className="text-sm font-bold text-slate-950">
                        {effort ? roundNumber(effort) : "-"} PM
                    </dt>
                </div>
                <div>
                    <dd className="text-xs font-semibold text-slate-500">
                        Estimasi Waktu
                    </dd>
                    <dt className="text-sm font-bold text-slate-950">
                        {time ? roundNumber(time) : "-"} Bulan
                    </dt>
                </div>
                <div>
                    <dd className="text-xs font-semibold text-slate-500">
                        Estimasi Staf
                    </dd>
                    <dt className="text-sm font-bold text-slate-950">
                        {people ? roundNumber(people) : "-"} Staf
                    </dt>
                </div>
                <div>
                    <dd className="text-xs font-semibold text-slate-500">
                        Estimasi Biaya
                    </dd>
                    <dt className="text-sm font-bold text-slate-950">
                        {cost ? currencyFormat(cost) : "-"}
                    </dt>
                </div>
            </div>
        </Link>
    );
}
