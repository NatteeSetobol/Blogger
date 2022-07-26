import { configureStore } from "@reduxjs/toolkit";
import { AnyAction ,applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import thunk, { ThunkDispatch } from 'redux-thunk'
import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { loginApi } from "./Services/Login";
import { BlogApi } from "./Services/Blog";

export const store = configureStore({
    reducer: {
        [loginApi.reducerPath]: loginApi.reducer,
        [BlogApi.reducerPath]: BlogApi.reducer,
    },
    middleware: (getDefaultMiddiware) => getDefaultMiddiware().concat(BlogApi.middleware,loginApi.middleware, thunk),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, void, AnyAction>

export default store;


