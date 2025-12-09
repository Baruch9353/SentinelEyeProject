import { createSlice } from "@reduxjs/toolkit";

import { createOrganization, fetchOrganizations, updateOrganization } from "../api/fetchOrganizations";

import { initTerroristCount } from "../../utils/initTerroristCount";

const initialState = {
    searchOrganizationsList: [],
    allOrganizationsList: [],
    loading: false,
    error: null,
}

export const organizationSlice = createSlice({
    name: 'organizations',
    initialState,
    reducers: {
        setTerroristCount(state, { payload: terrorists }) {
            state.allOrganizationsList = initTerroristCount(
                state.allOrganizationsList,
                terrorists
            );
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
                state.searchOrganizationsList = action.payload;

                if (!action.meta.arg?.search) {
                    state.allOrganizationsList = action.payload;
                }
            })
            .addCase(fetchOrganizations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createOrganization.fulfilled, (state, action) => {
                const newOrganization = action.payload;
                state.allOrganizationsList.push(newOrganization)
            })
            .addCase(updateOrganization.fulfilled, (state, action) => {
                const updatedOrganization = action.payload;
                const index = state.allOrganizationsList.findIndex(
                    ({ id }) => id === updatedOrganization.id
                );
                state.allOrganizationsList[index] = updatedOrganization;
            });
    },
});

export const selectAllOrganizations = ({ organizations }) =>
    organizations.allOrganizationsList;
export const selectOrganizationsLoading = ({ organizations }) =>
    organizations.loading;
export const selectOrganizationsError = ({ organizations }) =>
    organizations.error;

export default organizationSlice.reducer;
export const { setTerroristCount } = organizationSlice.actions;
