import { Toaster, toast } from "react-hot-toast";

type ToastType = "success" | "error";

type ShowToastProps = {
  type: ToastType;
  message: string;
};

export const showToast = ({ type, message }: ShowToastProps) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  }
};

// ToastProvider must be included in your root layout or App component
export const ToastProvider = () => (
  <Toaster position="top-right" reverseOrder={false} />
);
