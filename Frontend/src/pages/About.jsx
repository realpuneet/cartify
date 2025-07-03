import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#C0E4F5] via-[#c9ebfd] to-[#ffffff] flex flex-col justify-center items-center px-5 text-center">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl bg-white p-8 rounded-2xl shadow-2xl"
      >
        
        <div className="flex justify-center mb-6 text-blue-500 text-6xl">
          <FaShoppingCart />
        </div>

        <h1 className="text-4xl font-bold text-gray-700 mb-4">About <span className="text-red-500">Cartify</span></h1>
        
        <p className="text-gray-600 text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-blue-500">Cartify</span> — your one-stop destination for exploring, managing, and shopping products seamlessly.
          <br /><br />
          Cartify offers an intuitive platform where you can browse products, view detailed information, and add your favorites to the cart with ease. Admin users have full control to manage products dynamically.
          <br /><br />
          Whether you're a customer looking to shop or an admin managing your store, Cartify provides a smooth, responsive experience on all devices.
        </p>

        <div className="mt-6 text-gray-500 text-sm italic">
          Designed & Developed by <span className="font-bold text-gray-700">Puneet Yadav</span> ❤️
        </div>
      </motion.div>
    </div>
  );
};

export default About;
