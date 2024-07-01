import { ToastDeleteProps } from "@/interfaces/toast.interfaces";
import { deleteProductService } from "@/services/products.services";
import toast from "react-hot-toast";

export const toastDelete = ({ data, onClose }: ToastDeleteProps) => {
  const handleToastConfirm = async (t: any) => {
    const response = await deleteProductService(data._id);
    if (response.status === 200) {
      toast.success("Product deleted successfully");
      onClose();
    }
    toast.dismiss(t.id);
  };
  const handleToastCancel = (t: any) => {
    toast.dismiss(t.id);
  };

  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src="https://cdn-icons-png.freepik.com/512/5626/5626203.png"
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              Do you want to delete this product?
            </p>
            <p className="mt-1 text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => handleToastConfirm(t)}
          className="w-full bg-danger/80 border border-primaryDark rounded-none p-4 flex items-center justify-center text-sm font-medium text-white hover:text-white/50 focus:outline-none focus:ring-2 focus:primaryDark"
        >
          Delete
        </button>
        <button
          onClick={() => handleToastCancel(t)}
          className="w-full bg-primary border border-primaryDark rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-white hover:text-white/50 focus:outline-none focus:ring-2 focus:primaryDark"
        >
          Cancel
        </button>
      </div>
    </div>
  ));
};
