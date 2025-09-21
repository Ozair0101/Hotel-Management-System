import * as yup from "yup";

export const BookingPaymentSchema = (maxNumber) =>
    yup.object().shape({
        credit: yup.number().max(maxNumber).min(1).required(),
    });
