import { DECEASED } from "../../constants/formConsts";

export function initTerroristCount(organizations, terrorists) {
    return organizations.map(org => ({
        ...org,
        terroristCount: terrorists.filter(
            ({ idOfOrganization, status }) =>
                idOfOrganization === org.id && status !== DECEASED
        ).length
    }));
}
