import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showNotification = (message, type = "default") => {
  const toastOptions = {
    closeButton: false,
    autoClose: 3000,
    position: "top-right",
  };
  switch (type) {
    case "success":
      console.log("hello");
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "warning":
      toast.warn(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};

export default function Notification() {
  return <ToastContainer />;
}
