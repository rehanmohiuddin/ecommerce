import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Mobiles",
    description:
      "literature in the form of prose, especially novels, that describes imaginary events and people",
    thumbnail:
      "https://rukminim1.flixcart.com/flap/128/128/image/3c0ed3a475254040.png?q=100",
  },
  {
    _id: uuid(),
    categoryName: "Fashion",
    description:
      "Non-fiction is writing that gives information or describes real events, rather than telling a story.",
    thumbnail:
      "https://rukminim1.flixcart.com/flap/128/128/image/46c3edba4449be2d.png?q=100",
  },
  {
    _id: uuid(),
    categoryName: "Electronics",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
    thumbnail:
      "https://rukminim1.flixcart.com/flap/128/128/image/033d10763bb282c8.png?q=100",
  },
  {
    _id: uuid(),
    categoryName: "Grocery",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
    thumbnail:
      "https://rukminim1.flixcart.com/flap/128/128/image/7b40fd650e7df157.png?q=100",
  },
];
