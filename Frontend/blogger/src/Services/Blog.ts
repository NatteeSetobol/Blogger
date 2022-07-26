import { createApi,  fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const BlogApi = createApi({
    reducerPath: `blog`,
    baseQuery: fetchBaseQuery ({

    }),
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        submit: builder.mutation ({
            query: (input) => ({
                url: `/submit`,
                method: 'POST',
                body: input
            })
        }),
    })
})

export const { useSubmitMutation, } = BlogApi;