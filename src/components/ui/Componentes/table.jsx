// src/components/ui/table.jsx

import PropTypes from "prop-types";

export function Table({ children }) {
  return <table className="min-w-full divide-y divide-gray-200">{children}</table>;
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-50">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr>{children}</tr>;
}

export function TableCell({ children }) {
  return <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{children}</td>;
}

export function TableHead({ children }) {
  return <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;
}

// Agrega PropTypes para validar que children es un nodo de React
Table.propTypes = {
  children: PropTypes.node.isRequired,
};

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

TableBody.propTypes = {
  children: PropTypes.node.isRequired,
};

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
};

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
};

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
};
