import React, { useEffect, useState } from "react";
import FilterModel from "./FilterModel";
import { useDispatch } from "react-redux"
import { getAllProperties } from "../../Store/Property/property-action";
import { propertyAction } from "../../Store/Property/property-slice";
const Filter = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(propertyAction.updateSearchParams(selectedFilters));
    dispatch(getAllProperties())
  }, [selectedFilters, dispatch])
  const handleOpenModel = () => {
    setIsModelOpen(true);
  };
  const handleCloseModel = () => {
    setIsModelOpen(false);
  };
  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };
  return (
    <>
      <span class="material-symbols-outlined filter" onClick={handleOpenModel}>
        tune
      </span>
      {isModelOpen && (
        <FilterModel
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClose={handleCloseModel}
        />
      )}
    </>
  );
};

export default Filter;





































