import { configureStore } from "@reduxjs/toolkit";

import   organizationSlice   from "./features/organizationsSlice";
import   terroristsSlice   from "./features/terroristsSlice";

export const store = configureStore({
    reducer: {
        organizations: organizationSlice,
        terrorists: terroristsSlice
    }
})