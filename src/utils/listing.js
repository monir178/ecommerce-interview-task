// Listing helpers

export function filterProductsByCategory(products, categoryKey) {
    if (!categoryKey || categoryKey === "all") return products;
    return products.filter((p) => p.category === categoryKey);
}

export const DEFAULT_TABS = [
    { key: "all", label: "All" },
    { key: "men's clothing", label: "Men's Clothing" },
    { key: "women's clothing", label: "Women's Clothing" },
    { key: "jewelery", label: "Jewelery" },
    { key: "electronics", label: "Electronics" },
];


