import React from "react";
import { SiGnuprivacyguard } from "react-icons/si";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { asyncsignupuser } from "../../store/actions/userActions";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupsubmitHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false; // Default to false for regular users
    user.cart = []; // Initialize an empty cart
    console.log("User ---:", user);
    
    dispatch(asyncsignupuser(user));
    navigate("/signin"); // Redirect to sign-in page after signup
    console.log("User signed up:", user);
  };

  return (
    <div className="flex justify-center w-full items-center h-full bg-gradient-to-b from-[#C0E4F5] via-[#B6DDF2] to-[#E8F2F8] bg-[length:100%_100%]">
      <div className=" my-10 space-y-3 bg-white shadow-lg rounded-3xl  flex flex-col bg-gradient-to-b from-[#b6efff] to-[#ffffff] bg-[length:100%_100%] justify-center items-center p-8">
        <h1 className="text-center text-xl bg-white p-2 rounded-xl">
          <SiGnuprivacyguard />
        </h1>
        <form
          onSubmit={handleSubmit(signupsubmitHandler)}
          className="w-full p-3 flex flex-col"
        >
          <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>
          <div className="mb-4">
            <input
              {...register("username", { required: true })}
              type="text"
              id="username"
              className="w-full px-2 py-1 outline-0 border bg-[#EFF3F6] border-gray-300 rounded-lg"
              placeholder="john-doe"
              required
            />
          </div>
          <div className="mb-4">
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className="w-full px-2 py-1 outline-0 border bg-[#EFF3F6] border-gray-300 rounded-lg"
              placeholder="john@gmail.exa"
              required
            />
          </div>
          <div className="mb-4">
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              id="password"
              className="w-full px-2 py-1 outline-0 border bg-[#EFF3F6] border-gray-300 rounded-lg"
              placeholder="******"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
