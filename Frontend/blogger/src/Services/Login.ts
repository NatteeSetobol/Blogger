import { createApi,  fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const loginApi = createApi({
    reducerPath: `login`,
    baseQuery: fetchBaseQuery ({

    }),
    tagTypes: ['Post', 'User'],
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        logon: builder.mutation ({
            query: (input) => ({
                url: `/logon`,
                method: 'POST',
                body: input
            })
        }),
        verify: builder.mutation ({
            query: (input) => ({
                url: `/verify`,
                method: 'POST',
                body: input
            })
        }),
    })
})

export const { useLogonMutation, useVerifyMutation } = loginApi;