import { createAsyncThunk } from "@reduxjs/toolkit";

import apiRequest from './apiRequest.js'

export const fetchOrganizations = createAsyncThunk(
    "organizations/fetchOrganizations",
    ({ search = "" } = {}) => {
        let url = `organizations`;
        if (search) {
            url += `/?searchName=${search}`;
        }
        return apiRequest(url, "GET");
    }
);

export const fetchOrganizationById = createAsyncThunk(
    "organizations/fetchOrganizationById",
    (id) => apiRequest("organizations/getOrganizationById", "POST", id)
);

export const createOrganization = createAsyncThunk(
    "organizations/createOrganization",
    (organization) => apiRequest("organizations/addOrganization", "POST", organization)
);

export const updateOrganization = createAsyncThunk(
    "organizations/updateOrganization",
    (organization) => apiRequest("organizations/updateOrganization", "PUT", organization)
);

export const deleteOrganization = createAsyncThunk(
    "organizations/deleteOrganization",
    (id) => apiRequest("organizations/deleteOrganization", "DELETE", id)
);
