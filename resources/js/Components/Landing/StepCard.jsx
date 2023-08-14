import React from "react";

export default function StepCard({ icon, title, children }) {
    return (
        <div className="flex flex-row items-start px-6 py-4 transition bg-gray-100 rounded-lg hover:bg-slate-200">
            <img src={icon} alt={title} width={54} />
            <div className="flex flex-col ml-6">
                <p className="text-lg font-bold md:text-xl">{title}</p>
                <p className="text-sm text-gray-500 md:text-base">{children}</p>
            </div>
        </div>
    );
}
