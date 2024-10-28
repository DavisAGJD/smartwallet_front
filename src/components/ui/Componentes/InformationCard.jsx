import PropTypes from 'prop-types';
import { Pencil } from 'lucide-react';

export default function InformationCard({ title, details, onEdit }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 relative">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
            <ul className="text-gray-600">
                {details.map((item, index) => (
                    <li key={index} className="flex justify-between border-b py-2 items-center">
                        <span>{item.label}:</span>
                        <span className="flex items-center">
                            {typeof item.value === "string" ? (
                                <>
                                    {item.value}
                                    {onEdit && (
                                        <Pencil
                                            size={16}
                                            className="ml-2 cursor-pointer text-gray-600 hover:text-green-600"
                                            onClick={() => onEdit(item.label)}
                                        />
                                    )}
                                </>
                            ) : (
                                item.value // Si es un componente (como AccountTypeSelect), lo muestra directamente
                            )}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

InformationCard.propTypes = {
    title: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
        })
    ).isRequired,
    onEdit: PropTypes.func,
};
