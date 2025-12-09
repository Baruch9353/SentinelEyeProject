import { Box } from "@mui/material";

export function FormContainer({ onSubmit, children }) {
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: { xs: "85%", md: "50%" },
                mx: "auto",
            }}
        >
            {children}
        </Box>
    );
}
