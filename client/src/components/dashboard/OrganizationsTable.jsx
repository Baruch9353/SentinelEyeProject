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

import { ORDER, COLUMNS } from "../../constants/tableConsts";

export default function OrganizationsTable({ organizations }) {
  const navigate = useNavigate();

  const [order, setOrder] = useState(ORDER.ASC);
  const [orderBy, setOrderBy] = useState(COLUMNS.NAME);

  const columns = [
    { id: COLUMNS.NAME, label: "Organization" },
    { id: COLUMNS.ACTIVITY_START, label: "Activity years" },
    { id: COLUMNS.THREAT_LEVEL, label: "Threat level" },
    { id: COLUMNS.TERRORIST_COUNT, label: "Total terrorists" },
  ];

  const handleSort = (column) => {
    if (orderBy === column) {
      setOrder(order === ORDER.ASC ? ORDER.DESC : ORDER.ASC);
    } else {
      setOrderBy(column);
      setOrder(ORDER.ASC);
    }
  };

  const sortedOrgs = [...organizations].sort((orgA, orgB) => {
    const result = orgA[orderBy] > orgB[orderBy] ? 1 : -1;
    return order === ORDER.ASC ? result : -result;
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
                  direction={orderBy === col.id ? order : ORDER.ASC}
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
                  {col.id === COLUMNS.ACTIVITY_START
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
