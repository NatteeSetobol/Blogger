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
        blogs: builder.mutation ({
            query: (input) => ({
                url: `/blogs`,
                method: `POST`,
                body: input
            })
        }),
        edit: builder.mutation ({
            query: (input) => ({
                url: `/save`,
                method: `POST`,
                body: input
            })
        }),
        blog: builder.mutation ({
            query: (id) => ({
                url: `/post/` + id ,
            })
        }),
        delete: builder.mutation ({
            query: (info) => ({
                url: `/delete/` ,
                method: `DELETE`,
                body: info
            })
        }),

        allBlogs: builder.mutation ({
            query: () => ({
                url: `/allblogs`,
            })
        }),
    })
})

export const { useDeleteMutation,useEditMutation,useBlogMutation, useAllBlogsMutation , useSubmitMutation, useBlogsMutation } = BlogApi;