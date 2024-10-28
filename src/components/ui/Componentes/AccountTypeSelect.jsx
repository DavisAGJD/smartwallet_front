// components/ui/Componentes/AccountTypeSelect.jsx
import PropTypes from 'prop-types';

export default function AccountTypeSelect({ currentAccountType, onChangeAccountType }) {
    return (
        <select
            value={currentAccountType}
            onChange={(e) => onChangeAccountType(e.target.value)}
            className="bg-transparent cursor-pointer outline-none text-gray-600"
        >
            <option value="Básica">Básica</option>
            <option value="Premium">Premium</option>
        </select>
    );
}

AccountTypeSelect.propTypes = {
    currentAccountType: PropTypes.string.isRequired,
    onChangeAccountType: PropTypes.func.isRequired,
};
