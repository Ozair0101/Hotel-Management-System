import { router, useForm } from "@inertiajs/react";
import { useEffect } from "react";

const CartView = ({ isOpen, onClose, id }) => {
    if (!isOpen) return null;

    const submit = () => {
        // e.preventDefault();

        router.delete(route("menu.delete", id), {
            onSuccess: () => {
                onClose();
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
                    <h2 className="border-b text-xl font-medium flex flex-col pb-2">
                        Are Your Sure Delete Menu!
                    </h2>
                </div>
                <div className="flex gap-2">
                    <div className="flex justify-end items-end">
                        <button
                            onClick={() => {
                                submit();
                            }}
                            className="flex mt-4 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Yes
                        </button>
                    </div>
                    <div className="flex justify-end items-end">
                        <button
                            onClick={onClose}
                            className="flex mt-4 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartView;
