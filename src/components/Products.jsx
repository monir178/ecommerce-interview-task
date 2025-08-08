import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
// Listing helpers (tabs and category filter)
import { DEFAULT_TABS, filterProductsByCategory } from "../utils/listing";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";
import TabsSkeleton from "../skeletons/TabsSkeleton";
import { useGetProductsQuery } from "../services/productsApi";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const { data: apiData, isLoading, isError } = useGetProductsQuery();
  const [activeCat, setActiveCat] = useState("all");
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    if (apiData && Array.isArray(apiData)) {
      setData(apiData);
      setFilter(filterProductsByCategory(apiData, activeCat));
    }
  }, [apiData]);

  const Loading = () => {
    return (
      <>
        {/* Tabs skeleton */}
        <TabsSkeleton />
        {/* Cards skeleton grid */}
        <div className="row row-cols-1 row-cols-sm-2  row-cols-lg-3 row-cols-xl-4 g-4 gx-4 gy-4 align-items-stretch">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div className="col d-flex" key={idx}>
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </>
    );
  };

  // Filter by category and mark active tab
  const filterProduct = (cat) => {
    setActiveCat(cat || "all");
    if (!cat || cat === "all") {
      setFilter(data);
      return;
    }
    setFilter(filterProductsByCategory(data, cat));
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-4">
          {DEFAULT_TABS.map((tab) => (
            <button
              key={tab.key}
              className={`btn btn-sm m-2 ${activeCat === tab.key ? "btn-dark" : "btn-outline-dark"
                }`}
              onClick={() => filterProduct(tab.key)}
              aria-pressed={activeCat === tab.key}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="row row-cols-1 row-cols-sm-2  row-cols-lg-3 row-cols-xl-4 g-4 gx-4 gy-4 align-items-stretch">
          {filter.map((product) => (
            <div id={product.id} key={product.id} className="col d-flex">
              <ProductCard
                product={product}
                onAddToCart={(p) => {
                  addProduct(p);
                  toast.success("Added to cart");
                }}
              />
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        {isError ? (
          <div className="text-center text-danger">Failed to load products.</div>
        ) : (
          <div className="row justify-content-center">
            {isLoading || !apiData ? <Loading /> : <ShowProducts />}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
