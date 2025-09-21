import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { date } from "yup";
import Cart from "../CartSucces/Cart";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { MenuSchema } from "@/schema/MenuSchema";
// import { Form } from "formik";

const supMenu = [{ name: "", label: "" }];

export default function AddMenu({ services, menu, menuItems }) {
    const [message, setMessage] = useState("");
    // const { services } = usePage().props;

    const playSound = () => {
        const audio = new Audio("/success.wav");
        audio.play();
    };
    const submit = (values, action) => {
        router.put(route("menu.update", menu.id), values, {
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
                                price: menu.price,
                                menu: menu.menu,
                                selectedItems: menuItems,
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
                                            value={values.menu}
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
                                            value={values.price}
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
                                        <div>
                                            <FieldArray
                                                name="selectedItems"
                                                render={(arrayHelpers) => (
                                                    <div className="grid grid-cols-6 gap-4 pt-4">
                                                        {services.map(
                                                            (item) => (
                                                                <div
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    <label>
                                                                        <input
                                                                            className="m-2 w-3 h-3"
                                                                            type="checkbox"
                                                                            name="selectedItems"
                                                                            value={
                                                                                item.id
                                                                            }
                                                                            checked={values.selectedItems.includes(
                                                                                item.id
                                                                            )}
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                if (
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                )
                                                                                    arrayHelpers.push(
                                                                                        item.id
                                                                                    );
                                                                                else {
                                                                                    const idx =
                                                                                        values.selectedItems.indexOf(
                                                                                            item.id
                                                                                        );
                                                                                    arrayHelpers.remove(
                                                                                        idx
                                                                                    );
                                                                                }
                                                                            }}
                                                                        />
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </label>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* **************************************** */}
                                    <div className="flex px-2 gap-4 pb-8">
                                        <div className="">
                                            <PrimaryButton
                                                type="submit"
                                                className=""
                                                disabled={isSubmitting}
                                            >
                                                Save
                                            </PrimaryButton>
                                        </div>
                                        <div className="">
                                            <Link
                                                href={route(
                                                    "menu.show",
                                                    menu.id
                                                )}
                                                className="text-white cursor-pointer px-4 inline-flex items-center rounded-md border border-transparent py-2 text-xs font-semibold uppercase bg-red-500"
                                            >
                                                Cancel
                                            </Link>
                                        </div>
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
