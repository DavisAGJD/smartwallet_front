import { useState } from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="fixed bottom-0 left-0 w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Right-Aligned Label */}
            {!isHovered && (
                <div className="text-gray-600 text-lg py-4 px-4 bg-white bg-opacity-70 shadow-sm absolute bottom-0 right-0">
                    SMARTWALLET
                </div>
            )}

            {/* Full-Width Footer */}
            <footer
                aria-label="Footer"
                className={`flex items-center justify-between px-8 py-6 bg-white bg-opacity-95 shadow-sm transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                style={{ height: isHovered ? 'auto' : '0', overflow: 'hidden' }}
            >
                <div className="flex justify-between w-full text-sm text-gray-600">
                    <div aria-label="Contact Information">
                        <h3 className="font-medium">Contacto</h3>
                        <p>Email: <a href="mailto:contacto@smartwallet.com" className="text-blue-600">contacto@smartwallet.com</a></p>
                        <p>Tel: <a href="tel:+15551234567" className="text-blue-600">+1 (555) 123-4567</a></p>
                    </div>

                    <div aria-label="Location Information">
                        <h3 className="font-medium">Donde nos encontramos</h3>
                        <p>Av. Principal #123</p>
                        <p>Ciudad Empresarial</p>
                        <p>CP 12345</p>
                    </div>

                    <div className="text-right text-xs text-gray-500">
                        © {currentYear} SmartWallet. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
}
