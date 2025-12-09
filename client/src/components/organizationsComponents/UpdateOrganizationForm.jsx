import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import { updateOrganization } from "../../redux/api/fetchOrganizations";

import { useAppData } from "../../hooks/useAppData";

import { ACTIVITY_END_PRESENT } from "../../constants/formConsts";

import { OrganizationFormBase } from "./OrganizationFormBase";

export default function UpdateOrganizationForm() {
  const { orgId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allOrganizationsList } = useAppData();

  const [feedback, setFeedback] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    threatLevel: "4",
    activityStart: "",
    activityEnd: "",
    infoUrl: "",
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const organization = {
      ...formData,
      activityEnd:
        formData.activityEnd === "" ? ACTIVITY_END_PRESENT : formData.activityEnd,
      id: orgId,
    };

    try {
      dispatch(updateOrganization(organization)).unwrap();
      setFeedback("Organization updated successfully!");
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      setFeedback("Failed to update Organization.");
    }
  };

  return (
    <OrganizationFormBase
      title={`Update ${formData.name} organization`}
      submitLabel="Update Organization"
      formData={formData}
      setFormData={setFormData}
      feedback={feedback}
      onSubmit={handleSubmit}
    />
  );
}
