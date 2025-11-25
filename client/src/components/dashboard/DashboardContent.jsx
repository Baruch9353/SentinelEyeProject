import { styled, Box, Typography } from "@mui/material";

import OrganizationsTable from "./OrganizationsTable";

const StyledDashboard = styled(Box)({
  color: "#316743",
  display: "flex",
  flexDirection: "column",
  padding: "2rem 2rem 2rem 2rem",
  margin: "2rem 2rem 2rem 2rem",
});

export default function DashboardContent({ organizations, terrorists }) {
  return (
    <StyledDashboard>
      <Typography fontSize="2rem" align="center">
        Dashboard Overview
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Typography fontSize="1.5rem">
          Total Organizations: {organizations.length || 0}
        </Typography>
        <Typography fontSize="1.5rem">
          Total Active Terrorists:{" "}
          {terrorists.filter((terrorist) => terrorist.status !== "Deceased")
            .length || 0}
        </Typography>
      </Box>

      <OrganizationsTable organizations={organizations} />
    </StyledDashboard>
  );
}
