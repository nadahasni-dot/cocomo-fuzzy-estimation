import { Popover } from "@headlessui/react";
import React from "react";

export default function ProjectSummaryCard({
    title,
    icon,
    className,
    description,
    value,
}) {
    return (
        <div
            className={`p-4 bg-white border-b-4 rounded-lg shadow ${className}`}
        >
            <div className="flex items-center justify-between">
                <h5 className="font-semibold text-gray-500">{title}</h5>
                <Popover>
                    <Popover.Button>
                        <img src="/icons/info.svg" width={18} alt="info" />
                    </Popover.Button>

                    <Popover.Panel className="absolute z-10 max-w-xs p-2 text-xs text-gray-600 transition bg-white border border-gray-100 rounded-lg shadow-lg -ml-60 hover:bg-indigo-50">
                        {description}
                    </Popover.Panel>
                </Popover>
            </div>
            <div className="flex items-center gap-2 mt-3">
                <img src={icon} alt={title} width={28} />
                <p className="text-xl font-bold">{value}</p>
            </div>
        </div>
    );
}
