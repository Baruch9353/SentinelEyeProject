import { useSelector } from "react-redux";

import { selectAllTerrorists } from "../redux/features/terroristsSlice";

import { DECEASED } from '../constants/formConsts'

export function useTerroristsCount(organizationId) {
    const allTerroristsList = useSelector(selectAllTerrorists);

    return allTerroristsList.filter(
        ({ idOfOrganization, status }) =>
            idOfOrganization === organizationId && status !== DECEASED
    ).length;
};