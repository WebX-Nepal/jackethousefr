import * as yup from "yup";

const validationSchema = yup.object().shape({
  phoneNumber: yup.number().required("Please Enter Phone Number"),
  newName: yup.string(),
});

export default validationSchema;
