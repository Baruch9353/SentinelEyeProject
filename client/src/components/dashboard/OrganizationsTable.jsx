import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

export default function OrganizationsTable({ organizations }) {
  const navigate = useNavigate();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const columns = [
    { id: "name", label: "Organization" },
    { id: "activityStart", label: "Activity years" },
    { id: "threatLevel", label: "Threat level" },
    { id: "terroristCount", label: "Total terrorists" },
  ];

  const handleSort = (column) => {
    if (orderBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(column);
      setOrder("asc");
    }
  };

  const sortedOrgs = [...organizations].sort((a, b) => {
    const result = a[orderBy] > b[orderBy] ? 1 : -1;
    return order === "asc" ? result : -result;
  });

  return (
    <TableContainer
      sx={{
        backgroundColor: " #d7f4ff8b",
        margin: "1rem",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id}>
                <TableSortLabel
                  active={orderBy === col.id}
                  direction={orderBy === col.id ? order : "asc"}
                  onClick={() => handleSort(col.id)}
                >
                  <strong>{col.label}</strong>
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedOrgs.map((org) => (
            <TableRow
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: " #d7f4ffff",
                },
              }}
              key={org.id}
              onClick={() => navigate(`/organization/${org.id}`)}
            >
              {columns.map((col) => (
                <TableCell key={col.id}>
                  {col.id === "activityStart"
                    ? org.activityStart + org.activityEnd
                    : org[col.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
