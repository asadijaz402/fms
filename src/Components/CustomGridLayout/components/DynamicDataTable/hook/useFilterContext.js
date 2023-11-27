import { useContext } from "react";
import FilterContext from "../context/FilterContext";

const useFilterContext = () => useContext(FilterContext);

export default useFilterContext;
