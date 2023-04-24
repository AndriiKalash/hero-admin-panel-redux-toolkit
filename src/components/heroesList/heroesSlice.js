import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";


const heroesAdapter = createEntityAdapter()
const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchedHeroes',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes");
    }
);

const heroesSlice = createSlice({
    name:'heroes',
    initialState,
    reducers: {
        heroAdded: (state, action) => {
            heroesAdapter.addOne(state, action.payload);
        },
        heroesDelete: (state, action) => {
            heroesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => { 
        builder 
            .addCase(fetchHeroes.pending, state => { 
                state.heroesLoadingStatus = 'loading'
            })
            .addCase(fetchHeroes.fulfilled, (state, action) =>{ 
                heroesAdapter.setAll(state, action.payload);
                state.heroesLoadingStatus = 'idle'
            })
            .addCase(fetchHeroes.rejected, state => { 
                state.heroesLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
});

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export const filterHeroesSelector = createSelector(
    selectAll,
   (state) => state.filter.selectionFilter, 
   ( heroes, filter) => {
       if (filter === 'all') {
           return heroes;
       } else {
           return heroes.filter(item => item.element === filter);
       }
   }
 );

const {reducer, actions} = heroesSlice;
export default reducer;
export const { heroAdded, heroesDelete } = actions;

