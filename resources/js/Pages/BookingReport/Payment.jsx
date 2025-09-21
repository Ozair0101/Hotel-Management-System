import { router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputLabel from "@/Components/InputLabel";
import { useState } from "react";
import CustomeSelect from "./CustomeSelect";
import CustomeInput from "@/Components/CustomeInput";
import { BookSchema } from "@/schema/BookSchema";
import { BookingPaymentSchema } from "@/schema/BooingPayment";
import Cart from "../CartSucces/Cart";

const Payment = () => {
    const { payment } = usePage().props;

    const options = [
        { name: "cash", id: 1 },
        { name: "bank", id: 2 },
    ];

    const [message, setMessage] = useState("");
    const playSound = () => {
        const audio = new Audio("/success.wav");
        audio.play();
    };

    const submit = (values, { setSubmitting, setErrors, resetForm }) => {
        let amount_paid = 0;
        if (values.credit) {
            amount_paid = parseFloat(values.credit);
        }

        const formData = {
            payment_id: payment.payment_id,
            reservation_id: payment.id,
            credit: amount_paid,
            total_amount: payment.total_price,
            payment_type: values.payment_type.label,
        };

        router.post(route("hotelPayment.store"), formData, {
            onError: (backendErrors) => {
                setErrors(backendErrors);
            },
            onSuccess: () => {
                setMessage("Customer Successfully addedd!");
                playSound();
                setTimeout(() => setMessage(""), 2000);
                resetForm();
            },
            onFinish: () => setSubmitting(false),
        });
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
                    Booking Payment
                </h2>
            }
        >
            <div
                className="relative flex flex-col max-w-7xl p-6 mx-auto mt-6 h-full text-gray-700 bg-white shadow-md bg-clip-border"
                dir="rtl"
            >
                <div>
                    <table>
                        <tbody className="text-sm">
                            <tr className="border border-slate-600">
                                <td className="px-4 border-l border-l-slate-400 font-bold">
                                    نام
                                </td>
                                <td className="px-4 ">
                                    {payment.firstName} {payment.lastName}
                                </td>
                            </tr>
                            <tr className="border border-slate-600 ">
                                <td className="px-4 border-l  border-l-slate-400 font-bold">
                                    مقدار قابل پرداخت
                                </td>
                                <td className="px-4 ">{payment.total_price}</td>
                            </tr>
                            <tr className="border border-slate-600">
                                <td className="px-4 border-l  border-l-slate-400 font-bold">
                                    رسید
                                </td>
                                <td className="px-4 ">{payment.amount_paid}</td>
                            </tr>
                            <tr className="border border-slate-600">
                                <td className="px-4 border-l  border-l-slate-400 font-bold">
                                    قرض
                                </td>
                                <td className="px-4 ">{payment.due}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Formik
                    initialValues={{
                        payment_type: "",
                        credit: "",
                    }}
                    validationSchema={BookingPaymentSchema(
                        payment.total_price - payment.amount_paid
                    )}
                    onSubmit={submit}
                >
                    {({
                        isSubmitting,
                        values,
                        setFieldValue,
                        handleSubmit,
                    }) => (
                        <Form
                            onSubmit={handleSubmit}
                            className=" pt-8 mx-4 w-1/2 space-y-6"
                        >
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="flex gap-4 pb-4 pl-4">
                                            <InputLabel
                                                htmlFor="payment_type"
                                                className="mb-2 font-bold"
                                                value="نوع پرداخت: "
                                            />
                                        </td>
                                        <td className="pb-4">
                                            <CustomeSelect
                                                name="payment_type"
                                                options={options}
                                                values={values}
                                                setFieldValue={setFieldValue}
                                            />
                                        </td>
                                        <td>
                                            <ErrorMessage
                                                name="payment_type"
                                                className="text-red-500"
                                                component="p"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="flex gap-2">
                                            <InputLabel
                                                htmlFor="credit"
                                                className="mb-2 font-bold"
                                                value="پرداخت :"
                                            />
                                        </td>
                                        <td>
                                            <CustomeInput
                                                onKeyDown={(e) =>
                                                    handleKeyDown(e)
                                                }
                                                type="number"
                                                width="border h-6 w-44 border-slate-600"
                                                placeholder="Amount"
                                                id="credit"
                                                name="credit"
                                            />
                                        </td>
                                        <td>
                                            <ErrorMessage
                                                name="credit"
                                                className="text-red-500 text-xs"
                                                component="p"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button
                                className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Save
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            {message && <Cart message={message} />}
        </AuthenticatedLayout>
    );
};
export default Payment;
