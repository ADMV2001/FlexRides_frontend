import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage() {
  const [cart, setCart] = useState(loadCart());
  const today = formatDate(new Date());
  const tomorrow = formatDate(new Date(Date.now() + 86400000)); // 24 hours in milliseconds
  const [total, setTotal] = useState(0);


  // New states for booking dates
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);

  // Helper function to calculate the number of days between dates
  const calculateDays = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diff = endTime - startTime;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 1;
  };

  const days = calculateDays(startDate, endDate);

  console.log(cart);

  function reloadCart() {
    setCart(loadCart());
    calculateTotal();
  }

  function calculateTotal(){
    const cartInfo = loadCart();
    cartInfo.startingDate = startDate;
    cartInfo.endingDate = endDate;
    cartInfo.days = days;

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/getQuotation`,{
      cartInfo
    }).then((res) => {
      console.log(res.data);
      setTotal(res.data.total);

    }).catch((err) => {
      console.log("Error details:", err.response?.data || err.message);
      toast.error("Error occurred while fetching quotation. Please try again.");
    })
  }

  useEffect(()=>{
    calculateTotal();
  },[startDate, endDate]);


  function handleBooking() {
    const cart = loadCart();
    cart.startingDate = startDate;
    cart.endingDate = endDate;
    cart.days = days;

    const token = localStorage.getItem("token");
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/createOrder`, cart, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log(res.data);
      localStorage.setItem("cart", JSON.stringify({ orderedItems: [], days: 1, startingDate: today, endingDate: tomorrow }));
      setCart({ orderedItems: [], days: 1, startingDate: today, endingDate: tomorrow });
      toast.success("Booking request sent successfully!");
    }).catch((err) => { 
      console.log("Error details:", err.response?.data || err.message);
      toast.error("Error occurred while booking. Please try again.");
    });
  }

  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <h1 className="font-bold text-[28px] my-[15px] text-blue-900">Book Yours Now</h1>

        {/* section for date inputs and total days calculation */}
        <div className="w-[600px] rounded-[10px] flex justify-center bg-blue-100 p-4 border-1 border-gray-300">
          {/* This inner container forces a fixed width of 600px */}
          <div className="w-[600px] flex flex-col justify-between items-center">
            <div className="flex flex-col">
              <label htmlFor="startDate" className="text-blue-700 font-semibold text-sm">
                Starting Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded p-1 text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="endDate" className="text-sm text-blue-700 font-semibold">
                Ending Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded p-1 text-sm"
              />
            </div>
            <div className="mt-[20px] ">
              <p className="text-sm text-black font-bold text-[15px]">
                Total Days: <span className="font-bold">{days}</span>
              </p>
            </div>

            <div className="bg-blue-200 p-2 rounded-[10px] mt-[20px] w-full text-center">
             <p><span className="font-bold text-blue-800">Sub Total :</span>
                <span className="font-semibold"> LKR {total.toFixed(2)}</span>
             </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center mt-[20px]">
          {cart.orderedItems.map((item) => {
            return (
              <BookingItem
                key={item.key}
                itemKey={item.key}
                qty={item.quantity}
                refresh={reloadCart}
              />
            );
          })}
        </div>

        <button className="w-[300px] h-[30px] mt-[10px] rounded-[10px] bg-blue-500 text-white font-semibold"
                onClick={handleBooking}
        >
          Request a Booking
        </button>

      </div>
    </>
  );
}
