import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function SummaryCard({ title, value, redirect }) {
    return (
        <div className="overflow-hidden bg-white rounded-lg shadow ">
            <h3 className="px-4 pt-4 text-sm font-semibold text-gray-400">
                {title ?? "TITLE"}
            </h3>
            <p className="px-4 mb-4 text-xl font-bold text-slate-800">
                {value ?? 0}
            </p>

            <Link
                href={redirect}
                className="block px-4 py-2 text-sm text-center text-white transition bg-indigo-400 hover:bg-indigo-700"
            >
                View Detail
            </Link>
        </div>
    );
}
