import React, {  useContext, useState } from "react";
import { UserContext } from "../main";
import axios from "axios";
import { OtpVerification } from "../components/OtpVerification";
import { server } from "../../utils/api";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setRefresh,loading,setLoading} = useContext(UserContext);
  const [toggle, setToggle] = useState(true);
  const [popup, setPopup] = useState(false);


  const handleToggle = () => {
    setToggle(!toggle);
  };

   
  const handleVerification = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/verify-email`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setLoading(false)
      setPopup(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setRefresh(false);
      setLoading(false)
      setPopup(false);
    }
  };
  

  return popup ? (
    <OtpVerification setPopup={setPopup} />
  ) : (
<>
   
    <div className="bg-white  shadow flex justify-center  border  text-center min-h-screen">
      
      <div className=" w-1/2 mt-20">
     
        <div className="px-4 py-5 sm:px-6 ">
          <h1 className=" leading-6 text-center text-3xl font-medium text-gray-900 mb-5">
            Welcome,
            <span className=" text-blue-700 text-[23px] md:text-4xl mt-4  ">
              {user.name}
            </span>
          </h1>
          <p className="mt-1 max-w-2xl text-md text-gray-500 text-sm ">
            This is some information about the You.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <div className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <p className="text-sm font-medium text-gray-500">Full name</p>
              <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.name}
              </p>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative ">
              <p className="text-sm font-medium text-gray-500">Email address</p>

              <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2  ">
                {user.email}
                {user.emailVerified ? (
                  <span className=" absolute  text-[10px]  cursor-pointer text-blue-600 font-bold right-[-30px] top-0 bottom-3  md:top-4 md:right-14">
                    Verified Email
                  </span>
                ) : (
                  <span
                    onClick={handleVerification}
                    className=" animate-bounce text-[10px] absolute right-[-30px] top-0 bottom-3  md:top-4 md:right-14 cursor-pointer text-red-600 font-bold    "
                  >
                    {loading ? 'verifying...'  : "Verify Email"}
                  </span>
                )}
              </p>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <p className="text-sm font-medium text-gray-500">Country</p>
              <p className="flex justify-center items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2  relative ">
                
                {user.country}
              </p>
            </div>
          </div>
        </div>
      </div>
 
    </div>
    </>
  );
};

export default Profile;
