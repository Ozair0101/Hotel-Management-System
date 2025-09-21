import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import SelectType from "../Booking/SelectType";
import SelectHall from "./SelectHall";

const BookingReport = () => {
    const { halls } = usePage().props;

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
    const submit = (values, action) => {
        const data = {
            start: values.start,
            end: values.end,
            hall: values.hall,
        };
        try {
            router.post(route("bookingReport.index"), data, {
                onSuccess: () => {
                    action.resetForm();
                },
                onError: () => {
                    alert("Start date must less then End date");
                    action.resetForm();
                },
            });
        } catch (error) {
            console.error(error.getMessage());
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Booking Report
                </h2>
            }
        >
            <Head title="AddMenu" />

            <div className="py-4 text-right">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className={`bg-white/80 shadow-sm sm:rounded-lg`}>
                        <Formik
                            onSubmit={submit}
                            // validationSchema={BookSchema}
                            initialValues={{
                                hall: "",
                                start: "",
                                end: "",
                            }}
                        >
                            {({
                                handleSubmit,
                                submitForm,
                                isSubmitting,
                                setFieldValue,
                                values,
                            }) => (
                                <Form
                                    className="mt-4 space-y-1 p-2"
                                    onSubmit={handleSubmit}
                                    dir="rtl"
                                >
                                    <div className="w-64 text-right">
                                        <InputLabel
                                            htmlFor="start"
                                            value="Start Date"
                                            className="mx-2 mb-1"
                                        />
                                        <Field
                                            type="date"
                                            id="start"
                                            name="start"
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            className="border text-sm h-6  w-full  p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <ErrorMessage
                                            name="start"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div className="w-64 text-right">
                                        <InputLabel
                                            htmlFor="end"
                                            value="End Date"
                                            className="mx-2 mb-1"
                                        />
                                        <Field
                                            type="date"
                                            id="end"
                                            name="end"
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, submitForm)
                                            }
                                            className="border text-sm h-6  w-full  p-2 border-gray-300 shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <ErrorMessage
                                            name="end"
                                            className="text-red-500"
                                            component="p"
                                        />
                                    </div>
                                    <div className="w-64">
                                        <InputLabel
                                            htmlFor="hall"
                                            value="نام صالون"
                                            className="mx-2 mb-1"
                                        />
                                        <SelectHall
                                            placeholder=""
                                            name="hall"
                                            types={halls}
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
                                            className="ms-4"
                                            // disabled={isSubmitting}
                                        >
                                            Show
                                        </PrimaryButton>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default BookingReport;
