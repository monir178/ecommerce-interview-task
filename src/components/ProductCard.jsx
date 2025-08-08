import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ProductCard.css";
// Product helpers (data shaping, price format, etc.)
import {
    deriveVariantOptions,
    getIsInStock,
    getProductName,
    getProductImage,
    getProductPrice,
    deriveRatingParts,
    formatPriceUSD,
} from "../utils/product";



const ProductCard = ({ product, onAddToCart }) => {
    const [selectedVariant, setSelectedVariant] = useState("");
    const variants = useMemo(() => deriveVariantOptions(product), [product]);
    const inStock = useMemo(() => getIsInStock(product), [product]);

    const price = getProductPrice(product);
    const name = getProductName(product);
    const imageUrl = getProductImage(product);

    const rating = product.rating?.rate || 0;
    // Render rating as star icons
    const renderStars = (value) => {
        const stars = [];
        const { full, half, empty } = deriveRatingParts(value);
        for (let i = 0; i < full; i++) stars.push(<i key={`s${i}`} className="fa fa-star text-warning me-1" aria-hidden="true" />);
        if (half) stars.push(<i key="half" className="fa fa-star-half-o text-warning me-1" aria-hidden="true" />);
        for (let i = 0; i < empty; i++) stars.push(<i key={`e${i}`} className="fa fa-star-o text-warning me-1" aria-hidden="true" />);
        return stars;
    };

    return (
        <div className="product-card h-100 d-flex flex-column w-100">
            <div className="ratio-box ">
                {/* Image area with fixed ratio */}
                {imageUrl ? (
                    <img src={imageUrl} alt={name} loading="lazy" />
                ) : (
                    <div />
                )}
                {!inStock && (
                    <span className="badge bg-secondary position-absolute m-2">Out of Stock</span>
                )}
            </div>
            <div className="card-body p-2">
                <h3 className="card-title h6 mb-1 text-truncate" title={name}>
                    {name}
                </h3>
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="fw-bold fs-5">{formatPriceUSD(price)}</div>
                    <div className="small" aria-label={`Rating ${rating} out of 5`}>
                        {renderStars(rating)}
                    </div>
                </div>

                {/* Variant dropdown */}
                <div className="input-group input-group-sm">
                    <span className="input-group-text" id={`lbl-${product.id}`}>Variant</span>
                    <select
                        id={`variant-${product.id}`}
                        className="form-select"
                        value={selectedVariant || variants[0]}
                        onChange={(e) => setSelectedVariant(e.target.value)}
                        aria-label="Select variant"
                        aria-describedby={`lbl-${product.id}`}
                    >
                        {variants.map((v) => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* Buttons container */}
            <div className="card-footer bg-transparent border-0 pt-0 mt-3">
                <div className="btn-group  w-100" role="group" aria-label="Card actions">
                    {product.id && (
                        <Link to={`/product/${product.id}`} className="btn btn-outline-secondary btn-sheen">
                            Details
                        </Link>
                    )}
                    <button
                        className="btn btn-dark btn-sheen"
                        disabled={!inStock}
                        onClick={() => inStock && onAddToCart?.({ ...product, selectedVariant: selectedVariant || variants[0] })}
                        aria-disabled={!inStock}
                    >
                        {inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    onAddToCart: PropTypes.func,
};

export default ProductCard;


