import React from 'react';
import Table from '@/Components/Table';

export const ProductsTable = () => {
    return (
        <Table>
            <Table.Head>
                <Table.Row>
                    <Table.HeadCell>
                        <div className="flex items-center">
                            <input
                                id="checkbox-all-search"
                                type="checkbox"
                                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="checkbox-all-search" className="sr-only">
                                checkbox
                            </label>
                        </div>
                    </Table.HeadCell>
                    <Table.HeadCell>Product name</Table.HeadCell>
                    <Table.HeadCell>Color</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Accessories</Table.HeadCell>
                    <Table.HeadCell>Available</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>Weight</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <div className="flex items-center">
                            <input
                                id="checkbox-table-search-1"
                                type="checkbox"
                                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="checkbox-table-search-1" className="sr-only">
                                checkbox
                            </label>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="font-medium text-gray-900">
                        Apple MacBook Pro 17"
                    </Table.Cell>
                    <Table.Cell>Silver</Table.Cell>
                    <Table.Cell>Laptop</Table.Cell>
                    <Table.Cell>Yes</Table.Cell>
                    <Table.Cell>Yes</Table.Cell>
                    <Table.Cell>$2999</Table.Cell>
                    <Table.Cell>3.0 lb.</Table.Cell>
                    <Table.Cell>
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="font-medium text-primary-600 hover:text-primary-800 hover:underline"
                            >
                                Edit
                            </a>
                            <a
                                href="#"
                                className="font-medium text-danger-600 hover:text-danger-800 hover:underline"
                            >
                                Remove
                            </a>
                        </div>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <div className="flex items-center">
                            <input
                                id="checkbox-table-search-2"
                                type="checkbox"
                                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="checkbox-table-search-2" className="sr-only">
                                checkbox
                            </label>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="font-medium text-gray-900">
                        Microsoft Surface Pro
                    </Table.Cell>
                    <Table.Cell>White</Table.Cell>
                    <Table.Cell>Laptop PC</Table.Cell>
                    <Table.Cell>No</Table.Cell>
                    <Table.Cell>Yes</Table.Cell>
                    <Table.Cell>$1999</Table.Cell>
                    <Table.Cell>1.0 lb.</Table.Cell>
                    <Table.Cell>
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="font-medium text-primary-600 hover:text-primary-800 hover:underline"
                            >
                                Edit
                            </a>
                            <a
                                href="#"
                                className="font-medium text-danger-600 hover:text-danger-800 hover:underline"
                            >
                                Remove
                            </a>
                        </div>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <div className="flex items-center">
                            <input
                                id="checkbox-table-search-3"
                                type="checkbox"
                                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="checkbox-table-search-3" className="sr-only">
                                checkbox
                            </label>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="font-medium text-gray-900">
                        Magic Mouse 2
                    </Table.Cell>
                    <Table.Cell>Black</Table.Cell>
                    <Table.Cell>Accessories</Table.Cell>
                    <Table.Cell>Yes</Table.Cell>
                    <Table.Cell>No</Table.Cell>
                    <Table.Cell>$99</Table.Cell>
                    <Table.Cell>0.2 lb.</Table.Cell>
                    <Table.Cell>
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="font-medium text-primary-600 hover:text-primary-800 hover:underline"
                            >
                                Edit
                            </a>
                            <a
                                href="#"
                                className="font-medium text-danger-600 hover:text-danger-800 hover:underline"
                            >
                                Remove
                            </a>
                        </div>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};
