import React, { useEffect, useState } from 'react';
import { Mail, Phone, CheckCircle } from 'lucide-react';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Verify = ({ user }) => {
  const url = import.meta.env.VITE_API_URL;
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);

  const [emailVerified, setEmailVerified] = useState(false); 
  const [phoneVerified, setPhoneVerified] = useState(false);  

  const navigate = useNavigate();  

  const verifyEmail = async () => {
    const data = { email: user.companyMail, otp: email };

    try {
      await axios.post(`${url}/verify-email`, data);
      setEmailVerified(true);  
      toast('Email Verified ',{type:'success'});
    } catch (error) {
      toast(error.response.data.message,{type:error});
      console.log('Error while verifying email:', error.message);
    }
  };

  const verifyPhone = async () => {
    const data = { phoneNumber: user.phoneNumber, otp: phoneNumber };
    try {
      await axios.post(`${url}/verify-phone`, data);
      setPhoneVerified(true);  
      toast('Phone Verified ',{type:'success'});
    } catch (error) {
      toast(error.response.data.message,{type:error});
      console.log('Error while verifying phone number:', error.message);
    }
  };
  useEffect(()=>{
         if(emailVerified && phoneVerified) navigate('/signin');
  },[emailVerified,phoneVerified])

  return (
    <>
      <div className="flex items-center flex-col gap-4">
        <h2 className="text-2xl font-semibold">Verify</h2>
        <p className="mb-4">Please verify to continue.</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Mail color="gray" />
          </div>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email OTP"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            disabled={emailVerified}  
            className={`bg-gray-100 pl-10 py-2 border ${emailVerified ? 'border-green-500' : 'border-gray-300'} rounded-md w-full focus:outline-none placeholder:text-gray-600`}
          />
          {emailVerified && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <CheckCircle color="green" />  
            </div>
          )}
        </div>
        {!emailVerified && (
          <button onClick={verifyEmail} className="bg-blue-600 p-2 text-white">
            Verify Email
          </button>
        )}

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Phone color="gray" />
          </div>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone OTP"
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={phoneVerified}  
            className={`bg-gray-100 pl-10 py-2 border ${phoneVerified ? 'border-green-500' : 'border-gray-300'} rounded-md w-full focus:outline-none placeholder:text-gray-600`}
          />
          {phoneVerified && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <CheckCircle color="green" />  
            </div>
          )}
        </div>
        {!phoneVerified && (
          <button onClick={verifyPhone} className="bg-blue-600 p-2 text-white">
            Verify Phone
          </button>
        )}
      </div>
    </>
  );
};

export default Verify;
