import React from "react";

export default function FormCard({ title, children, className }) {
    return (
        <div className={`bg-white border-t-4 border-indigo-700 rounded-lg ${className}`}>
            <div className="px-6 py-3 text-xl font-bold">{title}</div>
            <hr className="h-px bg-gray-300" />
            <div className="p-6">{children}</div>
        </div>
    );
}
