import * as yup from "yup";

export const addProductForm = yup.object().shape({
    unitPrice: yup
        .number()
        .required("Required")
        .positive("Must be grader then zero"),
    quantity: yup
        .number()
        .positive("Must be grader then zero")
        .required("required"),
    sellPrice: yup.number().positive("Price Can't be negative").required(),
    billNumber: yup.string().required(),
    discount: yup.number(),
    expireDate: "",
    batch: yup.string().required(),
    cashDis: yup.number(),
});
