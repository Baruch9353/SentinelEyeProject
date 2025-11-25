import { createSlice } from "@reduxjs/toolkit";

import { fetchAddTerrorist, fetchTerrorists, fetchUpdateTerrorist } from "../api/fetchTerrorists";

const initialState = {
    terroristsList: [],
    allTerroristsList: [],
    loading: false,
    error: null,
};

export const terroristsSlice = createSlice({
    name: "terrorists",
    initialState,
    reducers: {
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchTerrorists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTerrorists.fulfilled, (state, action) => {
                state.loading = false;
                state.terroristsList = action.payload;

                if (!action.meta.arg?.search) {
                    state.allTerroristsList = action.payload;
                }
            })
            .addCase(fetchTerrorists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAddTerrorist.fulfilled, (state, action) => {
                const newTerrorist = action.payload;
                state.allTerroristsList.push(newTerrorist)
            })
            .addCase(fetchUpdateTerrorist.fulfilled, (state, action) => {
                const updatedTerrorist = action.payload;
                const index = state.allTerroristsList.findIndex(
                    (terrorist) => terrorist.id === updatedTerrorist.id
                );
                state.allTerroristsList[index] = updatedTerrorist;
            });
    },
});

export default terroristsSlice.reducer;
