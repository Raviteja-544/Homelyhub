import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import "../../CSS/FilterModal.css";
import "react-input-range/lib/css/index.css";
import InputRange from "react-input-range";
const FilterModel = ({ selectedFilters, onFilterChange, onClose }) => {
    const [priceRange, setPriceRange] = useState({
        min: selectedFilters.priceRange?.min || 600,
        max: selectedFilters.priceRange?.max || 30000,
    });
    const [propertyType, setPropertyType] = useState(
        selectedFilters.propertyType || ""
    );
    const [roomType, setRoomType] = useState(selectedFilters.roomType || "");
    const [amenities, setAmenities] = useState(selectedFilters.amenities || []);
    useEffect(() => {
        setPriceRange({
            min: selectedFilters.priceRange?.min || 600,
            max: selectedFilters.priceRange?.max || 30000,
        });
        setPropertyType(selectedFilters.propertyType || "");
        setRoomType(selectedFilters.roomType || "");
        setAmenities(selectedFilters.amenities || []);
    }, [selectedFilters]);
    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
    };
    const handleMinInput = (e) => {
        const minValue = parseInt(e.target.value, 10);
        setPriceRange((prev) => ({
            ...prev,
            min: minValue,
        }));
    };
    const handleMaxInput = (e) => {
        const maxValue = parseInt(e.target.value, 10);
        setPriceRange((prev) => ({
            ...prev,
            max: maxValue,
        }));
    };
    const handleFilterChange = () => {
        onFilterChange("minPrice", priceRange.min);
        onFilterChange("maxPrice", priceRange.max);
        onFilterChange("propertyType", propertyType);
        onFilterChange("roomType", roomType);
        onFilterChange("amenities", amenities);
        onClose();
    };
    //option for property type
    const propertyTypeOption = [
        {
            value: "House",
            label: "House",
            icon: "house",
        },
        {
            value: "Flat",
            label: "Flat",
            icon: "apartment",
        },
        {
            value: "Guest House",
            label: " Guest House",
            icon: "hotel",
        },
        {
            value: "Hotel",
            label: "Hotel",
            icon: "meeting_room",
        },
    ];
    //for room
    const roomTypeOPtions = [
        {
            value: "Entire Room",
            label: "Entire Room",
            icon: "hotel",
        },
        {
            value: "Room",
            label: "Room",
            icon: "meeting_room",
        },
        {
            value: "AnyType",
            label: "AnyType",
            icon: "apartment",
        },
    ];
    //amenities
    const amenitiesOptions = [
        {
            value: "Wifi",
            label: "Wifi",
            icon: "wifi",
        },
        {
            value: "Kitchen",
            label: "Kitchen",
            icon: "kitchen",
        },
        {
            value: "Ac",
            label: "AC",
            icon: "ac_unit",
        },
        {
            value: "Washing Machine",
            label: "Washing Machine",
            icon: "local_laundry_service",
        },
        {
            value: "Tv",
            label: "Tv",
            icon: "tv",
        },
        {
            value: "Pool",
            label: "Pool",
            icon: "pool",
        },
        {
            value: "Free Parking",
            label: "Free parking",
            icon: "local_parking",
        },
    ];
    const handleClearFilters = () => {
        setPriceRange({ min: 600, max: 30000 });
        setPropertyType("");
        setRoomType("");
        setAmenities([]);
    };
    //changes in amenities
    const handleAmenitiesChange = (selectedAmenity) => {
        setAmenities((prevAmenities) =>
            prevAmenities.includes(selectedAmenity)
                ? prevAmenities.filter((item) => item !== selectedAmenity)
                : [...prevAmenities, selectedAmenity]
        );
    };
    //change property type
    const handlePropertyTypeChange = (selectedType) => {
        setPropertyType((prevType) =>
            prevType === selectedType ? "" : selectedType
        );
    };
    //roomtype
    const handleRoomTypeChange = (selectedType) => {
        setRoomType((prevType) => (prevType === selectedType ? "" : selectedType));
    };
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h4>
                    Filters
                    <hr />
                </h4>
                <button className="close-button" onClick={onClose}>
                    <span>&times;</span>
                </button>
                <div className="modal-filters-container">
                    <div className="filter-section">
                        <label>Price Range:</label>
                        <InputRange
                            minValue={600}
                            maxValue={30000}
                            value={priceRange}
                            onChange={handlePriceRangeChange}
                        />
                        <div className="range-inputs">
                            <input
                                type="number"
                                value={priceRange.min}
                                onChange={handleMinInput}
                            />
                            <span>-</span>
                            <input
                                type="number"
                                value={priceRange.max}
                                onChange={handleMaxInput}
                            />
                        </div>
                    </div>
                    <div className="filter-section">
                        <label>Property Type: </label>
                        <div className="icon-box">
                            {propertyTypeOption.map((options) => (
                                <div
                                    key={options.value}
                                    className={`selectable-box ${propertyType === options.value ? "selected" : ""
                                        }`}
                                    onClick={() => handlePropertyTypeChange(options.value)}
                                >
                                    <span className="material-icons">{options.icon}</span>
                                    <span>{options.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filter-section">
                        <label>Room Type: </label>
                        <div className="icon-box">
                            {roomTypeOPtions.map((options) => (
                                <div
                                    key={options.value}
                                    className={`selectable-box ${roomType === options.value ? "selected" : ""
                                        }`}
                                    onClick={() => handleRoomTypeChange(options.value)}
                                >
                                    <span className="material-icons">{options.icon}</span>
                                    <span>{options.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filter-section">
                        <label>Amenities: </label>
                        <div className="amenities-checkboxes">
                            {amenitiesOptions.map((options) => (
                                <div key={options.value} className="amenity-checkbox">
                                    {console.log(amenities.includes(options.value))}
                                    <input
                                        type="checkbox"
                                        value={options.value}
                                        checked={amenities.includes(options.value)}
                                        onChange={() => handleAmenitiesChange(options.value)}
                                    />
                                    <span className="material-icons amenitieslabel">
                                        {options.icon}
                                    </span>
                                    <span >{options.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filter-buttons">
                        <button className="clear-button" onClick={handleClearFilters}>Clear</button>
                        <button onClick={handleFilterChange}>Apply Filters</button>
                    </div>



                </div>
            </div>
        </div >
    );
};

FilterModel.propTypes = {
    selectedFilters: propTypes.object.isRequired,
    onFilterChange: propTypes.func.isRequired,
    onClose: propTypes.func.isRequired,
}
export default FilterModel;