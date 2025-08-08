import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// RTK Query API slice for products
export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
    tagTypes: ["Products"],
    keepUnusedDataFor: 300, // cache for 5 minutes
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "products",
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((p) => ({ type: "Products", id: p.id })),
                        { type: "Products", id: "LIST" },
                    ]
                    : [{ type: "Products", id: "LIST" }],
        }),
        getProductById: builder.query({
            query: (id) => `products/${id}`,
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;


