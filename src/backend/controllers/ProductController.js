import { Response } from "miragejs";
import { carouselOffers } from "../db/products";

/**
 * All the routes related to Product are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all products in the db.
 * send GET Request at /api/products
 * */

export const getAllProductsHandler = function () {
  return new Response(200, {}, { products: this.db.products });
};

export const getFeaturedProductsHandler = (schema, request) => {
  try {
    const products = schema.db.products.where((_pro) => _pro.id >= 12);
    return new Response(200, {}, { featuredProducts: products });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const getCarouselHandler = function () {
  return new Response(200, {}, { offers: this.db.offers });
};
/**
 * This handler handles gets all products in the db.
 * send GET Request at /api/user/products/:productId
 * */
export const getProductsByCategoryHandler = (schema, request) => {
  try {
    const category = request.params.category;
    const products = schema.db.products.where({ category: category });
    return new Response(200, {}, { products: products });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
export const getProductHandler = function (schema, request) {
  const productId = request.params.productId;
  try {
    const product = schema.products.findBy({ _id: productId });
    return new Response(200, {}, { product });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const searchProduct = function (schema, request) {
  const searchQuery = request.params.productQuery;
  try {
    const products = schema.db.products.where((product) =>
      product.title.toLowerCase().includes(searchQuery)
    );
    return new Response(200, {}, { products });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
