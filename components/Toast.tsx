// components/Toast.js
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <div>
      <ToastContainer closeOnClick autoClose={5000} />
    </div>
  );
};

export default Toast;
