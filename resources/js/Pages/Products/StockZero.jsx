import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";

const StockZero = ({ stock }) => {
    // console.log(stock);
    const [searchProduct, setSerchProduct] = useState("");
    const [searchBatch, setSerchBatch] = useState("");

    const filteredData = stock.filter((item) => {
        const matchBatch = item.batch
            .toLowerCase()
            .includes(searchBatch.toLowerCase());

        const matchProduct = item.product.product_name
            .toLowerCase()
            .includes(searchProduct.toLowerCase());

        return matchBatch && matchProduct;
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Stock
                </h2>
            }
        >
            <div className="text-xs flex justify-between max-w-7xl mx-auto text-blue-900 pt-4">
                <Link className="hover:underline" href={route("stock.index")}>
                    <strong>Back</strong>
                </Link>
                <div dir="rtl" className="text-right pr-12">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="" className="text-xs ml-6 font-bold">
                            جستجو نام :
                        </label>
                        <input
                            type="text"
                            value={searchProduct}
                            onChange={(e) => {
                                setSerchProduct(e.target.value);
                            }}
                            placeholder="Search by Name"
                            className="border text-sm h-6 w-44 p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 items-center mt-2">
                        <label htmlFor="" className="text-xs font-bold ml-2">
                            جستجو Batch:
                        </label>
                        <input
                            type="text"
                            value={searchBatch}
                            onChange={(e) => {
                                setSerchBatch(e.target.value);
                            }}
                            placeholder="Search by Batch"
                            className="border text-sm h-6 w-44 p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            className="text-xs hover:text-blue-500 hover:underline"
                            onClick={() => {
                                setSerchProduct("");
                                setSerchBatch("");
                            }}
                        >
                            See all
                        </button>
                    </div>
                </div>
            </div>
            <div className="relative flex flex-col max-w-7xl mx-auto mt-6 h-full overflow-x-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max text-slate-800">
                    <thead>
                        <tr className="text-white border-b border-slate-300 bg-blue-500">
                            <th className="p-4">
                                <p className="text-base leading-none font-normal">
                                    No
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Product Name
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Quantity
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Unit_Price
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Sell_Price
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Batch
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Expire Date
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((product, index) => (
                            <tr
                                key={index}
                                className={index % 2 != 0 ? "bg-gray-200" : ""}
                            >
                                <td className="px-4 py-2">
                                    <p className="text-sm font-bold">
                                        {index + 1}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm font-bold">
                                        {product.product?.product_name}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm font-bold">
                                        {product.quantity}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm font-bold">
                                        {product.unit_price}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm font-bold">
                                        {product.unit_price}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm font-bold">
                                        {product.batch}
                                    </p>
                                </td>
                                <td className="px-4">
                                    <p className="text-sm font-bold">
                                        {product.expire_date
                                            ? product.expire_date
                                            : "Non"}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div className="mt-12 text-right mr-8">
                {stock.map((link, index) =>
                    link.url ? (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-2 py-4 ${
                                link.active
                                    ? "font-bold text-black"
                                    : "text-gray-800"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <span
                            key={index}
                            className={`px-2 py-4 text-gray-400`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></span>
                    )
                )}
            </div> */}
        </AuthenticatedLayout>
    );
};

export default StockZero;
