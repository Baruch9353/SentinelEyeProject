import { useNavigate } from "react-router";

import { styled, Drawer, List, ListItemButton, ListItemText } from "@mui/material";

import SentinelEye from "../../assets/SentinelEye.png";


export const Logo = styled("img")({
  height: "5rem",
  padding: "0.8rem",
  borderRadius: "1.3rem",
});

const StyledDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: "13rem",
    backgroundColor: "#c0e5f8ff",
    color: "#316743ff",
    alignItems: "center",
  },
});

const StyledList = styled(List)({
  borderTop: "0.1rem solid #316743ff",
  backgroundColor: "#cef3f7ff",
  marginTop: "2.3rem",
  width: "90%",
  borderRadius: "1rem",
});


export default function AppDrawer({ open, setOpen }) {
  const navigate = useNavigate();
  
  const items = [
    { text: "Dashboard", path: "/dashboard" },
    { text: "Organizations", path: "/organizations" },
    { text: "Terrorists", path: "/terrorists" },
  ];

  return (
    <StyledDrawer open={open} onClose={() => setOpen(false)} anchor="left">
      <Logo src={SentinelEye} alt="Sentinel Eye Logo" />
      <StyledList>
        {items.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => {
              setOpen(false);
              navigate(item.path);
            }}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </StyledList>
    </StyledDrawer>
  );
}
