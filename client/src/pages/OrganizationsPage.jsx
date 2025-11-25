import { useState } from "react";
import { useSelector } from "react-redux";

import { fetchOrganizations } from "../redux/api/fetchOrganizations.js";

import StatusData from "../components/initData/StatusData.jsx";

import TopPageFilter from "../components/TopPage/TopPageFilter.jsx";
import OrganizationsList from "../components/organizationsComponents/OrganizationList.jsx";

export default function OrganizationsPage() {
  const { loading, error, allOrganizationsList } = useSelector(
    (state) => state.organizations
  );
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
