import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";

import { fetchAddTerrorist } from "../../redux/api/fetchTerrorists";

const statuses = ["Active", "Detained", "Deceased", "Unknown"];
const intelConfidences = ["Low", "Medium", "High"];

export default function AddTerroristForm() {
  const { orgId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { allOrganizationsList } = useSelector((state) => state.organizations);

  const isOrg = orgId
    ? allOrganizationsList.find((org) => org.id === orgId)
    : null;

  const [feedback, setFeedback] = useState("");

  const [formData, setFormData] = useState({
    idOfOrganization: "",
    name: "",
    threatLevel: "4",
    status: "Unknown",
    activityStart: "",
    activityEnd: "",
    intelNote: "",
    intelConfidence: "Medium",
    updatedBy: "",
  });

  useEffect(() => {
    if (orgId) {
      setFormData((prev) => ({ ...prev, idOfOrganization: orgId }));
    }
  }, [orgId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedOrg = allOrganizationsList.find(
      (org) => org.id === formData.idOfOrganization
    );

    const terrorist = {
      ...formData,
      activityEnd:
        formData.activityEnd === "" ? " - Present" : " " + formData.activityEnd,
      organizationName: selectedOrg?.name,
      lastUpdated: new Date().toLocaleDateString(),
    };

    try {
      await dispatch(fetchAddTerrorist(terrorist)).unwrap();
      setFeedback("Terrorist added successfully!");
      setTimeout(() => {
        navigate(-1);
      }, 1500)
    } catch (err) {
      setFeedback("Failed to add terrorist.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: { xs: "85%", md: "50%" },
        mx: "auto",
      }}
    >
      <Typography fontSize="2rem" color="#316743ff">
        Add a new terrorist {orgId && `to ${isOrg?.name} organization`}
      </Typography>

      {!orgId && (
        <>
          <TextField
            select
            name="idOfOrganization"
            label="Select organization"
            value={formData.idOfOrganization}
            onChange={handleChange}
          >
            {allOrganizationsList.map((org) => (
              <MenuItem key={org.id} value={org.id}>
                {org.name}
              </MenuItem>
            ))}
          </TextField>
        </>
      )}

      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextField
        name="threatLevel"
        label="Threat Level (1 - 5)"
        type="number"
        value={formData.threatLevel}
        onChange={handleChange}
        required
        inputProps={{ min: 1, max: 5 }}
      />

      <TextField
        select
        name="status"
        label="Status"
        value={formData.status}
        onChange={handleChange}
        required
      >
        {statuses.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="activityStart"
        value={formData.activityStart}
        onChange={handleChange}
        type="month"
        label="____From"
        helperText="Activity start date"
        variant="filled"
        required
      />

      <TextField
        name="activityEnd"
        value={
          formData.activityEnd === " - Present" ? "" : formData.activityEnd
        }
        onChange={handleChange}
        type="month"
        label="____To (optional)"
        helperText="Leave empty for Present"
        variant="filled"
      />

      <TextField
        name="intelNote"
        value={formData.intelNote}
        label="Intel Note"
        onChange={handleChange}
        required
      />

      <TextField
        select
        name="intelConfidence"
        label="Intel Confidence"
        value={formData.intelConfidence}
        onChange={handleChange}
        required
      >
        {intelConfidences.map((level) => (
          <MenuItem key={level} value={level}>
            {level}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="updatedBy"
        label="Updated By"
        value={formData.updatedBy}
        onChange={handleChange}
        required
      />

      {feedback && (
        <Typography
          sx={{ backgroundColor: " #84d1ed67" }}
          color={feedback.includes("successfully") ? "green" : "red"}
        >
          {feedback}
        </Typography>
      )}

      <Button type="submit" variant="outlined">
        Add terrorist
      </Button>
    </Box>
  );
}
