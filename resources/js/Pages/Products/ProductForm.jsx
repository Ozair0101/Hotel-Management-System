import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CustomeInput from "@/Components/CustomeInput";
import InputLabel from "@/Components/InputLabel";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addProductForm } from "@/schema/ProductForm";
import CustomeSelect from "@/Components/Select";
import ProrductSelectOptions from "../Products/ProductSelectOptions";
import { ProductList1 } from "./ProductList1";
import FormComponent from "@/Components/Form";
import Card from "@/Components/Card";

const ProductForm = () => {
    const [productList, setProductList] = useState([]);
    const { suppliers, products } = usePage().props;

    const submit = (value, action) => {
        const disPerItem = (value.unitPrice * value.discount) / 100;
        const diTotal = value.unitPrice - disPerItem;
        const totalPrice = diTotal * value.quantity;
        const totalPriceDes = parseFloat(totalPrice.toFixed(2));
        let discount = value.discount;
        if (!discount) {
            discount = 0;
        }
        const newProduct = {
            id: Date.now(),
            bill_number: value.billNumber,
            product: value.product.label,
            product_id: value.product.value,
            quantity: value.quantity,
            unitPrice: value.unitPrice,
            sellPrice: value.sellPrice,
            discount: parseFloat(discount),
            companyId: value.companyName.value,
            company: value.companyName.label,
            batch: value.batch,
            expireDate: value.expireDate,
            totalPrice: totalPriceDes,
        };
        setProductList([...productList, newProduct]);
        action.resetForm({
            product: "",
            quantity: "",
            unitPrice: "",
            sellPrice: "",
            discount: "",
            batch: "",
            expireDate: "",
        });

        document.activeElement.blur();
    };

    const removeProductHandler = (id) => {
        setProductList(productList.filter((product) => product.id !== id));
    };

    const handleKeyDown = (event, submitForm) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            const nextInput = form.elements[index + 1];
            if (nextInput) {
                nextInput.focus();
            } else {
                submitForm();
            }
        }
    };

    const setProductHandler = () => {
        setProductList([]);
    };

    const todayDate = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(todayDate);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="section-title">
                    Purchase Products
                </h2>
            }
        >
            <Head title="PurchaseProducts" />
            <div className="py-4">
                <div className="mx-auto max-w-7xl">
                    <Card>
                        <Card.Body>
                            <Formik
                                initialValues={{
                                    product: "",
                                    quantity: "",
                                    unitPrice: "",
                                    sellPrice: "",
                                    billNumber: "",
                                    discount: "",
                                    companyName: "",
                                    batch: "",
                                    expireDate: "",
                                }}
                                validationSchema={addProductForm}
                                onSubmit={submit}
                            >
                                {({
                                    handleSubmit,
                                    submitForm,
                                    values,
                                    setFieldValue,
                                }) => (
                                    <Form
                                        className="w-full"
                                        onSubmit={handleSubmit}
                                    >
                                        <FormComponent.Row>
                                            <FormComponent.Col>
                                                <FormComponent.Group>
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            className="btn btn-primary btn-sm"
                                                            href={route("supplier.create")}
                                                        >
                                                            +
                                                        </Link>
                                                        <FormComponent.Label required>
                                                            From:
                                                        </FormComponent.Label>
                                                        <CustomeSelect
                                                            name="companyName"
                                                            products={suppliers}
                                                            values={values}
                                                            setFieldValue={
                                                                setFieldValue
                                                            }
                                                            placeholder="Choose Company"
                                                        />
                                                    </div>
                                                </FormComponent.Group>
                                            </FormComponent.Col>
                                            <FormComponent.Col>
                                                <FormComponent.Group>
                                                    <FormComponent.Label required>
                                                        Date:
                                                    </FormComponent.Label>
                                                    <CustomeInput
                                                        id="date"
                                                        value={date}
                                                        placeholder="Date"
                                                        name="date"
                                                        type="date"
                                                        required
                                                    />
                                                </FormComponent.Group>
                                            </FormComponent.Col>
                                        </FormComponent.Row>
                                        
                                        <FormComponent.Row>
                                            <FormComponent.Col>
                                                <FormComponent.Group>
                                                    <FormComponent.Label required>
                                                        Bill Number:
                                                    </FormComponent.Label>
                                                    <CustomeInput
                                                        placeholder="Bill Number"
                                                        id="billNumber"
                                                        name="billNumber"
                                                    />
                                                </FormComponent.Group>
                                            </FormComponent.Col>
                                        </FormComponent.Row>
                                        
                                        <div className="divider"></div>
                                        
                                        <FormComponent.Row>
                                            <FormComponent.Col>
                                                <FormComponent.Group>
                                                    <FormComponent.Label required>
                                                        Product Name:
                                                    </FormComponent.Label>
                                                    <ProrductSelectOptions
                                                        name="product"
                                                        placeholder="Search Product..."
                                                        options1={products}
                                                        values={values}
                                                        setFieldValue={
                                                            setFieldValue
                                                        }
                                                    />
                                                </FormComponent.Group>
                                            </FormComponent.Col>
                                            <FormComponent.Col>
                                                <FormComponent.Group>
                                                    <FormComponent.Label required>
                                                        Quantity:
                                                    </FormComponent.Label>
                                                    <CustomeInput
                                                        id="quantity"
                                                        placeholder="Quantity"
                                                        name="quantity"
                                                        type="number"
                                                        required
                                                        onKeyDown={(e) =>
                                                            handleKeyDown(e, submitForm)
                                                        }
                                                    />
                                                </FormComponent.Group>
                                            </FormComponent.Col>
                                            <FormComponent.Col>
                                                <FormComponent.Group>
                                                    <FormComponent.Label required>
                                                        Batch No:
                                                    </FormComponent.Label>
                                                    <CustomeInput
                                                        id="batch"
                                                        name="batch"
                                                        placeholder="Batch"
                                                        required
                                                        onKeyDown={(e) =>
                                                            handleKeyDown(e, submitForm)
                                                        }
                                                    />
                                                </FormComponent.Group>
                                            </FormComponent.Col>
                                        </FormComponent.Row>
                                        
                                        <FormComponent.Row>
                                            <FormComponent.Col>
                                                <FormComponent.Group>
                                                    <FormComponent.Label>
                                                        Discount (%):
                                                    </FormComponent.Label>
                                                    <CustomeInput
                                                        id="discount"
                                                        placeholder="Discount %"
                                                        name="discount"
                                                        type="number"
                                                        onKeyDown={(e) =>
                                                            handleKeyDown(e, submitForm)
                                                        }
                                                    />
                                                </FormComponent.Group>
                                            </FormComponent.Col>
                                            <FormComponent.Col>
                                                <FormComponent.Group>
                                                    <FormComponent.Label required>
                                                        Expire Date:
                                                    </FormComponent.Label>
                                                    <CustomeInput
                                                        placeholder="Expire Date"
                                                        name="expireDate"
                                                        type="month"
                                                        required
                                                        onKeyDown={(e) =>
                                                            handleKeyDown(e, submitForm)
                                                        }
                                                    />
                                                </FormComponent.Group>
                                            </FormComponent.Col>
                                        </FormComponent.Row>
                                        
                                        <FormComponent.Row>
                                            <FormComponent.Col>
                                                <FormComponent.Group>
                                                    <FormComponent.Label required>
                                                        Unit Price:
                                                    </FormComponent.Label>
                                                    <CustomeInput
                                                        id="unitPrice"
                                                        placeholder="Unit Price"
                                                        name="unitPrice"
                                                        type="number"
                                                        required
                                                        onKeyDown={(e) =>
                                                            handleKeyDown(e, submitForm)
                                                        }
                                                    />
                                                </FormComponent.Group>
                                            </FormComponent.Col>
                                            <FormComponent.Col>
                                                <FormComponent.Group>
                                                    <FormComponent.Label required>
                                                        Sell Price:
                                                    </FormComponent.Label>
                                                    <CustomeInput
                                                        id="sellPrice"
                                                        placeholder="Sell Price"
                                                        name="sellPrice"
                                                        type="number"
                                                        required
                                                        onKeyDown={(e) =>
                                                            handleKeyDown(e, submitForm)
                                                        }
                                                    />
                                                </FormComponent.Group>
                                            </FormComponent.Col>
                                        </FormComponent.Row>
                                        
                                        <div className="flex justify-end mt-6">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Add Product
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </div>
                <div className="mt-6">
                    <ProductList1
                        removeProduct={removeProductHandler}
                        products={productList}
                        setProduct={setProductHandler}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductForm;