interface FilterOptionsProps {
  options: string[];
  activeOption: string;
  onOptionChange: (option: string) => void;
}

const FilterOptions = ({
  options,
  activeOption,
  onOptionChange,
}: FilterOptionsProps) => {
  return (
    <div className="filter-options">
      <div className="filter-elements">
        {options.map((option) => (
          <div
            key={option}
            className={`filter-button ${
              option.toLowerCase() === activeOption ? "active" : ""
            }`}
            onClick={() => onOptionChange(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterOptions;
