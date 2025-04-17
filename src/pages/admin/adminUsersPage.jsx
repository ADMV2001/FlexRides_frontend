import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);

  useEffect(() => {
    if (!usersLoaded) {
      const token = localStorage.getItem("token");
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      axios
        .get(`${backendUrl}/api/users/getAllUsers`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
          setUsersLoaded(true);
        })
        .catch((err) => {
          console.log("Error details:", err.response?.data || err.message);
        });
    }
    
  }, [usersLoaded]);

  function handleBlockUser(email){
    const token = localStorage.getItem("token");

    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`,{},
        {
            headers :{
            Authorization: "Bearer " + token,
        }
      }
    ).then((res)=>{
        console.log(res.data);
        setUsersLoaded(false);
      }).catch((err)=>{ 
        console.log("Error details:", err.response?.data || err.message);
      })
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Users Page</h1>
      <div className="overflow-x-auto rounded-[15px]">
        <table className="min-w-full bg-white border border-gray-200 rounded-[15px]">
          <thead className="bg-gray-50 ">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Profile
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Address
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Mobile
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={user.profilePic}
                    alt={`${user.firstName}'s profile`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.userRole}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  
                  <button
                    className="bg-black p-1 rounded-[7px] text-[13px]  text-white cursor-pointer"
                    onClick={()=>{handleBlockUser(user.email)}}
                  >
                    {user.isBlocked? "Blocked" : "Active"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
