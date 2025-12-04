import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";

import { fetchUpdateTerrorist } from "../../redux/api/fetchTerrorists";

import { useAppData } from "../../hooks/useAppData";

import {
  ACTIVITY_END_PRESENT,
  STATUSES,
  INTEL_CONFIDENCES,
} from "../../constants/formConsts";

export default function UpdateTerroristForm() {
  const { orgId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const { allOrganizationsList, allTerroristsList } = useAppData();
  const org = allOrganizationsList.find(({ id }) => id === orgId);
  const terrorist = allTerroristsList?.find(({ id }) => id === id);

  useEffect(() => {
    if (terrorist)
      setFormData({
        idOfOrganization: orgId,
        name: terrorist.name,
        threatLevel: terrorist.threatLevel,
        status: terrorist.status,
        activityStart: terrorist.activityStart,
        activityEnd: terrorist.activityEnd,
        intelNote: terrorist.intelNote,
        intelConfidence: terrorist.intelConfidence,
        updatedBy: terrorist.updatedBy,
      });
  }, [terrorist]);

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const terrorist = {
      ...formData,
      id,
      activityEnd:
        formData.activityEnd === ""
          ? ACTIVITY_END_PRESENT
          : " " + formData.activityEnd,
      organizationName: org?.name,
      lastUpdated: new Date().toLocaleDateString(),
    };

    try {
      await dispatch(fetchUpdateTerrorist(terrorist)).unwrap();
      setFeedback("Terrorist updated successfully!");
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (err) {
      setFeedback("Failed to update terrorist.");
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
        Update terrorist - {formData.name}
      </Typography>

      <TextField
        select
        name="idOfOrganization"
        label="Select organization (optional)"
        value={formData.idOfOrganization}
        onChange={handleChange}
      >
        {allOrganizationsList.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </TextField>

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
        {STATUSES.map((status) => (
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
        label="From"
        helperText="Activity start date"
        variant="filled"
        required
      />

      <TextField
        name="activityEnd"
        value={
          formData.activityEnd === ACTIVITY_END_PRESENT
            ? ""
            : formData.activityEnd
        }
        onChange={handleChange}
        type="month"
        label="To (optional)"
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
        {INTEL_CONFIDENCES.map((level) => (
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
        Update terrorist
      </Button>
    </Box>
  );
}
