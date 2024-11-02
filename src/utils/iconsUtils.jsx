import {
  ShoppingCart,
  Beef,
  Home,
  DollarSign,
  Heart,
  Briefcase,
  GraduationCap,
  Plane,
  Car,
  BookOpen,
  Calendar,
  Monitor,
  Globe,
  Coffee,
  Music,
  Scissors,
  Sun,
  Utensils,
  Star,
  Shield,
  Lightbulb,
  Flag,
  Trees,
} from "lucide-react";

export const getIconForCategory = (categoriaNombre, className = "inline-block") => {
  switch (categoriaNombre) {
    // Categorías Comunes (Gastos y Metas)
    case "Hogar":
      return <Home size={18} className={`${className} mx-2`} />;
    case "Salud":
      return <Heart size={18} className={`${className} mx-2`} />;
    case "Viaje":
      return <Plane size={18} className={`${className} mx-2`} />;
    case "Finanzas":
      return <DollarSign size={18} className={`${className} mx-2`} />;
    case "Vehículo":
      return <Car size={18} className={`${className} mx-2`} />;
    case "Educación":
      return <GraduationCap size={18} className={`${className} mx-2`} />;

    // Categorías Exclusivas de Gastos
    case "Compras":
      return <ShoppingCart size={18} className={`${className} mx-2`} />;
    case "Comida":
      return <Beef size={18} className={`${className} mx-2`} />;
    case "Trabajo":
      return <Briefcase size={18} className={`${className} mx-2`} />;
    case "Transporte":
      return <Car size={18} className={`${className} mx-2`} />;
    case "Libros":
      return <BookOpen size={18} className={`${className} mx-2`} />;
    case "Eventos":
      return <Calendar size={18} className={`${className} mx-2`} />;
    case "Tecnología":
      return <Monitor size={18} className={`${className} mx-2`} />;
    case "Internacional":
      return <Globe size={18} className={`${className} mx-2`} />;
    case "Café":
      return <Coffee size={18} className={`${className} mx-2`} />;
    case "Entretenimiento":
      return <Music size={18} className={`${className} mx-2`} />;
    case "Belleza":
      return <Scissors size={18} className={`${className} mx-2`} />;
    case "Vacaciones":
      return <Sun size={18} className={`${className} mx-2`} />;
    case "Restaurantes":
      return <Utensils size={18} className={`${className} mx-2`} />;

    // Categorías Exclusivas de Metas
    case "Ahorro":
      return <DollarSign size={18} className={`${className} mx-2`} />;
    case "Emprendimiento":
      return <Briefcase size={18} className={`${className} mx-2`} />;
    case "Proyecto":
      return <Lightbulb size={18} className={`${className} mx-2`} />;
    case "Seguridad":
      return <Shield size={18} className={`${className} mx-2`} />;
    case "Caridad":
      return <Heart size={18} className={`${className} mx-2`} />;
    case "Logro":
      return <Flag size={18} className={`${className} mx-2`} />;
    case "Medio Ambiente":
      return <Trees size={18} className={`${className} mx-2`} />;
    case "Estrella":
      return <Star size={18} className={`${className} mx-2`} />;

    // Ícono por defecto
    default:
      return <DollarSign size={18} className={`${className} mx-2`} />;
  }
};
