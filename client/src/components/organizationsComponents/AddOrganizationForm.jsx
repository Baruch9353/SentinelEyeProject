import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { createOrganization } from "../../redux/api/fetchOrganizations";

import { ACTIVITY_END_PRESENT } from "../../constants/formConsts";

import { OrganizationFormBase } from "./OrganizationFormBase";

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const organization = {
      ...formData,
      activityEnd:
        formData.activityEnd === "" ? ACTIVITY_END_PRESENT : formData.activityEnd,
    };

    try {
      dispatch(createOrganization(organization)).unwrap();
      setFeedback("Organization added successfully!");
      setTimeout(() => navigate(-1), 1500);
    } catch {
      setFeedback("Failed to add Organization.");
    }
  };

  return (
    <OrganizationFormBase
      title="Add a new organization"
      submitLabel="Add Organization"
      formData={formData}
      setFormData={setFormData}
      feedback={feedback}
      onSubmit={handleSubmit}
    />
  );
}
