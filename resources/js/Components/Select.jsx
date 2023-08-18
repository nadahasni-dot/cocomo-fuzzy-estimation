import Select from "react-select";

export default function SelectInput({
    name,
    value,
    className,
    required,
    handleChange,
    placeholder,
    options,
}) {
    return (
        <div className="flex flex-col items-start">
            <Select
                isSearchable
                name={name}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                required={required}
                onChange={(value) => handleChange(value)}
                placeholder={placeholder}
                options={options}
                isClearable
            />
        </div>
    );
}
