// src/components/ui/scroll-area.jsx

import PropTypes from 'prop-types';

export default function ScrollArea({ children, className = '' }) { // Asigna el valor por defecto aquí
  return (
    <div className={`overflow-y-auto ${className}`} style={{ maxHeight: '100%' }}>
      {children}
    </div>
  );
}

ScrollArea.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
