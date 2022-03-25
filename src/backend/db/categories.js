import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "smartphones",
    description:
      "literature in the form of prose, especially novels, that describes imaginary events and people",
    thumbnail:
      "https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100",
  },
  {
    _id: uuid(),
    categoryName: "laptops",
    description:
      "Non-fiction is writing that gives information or describes real events, rather than telling a story.",
    thumbnail:
      "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
  },
  {
    _id: uuid(),
    categoryName: "home-decoration",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
    thumbnail:
      "https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100",
  },
  {
    _id: uuid(),
    categoryName: "groceries",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
    thumbnail:
      "https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
  },
  {
    _id: uuid(),
    categoryName: "fragrances",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
    thumbnail:
      "https://rukminim1.flixcart.com/image/612/612/kctf0cw0pkrrdj/personal-care/s/t/p/100-scent-impressio-fogg-original-imafty3b5fnh5fkg.jpeg?q=70",
  },
  {
    _id: uuid(),
    categoryName: "skincare",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
    thumbnail:
      "https://rukminim1.flixcart.com/image/612/612/kj36ky80-0/sunscreen/2/a/d/100-herbals-safe-sun-sun-block-cream-spf30-pa-uva-pack-of-2-30-original-imaeza44kd6eghhv.jpeg?q=70",
  },
];
