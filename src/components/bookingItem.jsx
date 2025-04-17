import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../utils/cart";
import { FaDeleteLeft, FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function BookingItem(props) {
  const { itemKey, qty, refresh } = props;
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getOneProduct/${itemKey}`)
        .then((res) => {
          setItem(res.data);
          setStatus("loaded");
        })
        .catch((err) => {
          console.log("Error details:", err.response?.data || err.message);
          setStatus("error");
          removeFromCart(itemKey);
          refresh();
        });
    }
  }, [status, itemKey, refresh]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center p-2">
        <div className="w-6 h-6 border-t-2 border-blue-600 animate-spin rounded-full"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="p-2">
        <p className="text-red-600 text-sm">Unable to load product details.</p>
      </div>
    );
  }

  // Minimal and compact product card with total price calculation
  return (
    <div className="w-[600px] flex items-center p-2 border rounded-md my-2">
      {/* Thumbnail image */}
      <img
        src={item.image[0] || "https://via.placeholder.com/150"}
        alt={item.name}
        className="w-20 h-20 object-cover rounded mt-[-30px]"
      />
      {/* Product info */}
      <div className="ml-3 flex-1 mt-[-30px]">
        <h3 className="text-base font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>
      </div>
      {/* Price, quantity, and total */}
      <div className="text-right ">
        <p className="text-sm font-bold">LKR {item.price}.00</p>
         
        <div className="flex items-center justify-end my-1 mr-0 space-x-1">
          <button
            className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded text-xs font-bold"
            onClick={() => {
              if (qty <= 1) {
                removeFromCart(itemKey);
                refresh();
              } else {
                addToCart(itemKey, -1);
                refresh();
              }
            }}
          >
            –
          </button>
          <span className="text-sm">{qty}</span>
          <button
            className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded text-xs font-bold"
            onClick={() => {
              addToCart(itemKey, 1);
              refresh();
            }}
          >
            +
          </button>
        </div>


          
        <p className="text-sm font-bold text-blue-600">
          Total: LKR {item.price * qty}.00
        </p>
        
        <button className="text-red-500 hover:text-black  w-[30px] h-[30px] items-center justify-end rounded-full"
                onClick={()=>{
                  removeFromCart(itemKey);
                  refresh();
                  toast.success("Removed from cart!");
                }}
        >
          <FaTrash/>
        </button>
        
      </div>
    </div>
  );
}
