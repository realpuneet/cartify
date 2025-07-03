import { lazy, Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingProduct from "../components/LoadingProduct";
import useInfinite from "../utils/useInfinite";

const ProductTemplate = lazy(() => import("../components/ProductTemplate"));

const Products = () => {
    const { products = [], hasMore, fetchLazyProducts } = useInfinite();

    return (
        <section className="min-h-screen bg-gradient-to-b from-[#C0E4F5] via-[#B6DDF2] to-[#c0edf2] py-10 px-5">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
                Our <span className="text-red-500">Products</span>
            </h1>

            <InfiniteScroll
                dataLength={products.length}
                next={fetchLazyProducts}
                hasMore={hasMore}
                loader={<div className="text-center text-gray-500 my-4"><LoadingProduct /></div>}
                endMessage={
                    <p className="text-center text-green-600 font-medium my-4">
                        🎉 You have seen it all!
                    </p>
                }
            >
                <div className="flex flex-wrap justify-center gap-6">
                    {products.map((p, idx) => (
                        <Suspense key={idx} fallback={<LoadingProduct />}>
                            <ProductTemplate p={p} />
                        </Suspense>
                    ))}
                </div>
            </InfiniteScroll>
        </section>
    );
};

export default Products;
