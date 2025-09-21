import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Cart from "../CartSucces/Cart";
import { useState } from "react";
// import { Form } from "formik";

export default function Vendor() {
    const [message, setMessage] = useState("");
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        phone: "",
        address: "",
    });
    const playSound = () => {
        const audio = new Audio("/success.wav");
        audio.play();
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("vendor.store"), {
            onSuccess: () => {
                setMessage("Vendor Successfully addedd!");
                playSound();
                setTimeout(() => setMessage(""), 2000);
                reset("name", "phone", "address");
            },
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
                    Vendor
                </h2>
            }
        >
            <Head title="Vendor" />

            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white/80 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 w-80 space-y-3">
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onKeyDown={handleKeyDown}
                                    className="mt-1 block w-full h-8"
                                    autoComplete="name"
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
                                <InputLabel htmlFor="phone" value="Phone" />

                                <TextInput
                                    id="phone"
                                    name="phone"
                                    value={data.phone}
                                    type="number"
                                    onKeyDown={handleKeyDown}
                                    className="mt-1 block w-full h-8"
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="address"
                                    value="Local Address"
                                />

                                <TextInput
                                    id="address"
                                    name="address"
                                    value={data.address}
                                    onKeyDown={handleKeyDown}
                                    className="mt-1 block w-full h-8"
                                    autoComplete="name"
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>

                            <PrimaryButton
                                className="ms-4 mr-0"
                                disabled={processing}
                            >
                                Save
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
            {message && <Cart message={message} />}
        </AuthenticatedLayout>
    );
}
