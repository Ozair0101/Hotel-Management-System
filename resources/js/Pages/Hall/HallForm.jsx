import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cart from "../CartSucces/Cart";
import { useState } from "react";
import { BookSchema } from "@/schema/BookSchema";
import SelectType from "../Booking/SelectType";

const types = [
    {
        name: "Large",
        id: 1,
    },
    {
        name: "Medium",
        id: 2,
    },
    {
        name: "Small",
        id: 3,
    },
];

const HallForm = () => {
    const [message, setMessage] = useState("");

    const playSound = () => {
        const audio = new Audio("/success.wav");
        audio.play();
    };
    const submit = (values, action) => {
        router.post(route("hall.store"), values, {
            onSuccess: () => {
                setMessage("Product Successfully addedd!");
                playSound();
                setTimeout(() => setMessage(""), 2000);
            },
            onFinish: () => action.resetForm(),
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
                    Add Menu
                </h2>
            }
        >
            <Head title="AddMenu" />

            <div className="py-4 text-right">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className={`bg-white/80 shadow-sm sm:rounded-lg`}>
                        <Formik
                            onSubmit={submit}
                            // validationSchema={BookSchema}
                            initialValues={{
                                name: "",
                                capacity: "",
                                type: "",
                            }}
                        >
                            {({
                                handleSubmit,
                                submitForm,
                                isSubmitting,
                                setFieldValue,
                                values,
                            }) => (
                                <Form
                                    className="mt-4 space-y-1 p-2"
                                    onSubmit={handleSubmit}
                                    dir="rtl"
                                >
                                    <div className="w-64 text-right">
                                        <InputLabel
                                            htmlFor="name"
                                            value="نام صالون"
                                            className="mx-2 mb-1"
                                        />
                                        <Field
                                            type="text"
                                            id="name"
                                            name="name"
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            className="border text-sm h-6  w-full  p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <ErrorMessage
                                            name="name"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div className="w-64 text-right">
                                        <InputLabel
                                            htmlFor="capacity"
                                            value="ظرفیت عمومی"
                                            className="mx-2 mb-1"
                                        />
                                        <Field
                                            type="number"
                                            id="capacity"
                                            name="capacity"
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            className="border text-sm h-6  w-full  p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <ErrorMessage
                                            name="capacity"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div className="w-64">
                                        <InputLabel
                                            htmlFor="type"
                                            value="نوعیت"
                                            className="mx-2 mb-1"
                                        />
                                        <SelectType
                                            placeholder=""
                                            name="type"
                                            types={types}
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            values={values}
                                            setFieldValue={setFieldValue}
                                        />
                                    </div>
                                    <div className="py-6">
                                        <PrimaryButton
                                            type="submit"
                                            className="ms-4 w-52"
                                            disabled={isSubmitting}
                                        >
                                            Save
                                        </PrimaryButton>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            {message && <Cart message={message} />}
        </AuthenticatedLayout>
    );
};
export default HallForm;
