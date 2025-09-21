import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { date } from "yup";
import Cart from "../CartSucces/Cart";
// import { Form } from "formik";

export default function AddProduct() {
    const [message, setMessage] = useState("");
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        category: "",
        madeFrom: "",
    });
    const playSound = () => {
        const audio = new Audio("/success.wav");
        audio.play();
    };
    const submit = (e) => {
        e.preventDefault();

        post(route("addProduct.store"), {
            onSuccess: () => {
                setMessage("Product Successfully addedd!");
                playSound();
                setTimeout(() => setMessage(""), 2000);
            },
            onFinish: () => reset("name", "category", "madeFrom"),
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
                    Add Products
                </h2>
            }
        >
            <Head title="AddCompany" />

            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white/80 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 w-80 space-y-3">
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Product Name"
                                />

                                <TextInput
                                    id="name"
                                    name="name"
                                    onKeyDown={handleKeyDown}
                                    className="mt-1 block w-full h-8"
                                    autoComplete="name"
                                    value={data.name}
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="madeFrom"
                                    value="Made From"
                                />

                                <TextInput
                                    id="madeFrom"
                                    name="madeFrom"
                                    value={data.madeFrom}
                                    onKeyDown={handleKeyDown}
                                    className="mt-1 block w-full  h-8"
                                    onChange={(e) =>
                                        setData("madeFrom", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.madeFrom}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="category"
                                    value="Category"
                                />

                                <TextInput
                                    id="category"
                                    value={data.category}
                                    name="category"
                                    type="text"
                                    onKeyDown={handleKeyDown}
                                    className="mt-1 block w-full h-8"
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.category}
                                    className="mt-2"
                                />
                            </div>

                            <PrimaryButton
                                className="ms-4 mr-0"
                                disabled={processing}
                            >
                                Add
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
            {message && <Cart message={message} />}
        </AuthenticatedLayout>
    );
}
