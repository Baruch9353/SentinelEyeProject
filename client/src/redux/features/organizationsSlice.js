import { createSlice } from "@reduxjs/toolkit";

import { fetchAddOrganization, fetchOrganizations, fetchUpdateOrganization } from "../api/fetchOrganizations";

const initialState = {
    organizationsList: [],
    allOrganizationsList: [],
    loading: false,
    error: null,
}

export const organizationSlice = createSlice({
    name: 'organizations',
    initialState,
    reducers: {
        setTerroristCount(state, action) {
            const allTerrorists = action.payload;

            state.allOrganizationsList = state.allOrganizationsList.map(org => ({
                ...org,
                terroristCount: allTerrorists.filter(
                    ter => ter.idOfOrganization === org.id && ter.status !== "Deceased"
                ).length
            }));
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchOrganizations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrganizations.fulfilled, (state, action) => {
                state.loading = false;
                state.organizationsList = action.payload;

                if (!action.meta.arg?.search) {
                    state.allOrganizationsList = action.payload;
                }
            })
            .addCase(fetchOrganizations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAddOrganization.fulfilled, (state, action) => {
                const newOrganization = action.payload;
                state.allOrganizationsList.push(newOrganization)
            })
            .addCase(fetchUpdateOrganization.fulfilled, (state, action) => {
                const updatedOrganization = action.payload;
                const index = state.allOrganizationsList.findIndex(
                    (terrorist) => terrorist.id === updatedOrganization.id
                );
                state.allOrganizationsList[index] = updatedOrganization;
            });
    },
});

export default organizationSlice.reducer;
export const { setTerroristCount } = organizationSlice.actions;
