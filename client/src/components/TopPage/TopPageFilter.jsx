import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { Box, Typography, TextField, Button } from "@mui/material";

import { StyledAvatar } from "../organizationsComponents/OrganizationCard";

export default function TopPageFilter({
  description,
  org,
  fetchFunc,
  initialData,
  onChange,
  pathClickAdd,
}) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickAdd = () => {
    navigate(pathClickAdd);
  };

  const handleClickUpdate = () => {
    navigate(`/updateOrganization/${org.id}`);
  };

  const filterByOrg = (data) => {
    return org ? data.filter((ter) => ter.idOfOrganization === org.id) : data;
  };

  const fetchSearchAndFilter = async () => {
    const { payload = [] } = await dispatch(fetchFunc({ search }));
    onChange(filterByOrg(payload));
  };

  useEffect(() => {
    if (!search.trim()) {
      onChange(filterByOrg(initialData));
    } else {
      fetchSearchAndFilter();
    }
  }, [search, org, initialData]);

  return (
    <Box
      color="#316743ff"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      padding="0 3rem 0 5rem"
    >
      {org && (
        <StyledAvatar
          src={org.image || org.infoUrl}
          alt={org.name}
          variant="rounded"
          sx={{ mr: "2rem" }}
        />
      )}

      <Typography fontSize="2.5rem">{description}</Typography>

      <TextField
        sx={{ minWidth: "23%", maxWidth: "80%" }}
        label="Search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {org && <Button onClick={handleClickUpdate}>✏️</Button>}

      <Button onClick={handleClickAdd}>➕</Button>
    </Box>
  );
}
