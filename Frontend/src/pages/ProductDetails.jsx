import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  asyncdeleteproduct,
  asyncupdateproduct,
  asyncloadproducts,
} from "../store/actions/productActions";
import { asyncupdateuser } from "../store/actions/userActions";
import { useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const products = useSelector((state) => state.products.products) || [];

  // Load products if not loaded (for refresh/direct access)
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(asyncloadproducts());
    }
  }, [products, dispatch]);

  const product = products.find((p) => String(p.id) === String(id));

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      image: product?.image || "",
      title: product?.title || "",
      price: product?.price || "",
      category: product?.category || "",
      description: product?.description || "",
    },
  });

  // Reset form fields when product changes (after update)
  useEffect(() => {
    if (product) {
      reset({
        image: product.image || "",
        title: product.title || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
      });
    }
  }, [product, reset]);

  if (!product) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <h2 className="text-2xl text-gray-500">
          Product not found or loading...
        </h2>
      </div>
    );
  }

  // Add to cart handler
  const AddtoCartHandler = () => {
    if (!user || !user.cart) {
      alert("Login first then add to cart");
      navigate("/signin");
    };
    const copyUser = { ...user, cart: [...user.cart] };
    const index = user.cart.findIndex(
      (ci) => ci.product && ci.product.id === product.id
    );
    if (index === -1) {
      copyUser.cart.push({ product, quantity: 1 });
    } else {
      copyUser.cart[index] = {
        ...copyUser.cart[index],
        quantity: copyUser.cart[index].quantity + 1,
      };
    }
    dispatch(asyncupdateuser(user.id, copyUser));
  };

  // Update product handler
  const UpdateProductHandler = async (updatedProduct) => {
    await dispatch(asyncupdateproduct(product.id, updatedProduct));
    await dispatch(asyncloadproducts());
    // Form reset will happen via useEffect above
    // Stay on same page to show updated data
  };

  // Delete product handler
  const DeleteHandler = async () => {
    await dispatch(asyncdeleteproduct(id));
    navigate("/");
  };

  return (
    <div
      className={`w-full p-5 ${
        user?.isAdmin
          ? "flex flex-col lg:flex-row gap-10"
          : "flex justify-center"
      }`}
    >
      {/* Product Card */}
      <div
        className={`w-full max-w-lg shadow-xl rounded-2xl p-5 bg-gradient-to-br from-blue-50 to-white transition hover:scale-105 hover:shadow-2xl duration-300`}
      >
        <img
          className="h-[40vh] w-full object-contain mb-5 rounded-lg"
          src={product.image}
          alt={product.title}
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          {product.title}
        </h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="flex items-center gap-2 text-green-600 text-4xl font-semibold mb-5">
          <FaRupeeSign /> {product.price}
        </p>
        <div className="flex justify-between items-center">
          <button
            onClick={AddtoCartHandler}
            className="text-white bg-yellow-500 px-5 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
          >
            Add to cart
          </button>
        </div>
      </div>

      {/* Admin Panel Form */}
      {user?.isAdmin && (
        <form
          onSubmit={handleSubmit(UpdateProductHandler)}
          className="w-full max-w-xl bg-gray-50 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Update Product
          </h2>

          <input
            {...register("image")}
            className="w-full text-lg mb-5 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            type="url"
            placeholder="Product Image URL"
          />

          <input
            {...register("title")}
            className="w-full text-lg mb-5 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            placeholder="Product Title"
          />

          <input
            {...register("price")}
            className="w-full text-lg mb-5 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            placeholder="Price (₹)"
          />

          <input
            {...register("category")}
            className="w-full text-lg mb-5 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            type="text"
            placeholder="Product Category"
          />

          <textarea
            {...register("description")}
            className="w-full text-lg mb-5 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Product Description"
            rows="4"
          ></textarea>

          <button className="w-full bg-blue-500 text-white text-lg py-3 rounded hover:bg-blue-600 transition mb-4">
            Update Product
          </button>

          <button
            onClick={DeleteHandler}
            type="button"
            className="w-full bg-red-500 text-white text-lg py-3 rounded hover:bg-red-600 transition"
          >
            Delete Product
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductDetails;