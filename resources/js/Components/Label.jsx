import React from 'react';

export default function Label({ forInput, value, className, children, required }) {
    return (
        <label htmlFor={forInput} className={`block font-medium text-sm text-gray-700 ` + className}>
            {value ? value : children}
            {required ? <span className="text-red-500">*</span> : ''}
        </label>
    );
}
