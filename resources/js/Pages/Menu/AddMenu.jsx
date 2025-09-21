import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { date } from "yup";
import Cart from "../CartSucces/Cart";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MenuSchema } from "@/schema/MenuSchema";
// import { Form } from "formik";

const supMenu = [{ name: "", label: "" }];

export default function AddMenu() {
    const [message, setMessage] = useState("");
    const { services } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        category: "",
        madeFrom: "",
    });

    const playSound = () => {
        const audio = new Audio("/success.wav");
        audio.play();
    };
    const submit = (values, action) => {
        router.post(route("menu.store"), values, {
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
                    <div className="overflow-hidden bg-white/80 shadow-sm sm:rounded-lg">
                        <Formik
                            onSubmit={submit}
                            // validationSchema={MenuSchema}
                            initialValues={{
                                price: "",
                                menu: "",
                                selectedItems: [],
                            }}
                        >
                            {({
                                handleSubmit,
                                isSubmitting,
                                submitForm,
                                setFieldValue,
                                values,
                            }) => (
                                <Form className="mt-4 space-y-3" dir="rtl">
                                    <div className="w-64 p-2 text-right">
                                        <InputLabel
                                            htmlFor="menu"
                                            value="شماره Menu"
                                        />
                                        <Field
                                            type="text"
                                            id="menu"
                                            placeholder="شماره مینو"
                                            name="menu"
                                            onKeyDown={handleKeyDown}
                                            className="border text-sm w-full h-6 p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <ErrorMessage
                                            name="menu"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div className="w-64 pb-4 px-2">
                                        <InputLabel
                                            htmlFor="price"
                                            value="مقدار"
                                        />

                                        <Field
                                            id="price"
                                            name="price"
                                            type="number"
                                            placeholder="Price"
                                            onKeyDown={handleKeyDown}
                                            className="border text-sm h-6  w-full  p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            autoComplete="price"
                                            required
                                        />
                                        <ErrorMessage
                                            name="price"
                                            className="text-red-500"
                                            component="p"
                                        />
                                        {/* {error} */}
                                    </div>
                                    {/* Item Selection */}
                                    <div className="px-3">
                                        <label>Select Items</label>
                                        <div className="grid grid-cols-6 gap-4 pt-4">
                                            {services.map((item) => (
                                                <label
                                                    key={item.id}
                                                    className="flex items-center px-2"
                                                >
                                                    <input
                                                        name="selectedItems"
                                                        type="checkbox"
                                                        value={item.id}
                                                        onChange={(e) => {
                                                            const checked =
                                                                e.target
                                                                    .checked;
                                                            const selected = [
                                                                ...values.selectedItems,
                                                            ];
                                                            if (checked) {
                                                                selected.push({
                                                                    id: item.id,
                                                                    name: item.name,
                                                                });
                                                            } else {
                                                                const index =
                                                                    selected.findIndex(
                                                                        (i) =>
                                                                            i.id ===
                                                                            item.id
                                                                    );

                                                                if (
                                                                    index !== -1
                                                                ) {
                                                                    selected.splice(
                                                                        index,
                                                                        1
                                                                    );
                                                                }
                                                            }
                                                            setFieldValue(
                                                                "selectedItems",
                                                                selected
                                                            );
                                                        }}
                                                        checked={values.selectedItems.some(
                                                            (i) =>
                                                                i.id === item.id
                                                        )}
                                                        className="m-2 w-3 h-3"
                                                    />
                                                    {item.name}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* **************************************** */}
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
}
