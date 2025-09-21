import React from 'react';

const Table = ({ children, className = '' }) => {
    return (
        <div className="table-wrapper">
            <table className={`table ${className}`}>
                {children}
            </table>
        </div>
    );
};

const TableHead = ({ children, className = '' }) => {
    return (
        <thead className={`bg-gray-50 ${className}`}>
            {children}
        </thead>
    );
};

const TableHeadCell = ({ children, className = '' }) => {
    return (
        <th className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${className}`}>
            {children}
        </th>
    );
};

const TableBody = ({ children, className = '' }) => {
    return (
        <tbody className={`divide-y divide-gray-200 ${className}`}>
            {children}
        </tbody>
    );
};

const TableRow = ({ children, className = '', hover = true }) => {
    return (
        <tr className={`${hover ? 'hover:bg-primary-50' : ''} even:bg-gray-50 transition-all duration-200 ${className}`}>
            {children}
        </tr>
    );
};

const TableCell = ({ children, className = '' }) => {
    return (
        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 align-middle ${className}`}>
            {children}
        </td>
    );
};

Table.Head = TableHead;
Table.HeadCell = TableHeadCell;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;