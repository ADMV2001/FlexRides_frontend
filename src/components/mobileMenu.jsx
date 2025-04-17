import { AiFillHome } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { MdContactPhone, MdPhotoLibrary, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaInfoCircle, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MobileMenu({ isOpen, setOpen }) {
  const navigate = useNavigate();

  function goTo(route) {
    navigate(route);
    setOpen(false);
  }

  const MenuItem = ({ icon, label, route }) => (
    <div
      className="text-[18px] text-gray-700 m-2 px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-blue-100 cursor-pointer transition-all duration-150"
      onClick={() => goTo(route)}
    >
      {icon}
      {label}
    </div>
  );

  return (
    <>
      {isOpen && (
        <div className="w-full h-screen bg-[#00000090] fixed top-0 left-0 z-20">
          <div className="w-[300px] h-full bg-white rounded-r-[10px] relative shadow-lg">
            {/* Header */}
            <div className="bg-blue-50 w-full h-[50px] flex justify-center items-center rounded-r-[10px] relative">
              <img
                src="/logo1.png"
                alt="logo"
                className="w-[25px] h-[25px] object-cover absolute left-1.5 rounded-full"
              />
              <h1 className="font-bold text-[20px] absolute left-[40px]">SOUND STUDIO</h1>
              <IoClose
                className="absolute right-[15px] w-[22px] h-[22px] text-gray-700 hover:text-red-500 cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Menu Items */}
            <div className="mt-4">
              <MenuItem icon={<AiFillHome />} label="Home" route="/home" />
              <MenuItem icon={<MdContactPhone />} label="Contact" route="/contact" />
              <MenuItem icon={<FaInfoCircle />} label="About" route="/about" />
              <MenuItem icon={<MdPhotoLibrary />} label="Gallery" route="/gallery" />
              <MenuItem icon={<MdOutlineProductionQuantityLimits />} label="Products" route="/products" />
              <MenuItem icon={<FaClipboardList />} label="Booking Requests" route="/bookings" />
            </div>
            <h1 className="text-black absolute bottom-1 text-xs left-20">All Rights Reserved.</h1>
          </div>
          
        </div>
      )}
    </>
  );
}
