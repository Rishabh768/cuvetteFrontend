import { Mail,Eye, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios  from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Signin = () => {

   const [loading,setLoading]=useState(false);
    const {handleSubmit,register,formState:{errors}}=useForm();
    const navigation=useNavigate();
    const url=import.meta.env.VITE_API_URL;

    const submit=async(data)=>{
      setLoading(true);
           try {
             const res= await axios.post(`${url}/signin`,data);
             console.log(res.data.token);
             const {token}=res.data;
             Cookies.set('x-token',token,{expires:7,sameSite:'strict',secure:true})
             setLoading(false);
             navigation('/dashboard');
              
           } catch (error) {
             console.log(error);
             setLoading(false);
             toast(error.response?.data?.message,{type:'error'});
           }
    }

 return <div className="flex justify-center">
    <div className="w-[40%]">
    <div className="flex items-center flex-col gap-4">
                <h2 className="text-2xl font-semibold">Sign In</h2>
                <p className="mb-4">Please Sign In to continue.</p>
              </div>
              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(submit)}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail color="gray" />
                  </div>
                  <input
                    {...register("email",{required:'Please enter a email'})}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    className="bg-gray-100 pl-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none placeholder:text-gray-600"
                  />
                  {errors.email&& <span className="text-red-600 text-sm">{errors.email.message}</span>}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Eye color="gray" />
                  </div>
                  <input
                    {...register("password",{required:'Please enter password'})}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    className="bg-gray-100 pl-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none placeholder:text-gray-600"
                    />
                    {errors.password&& <span className="text-red-600 text-sm">{errors.password.message}</span>}
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold p-2 rounded-md w-full flex items-center justify-center"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                  ) : (
                    "Sign In"
                  )}
                </button>
                </form>
                </div>
 </div>
};

export default Signin;
