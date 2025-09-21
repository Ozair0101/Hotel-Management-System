import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cart from "../CartSucces/Cart";
import { useEffect, useState } from "react";
import SelectType from "./SelectType";
import SelectMenu from "./SelectMenu";
import { BookSchema } from "@/schema/BookSchema";
import { MenuList } from "./MenuList";
import SelectHall from "./SelectHall";
import ErrorCart from "../CartSucces/ErrorCart";

const types = [
    {
        name: "A1",
        id: 1,
    },
    {
        name: "A2",
        id: 2,
    },
    {
        name: "A3",
        id: 3,
    },
    {
        name: "A4",
        id: 4,
    },
];
const typeDays = [
    {
        name: "Night",
        id: 1,
    },
    {
        name: "Day",
        id: 2,
    },
];

const BookHotel = () => {
    const [message, setMessage] = useState("");
    const { menus, halls, itemServices, flash } = usePage().props;
    const [price, setPrice] = useState(null);
    const [menuName, setMenuName] = useState(null);
    const [dataBooking, setDataBooking] = useState(null);
    const [newAddItems, setNewAddItems] = useState([]);
    const [personQuantity, setPersonQuantity] = useState(null);
    const [removeItems, setRemoveItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const playSound = () => {
        const audio = new Audio("/success.wav");
        audio.play();
    };
    const submit = (values, action) => {
        const newData = {
            firstName: values.firstName,
            fatherName: values.fatherName,
            lastName: values.lastName,
            phone: values.phone,
            type: values.type.label,
            date: values.date,
            typeDays: values.typeDays.label,
            hall_id: values.hall.value,
            menu_id: values.menu.value,
            menu_price: price,
            menu_services: dataBooking,
            newAddItems: newAddItems,
            removeItems: removeItems,
            personQuantity: values.personQuantity,
        };
        router.post(route("book.store"), newData, {
            onSuccess: () => {
                playSound();
                setMessage("Hall Successfully Reserved!");
                setTimeout(() => setMessage(""), 2000);
                setDataBooking(null);
                action.resetForm();
            },
            onError: () => {
                playSound();
                setErrorMessage("Check Your Information Again!");
                setTimeout(() => setErrorMessage(""), 2000);
            },
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            const nextInput = form.elements[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    };
    const removeServicesHandler = (id) => {
        setRemoveItems((prev) => [...prev, id]);
        setDataBooking(dataBooking.filter((service) => service.id !== id));
    };

    const priceHandler = (newPrice) => {
        setPrice(newPrice);
    };

    const updateQuantityHandler = (itemId, delta) => {
        setDataBooking((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
                    : item
            )
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Menu
                </h2>
            }
        >
            <Head title="AddMenu" />

            <div className="py-4 text-right">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div
                        className={`bg-white/80 shadow-sm sm:rounded-lg ${
                            dataBooking &&
                            "flex sm:flex-col lg:flex-row md:flex-row flex-col"
                        }`}
                    >
                        {dataBooking && (
                            <MenuList
                                price={price}
                                setNewAddItems={setNewAddItems}
                                menuName={menuName}
                                dataBooking={dataBooking}
                                removeServices={removeServicesHandler}
                                priceHandler={priceHandler}
                                setQuantityHandler={updateQuantityHandler}
                                personQuantity={personQuantity}
                                setDataBooking={setDataBooking}
                            />
                        )}
                        <Formik
                            onSubmit={submit}
                            validationSchema={BookSchema}
                            initialValues={{
                                firstName: "",
                                phone: "",
                                fatherName: "",
                                lastName: "",
                                personQuantity: "",
                                type: "",
                                menu: "",
                                hall: "",
                                typeDays: "",
                                date: "",
                            }}
                        >
                            {({
                                handleSubmit,
                                submitForm,
                                setFieldValue,
                                isSubmitting,
                                values,
                            }) => (
                                <Form
                                    className="mt-4 space-y-1 p-2"
                                    onSubmit={handleSubmit}
                                    dir="rtl"
                                >
                                    <div className="w-64 text-right">
                                        <InputLabel
                                            htmlFor="firstName"
                                            value="نام"
                                            className="mx-2 mb-1"
                                        />
                                        <Field
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            className="border text-sm h-6  w-full  p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <ErrorMessage
                                            name="firstName"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div className="w-64 text-right">
                                        <InputLabel
                                            htmlFor="fatherName"
                                            value="نام پدر"
                                            className="mx-2 mb-1"
                                        />
                                        <Field
                                            type="text"
                                            id="fatherName"
                                            name="fatherName"
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            className="border text-sm h-6  w-full  p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <ErrorMessage
                                            name="fatherName"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div className="w-64">
                                        <InputLabel
                                            htmlFor="lastName"
                                            value="تخلص"
                                            className="mx-2 mb-1"
                                        />

                                        <Field
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            className="border text-sm h-6  w-full  p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            autoComplete="lastName"
                                            required
                                        />
                                        <ErrorMessage
                                            name="lastName"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div className="w-64">
                                        <InputLabel
                                            htmlFor="phone"
                                            value="تلیفون"
                                            className="mx-2 mb-1"
                                        />

                                        <Field
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            className="border text-sm h-6  w-full  p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            autoComplete="lastName"
                                            required
                                        />
                                        <ErrorMessage
                                            name="phone"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div className="w-64">
                                        <InputLabel
                                            htmlFor="personQuantity"
                                            value="تعداد نفر"
                                            className="mx-2 mb-1"
                                        />

                                        <Field
                                            id="personQuantity"
                                            name="personQuantity"
                                            type="number"
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            className="border text-sm h-6  w-full  p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <ErrorMessage
                                            name="personQuantity"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div className="w-64">
                                        <InputLabel
                                            htmlFor="type"
                                            value="نوعیت"
                                            className="mx-2 mb-1"
                                        />
                                        <SelectType
                                            placeholder=""
                                            name="type"
                                            types={types}
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            values={values}
                                            setFieldValue={setFieldValue}
                                        />
                                    </div>
                                    <div className="w-64">
                                        <InputLabel
                                            htmlFor="menu"
                                            value="Menu"
                                            className="mx-2 mb-1"
                                        />
                                        <SelectMenu
                                            setDataBooking={setDataBooking}
                                            menus={menus}
                                            setMenuName={setMenuName}
                                            setPrice={setPrice}
                                            setPersonQuantity={
                                                setPersonQuantity
                                            }
                                            setRemoveItems={setRemoveItems}
                                            setNewAddItems={setNewAddItems}
                                            name="menu"
                                            values={values}
                                            setFieldValue={setFieldValue}
                                        />
                                    </div>
                                    <div className="w-64">
                                        <InputLabel
                                            htmlFor="hall"
                                            value="نام صالون"
                                            className="mx-2 mb-1"
                                        />
                                        <SelectHall
                                            setDataBooking={setDataBooking}
                                            types={halls}
                                            name="hall"
                                            values={values}
                                            setFieldValue={setFieldValue}
                                        />
                                    </div>
                                    <div className="w-64 text-right">
                                        <InputLabel
                                            htmlFor="date"
                                            value="تاریخ"
                                            className="mx-2 mb-1"
                                        />
                                        <Field
                                            type="date"
                                            id="date"
                                            name="date"
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            className="border text-sm h-6  w-full  p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <ErrorMessage
                                            name="date"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div className="w-64">
                                        <InputLabel
                                            htmlFor="typeDays"
                                            value="روز یا شب"
                                            className="mx-2 mb-1"
                                        />
                                        <SelectType
                                            placeholder=""
                                            name="typeDays"
                                            types={typeDays}
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            values={values}
                                            setFieldValue={setFieldValue}
                                        />
                                    </div>
                                    <div className="py-6">
                                        <PrimaryButton
                                            type="submit"
                                            className="ms-4 w-52"
                                            // disabled={isSubmitting}
                                        >
                                            Save
                                        </PrimaryButton>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

            {errorMessage ? (
                <ErrorCart message={errorMessage} />
            ) : (
                message && <Cart message={message} />
            )}
        </AuthenticatedLayout>
    );
};
export default BookHotel;
