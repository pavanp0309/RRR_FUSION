import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/users/userSlice";
import { cryptoMarketApi } from "../components/cryptos/services/cryptoMarketsApi";
import { generalNewsApi } from "../components/cryptos/services/generalNewsApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    //Ad the generated reducer as a specific top-level slice
    [cryptoMarketApi.reducerPath]:cryptoMarketApi.reducer,
    [generalNewsApi.reducerPath]:generalNewsApi.reducer,

  },
  // middleware-redux-thunk(rtk-query)
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoMarketApi.middleware,generalNewsApi.middleware),
    
});

export default store;
