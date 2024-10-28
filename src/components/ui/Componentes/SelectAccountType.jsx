import { useState } from "react";

export default function SelectAccountType({ label, options }) {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <label className="text-gray-600 font-semibold">{label}</label>
            <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-lg"
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
