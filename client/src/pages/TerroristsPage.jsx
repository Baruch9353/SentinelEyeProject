import { useState } from "react";
import { useParams } from "react-router";

import { fetchTerrorists } from "../redux/api/fetchTerrorists.js";

import StatusData from "../components/initData/StatusData.jsx";

import TopPageFilter from "../components/TopPage/TopPageFilter.jsx";

import TerroristsAccordion from "../components/terroristsComponents/TerroristsList.jsx";

import { useAppData } from "../hooks/useAppData.js";

export default function TerroristsPage() {
  const { orgId } = useParams();
  const { loading, error, allOrganizationsList, allTerroristsList } = useAppData();

  const [filtered, setFiltered] = useState(allTerroristsList);

  const org = orgId
    ? allOrganizationsList?.find((org) => org.id == orgId)
    : null;

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
