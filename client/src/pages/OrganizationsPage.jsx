import { useState } from "react";

import { fetchOrganizations } from "../redux/api/fetchOrganizations.js";

import StatusData from "../components/initData/StatusData.jsx";

import TopPageFilter from "../components/TopPage/TopPageFilter.jsx";
import OrganizationsList from "../components/organizationsComponents/OrganizationList.jsx";

import { useAppData } from "../hooks/useAppData.js";

export default function OrganizationsPage() {
  const { loading, error, allOrganizationsList } = useAppData();

  const [filtered, setFiltered] = useState(allOrganizationsList);

  return (
    <>
      <TopPageFilter
        description="Organizations"
        fetchFunc={fetchOrganizations}
        initialData={allOrganizationsList}
        onChange={setFiltered}
        pathClickAdd="/addOrganization"
      />
      <StatusData
        loading={loading}
        error={error}
        content={<OrganizationsList organizations={filtered} />}
      />
    </>
  );
}
