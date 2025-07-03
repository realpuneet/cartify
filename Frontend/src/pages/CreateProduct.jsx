import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { nanoid } from "nanoid";
import { asynccreateproduct } from "../store/actions/productActions";
import { useDispatch } from "react-redux";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const createProductHandler = (data) => {
    data.id = nanoid();
    dispatch(asynccreateproduct(data));
    console.log(data);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#fff] to-[#e0f7fa] p-4">
      <form
        onSubmit={handleSubmit(createProductHandler)}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-center text-gray-800">
          🚀 Launch Your New Product
        </h3>

        <div className="space-y-4">
          <input
            type="text"
            id="title"
            placeholder="Give your product a catchy name"
            {...register("title", { required: true })}
            className="w-full p-3 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-400 outline-0 text-gray-700 placeholder-gray-500 transition"
          />

          <input
            type="number"
            id="price"
            step="0.01"
            placeholder="Set a price e.g. 499.99"
            {...register("price", { required: true })}
            className="w-full p-3 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-400 outline-0 text-gray-700 placeholder-gray-500 transition"
          />

          <textarea
            id="description"
            rows="3"
            placeholder="Describe your product in a few lines"
            {...register("description", { required: true })}
            className="w-full p-3 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-400 outline-0 text-gray-700 placeholder-gray-500 transition resize-none"
          ></textarea>

          <input
            type="text"
            id="category"
            placeholder="What category does it belong to?"
            {...register("category", { required: true })}
            className="w-full p-3 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-400 outline-0 text-gray-700 placeholder-gray-500 transition"
          />

          <input
            type="url"
            id="image"
            placeholder="Paste a sharp image URL"
            {...register("image", { required: true })}
            className="w-full p-3 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-400 outline-0 text-gray-700 placeholder-gray-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg transform hover:scale-105 transition active:scale-95"
        >
          💡 Publish Product Now
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
