import { useAppSelector } from "@/redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Import `useDispatch` from `react-redux`
import { setSearchQuery } from "../../redux/features/utilSlice";
import searchIcon from "./searchIcon.svg";
import "./searchinput.scss";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const { usePageSearch } = useAppSelector((state) => state.utils);

  const getSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    // Use `useEffect` to dispatch the action after the state update is complete
    dispatch(setSearchQuery(searchValue));
  }, [searchValue, dispatch]);

  return (
    <div className={"general_searchInput"}>
      <div className={"general_searchWrap"}>
        <img src={searchIcon} alt="" className={"searchIcon"} />
        <input
          type="text"
          placeholder={`Search ${usePageSearch.content}`}
          value={searchValue}
          onChange={(e) => getSearchValue(e)}
        />
      </div>
    </div>
  );
};

export default SearchInput;
