import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CustomeInput from "@/Components/CustomeInput";
import InputLabel from "@/Components/InputLabel";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addProductForm } from "@/schema/ProductForm";
import CustomeSelect from "@/Components/Select";
import ProrductSelectOptions from "../Products/ProductSelectOptions";

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
            product: value.product,
            quantity: value.quantity,
            unitPrice: value.unitPrice,
            sellPrice: value.sellPrice,
            discount: parseFloat(discount),
            companyId: value.companyId,
            company: value.companyName,
            batch: value.batch,
            madeFrom: value.madeFrom,
            expireDate: value.expireDate,
            totalPrice: totalPriceDes,
        };
        setProductList([...productList, newProduct]);
        action.resetForm({
            madeFrom: "",
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
    const todayDate = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(todayDate);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Purchase Products
                </h2>
            }
        >
            <Head title="PurchaseProducts" />
            <div className="py-4">
                <div className="mx-auto max-w-7xl">
                    <div className=" bg-white/80 shadow-sm">
                        <Formik
                            initialValues={{
                                madeFrom: "",
                                product: "",
                                quantity: "",
                                unitPrice: "",
                                sellPrice: "",
                                billNumber: "",
                                discount: "",
                                companyId: "",
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
                                    className="pt-6 pb-10 pl-4"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="flex justify-between ">
                                        <div className="flex items-center gap-4">
                                            <Link
                                                className="hover:text-blue-600 text-2xl -translate-y-1 font-bold text-red-700 "
                                                href={route("supplier.create")}
                                            >
                                                +
                                            </Link>

                                            <InputLabel
                                                value="From :"
                                                className="text-blue-800 font-bold"
                                            />
                                            <div>
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
                                    <div className="flex gap-4 items-center">
                                        <InputLabel
                                            htmlFor="billNumber"
                                            value="Bill Number:"
                                            className="font-bold"
                                        />
                                        <CustomeInput
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            placeholder="Bill Number"
                                            id="billNumber"
                                            name="billNumber"
                                        />
                                    </div>
                                    <div className="mt-6 flex justify-between sm:flex-col lg:flex-row md:flex-row flex-col">
                                        <div className="flex">
                                            <div>
                                                <InputLabel
                                                    value="Product Name"
                                                    className="font-bold text-xs mb-1"
                                                />
                                                <ProrductSelectOptions
                                                    name="product"
                                                    placeholder="Search Product..."
                                                    options1={sales}
                                                    values={values}
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
                                            <div>
                                                <InputLabel
                                                    value="Expire Date"
                                                    className="font-bold text-xs mb-1"
                                                />
                                                <CustomeInput
                                                    width="w-24 h-6"
                                                    placeholder=""
                                                    onKeyDown={(e) =>
                                                        handleKeyDown(
                                                            e,
                                                            submitForm
                                                        )
                                                    }
                                                    name="expireDate"
                                                    type="month"
                                                    required
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
                    <ProductList1
                        removeProduct={removeProductHandler}
                        products={productList}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductForm;
