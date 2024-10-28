import { useState } from "react";
import Input from "./Input";

export default function EditableField({ label, initialValue }) {
    const [value, setValue] = useState(initialValue);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <label className="text-gray-600 font-semibold">{label}</label>
            <Input />

        </div>
    );
}
