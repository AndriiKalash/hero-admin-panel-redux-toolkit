import { configureStore} from '@reduxjs/toolkit';
import filter from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../api/apiSlice';

const store = configureStore({
      reducer: {
            [apiSlice.reducerPath]:apiSlice.reducer,
            filter
      },
      middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
      devTools: process.env.NODE_ENV !== "production",
})

export default store;