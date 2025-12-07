import { Typography } from "@mui/material";

export function FormFeedback({ message }) {
    if (!message) return null;

    return (
        <Typography
            sx={{ backgroundColor: "#84d1ed67" }}
            color={message.includes("successfully") ? "green" : "red"}
        >
            {message}
        </Typography>
    );
}
