import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function AddCompany() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("supplier"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Company
                </h2>
            }
        >
            <Head title="AddCompany" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={submit}
                            className="p-12 w-1/2 space-y-6"
                        >
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full"
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
                                <InputLabel
                                    htmlFor="email"
                                    value="Email Address"
                                />

                                <TextInput
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="phone" value="Phone" />

                                <TextInput
                                    id="phone"
                                    name="phone"
                                    className="mt-1 block w-full"
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
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="city" value="City" />

                                <TextInput
                                    id="city"
                                    name="city"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("city", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.city}
                                    className="mt-2"
                                />
                            </div>

                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                Add Company
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
