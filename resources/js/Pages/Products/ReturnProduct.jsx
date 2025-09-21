import React, { useEffect, useState } from "react";
import CustomProductSelect from "./CustomProductSelect";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CustomeInput from "@/Components/CustomeInput";
import InputLabel from "@/Components/InputLabel";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { ErrorMessage, Form, Formik } from "formik";
import { ProductList1 } from "./ProductList1";
import CustomeSel from "@/Components/CustomeSel";
import { addProductForm } from "@/schema/ProductForm";
import { Quantity } from "@/schema/Quantity";

const ProductSearch = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { suppliers, products, errors } = usePage().props;
    const [quantity, setQuantity] = useState(0);
    const [comError, setComError] = useState(null);
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setComError(errors);
            setTimeout(() => {
                setComError(null);
            }, 8000);
        }
    }, [errors]);

    const [errors1, setErrors] = useState({});

    const submit = async (value, { setSubmitting, resetForm }) => {
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
            product: value.product.label,
            company: value.company.label,
            companyId: value.company.value,
            quantity: value.quantity,
            unitPrice: value.unitPrice,
            sellPrice: value.sellPrice,
            discount: parseFloat(discount),
            batch: value.batch,
            remark: value.remark,
            expireDate: value.expireDate,
            totalPrice: totalPriceDes,
            bill_number: value.product.bill_number,
            payment_type: value.product.payment_type,
            purchase_id: value.product.purchase_id,
            stock_id: value.product.stock_id,
        };
        try {
            const response = router.post(route("return.update"), newProduct, {
                onError: (backendErrors) => {
                    setErrors(backendErrors);
                },
                onSuccess: () => {
                    resetForm({
                        quantity: "",
                        unitPrice: "",
                        discount: "",
                        batch: "",
                        expireDate: "",
                    });
                },
            });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.log("an Error occured", error);
            }
        }
        document.activeElement.blur();
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

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Return Purchase
                </h2>
            }
        >
            <Head title="AddProducts" />
            <div className="py-4">
                <div className="mx-auto max-w-7xl px-4">
                    <div className=" bg-white/70 shadow-sm sm:rounded-lg">
                        <Formik
                            initialValues={{
                                product: "",
                                quantity: "",
                                unitPrice: "",
                                discount: "",
                                company: "",
                                batch: "",
                                remark: "",
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
                                    className="px-8 py-6 w-1/2 space-y-2"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="flex items-center gap-4">
                                        <Link
                                            className="hover:text-blue-600 text-2xl -translate-y-1 font-bold text-red-700 "
                                            href={route("supplier.create")}
                                        >
                                            +
                                        </Link>

                                        <InputLabel
                                            value="To :"
                                            className="mb-2 text-blue-800 font-bold"
                                        />
                                        <div>
                                            <CustomeSel
                                                name="company"
                                                placeholder="Search company..."
                                                products={suppliers}
                                                values={values}
                                                setFieldValue={setFieldValue}
                                                onChange={(selectedOption) => {
                                                    setFieldValue(
                                                        "company",
                                                        selectedOption.label
                                                    );
                                                }}
                                            />
                                            {errors.company && (
                                                <span className="text-xs text-red-400">
                                                    Company is required
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <table className="text-sm flex gap-20">
                                        <div>
                                            <thead className="font-bold">
                                                <tr>
                                                    <td className="py-2">
                                                        {errors.product ? (
                                                            <span className="text-xs text-red-400">
                                                                Product is
                                                                required
                                                            </span>
                                                        ) : (
                                                            "Product Name"
                                                        )}
                                                    </td>

                                                    <td className=" py-2">
                                                        {errors.quantity ? (
                                                            <span className="text-xs text-red-400">
                                                                Valid quantity
                                                            </span>
                                                        ) : (
                                                            "Quantity"
                                                        )}
                                                    </td>
                                                    <td className=" py-2">
                                                        {errors.batch ? (
                                                            <span className="text-xs text-red-400">
                                                                Batch required
                                                            </span>
                                                        ) : (
                                                            "Batch"
                                                        )}
                                                    </td>
                                                    <td className=" py-2">
                                                        Dis%
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <div>
                                                        <CustomProductSelect
                                                            name="product"
                                                            placeholder="Search Product..."
                                                            products={products}
                                                            values={values}
                                                            setFieldValue={
                                                                setFieldValue
                                                            }
                                                            batch="batch"
                                                            unitPrice="unitPrice"
                                                            sellPrice="sellPrice"
                                                            discount="discount"
                                                            setQuantity={
                                                                setQuantity
                                                            }
                                                        />
                                                    </div>

                                                    <td className="">
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
                                                    </td>
                                                    <td className="">
                                                        <CustomeInput
                                                            id="batch"
                                                            name="batch"
                                                            placeholder="batch"
                                                            width="border w-24 h-6"
                                                            onKeyDown={(e) =>
                                                                handleKeyDown(
                                                                    e,
                                                                    submitForm
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </td>
                                                    <td className="">
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
                                                            required
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </div>
                                        <div>
                                            <thead className="font-bold p-12">
                                                <tr>
                                                    <td className=" py-2 ">
                                                        {errors.unitPrice ? (
                                                            <span className="text-xs text-red-400">
                                                                U_price required
                                                            </span>
                                                        ) : (
                                                            "U_price"
                                                        )}
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="">
                                                        {" "}
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
                                                            // required
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </div>
                                    </table>
                                    <div className="flex flex-col">
                                        <td className="font-bold text-sm">
                                            Remark
                                        </td>
                                        <td className="">
                                            <CustomeInput
                                                id="remark"
                                                name="remark"
                                                placeholder="Remark"
                                                width="border w-96 h-6"
                                                onKeyDown={(e) =>
                                                    handleKeyDown(e, submitForm)
                                                }
                                                required
                                            />
                                        </td>
                                    </div>
                                    <button
                                        disabled={() => {
                                            return !(
                                                values.quantity <= quantity
                                            );
                                        }}
                                        className={`inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${
                                            !(values.quantity <= quantity) &&
                                            "opacity-25 cursor-not-allowed"
                                        } `}
                                        type="submit"
                                    >
                                        save
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        {comError && (
                            <h2 className="mx-8 pb-4 text-red-400">
                                {comError[0]}
                            </h2>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductSearch;
