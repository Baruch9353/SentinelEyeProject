import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrganizations } from "../../redux/api/fetchOrganizations";
import { fetchTerrorists } from "../../redux/api/fetchTerrorists";
import { setTerroristCount } from "../../redux/features/organizationsSlice";

export default function InitDataApp() {
  const dispatch = useDispatch();

  const { allTerroristsList } = useSelector((state) => state.terrorists);

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
