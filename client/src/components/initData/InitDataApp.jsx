import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchOrganizations } from "../../redux/api/fetchOrganizations";
import { fetchTerrorists } from "../../redux/api/fetchTerrorists";

import { useAppData } from "../../hooks/useAppData";

import { setTerroristCount } from "../../redux/features/organizationsSlice";

export default function InitDataApp() {
  const dispatch = useDispatch();

  const { allTerroristsList } = useAppData();;

  useEffect(() => {
    dispatch(fetchOrganizations());
    dispatch(fetchTerrorists());
  }, []);

  useEffect(() => {
    if (allTerroristsList.length) {
      dispatch(setTerroristCount(allTerroristsList));
    }
  }, [allTerroristsList]);
}
