import { useEffect, useState } from "react";
import "./filters.scss";

const Filters = () => {
  const [checkedFilters, setCheckedFilters] = useState<string[]>([]);
  const filters = [
    "LinkedIn",
    "Facebook",
    "Twitter (X)",
    "No email",
    "No phone",
    "No website",
    "No address",
    "With phone",
    "Both phone and email",
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const filtersParam = urlParams.getAll("filter");
    setCheckedFilters(filtersParam);
  }, []);

  const handleGetFilters = (filter: string) => {
    const index = checkedFilters.indexOf(filter);
    if (index === -1) {
      // Add filter if it's not already in the list
      const updatedFilters = [...checkedFilters, filter];
      setCheckedFilters(updatedFilters);
      updateURLParams(updatedFilters);
    } else {
      // Remove filter if it's already in the list
      const updatedFilters = checkedFilters.filter((f) => f !== filter);
      setCheckedFilters(updatedFilters);
      updateURLParams(updatedFilters);
    }
  };

  const updateURLParams = (filters: string[]) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("filter");
    filters.forEach((filter) => urlParams.append("filter", filter));
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
  };

  const handleRemovefilters = () => {
    setCheckedFilters([]);
    updateURLParams([]);
  };

  return (
    <div className="email-filters">
      <div className="filter border-bottom mb-1">
        <h1>Filters</h1>
        <p onClick={handleRemovefilters}>reset</p>
      </div>
      <div className="desktop-filters">
        {filters.map((filter, i) => (
          <div key={i} className="filter">
            <label htmlFor={filter}>{filter}</label>
            <input
              type="checkbox"
              name={filter}
              id={filter}
              checked={checkedFilters.includes(filter)}
              onChange={() => handleGetFilters(filter)}
            />
          </div>
        ))}
      </div>
      <select
        name="email-filters"
        className="email-filters-select-mobile"
        id=""
        onChange={(e) => handleGetFilters(e.target.value)}
        value={checkedFilters}
        multiple={true}
      >
        {filters.map((filter, i) => (
          <option key={i} value={filter}>
            {filter}
          </option>
        ))}
      </select>
      {checkedFilters.length > 0 && (
        <div className="selected">
          <p>selected:</p>
          {checkedFilters.map((filter, i) => (
            <div key={i} className="sel">
              <label htmlFor={filter}>{filter}</label>
              <span
                onClick={() => handleGetFilters(filter)}
                className="remove-filter"
              >
                X
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filters;
