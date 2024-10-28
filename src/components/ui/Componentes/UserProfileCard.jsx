import PropTypes from 'prop-types';

export default function UserProfileCard({ name, backgroundImage }) {
    return (
        <div className="relative rounded-lg overflow-hidden">
            {/* Fondo dinámico */}
            <div
                style={{ backgroundImage: `url(${backgroundImage})` }}
                className="w-full h-32 bg-cover bg-center"
            />
            <div className="absolute top-12 left-6 flex items-center">
                <div className="ml-4 text-white font-bold text-xl bg-green-600 rounded-full px-4 py-2">{name}</div>
            </div>
        </div>
    );
}

UserProfileCard.propTypes = {
    name: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
};
