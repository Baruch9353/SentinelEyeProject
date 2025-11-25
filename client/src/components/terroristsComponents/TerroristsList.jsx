import { useState } from "react";

import { styled, Grid, Card, CardContent, Typography } from "@mui/material";

import TerroristDialog from "./TerroristDialog";

const StyledCard = styled(Card)(({ status }) => ({
  cursor: "pointer",
  transition: "0.3s",
  "&:hover": { transform: "scale(1.03)" },
  backgroundColor: status === "Deceased" ? "#fbf2f2ff" : "#c0e5f8ff",
  color: status === "Deceased" ? "darkred" : "green",
  borderRadius: "0.6rem",
  boxShadow: "0 4px 8px rgba(1, 1, 1, 0.7)",
  justifyItems: "center",
}));

export default function TerroristsList({ terrorists }) {
  const [openId, setOpenId] = useState(null);

  return (
    <Grid pl={11} pr={11} pt={5} container spacing={6}>
      {terrorists.map((ter) => (
        <Grid size={{ xs: 12, md: 6 }} key={`${ter.id}-${ter.name}`}>
          <StyledCard onClick={() => setOpenId(ter.id)} status={ter.status}>
            <CardContent>
              <Typography>
                <strong>{ter.name}</strong>
              </Typography>
              <hr />
              <Typography>
                <strong>{ter.organizationName}</strong> - Threat Level:
                {ter.threatLevel}
              </Typography>
            </CardContent>
          </StyledCard>

          <TerroristDialog
            open={openId === ter.id}
            terrorist={ter}
            onClose={() => setOpenId(null)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
