import { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { fetchTerrorists } from "../redux/api/fetchTerrorists.js";

import StatusData from "../components/initData/StatusData.jsx";

import TopPageFilter from "../components/TopPage/TopPageFilter.jsx";
import TerroristsAccordion from "../components/terroristsComponents/TerroristsList.jsx";

export default function TerroristsPage() {
  const { orgId } = useParams();
  
  const { loading, error, allTerroristsList } = useSelector(
    (state) => state.terrorists
  );
  const { allOrganizationsList } = useSelector((state) => state.organizations);

  const org = orgId
    ? allOrganizationsList?.find((org) => org.id == orgId)
    : null;

  const [filtered, setFiltered] = useState(allTerroristsList);

  return (
    <>
      <TopPageFilter
        description={org ? `${org.name}  terrorists` : "All terrorists"}
        org={org}
        fetchFunc={fetchTerrorists}
        initialData={allTerroristsList}
        onChange={setFiltered}
        pathClickAdd={`/addTerrorist${orgId ? "/" + orgId : ""}`}
      />
      <StatusData
        loading={loading}
        error={error}
        content={<TerroristsAccordion terrorists={filtered} />}
      />
    </>
  );
}
