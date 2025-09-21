import * as yup from "yup";

export const Quantity = (maxQuantity) =>
    yup.object().shape({
        quantity: yup.number().max(maxQuantity).min("1").required("required"),
        unitPrice: yup
            .number()
            .required("Required")
            .positive("Must be grader then zero"),
        sellPrice: yup.number().positive("Price Can't be negative").required(),
        discount: yup.number(),
        batch: yup.string().required(),
        // customer: yup.string().required(),
    });
