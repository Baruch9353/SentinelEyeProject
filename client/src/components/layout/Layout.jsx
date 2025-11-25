import { useState } from "react";
import { useNavigate } from "react-router";

import {
  styled,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Footer from "./Footer.jsx";
import SentinelEye from "../../assets/SentinelEye.png";
import { Logo } from "../layout/AppDrawer.jsx";
import AppDrawer from "../layout/AppDrawer.jsx";

const StyledAppBar = styled(AppBar)({
  position: "fixed",
  background: "#c0e5f8ff",
  color: "#316743ff",
  boxShadow: "0 4px 8px rgba(31, 72, 89, 0.8)",
});

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <StyledAppBar>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography fontSize="3rem">Sentinel Eye</Typography>
          <Logo
            src={SentinelEye}
            alt="Sentinel Eye"
            onClick={() => navigate("/dashboard")}
          />
        </Toolbar>
      </StyledAppBar>
      <AppDrawer open={open} setOpen={setOpen} />

      <Box mt={"8rem"}>{children}</Box>
      <Box mb={"5rem"}>
        <Footer />
      </Box>
    </>
  );
}
