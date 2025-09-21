import * as yup from "yup";

export const BookSchema = () =>
    yup.object().shape({
        firstName: yup.string().min(1).required(),
        lastName: yup.string().required(),
        fatherName: yup.string().required(),
        personQuantity: yup.number().min(1).required(),
    });
