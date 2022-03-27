const getDeliveryDate = () =>
  [
    ...new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
      .toString()
      .split(" "),
  ]
    .filter((val, ind) => ind < 3)
    .join(" ");

export { getDeliveryDate };
