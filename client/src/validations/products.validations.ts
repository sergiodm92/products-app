import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Your email is invalid.")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerValidationSchema = Yup.object()
  .shape({
    name: Yup.string()
      .min(6, "Name must be at least 6 characters.")
      .required("Name is required"),
    email: Yup.string()
      .email("Your email is invalid.")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    terms: Yup.bool().oneOf(
      [true],
      "You must accept our Terms & Conditions to continue."
    ),
  })
  .required();


  export const createProductValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be a positive number")
      .required("Price is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.string().url("Must be a valid URL"),
    stock: Yup.number()
      .typeError("Stock must be a number")
      .integer("Stock must be an integer")
      .required("Stock is required"),
  });
  