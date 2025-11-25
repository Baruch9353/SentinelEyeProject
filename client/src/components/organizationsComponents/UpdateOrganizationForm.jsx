import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Box, TextField, Button, Typography } from "@mui/material";

import { fetchUpdateOrganization } from "../../redux/api/fetchOrganizations";

export default function UpdateOrganizationForm() {
  const { orgId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allOrganizationsList } = useSelector((state) => state.organizations);
  const org = allOrganizationsList.find((org) => org.id === orgId);

  const [feedback, setFeedback] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    threatLevel: "4",
    activityStart: "",
    activityEnd: "",
    infoUrl: "",
  });

  useEffect(() => {
    if (org)
      setFormData({
        name: org.name,
        threatLevel: org.threatLevel,
        activityStart: org.activityStart,
        activityEnd: org.activityEnd,
        infoUrl: org.infoUrl || "",
      });
  }, [org]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const organization = {
      ...formData,
      activityEnd:
        formData.activityEnd === "" ? " - Present" : formData.activityEnd,
      id: orgId,
    };

    try {
      await dispatch(fetchUpdateOrganization(organization)).unwrap();
      setFeedback("Organization updated successfully!");
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (err) {
      setFeedback("Failed to update Organization. " + err);
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
        Update {formData.name} organization
      </Typography>

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
        name="infoUrl"
        label="Image URL (optional)"
        value={formData.infoUrl}
        onChange={handleChange}
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
        Update Organization
      </Button>
    </Box>
  );
}
