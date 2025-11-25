import { useNavigate } from "react-router";

import {
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";

const StyledDialog = styled(Dialog)({
  "& .MuiDialogTitle-root": {
    backgroundColor: "#c0e5f8ff",
    color: "green",
  },
  "& .MuiDialogContent-root": {
    backgroundColor: "#d6f0feff",
    color: "green",
  },
});

export default function TerroristDialog({ open, terrorist, onClose }) {
  const navigate = useNavigate();

  const dialogs = [
    { label: "Threat Level", value: terrorist.threatLevel },
    {
      label: "Activity Years",
      value: terrorist.activityStart + terrorist.activityEnd,
    },
    { label: "Status", value: terrorist.status },
    { label: "Intel note", value: terrorist.intelNote },
    { label: "Updated by", value: terrorist.updatedBy },
    { label: "Last updated", value: terrorist.lastUpdated },
  ];

  return (
    <>
      {terrorist && (
        <StyledDialog open={open} onClose={onClose}>
          <DialogTitle>
            <strong>
              {terrorist.name} ➡️ {terrorist.organizationName}
            </strong>
          </DialogTitle>

          <DialogContent dividers>
            {dialogs.map((dialog) => (
              <Typography key={dialog.label}>
                <strong>{dialog.label}:</strong> {dialog.value}
              </Typography>
            ))}
          </DialogContent>

          <Button
            onClick={() =>
              navigate(
                `/updateTerrorist/${terrorist.idOfOrganization}/${terrorist.id}`
              )
            }
          >
            update terrorist ✏️
          </Button>
        </StyledDialog>
      )}
    </>
  );
}
