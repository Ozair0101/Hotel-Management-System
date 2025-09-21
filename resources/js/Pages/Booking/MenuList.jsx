import { useState } from "react";
import SelectType from "./SelectType";
import { usePage } from "@inertiajs/react";
import AddNewItemSelect from "./AddNewItemSelect";

export const MenuList = ({
    price,
    menuName,
    dataBooking,
    removeServices,
    priceHandler,
    setQuantityHandler,
    personQuantity,
    setDataBooking,
    setNewAddItems,
}) => {
    const { itemServices } = usePage().props;
    const [priceField, setPriceField] = useState("");
    const [addItemOn, setAddItemOn] = useState(false);
    const [select, setSelect] = useState("");
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            const nextInput = form.elements[index + 1];
            if (nextInput) {
                nextInput.focus();
            } else {
                submit();
            }
        }
    };
    const submit = () => {
        priceHandler(priceField);
        setPriceField("");
        document.activeElement.blur();
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setNewAddItems((prev1) => [
            ...prev1,
            {
                id: select.value,
                name: select.label,
                quantity: select.quantity,
            },
        ]);
        setDataBooking((prev) => [
            ...prev,
            {
                id: select.value,
                name: select.label,
                quantity: select.quantity,
            },
        ]);

        setSelect("");
    };
    return (
        <>
            <div className="relative mx-14 flex flex-col lg:w-full md:w-full sm:max-w-7xl max-w-7xl mt-8  h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table
                    className="w-full text-right table-auto  text-slate-800"
                    dir="rtl"
                >
                    <thead>
                        <tr className="relative  text-white border-b border-slate-300 bg-blue-500">
                            <th className="p-4 text-center " colSpan={4}>
                                <p className="text-lg font-bold leading-none">
                                    Menu No {menuName}
                                </p>
                                <button
                                    onClick={() => {
                                        setAddItemOn((prev) => !prev);
                                    }}
                                    className="absolute top-auto -translate-y-5 right-1 bg-white border py-0 px-1 text-blue-500 font-bold"
                                >
                                    {addItemOn ? "-" : "+"}
                                </button>
                            </th>
                        </tr>
                        <tr className=" border-b border-slate-300 font-bold bg-gray-300">
                            <th className="px-4 py-2">
                                <p className="text-sm leading-none">NO</p>
                            </th>
                            <th className="px-4 py-2">
                                <p className="text-sm leading-none">خدمات ما</p>
                            </th>
                            <th className="px-4 py-2">
                                <p className="text-sm leading-none">تعداد</p>
                            </th>
                            <th className="px-4">
                                <p className="text-sm leading-none">Edit</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBooking.map((item, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 !== 0 ? "bg-gray-100" : ""
                                }`}
                            >
                                <td className="px-4 py-1">
                                    <p className="text-sm">{index + 1}</p>
                                </td>
                                <td className="px-4 py-1">
                                    <p className="text-sm">{item.name}</p>
                                </td>
                                <td className="px-4 py-1">
                                    <p className="text-sm">
                                        <span className="px-3">
                                            {item.quantity}{" "}
                                        </span>
                                    </p>
                                </td>
                                <td className="px-4 flex justify-between text-sm font-bold py-1 cursor-pointer ">
                                    <span
                                        className="text-red-600 hover:text-xl hover:text-blue-600"
                                        onClick={() => {
                                            removeServices(item.id);
                                        }}
                                    >
                                        x
                                    </span>
                                    <div className="">
                                        <button
                                            className="pl-4 hover:text-xl hover:text-blue-600"
                                            onClick={() => {
                                                setQuantityHandler(item.id, 1);
                                            }}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="hover:text-xl hover:text-blue-600"
                                            onClick={() => {
                                                setQuantityHandler(item.id, -1);
                                            }}
                                        >
                                            -
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-between border-t mt-4">
                    <div className="text-left  text-base items-center border-gray-600 my-4 mx-2 font-bold">
                        <div className="flex gap-6">
                            <h1>Menu Price: {price ? price : 0}</h1>
                            <form onSubmit={submit} className="space-x-2">
                                <label htmlFor="dis" className="text-xs">
                                    Set Price:
                                </label>
                                <input
                                    id="dis"
                                    onKeyDown={handleKeyDown}
                                    type="number"
                                    value={priceField}
                                    className="h-5 w-36 py-1 rounded-[4px] font-normal border-gray-300 shadow-sm "
                                    onChange={(e) => {
                                        setPriceField(e.target.value);
                                    }}
                                />
                            </form>
                        </div>
                        <div className="text-left text-sm">
                            Total Price:{" "}
                            {personQuantity ? price * personQuantity : 0}
                        </div>
                    </div>
                    {addItemOn && (
                        <form onSubmit={submitHandler} className="p-3">
                            <label
                                htmlFor="addNewItems"
                                className="text-sm pb-2"
                            >
                                اضافه نمودن موارد
                            </label>
                            <AddNewItemSelect
                                setDataBooking={setDataBooking}
                                itemServices={itemServices}
                                select={select}
                                setSelect={setSelect}
                                dataBooking={dataBooking}
                            />
                            <button className="px-4 text-white text-sm rounded-md py-1 mt-4 bg-blue-500">
                                Add
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};
