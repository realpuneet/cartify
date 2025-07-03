import { useDispatch, useSelector } from "react-redux";
import { asyncupdateuser } from "../store/actions/userActions";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // Defensive: Agar user ya user.cart nahi hai toh empty cart dikhayein
  if (!user || !user.cart) {
    return <h2 className="text-center text-2xl mt-10 text-gray-600">Your Cart is Empty 🛒</h2>;
  }

  const IncreaseQuantity = (index) => {
    const copyUser = { ...user, cart: [...user.cart] };
    copyUser.cart[index] = {
      ...copyUser.cart[index],
      quantity: copyUser.cart[index].quantity + 1,
    };
    dispatch(asyncupdateuser(user.id, copyUser));
  };

  const DecreaseQuantity = (index) => {
    const copyUser = { ...user, cart: [...user.cart] };
    if (copyUser.cart[index].quantity === 1) {
      copyUser.cart.splice(index, 1);
    } else {
      copyUser.cart[index] = {
        ...copyUser.cart[index],
        quantity: copyUser.cart[index].quantity - 1,
      };
    }
    dispatch(asyncupdateuser(user.id, copyUser));
  };

  const RemoveFromCart = (index) => {
    const copyUser = { ...user, cart: [...user.cart] };
    copyUser.cart.splice(index, 1);
    dispatch(asyncupdateuser(user.id, copyUser));
  };

  const totalPrice = user.cart.reduce((ac, cv) => {
    if (!cv.product) return ac;
    return ac + Number(cv.product.price) * cv.quantity;
  }, 0);

  if (user.cart.length === 0) {
    return <h2 className="text-center text-2xl mt-10 text-gray-600">Your Cart is Empty 🛒</h2>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C0E4F5] via-[#B6DDF2] to-[#c0edf2] p-5">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      <div className="space-y-4 max-w-4xl mx-auto">
        {user.cart.map((cartItem, index) => {
          if (!cartItem.product) return null;
          return (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              {/* Left: Product Info */}
              <div className="flex items-center gap-4 flex-1">
                <img
                  className="h-24 w-24 object-contain bg-gray-100 rounded"
                  src={cartItem.product.image}
                  alt={cartItem.product.title}
                />
                <div>
                  <h2 className="font-semibold text-gray-700 text-lg">{cartItem.product.title}</h2>
                  <p className="text-sm text-gray-600">{cartItem.product.description?.slice(0, 50)}...</p>
                  <p className="mt-2 text-green-600 font-medium text-lg">₹ {cartItem.product.price}</p>
                </div>
              </div>

              {/* Right: Quantity Controls */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center">
                  <button
                    onClick={() => DecreaseQuantity(index)}
                    className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500"
                  >
                    -
                  </button>
                  <span className="mx-4 font-semibold">{cartItem.quantity}</span>
                  <button
                    onClick={() => IncreaseQuantity(index)}
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => RemoveFromCart(index)}
                  className="text-red-500 text-sm hover:underline mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Price */}
      <div className="max-w-4xl mx-auto mt-10 flex justify-between items-center p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold">Total Price:</h2>
        <span className="text-2xl font-bold text-green-600">₹ {totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;