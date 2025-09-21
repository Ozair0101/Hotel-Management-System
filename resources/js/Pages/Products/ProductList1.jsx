import { Link, usePage } from "@inertiajs/react";
import { AddPurchaseToDB } from "./AddPurchaseToDB";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Table from "@/Components/Table";
import Card from "@/Components/Card";
import Button from "@/Components/Button";

export const ProductList1 = (props) => {
    const { errors } = usePage().props;

    const hasErrors = (index) => {
        return (
            errors[`products.${index}.sellPrice`] ||
            errors[`products.${index}.product`] ||
            errors[`products.${index}.bill_number`] ||
            errors[`products.${index}.unitPrice`] ||
            errors[`products.${index}.company`] ||
            errors[`products.${index}.batch`] ||
            errors[`products.${index}.quantity`] ||
            errors[`products.${index}.totalPrice`] ||
            errors[`products.${index}.discount`]
        );
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstErrorKey = Object.keys(errors)[0];
            const index = firstErrorKey.split(".")[1];
            document
                .getElementById(`product-${index}`)
                .scrollIntoView({ behavior: "smooth" });
        }
    }, [errors]);

    const clearErrorsHandler = (index) => {
        delete errors[`products.${index}.sellPrice`];
        delete errors[`products.${index}.sellPrice`];
        delete errors[`products.${index}.product`];
        delete errors[`products.${index}.bill_number`];
        delete errors[`products.${index}.unitPrice`];
        delete errors[`products.${index}.company`];
        delete errors[`products.${index}.batch`];
        delete errors[`products.${index}.quantity`];
        delete errors[`products.${index}.totalPrice`];
        delete errors[`products.${index}.discount`];
    };
    
    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title>Product List</Card.Title>
                </Card.Header>
                <Card.Body className="p-0">
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.HeadCell>Product Name</Table.HeadCell>
                                <Table.HeadCell>Company Name</Table.HeadCell>
                                <Table.HeadCell>Bill Number</Table.HeadCell>
                                <Table.HeadCell>Quantity</Table.HeadCell>
                                <Table.HeadCell>Unit Price</Table.HeadCell>
                                <Table.HeadCell>Sell Price</Table.HeadCell>
                                <Table.HeadCell>Batch</Table.HeadCell>
                                <Table.HeadCell>Expiry</Table.HeadCell>
                                <Table.HeadCell>Discount</Table.HeadCell>
                                <Table.HeadCell>Total Price</Table.HeadCell>
                                <Table.HeadCell>Action</Table.HeadCell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {props.products.map((item, index) => {
                                return (
                                    <Table.Row 
                                        key={item.id} 
                                        id={`product-${index}`}
                                        className={hasErrors(index) ? 'bg-danger-100' : ''}
                                    >
                                        <Table.Cell>{item.product}</Table.Cell>
                                        <Table.Cell>{item.company}</Table.Cell>
                                        <Table.Cell>{item.bill_number}</Table.Cell>
                                        <Table.Cell>{item.quantity}</Table.Cell>
                                        <Table.Cell>{item.unitPrice}</Table.Cell>
                                        <Table.Cell>{item.sellPrice}</Table.Cell>
                                        <Table.Cell>{item.batch}</Table.Cell>
                                        <Table.Cell>{item.expireDate}</Table.Cell>
                                        <Table.Cell>{item.discount}%</Table.Cell>
                                        <Table.Cell>{item.totalPrice}</Table.Cell>
                                        <Table.Cell>
                                            <button
                                                onClick={() => {
                                                    clearErrorsHandler(index);
                                                    props.removeProduct(item.id);
                                                }}
                                                className="text-danger-500 hover:text-danger-700"
                                            >
                                                <FaTrash />
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                </Card.Body>
                <Card.Footer className="flex justify-end">
                    <AddPurchaseToDB
                        products={props.products}
                        setProduct={props.setProduct}
                    />
                </Card.Footer>
            </Card>
        </>
    );
};
