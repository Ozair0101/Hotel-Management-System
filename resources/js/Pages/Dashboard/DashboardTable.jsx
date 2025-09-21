const DashboardTable = ({ reservated }) => {
    return (
        <div
            className="relative mt-6 flex flex-col max-w-7xl mx-auto h-full overflow-x-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border"
            dir="rtl"
        >
            <table className="w-full table-auto min-w-max text-slate-800 text-right">
                <thead>
                    <tr className="text-white border-b border-slate-300 bg-blue-500">
                        <th className="p-4">
                            <p className="text-sm leading-none font-normal">
                                نام
                            </p>
                        </th>
                        <th className="p-4">
                            <p className="text-sm leading-none font-normal">
                                تخلص
                            </p>
                        </th>
                        <th className="p-4">
                            <p className="text-sm leading-none font-normal">
                                تاریخ
                            </p>
                        </th>
                        <th className="p-4">
                            <p className="text-sm leading-none font-normal">
                                شب یا روز
                            </p>
                        </th>
                        <th className="p-4">
                            <p className="text-sm leading-none font-normal">
                                نوع
                            </p>
                        </th>
                        <th className="p-4">
                            <p className="text-sm leading-none font-normal">
                                Menu No
                            </p>
                        </th>
                        <th className="p-4">
                            <p className="text-sm leading-none font-normal">
                                Menu Price
                            </p>
                        </th>
                        <th className="p-4">
                            <p className="text-sm leading-none font-normal">
                                صالون
                            </p>
                        </th>
                        <th className="p-4">
                            <p className="text-sm leading-none font-normal">
                                پول قابل پرداخت
                            </p>
                        </th>
                        <th className="p-4">
                            <p className="text-sm leading-none font-normal">
                                قرض
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reservated.map((item, index) => (
                        <tr
                            key={index}
                            className={
                                item.due !== 0
                                    ? "bg-yellow-100"
                                    : "bg-green-100"
                            }
                        >
                            <td className="px-4 py-2">
                                <p className="text-sm">{item.firstName}</p>
                            </td>
                            <td className="px-4">
                                <p className="text-sm">{item.lastName}</p>
                            </td>
                            <td className="px-4">
                                <p className="text-sm">{item.date}</p>
                            </td>
                            <td className="px-4">
                                <p className="text-sm">{item.typeDays}</p>
                            </td>
                            <td className="px-4">
                                <p className="text-sm">{item.type}</p>
                            </td>
                            <td className="px-4">
                                <p className="text-sm">{item.menu_no}</p>
                            </td>
                            <td className="px-4">
                                <p className="text-sm">{item.menu_price}</p>
                            </td>
                            <td className="px-4">
                                <p className="text-sm">{item.hall_name}</p>
                            </td>
                            <td className="px-4">
                                <p className="text-sm">
                                    {item.personQuantity * item.menu_price}
                                </p>
                            </td>
                            <td className="px-4">
                                <p className="text-sm">{item.due}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardTable;
