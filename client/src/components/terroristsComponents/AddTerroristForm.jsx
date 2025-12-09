import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import { createTerrorist } from "../../redux/api/fetchTerrorists";

import { useAppData } from "../../hooks/useAppData";

import { ACTIVITY_END_PRESENT } from "../../constants/formConsts";

import { TerroristFormBase } from "./TerroristFormBase";

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedOrg = allOrganizationsList.find(({ id }) =>
      id === formData.idOfOrganization);

    const terrorist = {
      ...formData,
      activityEnd: formData.activityEnd === "" ? ACTIVITY_END_PRESENT : " " + formData.activityEnd,
      organizationName: selectedOrg?.name,
      lastUpdated: new Date().toLocaleDateString(),
    };

    try {
     dispatch(createTerrorist(terrorist)).unwrap();
      setFeedback("Terrorist added successfully!");
      setTimeout(() => navigate(-1), 1500);
    } catch {
      setFeedback("Failed to add terrorist.");
    }
  };

  return (
    <TerroristFormBase
      title={`Add a new terrorist ${orgId ? `to ${org?.name}` : ""}`}
      submitLabel="Add terrorist"
      formData={formData}
      setFormData={setFormData}
      feedback={feedback}
      onSubmit={handleSubmit}
      allOrganizationsList={allOrganizationsList}
      showOrganizationSelect={!orgId}
    />
  );
}
