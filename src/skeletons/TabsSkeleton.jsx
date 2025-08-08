import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TabsSkeleton = ({ count = 5 }) => {
    return (
        <div className="text-center py-4">
            {Array.from({ length: count }).map((_, i) => (
                <span key={i} className="d-inline-block m-2" style={{ lineHeight: 0 }}>
                    <Skeleton width={90} height={28} borderRadius={6} />
                </span>
            ))}
        </div>
    );
};

export default TabsSkeleton;


