import * as yup from "yup";

const validationSchema = yup.object().shape({
  currentProducts: yup.string().required("Please Enter Product ID"),
});

export default validationSchema;
