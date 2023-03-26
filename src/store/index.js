import { configureStore } from '@reduxjs/toolkit';
import heroes from "../components/heroesList/heroesSlice";
import filter from '../components/heroesFilters/filtersSlice';

const store = configureStore({
      reducer: {heroes, filter},
      devTools: process.env.NODE_ENV !== "production",
})

export default store;