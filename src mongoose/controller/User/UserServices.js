require('app-module-path').addPath(require('app-root-path').toString());
const { filter, sortBy } = require('lodash');
const TAG = '[UserService]';
const {NotFoundError} = require('src/responses');
/**
 * A class for Products
 * @class
 */
class UserService {
  /**
   * @param {Services} Logger
   * @param {Services} ProductRepository
   */
  constructor({Logger, GetAllProducts}) {
    this._logger = Logger;
    this._getAllProducts = GetAllProducts;
  }

  /**
   * @param {array} body
   * @param {string} brandId
   */
  async getProductList(body, brandId) {
    const METHOD = '[getProductList]';
    this._logger.info(`${TAG} ${METHOD}`);

    if (!body || !body.length) {
      throw new NotFoundError('Missing required payload');
    }

    // get all products associated with the payload
    const product = await this._getAllProducts.getProducts(body, brandId);
    this._logger.info(`${TAG} ${METHOD} [product.bankId] ${product.bankId}`);
    this._logger.info(`${TAG} ${METHOD} [brandId] ${brandId}`);

    // filter updated and deleted products and sort by name
    return {
      updatedProducts: sortBy(filter(product, ['online', 1]), ['name']) || [],
      deletedProducts: sortBy(filter(product, ['online', 0]), ['name']) || [],
    };
  }
}

module.exports = UserService;
