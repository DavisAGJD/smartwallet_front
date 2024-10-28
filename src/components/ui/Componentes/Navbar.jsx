import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button";
import Logo from "../../../assets/Logo.png"

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div>
            <header className="flex items-center justify-between px-6 py-4 bg-white bg-opacity-70 shadow-sm">
                <div className="flex items-center">
                    <img src={Logo} alt="SmartWallet Logo" width={32} height={32} className="mr-2" />
                    <Link to="/"><span className="text-xl font-bold text-teal-600">SmartWallet</span></Link>
                </div>
                <nav className="hidden md:flex space-x-6">
                    {/* Rutas actualizadas para "Como Funciona" */}
                    <Link to="/how-it-works" className="text-gray-600 hover:text-teal-600">Cómo Funciona</Link>
                    <Link to="/about-us" className="text-gray-600 hover:text-teal-600">Quiénes somos</Link>
                    <Link to="/prices" className="text-gray-600 hover:text-teal-600">Planes que te ofrecemos</Link>
                </nav>
                <div className="flex items-center space-x-4">
                    {/* Redirección al registro y login */}
                    <Button variant="outline" size="sm" onClick={() => navigate('/register')}>Sign up</Button>
                    <Button variant="default" size="sm" onClick={() => navigate('/login')}>Sign in</Button>
                </div>
            </header>
        </div>

    )

}