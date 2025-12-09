import { useState } from "react";

import { styled, Grid, Card, CardContent, Typography } from "@mui/material";

import { DECEASED } from "../../constants/formConsts";

import TerroristDialog from "./TerroristDialog";

const StyledCard = styled(Card)(({ status }) => ({
  cursor: "pointer",
  transition: "0.3s",
  "&:hover": { transform: "scale(1.03)" },
  backgroundColor: status === DECEASED ? "#fbf2f2ff" : "#c0e5f8ff",
  color: status === DECEASED ? "darkred" : "green",
  borderRadius: "0.6rem",
  boxShadow: "0 4px 8px rgba(1, 1, 1, 0.7)",
  justifyItems: "center",
}));

export default function TerroristsList({ terrorists }) {
  const [openId, setOpenId] = useState(null);

  return (
    <Grid pl={11} pr={11} pt={5} container spacing={6}>
      {terrorists.map((terrorist) => (
        <Grid size={{ xs: 12, md: 6 }} key={`${terrorist.id}-${terrorist.name}`}>
          <StyledCard onClick={() => setOpenId(terrorist.id)} status={terrorist.status}>
            <CardContent>
              <Typography sx={{ fontWeight: 'bold' }}>
                {terrorist.name}
              </Typography>
              <hr />
              <Typography sx={{ fontWeight: 'bold' }}>
                {terrorist.organizationName} - Threat Level: {terrorist.threatLevel}
              </Typography>
            </CardContent>
          </StyledCard>

          <TerroristDialog
            open={openId === terrorist.id}
            terrorist={terrorist}
            onClose={() => setOpenId(null)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
