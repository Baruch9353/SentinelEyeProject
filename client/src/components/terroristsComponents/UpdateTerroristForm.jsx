import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import { updateTerrorist } from "../../redux/api/fetchTerrorists";

import { useAppData } from "../../hooks/useAppData";

import { ACTIVITY_END_PRESENT } from "../../constants/formConsts";

import { TerroristFormBase } from "./TerroristFormBase";

export default function UpdateTerroristForm() {
  const { orgId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allOrganizationsList, allTerroristsList } = useAppData();

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

  const org = allOrganizationsList.find(({ id }) => id === orgId);
  const terrorist = allTerroristsList?.find(({ id }) => id === id);

  useEffect(() => {
    if (terrorist) {
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
    }
  }, [terrorist]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const terrorist = {
      ...formData,
      id,
      activityEnd: formData.activityEnd === "" ? ACTIVITY_END_PRESENT : " " + formData.activityEnd,
      organizationName: org?.name,
      lastUpdated: new Date().toLocaleDateString(),
    };

    try {
      dispatch(updateTerrorist(terrorist)).unwrap();
      setFeedback("Terrorist updated successfully!");
      setTimeout(() => navigate(-1), 1500);
    } catch {
      setFeedback("Failed to update terrorist.");
    }
  };

  return (
    <TerroristFormBase
      title={`Update terrorist - ${formData.name}`}
      submitLabel="Update terrorist"
      formData={formData}
      setFormData={setFormData}
      feedback={feedback}
      onSubmit={handleSubmit}
      allOrganizationsList={allOrganizationsList}
      showOrganizationSelect={true}
    />
  );
}
