import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";


const filterAdapter = createEntityAdapter()
const initialState = filterAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    selectionFilter: 'all'
});

export const fetchFilters = createAsyncThunk( 
    'filter/fetchFilters',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters");
    }
);

const filtersSlice = createSlice({
    name:'filter',
    initialState,
    reducers: {
        filterSelect: (state, action) => {
            state.selectionFilter = action.payload
        }
    },
    extraReducers: (builder) => { 
        builder  
            .addCase(fetchFilters.pending, state => {
                state.filtersLoadingStatus = 'loading'
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                // state.filters = action.payload;
                filterAdapter.setAll(state, action.payload);
                state.filtersLoadingStatus = 'idle'
            })
            .addCase(fetchFilters.rejected, state => {
                state.filtersLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
});

export const {selectAll} = filterAdapter.getSelectors(state => state.filter);
export const filterSelector = state => state.filter;
const {reducer, actions} = filtersSlice;
export default reducer;
export const { filterSelect } = actions;
