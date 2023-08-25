import React from "react";

export default function InfoCard({ icon, description }) {
    return (
        <div className="flex flex-col items-center px-6 pb-6 transition bg-white rounded-lg shadow hover:bg-indigo-100 pt-14">
            <img src={icon} alt="cocomo-info" width={100} />
            <p className="mt-6 text-sm text-slate-500 md:text-base">
                {description}
            </p>
        </div>
    );
}
