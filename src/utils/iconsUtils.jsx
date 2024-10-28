import {
  ShoppingCart,
  Beef,
  Home,
  DollarSign,
  Heart,
  Briefcase,
  GraduationCap,
  Globe,
  Car,
  Plane,
  BookOpen,
  Calendar,
  Monitor,
} from "lucide-react";

export const getIconForCategory = (
  categoriaNombre,
  className = "inline-block"
) => {
  switch (categoriaNombre) {
    case "Compras":
      return <ShoppingCart size={18} className={`${className} mr-2`} />;
    case "Comida":
      return <Beef size={18} className={`${className} mr-2`} />;
    case "Hogar":
      return <Home size={18} className={`${className} mr-2`} />;
    case "Finanzas":
      return <DollarSign size={18} className={`${className} mr-2`} />;
    case "Salud":
      return <Heart size={18} className={`${className} mr-2`} />;
    case "Trabajo":
      return <Briefcase size={18} className={`${className} mr-2`} />;
    case "Educación":
      return <GraduationCap size={18} className={`${className} mr-2`} />;
    case "Viaje":
      return <Plane size={18} className={`${className} mr-2`} />;
    case "Transporte":
      return <Car size={18} className={`${className} mr-2`} />;
    case "Libros":
      return <BookOpen size={18} className={`${className} mr-2`} />;
    case "Eventos":
      return <Calendar size={18} className={`${className} mr-2`} />;
    case "Tecnología":
      return <Monitor size={18} className={`${className} mr-2`} />;
    case "Internacional":
      return <Globe size={18} className={`${className} mr-2`} />;
    case "Vehiculo":
      return <Car size={18} className={`${className} mr-2`} />;
    default:
      return <DollarSign size={18} className={`${className} mr-2`} />; // Ícono por defecto
  }
};
