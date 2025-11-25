import { createAsyncThunk } from "@reduxjs/toolkit";

import apiRequest from './apiRequest.js'

export const fetchTerrorists = createAsyncThunk(
    "terrorists/fetchTerrorists",
    async ({ search = ""} = {}) => {
        let url = `terrorists`;
        if (search) {
            url += `/?searchName=${search}`;
        }
        return await apiRequest(url, "GET");
    }
);

export const fetchTerroristById = createAsyncThunk(
    "terrorists/fetchTerroristById",
    async (id) => await apiRequest("terrorists/getTerroristById", "POST", id)
);

export const fetchAddTerrorist = createAsyncThunk(
    "terrorists/fetchAddTerrorist",
    async (terrorist) => await apiRequest("terrorists/addTerrorist", "POST", terrorist)
);

export const fetchUpdateTerrorist = createAsyncThunk(
    "terrorists/fetchUpdateTerrorist",
    async (terrorist) => await apiRequest("terrorists/updateTerrorist", "PUT", terrorist)
);

export const fetchRemoveTerrorist = createAsyncThunk(
    "terrorists/fetchRemoveTerrorist",
    async (id) => await apiRequest("terrorists/deleteTerrorist", "DELETE", id)
);
