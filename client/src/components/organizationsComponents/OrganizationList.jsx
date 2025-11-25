import { styled, Container, Grid, Typography } from "@mui/material";

import OrganizationCard from "./OrganizationCard";

const StyledContainer = styled(Container)({
  textAlign: "center",
  padding: "2.5rem 1rem 2.5rem 1rem",
  color: "#316743",
  borderRadius: "0.6rem",
});

export default function OrganizationList({ organizations }) {
  
  return (
    <StyledContainer>
      <Grid container spacing={7} justifyContent="center">
        {organizations.map((org) => (
          <Grid key={org.id}>
            <OrganizationCard org={org} />
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
}
