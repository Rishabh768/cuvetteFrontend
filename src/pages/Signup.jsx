import React, { useEffect, useState } from "react";
import { User, Phone, Mail, Users, Loader2, Eye } from "lucide-react";
import Verify from "./Verify";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { useAuth } from "../component/AuthProvider";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const {user}=useAuth();
  const navigate=useNavigate();
  useEffect(()=>{
    if(user){
      navigate('/dashboard')
    }
  },[user]);

  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const url=import.meta.env.VITE_API_URL;

  const handleProceed = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      setUserData(data);
      await axios.post(`${url}/register`, data);
      setIsVerifying(true);
      toast("Company register Success",{type:'success'});
    } catch (error) {
      console.log(error);
      toast(error.response.data.message,{type:'error'});
      setLoading(false);
    }
  };


  const { register, handleSubmit,formState:{errors} } = useForm();

  return (
    <section className="flex p-10">
      <div className="flex text-wrap w-1/2 items-center">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          itaque, a sunt recusandae facere non, molestiae cum vero commodi
          dignissimos illo optio dolorem quo at cumque amet illum fugiat
          voluptates?
        </p>
      </div>

      <div className="w-full flex justify-center ">
        <div className="w-[50%] gap-6 border p-4">
          {!isVerifying ? (
            <div>
              <div className="flex items-center flex-col gap-4">
                <h2 className="text-2xl font-semibold">Sign Up</h2>
                <p className="mb-4">Please Sign Up to continue.</p>
              </div>

              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(handleProceed)}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <User color="gray" />
                  </div>
                  <input
                    {...register("name",{required:'Name is required'})}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="bg-gray-100 pl-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none placeholder:text-gray-600"
                  />
                  {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Phone color="gray" />
                  </div>
                  <input
                    {...register("phoneNumber",{required:'Phone number is required'})}
                    type="text"
                    name="phoneNumber"
                    id="phone"
                    placeholder="Phone No."
                    className="bg-gray-100 pl-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none placeholder:text-gray-600"
                  />
                    {errors.phoneNumber && <span className="text-red-600 text-sm">{errors.phoneNumber.message}</span>}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <User color="gray" />
                  </div>
                  <input
                    {...register("companyName",{required:'Company name is required'})}
                    type="text"
                    name="companyName"
                    id="company"
                    placeholder="Company Name"
                    className="bg-gray-100 pl-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none placeholder:text-gray-600"
                  />
                    {errors.companyName && <span className="text-red-600 text-sm">{errors.companyName.message}</span>}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail color="gray" />
                  </div>
                  <input
                    {...register("companyMail",{required:'Enter a email'})}
                    type="email"
                    name="companyMail"
                    id="companymail"
                    placeholder="Company Email"
                    className="bg-gray-100 pl-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none placeholder:text-gray-600"
                  />
                    {errors.companyMail && <span className="text-red-600 text-sm">{errors.companyMail.message}</span>}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Users color="gray" />
                  </div>
                  <input
                    {...register("employeeSize",{required:'Employee size required'})}
                    type="text"
                    name="employeeSize"
                    id="empsize"
                    placeholder="Employee Size"
                    className="bg-gray-100 pl-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none placeholder:text-gray-600"
                  />
                    {errors.employeeSize && <span className="text-red-600 text-sm">{errors.employeeSize.message}</span>}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Eye color="gray" />
                  </div>
                  <input
                    {...register("password",{required:'Password is required'})}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="bg-gray-100 pl-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none placeholder:text-gray-600"
                  />
                    {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                </div>
                <p className="text-center text-sm text-gray-500">
                  By clicking on proceed you will accept our
                  <br />
                  <a className="text-blue-500 font-semibold" href="#">
                    Term & Condition
                  </a>
                </p>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold p-2 rounded-md w-full flex items-center justify-center"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                  ) : (
                    "Proceed"
                  )}
                </button>

              </form>
            </div>
          ) : (
            <Verify user={userData} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Signup;
