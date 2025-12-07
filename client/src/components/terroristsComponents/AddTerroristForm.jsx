import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import { TextField, Button, MenuItem, Typography } from "@mui/material";

import { FormContainer } from "../formComponents/FormContainer"
import { FormFeedback } from "../formComponents/FormFeedback";

import { fetchAddTerrorist } from "../../redux/api/fetchTerrorists";

import { useAppData } from "../../hooks/useAppData";

import {
  ACTIVITY_END_PRESENT,
  STATUSES,
  INTEL_CONFIDENCES,
} from "../../constants/formConsts";

export default function AddTerroristForm() {
  const { orgId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allOrganizationsList } = useAppData();

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

  const org = orgId
    ? allOrganizationsList.find(({ id }) => id === orgId)
    : null;

  useEffect(() => {
    if (orgId) {
      setFormData((prev) => ({ ...prev, idOfOrganization: orgId }));
    }
  }, [orgId]);

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

    const selectedOrg = allOrganizationsList.find(
      ({ id }) => id === formData.idOfOrganization
    );

    const terrorist = {
      ...formData,
      activityEnd:
        formData.activityEnd === ""
          ? ACTIVITY_END_PRESENT
          : " " + formData.activityEnd,
      organizationName: org?.name || selectedOrg.name,
      lastUpdated: new Date().toLocaleDateString(),
    };

    try {
      await dispatch(fetchAddTerrorist(terrorist)).unwrap();
      setFeedback("Terrorist added successfully!");
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (err) {
      setFeedback("Failed to add terrorist.");
    }
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
    >

      <Typography fontSize="2rem" color="#316743ff">
        Add a new terrorist {orgId && `to ${org?.name} organization`}
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
            {allOrganizationsList.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
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

      <FormFeedback
        message={feedback}
      />

      <Button type="submit" variant="outlined">
        Add terrorist
      </Button>
    </FormContainer>
  );
}
