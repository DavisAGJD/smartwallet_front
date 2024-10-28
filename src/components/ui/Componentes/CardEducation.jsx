import PropTypes from "prop-types";

export default function CardEducation({
  title,
  description,
  image,
  timeAgo,
  author,
  url,
}) {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* Imagen */}
      <div className="h-64 w-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>

        {/* Detalles del artículo */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>{new Date(timeAgo).toLocaleDateString()}</span>
          <span>Por {author}</span>
        </div>

        {/* Footer de ver mas */}
        <div className="flex justify-between items-center pt-4 border-t">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 border-green-600 py-2 px-4 rounded-md border"
          >
            VER MÁS
          </a>
        </div>
      </div>
    </div>
  );
}

CardEducation.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  timeAgo: PropTypes.string.isRequired,
  author: PropTypes.string,
  likes: PropTypes.number,
  url: PropTypes.string.isRequired, // Se requiere la URL de la noticia
};
