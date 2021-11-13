const { where } = require('../../schema/ContractorDocSchema');

const knex = require('knex')(require('../../knexfile'));
const APP = '[BaseRepo]';
/**
 * A base class for database query
 * @class
 */
class BaseRepository {
  /**
 * @param {object} table Instance of database table
 */
  constructor(table) {
    this._table = table;
    this._knex = knex;
  }

  /**
   * @param {object} data
   */
  async insert(data) {
    console.log(APP, '[insert]');
    try {
      return knex(this._table)
            .insert(data);
    } catch (SQLError) {
      throw new Error(SQLError);
    }
  }

  /**
   *  @param {string} table
   *  @param {object} body
   */
  async insertOrUpdate(table, body){

    const insert = await this._knex(table || this._table).insert(body).toString();
    const update = await this._knex(table || this._table).update(body).toString().replace(/^update(.*?)set\s/gi, '');
    return await this._knex
      .raw(`${insert} ON DUPLICATE KEY UPDATE ${update}`);
  }


  /**
   * @param {*} knownKey -
   * @param {*} knownValue -
   */
  // async countBySpecificKey(knownKey, knownValue) {
  //   try {
  //     return knex(this._table)
  //         .count('* as totalCount')
  //         .where({[knownKey]: knownValue})
  //         .then((res) => res[0]);
  //   } catch (SQLError) {
  //     throw new Error(SQLError);
  //   }
  // }

  /**
   * count the total size of the table.
   */
  async count() {
    console.log(APP, '[count]');
    try {
      const result = await knex(this._table)
          .count('* as totalCount')
          .then((res) => res[0]);

      return result.totalCount;
    } catch (SQLError) {
      throw new Error(SQLError);
    }
  }

  async countActive() {
    console.log(APP, '[countActive]');
    try {
      const result = await knex(this._table)
          .count('* as totalCount')
          .where('status', 1)
          .then((res) => res[0]);

      return result.totalCount;
    } catch (SQLError) {
      throw new Error(SQLError);
    }
  }

  /**
   * @param {string} id
   * @param {string} status
   * @param {string} datetime
   */
  // async findOneById(id, status, datetime) {
  //   try {
  //     return knex(this._table)
  //         .where({referenceId: id})
  //         .andWhere({status: status})
  //         .andWhere({dateTime: datetime});
  //   } catch (SQLError) {
  //     throw new Error(SQLError);
  //   }
  // }

  /**
   * @param {object} data
   */
  async findAll() {
    console.log(APP, '[findAll]');
    try {
      return knex(this._table)
          .select();
    } catch (SQLError) {
      throw new Error(SQLError);
    }
  }

  /**
   * @param {object} data
   */
  // async findAllById(data) {
  //   try {
  //     return knex(this._table)
  //         .where(data);
  //   } catch (SQLError) {
  //     throw new Error(SQLError);
  //   }
  // }

  /**
   * @param {object} data
   * @param {object} status
   */
  // async findOneStatus(data, status) {
  //   try {
  //     return knex(this._table)
  //         .where(data)
  //         .andWhere({status: status})
  //         .orderBy('dateTime', 'desc');
  //   } catch (SQLError) {
  //     throw new Error(SQLError);
  //   }
  // }

  /**
   * Get item with any known key value pair
   * @param {string} knownKey - Known key
   * @param {*} knownValue - Known Value
   */
  async getBySpecificKey(knownKey, knownValue) {
    console.log(APP, '[getBySpecificKey]');
    let result;
    try {
      result = await knex(this._table)
          .where({[knownKey]: knownValue})
          .select()
          .first();
    } catch (SQLError) {
      console.log(SQLError);
      throw new Error(SQLError);
    }
    return result;
  }

  /**
   * Get item with any known key value pair
   * @param {string} knownKey - Known key
   * @param {*} knownValue - Known Value
   */
  async getAllBySpecificKey(knownKey, knownValue) {
    console.log(APP, '[getAllBySpecificKey]');
    let result;
    try {
      result = await knex(this._table)
          .where({[knownKey]: knownValue})
          .select();
    } catch (SQLError) {
      console.log(SQLError);
      throw new Error(SQLError);
    }
    return result;
  }

  /**
   * Get item with any known key value pair
   * @param {string} knownKey - Known key
   * @param {*} knownValue - Known Value
   */
  // async getBySpecificCognitoId(knownKey, knownValue) {
  //   let result;
  //   try {
  //     result = await knex(this._table)
  //         .where({[knownKey]: knownValue})
  //         .select();
  //   } catch (SQLError) {
  //     console.log(SQLError);
  //     throw new Error(SQLError);
  //   }
  //   return result;
  // }


  /**
   * Update Record by Specific Key
   * @param {string} specifiedKey Key reference
   * @param {string | number | bool} specifiedValue Value of the key
   * @param {object} updateValues Values to update
   */
  async updateBySpecificKey(specifiedKey, specifiedValue, updateValues) {
    console.log(APP, '[updateBySpecificKey]');
    let result;
    try {
      result = await knex(this._table)
          .where({[specifiedKey]: specifiedValue})
          .update(updateValues);
    } catch (SQLError) {
      throw new Error(SQLError);
    }
    return result;
  }

  /**
   * Get records with conditon and select only first four fields
   * @param {*} condition
   * @param {*} table
   * @param {*} key
   * @param {*} fieldOne
   * @param {*} fieldTwo
   * @param {*} fieldThree
   * @param {*} fieldFour
   */
  // async getListWithMatchedTableRecords(condition, table, key,
  //     fieldOne, fieldTwo, fieldThree, fieldFour) {
  //   try {
  //     return await knex(this._table)
  //         .where(condition)
  //         .leftJoin(table, `${this._table}.${key}`, `${table}.${key}`)
  //         .select(fieldOne, fieldTwo, fieldThree, fieldFour);
  //   } catch (SQLError) {
  //     throw new Error(SQLError);
  //   }
  // }

  /**
   * Delete record by Specific Key
   * @param {string} specifiedKey - Key reference
   * @param {string | number | bool} specifiedValue Value of the key
   */
  async deleteRecord(specifiedKey, specifiedValue) {
    console.log(APP, '[deleteRecord]');
    try {
      await knex(this._table)
          .del()
          .where({[specifiedKey]: specifiedValue});
    } catch (SQLError) {
      throw new Error(SQLError);
    }
  }
}

module.exports = BaseRepository;
