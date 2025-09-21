import React, { useState } from "react";
import CustomProductSelect from "./CustomProductSelect";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CustomeInput from "@/Components/CustomeInput";
import InputLabel from "@/Components/InputLabel";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Quantity } from "@/schema/Quantity";
import ReturnCustomerSelect from "./ReturnCustomerSelect";
import { ReturnList } from "./ReturnList";

const SaleReturn = () => {
    const { customers, sales } = usePage().props;
    const [quantity, setQuantity] = useState(0);
    const [productList, setProductList] = useState([]);

    const submit = async (value, { setSubmitting, resetForm }) => {
        const disPerItem = (value.sellPrice * value.discount) / 100;
        const diTotal = value.sellPrice - disPerItem;
        const totalPrice = diTotal * value.quantity;
        const totalPriceDes = parseFloat(totalPrice.toFixed(2));
        let discount = value.discount;
        if (!discount) {
            discount = 0;
        }

        const newProduct = {
            id: Date.now(),
            productName: value.product.label,
            product: value.product,
            customer: value.customer,
            sale_id: value.product.sale_id,
            item_id: value.product.item_id,
            product_id: value.product.product_id,
            customerName: value.customer.label,
            quantity: value.quantity,
            unitPrice: value.unitPrice,
            sellPrice: value.sellPrice,
            discount: parseFloat(discount),
            batch: value.batch,
            totalPrice: totalPriceDes,
        };
        setProductList([...productList, newProduct]);
        resetForm({
            customer: "",
            quantity: "",
            product: "",
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
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Sales Return Product
                </h2>
            }
        >
            <Head title="AddProducts" />
            <div className="py-4">
                <div className="mx-auto max-w-7xl">
                    <div className=" bg-white/80 shadow-sm">
                        <Formik
                            initialValues={{
                                product: "",
                                quantity: "",
                                unitPrice: "",
                                sellPrice: "",
                                discount: "",
                                customer: "",
                                batch: "",
                            }}
                            validationSchema={Quantity(quantity)}
                            onSubmit={submit}
                        >
                            {({
                                handleSubmit,
                                submitForm,
                                setFieldValue,
                                values,
                            }) => (
                                <Form
                                    className="pt-6 pb-10 pl-4"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="flex justify-between ">
                                        <div className="flex items-center gap-4">
                                            <Link
                                                className="hover:text-blue-600 text-2xl -translate-y-1 font-bold text-red-700 "
                                                href={route("customer.create")}
                                            >
                                                +
                                            </Link>

                                            <InputLabel
                                                value="To :"
                                                className="text-blue-800 font-bold"
                                            />
                                            <div>
                                                <ReturnCustomerSelect
                                                    name="customer"
                                                    placeholder="Search customers..."
                                                    customers={customers}
                                                    values={values}
                                                    setFieldValue={
                                                        setFieldValue
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <InputLabel
                                                value="Date:"
                                                className="font-bold"
                                            />
                                            <CustomeInput
                                                id="quantity"
                                                value={date}
                                                placeholder="Quantity"
                                                name="date"
                                                width="border h-6"
                                                onKeyDown={(e) =>
                                                    handleKeyDown(e, submitForm)
                                                }
                                                type="date"
                                                required
                                            />
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className="mt-6 flex justify-between sm:flex-col lg:flex-row md:flex-row flex-col">
                                        <div className="flex">
                                            <div>
                                                <InputLabel
                                                    value="Product Name"
                                                    className="font-bold text-xs mb-1"
                                                />
                                                <CustomProductSelect
                                                    name="product"
                                                    placeholder="Search Product..."
                                                    options1={sales}
                                                    values={values}
                                                    unitPrice="unitPrice"
                                                    sellPrice="sellPrice"
                                                    fields={{
                                                        batch: "batch",
                                                        discount: "discount",
                                                    }}
                                                    setQuantity={setQuantity}
                                                    setFieldValue={
                                                        setFieldValue
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <InputLabel
                                                    value="quantity"
                                                    className="font-bold text-xs mb-1"
                                                />
                                                <CustomeInput
                                                    id="quantity"
                                                    placeholder="Quantity"
                                                    name="quantity"
                                                    width="border w-32 h-6"
                                                    onKeyDown={(e) =>
                                                        handleKeyDown(
                                                            e,
                                                            submitForm
                                                        )
                                                    }
                                                    type="number"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <InputLabel
                                                    value="Batch No"
                                                    className="font-bold text-xs mb-1"
                                                />
                                                <CustomeInput
                                                    id="batch"
                                                    name="batch"
                                                    placeholder="batch"
                                                    width="border w-32 h-6"
                                                    onKeyDown={(e) =>
                                                        handleKeyDown(
                                                            e,
                                                            submitForm
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <InputLabel
                                                    value="Discount"
                                                    className="font-bold text-xs mb-1"
                                                />
                                                <CustomeInput
                                                    id="dis"
                                                    placeholder="dis%"
                                                    name="discount"
                                                    type="number"
                                                    width="w-20 h-6"
                                                    onKeyDown={(e) =>
                                                        handleKeyDown(
                                                            e,
                                                            submitForm
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex sm:mt-8 mt-0 lg:mt-0 md:mt-0">
                                            <div>
                                                <InputLabel
                                                    value="Unit Price"
                                                    className="font-bold text-xs mb-1"
                                                />
                                                <CustomeInput
                                                    id="unitPrice"
                                                    width="w-24 h-6"
                                                    placeholder="Unit"
                                                    onKeyDown={(e) =>
                                                        handleKeyDown(
                                                            e,
                                                            submitForm
                                                        )
                                                    }
                                                    name="unitPrice"
                                                    type="number"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <InputLabel
                                                    value="Sell Price"
                                                    className="font-bold text-xs mb-1"
                                                />
                                                <CustomeInput
                                                    id="sellPrice"
                                                    width="w-24 h-6"
                                                    placeholder="Sell"
                                                    name="sellPrice"
                                                    onKeyDown={(e) =>
                                                        handleKeyDown(
                                                            e,
                                                            submitForm
                                                        )
                                                    }
                                                    type="number"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="">
                    <ReturnList
                        removeProduct={removeProductHandler}
                        products={productList}
                        setProduct={setProductHandler}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default SaleReturn;
