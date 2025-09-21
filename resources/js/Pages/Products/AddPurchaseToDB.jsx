import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Cart from "../CartSucces/Cart";
import Button from "@/Components/Button";
import Form from "@/Components/Form";

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
                setMessage("Product Successfully Saved!");
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
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="stat-card">
                    <div className="stat-title">Product Value</div>
                    <div className="stat-value text-primary-600">₹{totalPrice}</div>
                </div>
                
                <Form onSubmit={submit} className="space-y-4">
                    <Form.Group>
                        <Form.Label>Cash Discount:</Form.Label>
                        <TextInput
                            onKeyDown={handleKeyDown}
                            id="cashDis"
                            name="cashDis"
                            onChange={handleChange}
                            value={discountCash}
                            type="number"
                            className="input input-md"
                            placeholder="Enter discount"
                        />
                    </Form.Group>
                </Form>
                
                <div className="stat-card">
                    <div className="stat-title">Total Amount</div>
                    <div className="stat-value text-success-600">₹{finalPrice}</div>
                </div>
            </div>
            
            <div className="flex justify-end mt-6">
                <Button
                    type="submit"
                    disabled={products.length <= 0 ? true : processing}
                    onClick={sumbitProductToDb}
                    variant="primary"
                >
                    Save Products
                </Button>
            </div>
            
            {message && <Cart message={message} />}
        </div>
    );
};