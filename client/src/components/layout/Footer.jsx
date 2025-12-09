import { Typography, Box, styled } from "@mui/material";

const StyledFooter = styled(Box)({
  component: "footer",
  position: "fixed",
  bottom: 0,
  width: "100%",
  textAlign: "center",
  padding: "0.5rem",
  backgroundColor: "#c0e5f8ff",
  fontSize: "1rem",
});

export default function Footer() {
  return (
    <StyledFooter>
      <Typography>© 2025  Baruch Minzberg</Typography>
    </StyledFooter>
  );
}
