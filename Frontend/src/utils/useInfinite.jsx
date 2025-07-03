import { useState, useEffect } from "react";
import { lazyloadproducts } from "../store/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/config";

const useInfinite = () => {
  const dispatch = useDispatch();
  // Yeh line ab bilkul safe hai:
  const products = useSelector((state) => state.products.products) || [];

  const [hasMore, sethasMore] = useState(true);

  const fetchLazyProducts = async () => {
    try {
      const { data } = await axios.get(`/products?_limit=6&_start=${products.length}`);
      if (data.length === 0) {
        sethasMore(false);
      } else {
        dispatch(lazyloadproducts(data));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchLazyProducts();
  }, []);

  return { products, hasMore, fetchLazyProducts };
};

export default useInfinite;