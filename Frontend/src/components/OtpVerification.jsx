import React, { useContext, useEffect, useRef, useState } from 'react'
import { server } from "../../utils/api";
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from '../main';

export const OtpVerification = ({setPopup}) => {

    const { setRefresh, loading, setLoading,user } = useContext(UserContext);

   const [inputs, setInputs] = useState(Array(4).fill(""));

   const ref = [useRef(), useRef(), useRef(), useRef()];

   const handleChange = (e, index) => {
       const value = e.target.value;
       
       if (isNaN(value)) return;

       if (value.length === 1 && index < inputs.length - 1) {
         ref[index + 1].current.focus();
       
        }
      
         const copyInputs = [...inputs];
         copyInputs[index] = value;
         setInputs(copyInputs);
         

     };
 
   
     const handleKeyDown = (e, index) => {

       if (e.key === "Backspace") {

         setInputs((prev) => {
           const copyInputs = [...prev];
           copyInputs[index] = "";
           return copyInputs; 
          });
   
         if (index > 0) {
           ref[index - 1].current.focus();
         }
       }
       
     };
   
   
     const handlePaste = (e) => {
       e.preventDefault();
       const data = e.clipboardData.getData("text");
       if (!Number(data) || data.length !== inputs.length) return;
   
       const pasteCode = data.split("");
       setInputs(pasteCode);
   
       ref[inputs.length - 1].current.focus();
     };
   
     useEffect(()=>{
           ref[0].current.focus()
     },[])
  
   
     const handleVerified = async (e) => {
       e.preventDefault();
       setLoading(true);
       const OneTimePassword = inputs.join("");
       try {
         const { data } = await axios.post(
           `${server}/api/v1/user/verify-Otp`,
           {
             OneTimePassword,
           },
           {
             headers: {
               "Content-Type": "application/json",
             },
             withCredentials: true,
           }
         );
   
         toast.success(data.message);
         setRefresh(true);
         setLoading(false);
         setPopup(false);
       } catch (error) {
         console.log(error);
         toast.error(error.response.data.message);
         setRefresh(false);
         setLoading(false);
       }
     };
   


  return ( <div class="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
  <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div class="flex flex-col items-center justify-center text-center space-y-2">
        <div class="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div class="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email {user.email}</p>
        </div>
      </div>

      <div>
        <form action="" method="post" onSubmit={(e) => handleVerified(e)}>
          <div class="flex flex-col space-y-16">
            <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              {inputs.map((data, index) => (
                <div class="w-14 h-14" key={index}>
                  <input
                    class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    ref={ref[index]}
                    maxLength='1'
                    value={inputs[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={(e) => handlePaste(e)}
                  />
                </div>
              ))}
            </div>

            <div class="flex flex-col space-y-5">
              <div>
                <button
                  onClick={handleVerified}
                  
                  class=" cursor-pointer flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                >
                 {loading ? "Verifying..." : "Verify Account" } 
                </button>
              </div>

              <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p>{" "}
                <button
               
                  class="flex flex-row items-center text-blue-600 cursor-pointer"
               
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resend
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
)
}

export default OtpVerification
