import { useSelector } from "react-redux";

export function useTerroristsCount(organizationId) {
    const allTerroristsList = useSelector(
        (state) => state.terrorists.allTerroristsList || []
    );

    return allTerroristsList.filter(
        (terrorist) => terrorist.idOfOrganization === organizationId && terrorist.status !== "Deceased"
    ).length;
};