import {
  configureStore,
  getDefaultMiddleware,
  SerializableStateInvariantMiddlewareOptions,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appDataReducer } from "./appData/slice";
import { appEndPoint } from "./appEndPoint";

const serializableStateInvariantMiddlewareOptions: SerializableStateInvariantMiddlewareOptions =
  { warnAfter: 6000 };
//creating a single store for the entire app
const appStore = configureStore({
  reducer: {
    appData: appDataReducer,
    [appEndPoint.reducerPath]: appEndPoint.reducer,
  },
  // devTools: false, //devtools extension is unnesessary
  // enhancers: [], //no enhancers are added at the moment
  middleware: (getDefaultMiddleware) => {
    //only default thunk, immutability and serialization middlewere are added at the moment
    return getDefaultMiddleware({
      serializableCheck: serializableStateInvariantMiddlewareOptions,
    }).concat(appEndPoint.middleware);
  },
});

setupListeners(appStore.dispatch);

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default appStore;
