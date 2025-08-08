import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardSkeleton = () => {
    return (
        <div className="product-card h-100 d-flex flex-column w-100">
            {/* Image area */}
            <div className="ratio-box">
                <Skeleton className="position-absolute top-0 start-0 w-100 h-100" />
            </div>

            {/* Body */}
            <div className="card-body p-2">
                {/* Title (single line) */}
                <div className="mb-3">
                    <Skeleton height={16} width="90%" />
                </div>

                {/* Price and ratings row */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <Skeleton height={20} width={80} />
                    <Skeleton height={14} width={90} />
                </div>

                {/* Variant dropdown skeleton (input-group shape) */}
                <div className="input-group input-group-sm">
                    <span className="input-group-text p-0 border-0 bg-transparent" style={{ width: 70 }}>
                        <Skeleton height={28} width={60} />
                    </span>
                    <div className="form-control p-0 border-0 bg-transparent">
                        <Skeleton height={30} />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ProductCardSkeleton;
