import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { asyncupdateuser } from "../store/actions/userActions";
import { FaRupeeSign } from "react-icons/fa";

const ProductTemplate = ({ p }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate()

    const AddtoCartHandler = () => {
       if (!user || !user.cart) {
        alert("Login first then add to card");
        navigate("/signin");
        return;
       };
        const copyUser = { ...user, cart: [...user.cart] };
const index = user.cart.findIndex((ci) => ci.product && ci.product.id === p.id);        if (index === -1) {
            copyUser.cart.push({ product: p, quantity: 1 });
        } else {
            copyUser.cart[index] = {
                ...copyUser.cart[index],
                quantity: copyUser.cart[index].quantity + 1,
            };
        }
        dispatch(asyncupdateuser(user.id, copyUser));
    };

    if (!p) return null;

    return (
        <div className="w-[300px] md:w-[30%] bg-white rounded-xl shadow-xl overflow-hidden mb-6 hover:scale-105 transition-transform duration-300 flex flex-col cursor-pointer group">

            {/* Product Image with Price */}
            <div className="w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden relative">
                <img
                    className="max-h-full max-w-full object-contain"
                    src={p.image || "https://via.placeholder.com/150"}
                    alt={p.title}
                />
                <span className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 text-sm rounded-lg shadow-lg flex items-center gap-1">
                    <FaRupeeSign className="text-xs" /> {p.price}
                </span>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow justify-between">

                <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                    {p.title?.slice(0, 20)}{p.title?.length > 20 ? "..." : ""}
                </h2>

                <p className="text-sm text-gray-600 mb-4 h-12 overflow-hidden">
                    {p.description?.slice(0, 70)}{p.description?.length > 70 ? "..." : ""}
                </p>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-auto">
                    <Link
                        to={`/update-product/${p.id}`}
                        className="text-blue-500 hover:text-blue-600 text-sm font-medium transition"
                    >
                        More Info
                    </Link>

                    <button
                        onClick={AddtoCartHandler}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-4 py-1 rounded-full transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductTemplate;
