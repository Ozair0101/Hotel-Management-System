import * as yup from "yup";

export const MenuSchema = () =>
    yup.object().shape({
        menu: yup
            .number("must be a number")
            .min(1, "must grater than 0")
            .required(),
        price: yup.number().min(1).required(),
    });
