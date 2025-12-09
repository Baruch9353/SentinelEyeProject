import { useSelector } from "react-redux";

import {
    selectAllOrganizations,
    selectOrganizationsLoading,
    selectOrganizationsError
} from "../redux/features/organizationsSlice.js";

import {
    selectAllTerrorists,
    selectTerroristsLoading,
    selectTerroristsError
} from "../redux/features/terroristsSlice.js"

export function useAppData() {
    const allOrganizationsList = useSelector(selectAllOrganizations);
    const allTerroristsList = useSelector(selectAllTerrorists);

    const organizationsLoading = useSelector(selectOrganizationsLoading);
    const terroristsLoading = useSelector(selectTerroristsLoading);
    const loading = organizationsLoading || terroristsLoading;

    const organizationsError = useSelector(selectOrganizationsError);
    const terroristsError = useSelector(selectTerroristsError);
    const error = organizationsError || terroristsError;

    return { allOrganizationsList, allTerroristsList, loading, error };
}
