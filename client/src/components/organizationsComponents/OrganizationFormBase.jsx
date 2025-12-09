import { TextField, Button, Typography } from "@mui/material";

import { FormContainer } from "../formComponents/FormContainer";
import { FormFeedback } from "../formComponents/FormFeedback";

import { ACTIVITY_END_PRESENT } from "../../constants/formConsts";

export function OrganizationFormBase({
    title,
    submitLabel,
    formData,
    setFormData,
    feedback,
    onSubmit,
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

            <FormFeedback message={feedback} />

            <Button type="submit" variant="outlined">
                {submitLabel}
            </Button>
        </FormContainer>
    );
}
