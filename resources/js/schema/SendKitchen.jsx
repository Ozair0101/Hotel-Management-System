import * as yup from "yup";

export const SendKitchenSchema = (maxQuantity) =>
    yup.object().shape({
        quantity: yup.number().max(maxQuantity).min("1").required("required"),
        unitPrice: yup
            .number()
            .required("Required")
            .positive("Must be grader then zero"),
        discount: yup.number(),
        batch: yup.string().required(),
    });
