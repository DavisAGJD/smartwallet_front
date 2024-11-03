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

<CardEducation
  key={index}
  title={article.title}
  description={article.description || "Descripción no disponible"}
  image={article.image || "url_imagen_placeholder.jpg"} // Asegúrate de que exista un campo `image`
  timeAgo={article.pubDate} // Asegúrate de que el campo `pubDate` sea usado para la fecha de publicación
  author={article.author || "Desconocido"}
  url={article.link} // Cambia esto al campo adecuado si la URL se llama `link`
/>
