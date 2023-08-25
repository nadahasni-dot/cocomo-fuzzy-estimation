import React from "react";

export default function FormCard({ title, children, className, action }) {
    return (
        <div
            className={`bg-white border-t-4 border-indigo-700 rounded-lg ${className}`}
        >
            <div className="flex items-center justify-between px-6 py-3">
                <h3 className="text-xl font-bold ">{title}</h3>
                {action}
            </div>
            <hr className="h-px bg-gray-300" />
            <div className="p-6">{children}</div>
        </div>
    );
}
