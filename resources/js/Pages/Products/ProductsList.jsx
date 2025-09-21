import { FaTrash } from "react-icons/fa";
import { AddPurchaseToDB } from "./AddPurchaseToDB";

export const ProductList = (props) => {
    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="overflow-hidden py-12 bg-white shadow-sm sm:rounded-lg">
                <h1 className="text-2xl font-bold mx-4 mb-8 text-gray-800">
                    Purchase List
                </h1>
                <table className="mt-6 text-xs">
                    <thead className="border font-bold p-12">
                        <td className="px-6 py-2 border">Product Name</td>
                        <td className="px-6 py-2 border">Description</td>
                        <td className="px-6 py-2 border">Company</td>
                        <td className="px-6 py-2 border">quantity</td>
                        <td className="px-6 py-2 border">Unit Price</td>
                        <td className="px-6 py-2 border">Sell Price</td>
                        <td className="px-6 py-2 border">Batch</td>
                        <td className="px-6 py-2 border">Expriy</td>
                        <td className="px-6 py-2 border">Discount</td>
                        <td className="px-6 py-2 border">total Price</td>
                        <td className="px-6 py-2 border">Remove Product</td>
                    </thead>
                    {props.products.map((item) => (
                        <tbody key={item.id}>
                            <td className="px-6 py-1 border">{item.product}</td>
                            <td className="px-6 py-1 border">
                                {item.description}
                            </td>
                            <td className="px-6 py-1 border">{item.company}</td>
                            <td className="px-6 py-1 border">
                                {item.quantity}
                            </td>
                            <td className="px-6 py-1 border">
                                {item.unitPrice}
                            </td>
                            <td className="px-6 py-1 border">
                                {item.sellPrice}
                            </td>
                            <td className="px-6 py-1 border">{item.batch}</td>
                            <td className="px-6 py-1 border">
                                {item.expireDate}
                            </td>
                            <td className="px-6 py-1 border">
                                {item.discount}
                            </td>
                            <td className="px-6 py-1 border">
                                {item.totalPrice}
                            </td>
                            <td
                                onClick={() => props.removeProduct(item.id)}
                                className="px-6 py-1 border cursor-pointer hover:underline hover:text-blue-500"
                            >
                                <FaTrash />
                            </td>
                        </tbody>
                    ))}
                </table>
                <label class="block text-sm font-medium mb-1" for="card-expiry">
                    Expiry Date <span class="text-red-500">*</span>
                </label>
                <input
                    id="card-expiry"
                    class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                    type="text"
                    placeholder="MM/YY"
                />
                sdflkjljklj ljl
            </div>
            <AddPurchaseToDB products={props.products} />
        </div>
    );
};
