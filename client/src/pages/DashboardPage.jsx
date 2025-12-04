import { useSelector } from "react-redux";

import StatusData from "../components/initData/StatusData.jsx";

import DashboardContent from "../components/dashboard/DashboardContent.jsx";

import { useAppData } from "../hooks/useAppData.js";

export default function DashboardPage() {
  const { allOrganizationsList, allTerroristsList, loading, error } = useAppData();

  return (
    <StatusData
      loading={loading}
      error={error}
      content={
        <DashboardContent
          organizations={allOrganizationsList}
          terrorists={allTerroristsList}
        />
      }
    />
  );
}
