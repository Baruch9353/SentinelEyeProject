import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import { TextField, Button, Typography } from "@mui/material";

import { FormContainer } from "../formComponents/FormContainer"
import { FormFeedback } from "../formComponents/FormFeedback";

import { fetchUpdateOrganization } from "../../redux/api/fetchOrganizations";

import { useAppData } from "../../hooks/useAppData";

import { ACTIVITY_END_PRESENT } from "../../constants/formConsts";

export default function UpdateOrganizationForm() {
  const { orgId } = useParams();
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

  const { allOrganizationsList } = useAppData();
  const org = allOrganizationsList.find(({ id }) => id === orgId);

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

    const organization = {
      ...formData,
      activityEnd:
        formData.activityEnd === ""
          ? ACTIVITY_END_PRESENT
          : formData.activityEnd,
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
    <FormContainer
      onSubmit={handleSubmit}
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
        name="infoUrl"
        label="Image URL (optional)"
        value={formData.infoUrl}
        onChange={handleChange}
      />

      <FormFeedback
        message={feedback}
      />

      <Button type="submit" variant="outlined">
        Update Organization
      </Button>
    </FormContainer>
  );
}
