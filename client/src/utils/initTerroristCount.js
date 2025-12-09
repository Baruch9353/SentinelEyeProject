import { DECEASED } from "../constants/formConsts";

export const initTerroristCount = (organizations, terrorists) =>
    organizations.map(org => ({
        ...org,
        terroristCount: terrorists.filter(
            ({ idOfOrganization, status }) =>
                idOfOrganization === org.id && status !== DECEASED
        ).length
    }));
