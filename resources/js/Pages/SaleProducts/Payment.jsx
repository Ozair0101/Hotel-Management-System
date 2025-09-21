import CustomeInput from "@/Components/CustomeInput";
import InputLabel from "@/Components/InputLabel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PaymentSchema } from "@/schema/PaymentSchema";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";

function CustomSelect({ options, field, form }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        form.setFieldValue(field.name, option.value);
        setIsOpen(false);
    };
    return (
        <div className="relative w-52">
            {/* Selected value box  className="mt-2 rounded-md  border-gray-300 shadow-sm" */}
            <div
                className="border h-6 px-3 py-2 flex items-center cursor-pointer border-gray-300  bg-white rounded-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                {options.find((opt) => opt.value === field.value)?.label ||
                    "Select an option"}
            </div>

            {/* Dropdown options */}
            {isOpen && (
                <ul className="absolute border bg-white w-full rounded shadow-lg">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
//************************************************************************* */
export default function Payment({ payment }) {
    const { errors } = usePage().props;
    const options = [
        { value: "cash", label: "Cash" },
        { value: "partially", label: "Partially" },
    ];

    let formData = {};

    const submit = (values, { setSubmitting, setErrors }) => {
        let amount_paid = 0;
        if (values.credit) {
            amount_paid = parseFloat(values.credit);
        }

        formData = {
            payment_id: payment.payment_id,
            sale_id: payment.sale_id,
            amount_paid: amount_paid,
            total_amount: payment.total_amount,
            payment_type: values.payment_type,
        };

        router.post(route("salePayment.store"), formData, {
            onError: (backendErrors) => {
                setErrors(backendErrors);
            },
            onFinish: () => setSubmitting(false),
            // onFinish: () => reset("password", "password_confirmation"),
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            const nextInput = form.elements[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Payment
                </h2>
            }
        >
            <Head title="payment" />
            <div className="py-12" dir="rtl">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div>
                            <table className="flex justify-start p-6">
                                <tbody className="text-sm text-right">
                                    <tr className="border border-slate-600">
                                        <td className="px-4 border-l border-l-slate-400 font-bold">
                                            نام مشتری
                                        </td>
                                        <td className="px-4 ">
                                            {payment.customer}
                                        </td>
                                    </tr>
                                    <tr className="border border-slate-600 ">
                                        <td className="px-4 border-l  border-l-slate-400 font-bold">
                                            مقدار قابل پرداخت
                                        </td>
                                        <td className="px-4 ">
                                            {payment.total_amount}
                                        </td>
                                    </tr>
                                    <tr className="border border-slate-600">
                                        <td className="px-4 border-l  border-l-slate-400 font-bold">
                                            رسید
                                        </td>
                                        <td className="px-4 ">
                                            {payment.amount_paid}
                                        </td>
                                    </tr>
                                    <tr className="border border-slate-600">
                                        <td className="px-4 border-l  border-l-slate-400 font-bold">
                                            قرض
                                        </td>
                                        <td className="px-4 ">
                                            {payment.remaining_amount}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Formik
                            initialValues={{
                                payment_type: "",
                                credit: "",
                            }}
                            validationSchema={PaymentSchema(
                                payment.total_amount - payment.amount_paid
                            )}
                            onSubmit={submit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="text-right w-1/2 px-6 pb-8 space-y-3">
                                    <div>
                                        <InputLabel
                                            htmlFor="payment_type"
                                            value="نوع پرداخت :"
                                            className="mb-2"
                                        />
                                        <Field
                                            className="mt-2 rounded-md  border-gray-300 shadow-sm"
                                            name="payment_type"
                                            component={CustomSelect}
                                            options={options}
                                        />
                                        <ErrorMessage
                                            name="payment_type"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div className="pb-6">
                                        <InputLabel
                                            htmlFor="credit"
                                            className="mb-2"
                                            value="مقدار :"
                                        />
                                        <CustomeInput
                                            onKeyDown={(e) => handleKeyDown(e)}
                                            type="number"
                                            width="border h-6"
                                            placeholder="Amount"
                                            id="credit"
                                            name="credit"
                                        />
                                        <ErrorMessage
                                            name="credit"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <button
                                        className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                        type="submit"
                                        // disabled={isSubmitting}
                                    >
                                        sumbit
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// export default Payment;
