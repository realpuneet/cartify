import React from 'react'
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from 'react-router';
import  {useForm} from 'react-hook-form'; 
import { useDispatch } from 'react-redux';
import {asyncsigninuser} from '../../store/actions/userActions'

const Signin = () => {
    
    const {register, handleSubmit, formState=({})} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

   const submitHandler = (user) => {
  dispatch(
    asyncsigninuser(
      user,
      () => navigate('/'), // onSuccess: home par le jao
      () => {}             // onError: kuch mat karo, wahi raho
    )
  );
};

  return (
    <div className='flex justify-center items-center h-full w-full bg-gradient-to-b from-[#C0E4F5] via-[#B6DDF2] to-[#E8F2F8] bg-[length:100%_100%]'>
        <div className=' my-15 space-y-3 bg-white shadow-lg rounded-3xl  flex flex-col bg-gradient-to-b from-[#b6efff] to-[#ffffff] bg-[length:100%_100%] justify-center items-center p-8'>
                <h1 className='text-center text-xl bg-white p-2 rounded-xl'><FiLogIn /></h1>
            <form onSubmit={handleSubmit(submitHandler)} className='w-full p-3 flex flex-col'>
                <h1 className='text-2xl font-semibold text-center mb-4'>Sign In</h1>
                <div className='mb-4'>
                    <input
                    {...register('email', { required: true })}
                    type='email' id='email' className='w-full px-2 py-1 outline-0 border bg-[#EFF3F6] border-gray-300 rounded-lg' placeholder='Email' required />
                </div>
                <div className='mb-4'>
                    <input 
                    {...register('password', { required: true })}
                    type='password' id='password' className='w-full px-2 py-1 outline-0 border bg-[#EFF3F6] border-gray-300 rounded-lg' placeholder='Password' required />
                </div>
                <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200'>Sign In</button>
                <p className='text-center text-sm mt-4'>Don't have an account? <Link to='/signup' className='text-blue-500 hover:underline'>Sign Up</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Signin
