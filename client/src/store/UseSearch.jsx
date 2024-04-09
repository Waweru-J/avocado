import { useContext } from "react";
import { SearchContext } from "./SearchProvider";

const useSearch = () => {
  return useContext(SearchContext);
};

export default useSearch;
