import { Box, CircularProgress, styled } from "@mui/material";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  color: "red",
});

export default function StatusData({ loading, error, content }) {
  if (loading) {
    return (
      <StyledBox>
        <CircularProgress />
      </StyledBox>
    );
  }

  if (error) {
    return <StyledBox >Error loading data: {error}</StyledBox>;
  }

  return content;
}
