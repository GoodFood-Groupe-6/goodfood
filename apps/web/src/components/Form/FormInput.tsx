const FormInput = ({
    name,
    label,
    value,
    type = "text",
    placeholder,
}: {
    name: string;
    label: string;
    value: string;
    type?: string;
    placeholder?: string;
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="text-sm font-normal text-[#32343E] uppercase">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                className="w-full bg-[#F0F5FA] rounded-xl px-5 py-6 text-[#32343E] mt-2 text-sm font-normal placeholder-[#A0A5BA] outline-none"
            />
        </div>
    );
};

export default FormInput;