import { faCircle, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { APPLY_FILTER, GET_ALL_PRODUCTS } from "../../actions/Products";
import { getAllProducts, useProducts } from "../../Context/products";
import {
  activeFilterState,
  categoryState,
  ratingState,
  selectedFilterState,
} from "./Util/constants";

function Filters() {
  const { dispatch } = useProducts();
  const [activeFilter, setActiveFilter] = useState({});
  const [categoryFilterList, setCategoryFilter] = useState(categoryState);
  const [ratingFilter, setRatingFilter] = useState(ratingState);
  const [selectedPriceFilter, setSelectedPriceFilter] =
    useState(selectedFilterState);
  const [activeFilters, setActiveFilters] = useState(activeFilterState);
  useEffect(() => {
    Object.keys(activeFilter).length > 0 &&
      dispatch({
        type: APPLY_FILTER,
        data: activeFilter,
      });
  }, [activeFilter]);

  const priceFilterList = {
    min: [
      {
        price: "Min",
      },
      {
        price: 10,
      },
      {
        price: 1000,
      },
      {
        price: 5000,
      },
      {
        price: 7000,
      },
    ],
    max: [
      {
        price: 10000,
      },
      {
        price: 30000,
      },
      {
        price: 50000,
      },
      {
        price: 100000,
      },
    ],
  };
  const filterMapper = {
    category: (filter) =>
      setCategoryFilter((_catFilter) => {
        _catFilter.forEach(
          (_fil) => (_fil.selected = _fil.name === filter && false)
        );
        return _catFilter;
      }),
    price: () => setSelectedPriceFilter({ min: 0, max: 100000 }),
    rating: (filter) =>
      setRatingFilter((_ratingFilter) => {
        _ratingFilter.forEach(
          (_fil) => (_fil.selected = _fil.name === filter && false)
        );
        return _ratingFilter;
      }),
  };

  const removeFilter = (filter_name) => {
    filterMapper[filter_name](activeFilters[filter_name]);
    setActiveFilter({ ...activeFilter, [filter_name]: null });
    setActiveFilters({ ...activeFilters, [filter_name]: null });
  };

  const handlePriceRange = (e) => {
    const _range = parseInt(e.target.value);
    const _rangeResult = priceFilterList.max.filter(
      (maxPrice) => maxPrice.price === _range
    );
    if (_rangeResult.length > 0) {
      setSelectedPriceFilter({ ...selectedPriceFilter, max: _range });
      setActiveFilter({
        ...activeFilter,
        price: { ...selectedPriceFilter, max: _range },
      });
    }
  };

  const setPriceFilter = (e, type) => {
    setSelectedPriceFilter({ [type]: e.target.value });
    setActiveFilter({
      ...activeFilter,
      price: activeFilter.price
        ? { ...activeFilter.price, [type]: parseInt(e.target.value) }
        : { [type]: parseInt(e.target.value) },
    });
    setActiveFilters({
      ...activeFilters,
      price:
        type === "min"
          ? `₹${e.target.value} - 100000`
          : activeFilters.price.split("-")[0] + ` - ₹${e.target.value}`,
    });
  };

  const clearAll = async () => {
    setSelectedPriceFilter({ ...selectedPriceFilter, min: null, max: 100000 });
    setActiveFilters({ category: null, price: null, rating: null });
    setCategoryFilter([
      { name: "smartphones", selected: false },
      { name: "laptops", selected: false },
      { name: "home-decoration", selected: false },
      { name: "groceries", selected: false },
      { name: "fragrances", selected: false },
      { name: "skincare", selected: false },
    ]);
    setRatingFilter([
      { name: 4, selected: false },
      { name: 3, selected: false },
      { name: 2, selected: false },
      { name: 1, selected: false },
    ]);
    dispatch({ type: GET_ALL_PRODUCTS, data: await getAllProducts() });
  };
  return (
    <div className="product-filters">
      <div className="filters-header">
        <div className="filter-heading-container">
          <h3 className="kash-h5 filter-heading">Filters</h3>
          <div onClick={clearAll} className="clear-btn">
            Clear All
          </div>
        </div>
        <div className="applied-filters-container">
          {Object.keys(activeFilters).map(
            (_filter) =>
              activeFilters[_filter] && (
                <div className="applied-filter">
                  <FontAwesomeIcon
                    onClick={() => removeFilter(_filter)}
                    icon={faClose}
                  />
                  <span>{activeFilters[_filter]}</span>
                </div>
              )
          )}
        </div>
      </div>
      <div className="filter-container">
        <div className="filter-section-heading">CATEGORIES</div>
        <ul className="filters-list">
          {categoryFilterList.map((_cat, index) => (
            <li key={index}>
              <input
                onChange={(e) => {
                  setActiveFilter({
                    ...activeFilter,
                    category: e.target.checked ? _cat.name : null,
                  });
                  setCategoryFilter((_catFilters) => {
                    _catFilters.forEach(
                      (_fil, _ind) =>
                        (_fil.selected =
                          _ind === index ? e.target.checked : false)
                    );
                    return _catFilters;
                  });
                  setActiveFilters({ ...activeFilters, category: _cat.name });
                }}
                checked={_cat.selected}
                type={"checkbox"}
              />
              <span>{_cat.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="filter-container">
        <div className="filter-section-heading">PRICE</div>
        <div className="price-range-container">
          <input
            onChange={handlePriceRange}
            className="filter-range"
            type={"range"}
            min={10000}
            max={100000}
            step={10000}
          />
        </div>
        <div className="price-options-container">
          <div className="select-container">
            <select
              value={selectedPriceFilter.min}
              onChange={(e) => setPriceFilter(e, "min")}
            >
              {priceFilterList.min.map((_cat) => (
                <option value={_cat.price}>₹ {_cat.price}</option>
              ))}
            </select>
          </div>
          <span>-</span>
          <div className="select-container">
            <select
              value={selectedPriceFilter.max}
              onChange={(e) => setPriceFilter(e, "max")}
            >
              {priceFilterList.max.map((_cat) => (
                <option value={_cat.price}>₹ {_cat.price}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="filter-container">
        <div className="filter-section-heading">RATING</div>
        <ul className="filters-list">
          {ratingFilter.map((_rating, index) => (
            <li>
              <input
                onChange={(e) => {
                  setActiveFilter({
                    ...activeFilter,
                    rating: e.target.checked ? _rating.name : null,
                  });
                  setRatingFilter((_ratingFilter) => {
                    _ratingFilter.forEach(
                      (_fil, _ind) =>
                        (_fil.selected =
                          _ind === index ? e.target.checked : false)
                    );
                    return _ratingFilter;
                  });
                  setActiveFilters({
                    ...activeFilters,
                    rating: `${_rating.name}★ & above`,
                  });
                }}
                type={"checkbox"}
                checked={_rating.selected}
              />
              <span>{_rating.name}★ & above</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Filters;
