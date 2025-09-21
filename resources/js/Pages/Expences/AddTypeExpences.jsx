import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

const AddTypeExpences = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const { data, setData, post, processing, errors, reset } = useForm({
        type: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("typeExpense.store"), {
            onSuccess: () => {
                onClose();
                // setMessage("Employee Successfully addedd!");
                reset("type");
            },
        });
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose} // Close when clicking outside
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div>
                    <h2 className="text-xl font-bold">Add Expence Type</h2>
                    <form onSubmit={submit}>
                        <div>
                            <TextInput
                                id="type"
                                name="type"
                                value={data.type}
                                type="text"
                                className="block w-full mt-3 h-6"
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.type}
                                className="mt-2"
                            />
                        </div>
                        <PrimaryButton className="mt-4" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </form>
                </div>
                <div className="flex justify-end items-end">
                    <button
                        onClick={onClose}
                        className="flex mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTypeExpences;
