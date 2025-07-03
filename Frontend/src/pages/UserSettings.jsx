import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncdeleteuser,
  asynclogoutuser,
  asyncupdateuser,
} from "../store/actions/userActions";
import { useNavigate } from "react-router";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const UserSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: user?.password,
    },
  });

  const UpdateHandler = (updatedUser) => {
    dispatch(asyncupdateuser(user?.id, updatedUser));
    reset(updatedUser);
  };

  const DeleteHandler = () => {
    dispatch(asyncdeleteuser(user.id));
    navigate("/signin");
  };

  const LogoutHandler = () => {
    dispatch(asynclogoutuser(user.id));
    navigate("/signin");
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#C0E4F5] via-[#B6DDF2] to-[#c0edf2]">
      <div className="w-full max-w-md bg-white p-8 my-10 rounded-2xl shadow-xl text-center">
        
        {/* Profile Icon */}
        <div className="flex justify-center mb-6">
          <FaUserCircle className="text-8xl text-gray-400" />
        </div>

        <h2 className="text-3xl font-bold text-gray-700 mb-8">User Settings</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(UpdateHandler)} className="space-y-5">

          <input
            {...register("username")}
            className="w-full text-lg p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            placeholder="Username"
          />

          <input
            {...register("email")}
            className="w-full text-lg p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            type="email"
            placeholder="Email"
          />

          <div className="relative">
            <input
              {...register("password")}
              className="w-full text-lg p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none pr-12"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
            Update Profile
          </button>
        </form>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={LogoutHandler}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition"
          >
            Logout
          </button>

          <button
            type="button"
            onClick={DeleteHandler}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserSettings;
