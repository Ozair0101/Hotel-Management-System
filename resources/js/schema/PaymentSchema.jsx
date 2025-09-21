import * as yup from "yup";

export const PaymentSchema = (maxLimit) =>
    yup.object().shape({
        payment_type: yup.string().required(),
        credit: yup.number().max(maxLimit).min(1).required(),
    });
