import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { FaDAndD, FaEdit } from "react-icons/fa";

const Show = ({ list }) => {
    const [addItemOn, setAddItemOn] = useState(false);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Menu List
                </h2>
            }
        >
            <div
                className="relative px-8 mt-6 flex flex-col max-w-7xl mx-auto h-full text-gray-700 bg-clip-border"
                dir="rtl"
            >
                <table
                    className="lg:w-2/3 md:w-3/4 sm:w-full w-full text-right table-auto text-slate-800"
                    dir="rtl"
                >
                    <thead>
                        <tr className="relative  text-white border-b border-slate-300 bg-blue-500">
                            <th className="p-4 text-center " colSpan={4}>
                                <p className="text-lg font-bold leading-none">
                                    Menu: {list.menu}
                                </p>
                                <Link
                                    href={route("menu.edit", list.id)}
                                    className="absolute top-auto -translate-y-5 right-1 bg-white border text-blue-500 font-bold"
                                    // onClick={() => {
                                    //     router.get("menu.edit", list.id);
                                    // }}
                                >
                                    {<FaEdit />}
                                </Link>
                            </th>
                        </tr>
                        <tr className=" border-b border-slate-300 font-bold bg-gray-300">
                            <th className="px-4 py-2">
                                <p className="text-sm leading-none">NO</p>
                            </th>
                            <th className="px-4 py-2">
                                <p className="text-sm leading-none">خدمات ما</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.service_items.map((item, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 !== 0 ? "bg-gray-200" : ""
                                }`}
                            >
                                <td className="px-4 py-1">
                                    <p className="text-sm">{index + 1}</p>
                                </td>
                                <td className="px-4 py-1">
                                    <p className="text-sm">{item.name}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-between border-t mt-4">
                    <div className="text-left  text-base items-center border-gray-600 my-4 mx-2 font-bold">
                        <div className="flex gap-6">
                            <h1>Menu Price: {list.price}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default Show;
