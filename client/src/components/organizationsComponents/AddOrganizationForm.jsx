import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { Box, TextField, Button, Typography } from "@mui/material";

import { fetchAddOrganization } from "../../redux/api/fetchOrganizations";

export default function AddOrganizationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    threatLevel: "4",
    activityStart: "",
    activityEnd: "",
    infoUrl: "",
  });

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
    };

    try {
      await dispatch(fetchAddOrganization(organization)).unwrap();
      setFeedback("Organization added successfully!");
      setTimeout(() => {
        navigate(-1);
      }, 1500)
    } catch (err) {
      setFeedback("Failed to add Organization.");
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
        Add a new organization
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
        add Organization
      </Button>
    </Box>
  );
}
