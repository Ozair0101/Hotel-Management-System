import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { FaBatteryQuarter, FaEye, FaTrash } from "react-icons/fa";
import CartView from "./Confirm";
import { useState } from "react";
const List = ({ list }) => {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [id, setId] = useState("");
    const deleteHandler = (id) => {
        setId(id);
        setIsModelOpen(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Menu List
                </h2>
            }
        >
            {isModelOpen && (
                <CartView
                    isOpen={isModelOpen}
                    id={id}
                    onClose={() => {
                        setIsModelOpen(false);
                    }}
                />
            )}
            <div
                className="relative mt-6 flex flex-col max-w-7xl mx-auto h-full text-gray-700 bg-clip-border"
                dir="rtl"
            >
                <table className="w-2/3 text-right border-b border-gray-300 table-auto min-w-max text-slate-800">
                    <thead>
                        <tr className="text-white border-b border-slate-300 bg-blue-500">
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    ...
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Name
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Price
                                </p>
                            </th>
                            {/* <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Operation
                                </p>
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item, index) => (
                            <tr
                                key={index}
                                className={index % 2 != 0 ? "bg-gray-200" : ""}
                            >
                                <td className="px-4 py-2">
                                    <Link
                                        href={route("menu.show", item.id)}
                                        className="text-sm text-blue-500"
                                    >
                                        <FaEye />
                                    </Link>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm ">{item.menu}</p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm ">{item.price}</p>
                                </td>
                                {/* <td className="px-4">
                                    <p
                                        className="text-sm cursor-pointer text-red-500"
                                        onClick={() => {
                                            deleteHandler(item.id);
                                        }}
                                    >
                                        <FaTrash />
                                    </p>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};
export default List;
