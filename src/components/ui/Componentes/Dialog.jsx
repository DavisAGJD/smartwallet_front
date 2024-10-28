import PropTypes from 'prop-types'; // Asegúrate de tener esta importación
import { Dialog as HeadlessDialog } from '@headlessui/react'; // Asegúrate de tener este paquete instalado

export function Dialog({ open, onClose, children }) {
  return (
    <HeadlessDialog open={open} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <HeadlessDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {children}
        </div>
      </div>
    </HeadlessDialog>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,    // Validación para la prop 'open'
  onClose: PropTypes.func.isRequired,  // Validación para la prop 'onClose'
  children: PropTypes.node.isRequired, // Validación para 'children'
};

export function DialogHeader({ children }) {
  return (
    <div className="border-b pb-4">
      <h3 className="text-lg font-medium">{children}</h3>
    </div>
  );
}

DialogHeader.propTypes = {
  children: PropTypes.node.isRequired, // Validación para 'children'
};

export function DialogContent({ children }) {
  return <div className="mt-4">{children}</div>;
}

DialogContent.propTypes = {
  children: PropTypes.node.isRequired, // Validación para 'children'
};

export function DialogFooter({ children }) {
  return <div className="mt-4 flex justify-end">{children}</div>;
}

DialogFooter.propTypes = {
  children: PropTypes.node.isRequired, // Validación para 'children'
};

export function DialogTitle({ children }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}

DialogTitle.propTypes = {
  children: PropTypes.node.isRequired, // Validación para 'children'
};

export function DialogDescription({ children }) {
  return <p className="mt-2 text-sm text-gray-500">{children}</p>;
}

DialogDescription.propTypes = {
  children: PropTypes.node.isRequired, // Validación para 'children'
};

export function DialogTrigger({ children }) {
  return (
    <HeadlessDialog.Button>{children}</HeadlessDialog.Button>
  );
}

DialogTrigger.propTypes = {
  children: PropTypes.node.isRequired, // Validación para 'children'
};
