import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: "x1-A5-e345",
    name: "Rehan Mohiuddin",
    email: "rehan.4942@gmail.com",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    gender: "Male",
    address: "Flat No 103 Jublee Hills Road No 10 Hyderabad Telangana ",
    pincode: "500059",
    country: "India",
    state: "Telangana",
  },
];
