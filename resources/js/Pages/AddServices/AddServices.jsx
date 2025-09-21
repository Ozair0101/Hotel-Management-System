import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cart from "../CartSucces/Cart";
import { useState } from "react";

const AddServices = () => {
    const [message, setMessage] = useState("");
    const { menus } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({});

    const playSound = () => {
        const audio = new Audio("/success.wav");
        audio.play();
    };
    const submit = (values, action) => {
        router.post(route("addService.store"), values, {
            onSuccess: () => {
                setMessage("Service Successfully addedd!");
                playSound();
                setTimeout(() => setMessage(""), 2000);
            },
            onFinish: () => action.resetForm(),
        });
    };
    // console.log(dataBooking);
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
                    <div className=" bg-white/80 shadow-sm sm:rounded-lg">
                        <Formik
                            onSubmit={submit}
                            // validationSchema={BookSchema}
                            initialValues={{
                                name: "",
                                description: "",
                                quantity: "",
                            }}
                        >
                            {({
                                handleSubmit,
                                submitForm,
                                setFieldValue,
                                isSubmitting,
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
                                            value="نام محصول"
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
                                            htmlFor="quantity"
                                            value="تعداد"
                                            className="mx-2 mb-1"
                                        />
                                        <Field
                                            type="text"
                                            id="quantity"
                                            name="quantity"
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            className="border text-sm h-6  w-full  p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <ErrorMessage
                                            name="quantity"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div className="w-64 text-right">
                                        <InputLabel
                                            htmlFor="description"
                                            value="توضیعات"
                                            className="mx-2 mb-1"
                                        />
                                        <Field
                                            type="text"
                                            id="description"
                                            name="description"
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            className="border text-sm h-6  w-full  p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorMessage
                                            name="description"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>

                                    <div className="py-6">
                                        <PrimaryButton
                                            type="submit"
                                            className="ms-4 w-52"
                                            disabled={isSubmitting}
                                        >
                                            Add
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
export default AddServices;
