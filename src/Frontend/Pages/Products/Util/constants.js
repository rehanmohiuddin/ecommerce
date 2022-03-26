const categoryState = [
  { name: "smartphones", selected: false },
  { name: "laptops", selected: false },
  { name: "home-decoration", selected: false },
  { name: "groceries", selected: false },
  { name: "fragrances", selected: false },
  { name: "skincare", selected: false },
];

const ratingState = [
  { name: 4, selected: false },
  { name: 3, selected: false },
  { name: 2, selected: false },
  { name: 1, selected: false },
];

const selectedFilterState = {
  min: null,
  max: 100000,
};
const activeFilterState = {
  category: null,
  price: null,
  rating: null,
};

export { categoryState, ratingState, selectedFilterState, activeFilterState };
