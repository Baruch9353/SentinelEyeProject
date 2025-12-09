import { createAsyncThunk } from "@reduxjs/toolkit";

import apiRequest from './apiRequest.js'

export const fetchTerrorists = createAsyncThunk(
    "terrorists/fetchTerrorists",
    ({ search = "" } = {}) => {
        let url = `terrorists`;
        if (search) {
            url += `/?searchName=${search}`;
        }
        return apiRequest(url, "GET");
    }
);

export const fetchTerroristById = createAsyncThunk(
    "terrorists/fetchTerroristById",
    (id) => apiRequest("terrorists/getTerroristById", "POST", id)
);

export const createTerrorist = createAsyncThunk(
    "terrorists/createTerrorist",
    (terrorist) => apiRequest("terrorists/addTerrorist", "POST", terrorist)
);

export const updateTerrorist = createAsyncThunk(
    "terrorists/updateTerrorist",
    (terrorist) => apiRequest("terrorists/updateTerrorist", "PUT", terrorist)
);

export const deleteTerrorist = createAsyncThunk(
    "terrorists/deleteTerrorist",
    (id) => apiRequest("terrorists/deleteTerrorist", "DELETE", id)
);
