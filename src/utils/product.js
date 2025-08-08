// Utilities for product data normalization and formatting

export function deriveVariantOptions(product) {
    const category = (product?.category || "").toLowerCase();
    if (category.includes("men") || category.includes("women") || category.includes("clothing")) {
        return ["XS", "S", "M", "L", "XL"];
    }
    if (category.includes("electronic")) {
        return ["64GB", "128GB", "256GB"];
    }
    if (category.includes("jewel")) {
        return ["Gold", "Silver", "Rose Gold"];
    }
    return ["Default"];
}

export function getIsInStock(product) {
    if (typeof product?.stock === "number") return product.stock > 0;
    if (product?.rating && typeof product.rating.count === "number") return product.rating.count > 0;
    return true;
}

export function getProductName(product) {
    return product?.title || product?.name || "";
}

export function getProductImage(product) {
    return product?.image || product?.images?.[0]?.url || "";
}

export function getProductPrice(product) {
    return product?.price ?? 0;
}

export function formatPriceUSD(value) {
    const number = typeof value === "number" ? value : Number(value || 0);
    const formatted = number.toLocaleString(undefined, { style: "currency", currency: "USD" });
    // Ensure leading symbol matches project style
    return formatted.replace(/^US\$\s?/, "$ ");
}

export function deriveRatingParts(rate) {
    const value = Math.max(0, Math.min(5, Number(rate || 0)));
    const full = Math.floor(value);
    const half = value - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return { full, half, empty };
}

export function formatCategoryLabel(category) {
    const raw = String(category || "");
    if (!raw) return "";
    return raw
        .split(" ")
        .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
        .join(" ")
        .replace(/'S/g, "'s");
}


