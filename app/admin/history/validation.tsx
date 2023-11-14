import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Please Enter Product Name"),
  category: yup.string().required("Please Enter Product Category"),
  costPrice: yup.number().required("Please Enter Cost Price"),
  sellingPrice: yup.number().required("Please Enter Selling Price"),
  discount: yup.number(),
  size: yup.string(),
  color: yup.string(),
});

export default validationSchema;
