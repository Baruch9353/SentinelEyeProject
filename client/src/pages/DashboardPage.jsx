import { useSelector } from "react-redux";

import StatusData from "../components/initData/StatusData.jsx";

import DashboardContent from "../components/dashboard/DashboardContent.jsx";

export default function DashboardPage() {
  const { allOrganizationsList } = useSelector((state) => state.organizations);
  const { allTerroristsList } = useSelector((state) => state.terrorists);
  const { loading } = useSelector(
    (state) => state.organizations || state.terrorists
  );
  const { error } = useSelector(
    (state) => state.organizations || state.terrorists
  );

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
