import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Cart from "../CartSucces/Cart";
import { useState } from "react";
import AddTypeExpences from "./AddTypeExpences";
import SelectType1 from "./Select";
import PayToSelect from "./PayToSelect";
import Payment_typeSelect from "./Pyament_typeSelect";
// import { Form } from "formik";
const payment_methods = [
    { id: 1, name: "cash" },
    { id: 3, name: "bank" },
];
export default function Expences({ vendor, typeExpences, employee }) {
    const [message, setMessage] = useState("");
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectType, setSelectType] = useState(employee);

    const { data, setData, post, processing, errors, reset } = useForm({
        type: "",
        payTo: "",
        amount: "",
        remark: "",
        date: new Date().toISOString().split("T")[0],
        payment_method: "",
    });
    const playSound = () => {
        const audio = new Audio("/success.wav");
        audio.play();
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("expense.store"), {
            onSuccess: () => {
                setMessage("Expences Save it!");
                playSound();
                setTimeout(() => setMessage(""), 2000);
                reset(
                    "type",
                    "payTo",
                    "amount",
                    "remark",
                    "date",
                    "payment_method"
                );
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
                    Expences
                </h2>
            }
        >
            <Head title="expences" />

            <div className="py-4" dir="rtl">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white/80 shadow-sm sm:rounded-lg">
                        {isModelOpen && (
                            <AddTypeExpences
                                isOpen={isModelOpen}
                                onClose={() => {
                                    setIsModelOpen(false);
                                }}
                            />
                        )}
                        <form onSubmit={submit} className="p-6 w-80 space-y-3">
                            <div>
                                <InputLabel htmlFor="types" value="نوعیت" />
                                <div className="flex gap-2 mt-1">
                                    <SelectType1
                                        name="type"
                                        data={data}
                                        placeholder="Select Expense Type"
                                        options={typeExpences}
                                        setData={setData}
                                        setSelectType={setSelectType}
                                        vendor={vendor}
                                        employee={employee}
                                    />

                                    <span
                                        onClick={() => {
                                            setIsModelOpen((prev) => !prev);
                                        }}
                                        className="text-blue-500 text-xl hover:text-2xl cursor-pointer"
                                    >
                                        +
                                    </span>
                                </div>
                            </div>
                            <div>
                                <InputLabel htmlFor="payTo" value="Pay To" />

                                <PayToSelect
                                    name="payTo"
                                    placeholder="Pay To..."
                                    options={selectType}
                                    data={data}
                                    setData={setData}
                                />

                                <InputError
                                    message={errors.payTo}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="amount"
                                    value="مقدار پول"
                                    className="mb-1"
                                />

                                <TextInput
                                    id="amount"
                                    name="amount"
                                    value={data.amount}
                                    type="number"
                                    onKeyDown={handleKeyDown}
                                    className="mt-1 block w-full h-8"
                                    onChange={(e) =>
                                        setData("amount", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.amount}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="payment_method"
                                    value="Payment Type"
                                />
                                <div className="flex gap-2 mt-1">
                                    <Payment_typeSelect
                                        name="payment_method"
                                        data={data}
                                        placeholder="Select Payment Type"
                                        options={payment_methods}
                                        setData={setData}
                                    />
                                </div>
                                <InputError
                                    message={errors.payment_method}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="date"
                                    value="تاریخ"
                                    className="mb-1"
                                />

                                <TextInput
                                    id="date"
                                    name="date"
                                    value={data.date}
                                    type="date"
                                    onKeyDown={handleKeyDown}
                                    className="mt-1 block w-full h-8"
                                    onChange={(e) =>
                                        setData("date", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.date}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="remark"
                                    value="یاداشت"
                                    className="mb-1"
                                />

                                <TextInput
                                    id="remark"
                                    name="remark"
                                    value={data.remark}
                                    type="text"
                                    onKeyDown={handleKeyDown}
                                    className="mt-1 block w-full h-8"
                                    onChange={(e) =>
                                        setData("remark", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.remark}
                                    className="mt-2"
                                />
                            </div>

                            <PrimaryButton
                                className="mr-0"
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
