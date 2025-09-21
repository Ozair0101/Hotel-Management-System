import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Cart from "../CartSucces/Cart";

export const AddPurchaseToDB = ({ products, setProduct }) => {
    const { data, setData, post, errors, processing } = useForm({
        products: "",
        totalPrice: "",
        cashDiscount: "",
    });
    const [message, setMessage] = useState("");
    const [discountCash, setDiscountCash] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        const newTotalPrice = products.reduce(
            (sum, product) => sum + product.totalPrice,
            0
        );
        setTotalPrice(newTotalPrice.toFixed(2));
        setFinalPrice(newTotalPrice.toFixed(2));
        setData("products", products);
        setData("totalPrice", newTotalPrice.toFixed(2));
        setData("cashDiscount", 0);
    }, [products]);

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

    const submit = (e) => {
        setFinalPrice((prev) => (prev - discountCash).toFixed(2));
        setDiscountCash("");
        document.activeElement.blur();
    };
    const handleChange = (e) => {
        const discount = e.target.value;
        if (discount === "") {
            setDiscountCash("");
            return;
        }
        if (/^\d*\.?\d$/.test(discount)) {
            setDiscountCash(parseFloat(discount));
            setData("cashDiscount", discount);
        }
    };

    const playSound = () => {
        const audio = new Audio("/success.wav");
        audio.play();
    };

    const sumbitProductToDb = async (e) => {
        e.preventDefault();
        post(route("products.store"), {
            onSuccess: () => {
                setMessage("Product Successfully Sale it!");
                playSound();
                setTimeout(() => setMessage(""), 2000);
                setTotalPrice(0);
                setDiscountCash(0);
                setFinalPrice(0);
                setProduct();
            },
        });
    };
    return (
        <div>
            <div className="overflow-hidden py-12 max-w-7xl mx-auto bg-white/80  shadow-sm px-4">
                <div className="space-x-10">
                    <span className="font-bold">Product Value: </span>
                    <span className="font-bold bg-blue-500 text-white px-4 py-1 rounded-lg">
                        {totalPrice}
                    </span>
                </div>
                <div className="grid grid-cols-2  md:grid-cols-2 mt-4 sm:grid-cols-1 items-center w-full pr-20">
                    <form onSubmit={submit} className="">
                        <div className="flex items-center gap-8">
                            <InputLabel
                                htmlFor="cashDis"
                                className="font-bold text-lg"
                                value="Cash Discount:"
                            />
                            <TextInput
                                onKeyDown={handleKeyDown}
                                id="cashDis"
                                className="w-full h-7"
                                name="cashDis"
                                onChange={handleChange}
                                value={discountCash}
                                type="number"
                            />
                        </div>
                    </form>
                    <div className="flex justify-between sm:mt-6 mt-0 lg:mt-0 md:mt-0">
                        <div className="space-x-4 bg-green-500 px-4 py-1 rounded-lg">
                            <span className="font-bold text-white">
                                Total:{" "}
                            </span>
                            <span className="font-bold text-white">
                                {finalPrice}
                            </span>
                        </div>
                        <div className="space-x-4 bg-green-600 px-4 py-1 rounded-lg">
                            <span className="font-bold text-white">
                                Payable:{" "}
                            </span>
                            <span className="font-bold text-white">
                                {finalPrice}
                            </span>
                        </div>
                    </div>
                </div>
                <form onSubmit={sumbitProductToDb} className="w-32">
                    <PrimaryButton
                        disabled={products.length <= 0 ? true : processing}
                        className="mt-10 px-12 py-1 mx-32 bg-blue-500 w-full ml-0"
                    >
                        Save
                    </PrimaryButton>
                </form>
            </div>
            {message && <Cart message={message} />}
        </div>
    );
};
