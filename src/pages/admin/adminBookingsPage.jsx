import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //for popup window
  const [activeOrder, setActiveOrder] = useState(null)
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem("token");
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/getAllOrders`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Orders:", res.data);
          setOrders(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error.response?.data || error.message);
          setLoading(false);
        });
    }
  }, [loading]);

  function handleOrderStatus(orderId, status){
    const token =  localStorage.getItem("token");
    console.log(orderId, status);

    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
        {
            status : status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
    ).then(()=>{
        setLoading(true)
    }).catch((error) => {
        console.error("Error:", error.response?.data || error.message);
        setLoading(true);
        
      });
  }

  return (
    <div className="w-full h-full flex flex-col items-center font-[Poppins]">
      
        <h1 className="text-blue-800 text-[30px] font-bold">Orders</h1>
      

      <div className="overflow-x-auto w-full p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <h1>Loading...</h1>
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-[15px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase">
                  Order ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase">
                  Order Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase">
                  Start Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase">
                  End Date
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-600 uppercase">
                  Days
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-600 uppercase">
                  Total Amount
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-600 uppercase">
                  Status
                </th>
                
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-600 text-sm">
              {orders.map((order) => (
                <tr key={order._id} className="cursor-pointer"
                    onClick={()=>{
                      setActiveOrder(order);
                      setShowPopup(true);
                    }}
                >
                  <td className="px-4 py-2 whitespace-nowrap">{order.orderId}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{order.email}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(order.orderDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(order.startingDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(order.endingDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    {order.days}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-right">
                    LKR {order.totalAmount}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    {order.status}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {
            showPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-[#00000090] flex items-center justify-center">
                    <div className="w-[700px] bg-white rounded-[15px] p-4 relative">
                        <IoMdClose className="absolute right-4 w-5 h-5 hover:text-red-600 cursor-pointer"
                                    onClick={()=>{setShowPopup(false)}}
                        />
                        <h1 className="text-blue-800 text-[30px] font-bold">Order Details</h1>
                        <div className="flex flex-col space-y-2">
                            <p><span className="font-bold">Order ID:</span> {activeOrder.orderId}</p>
                            <p><span className="font-bold">Email:</span> {activeOrder.email}</p>
                            <p><span className="font-bold">Order Date:</span> {new Date(activeOrder.orderDate).toLocaleString()}</p>
                            <p><span className="font-bold">Starting Date:</span> {new Date(activeOrder.startingDate).toLocaleDateString()}</p>
                            <p><span className="font-bold">Ending Date:</span> {new Date(activeOrder.endingDate).toLocaleDateString()}</p>
                            <p><span className="font-bold">Days:</span> {activeOrder.days}</p>
                            <p><span className="font-bold">Total Amount:</span> LKR {activeOrder.totalAmount}</p>
                            <p><span className="font-bold">Status:</span> {activeOrder.status}</p>
                            <div className="flex items-center justify-center space-x-2 my-4">
                                <button
                                    className="w-[300px] bg-green-500 hover:bg-green-600 text-white text-md px-2 py-1 rounded"
                                    onClick={() => handleOrderStatus(activeOrder.orderId, "Approved")}
                                    >
                                    Approve
                                </button>
                                <button
                                    className="w-[300px] bg-red-500 hover:bg-red-600 text-white text-md px-2 py-1 rounded"
                                    onClick={() => handleOrderStatus(activeOrder.orderId, "Declined")}
                                    >
                                    Decline
                                </button>
                            </div>
                            
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product Name
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quantity
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Unit Price
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Price
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {activeOrder.orderedItems.map((item) => (
                                    <tr key={item.product.key}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img
                                        src={item.product.image}
                                        alt="Product"
                                        className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.product.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {item.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        LKR {item.product.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        LKR {item.product.price * item.quantity}
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>   
                    </div>
                </div>
            )
        }
      </div>
        
    </div>
  );
}
