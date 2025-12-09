import { TextField, Button, MenuItem, Typography } from "@mui/material";

import { FormContainer } from "../formComponents/FormContainer";
import { FormFeedback } from "../formComponents/FormFeedback";

import { ACTIVITY_END_PRESENT, STATUSES, INTEL_CONFIDENCES } from "../../constants/formConsts";

export function TerroristFormBase({
    title,
    submitLabel,
    formData,
    setFormData,
    feedback,
    onSubmit,
    allOrganizationsList,
    showOrganizationSelect,
}) {

    const handleChange = ({ target: { name, value } }) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <FormContainer onSubmit={onSubmit}>
            <Typography fontSize="2rem" color="#316743ff">
                {title}
            </Typography>

            {showOrganizationSelect && (
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
                value={formData.activityEnd === ACTIVITY_END_PRESENT ? "" : formData.activityEnd}
                onChange={handleChange}
                type="month"
                label="To (optional)"
                helperText="Leave empty for Present"
                variant="filled"
            />

            <TextField
                name="intelNote"
                label="Intel Note"
                value={formData.intelNote}
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

            <FormFeedback message={feedback} />

            <Button type="submit" variant="outlined">
                {submitLabel}
            </Button>
        </FormContainer>
    );
}
