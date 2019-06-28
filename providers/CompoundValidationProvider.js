'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class CompoundValidationProvider extends ServiceProvider {
  async _uniqueFn (data, field, message, args, get) {
    const Database = use('Database')
    let ignoreId = null
    let ignoreField = null
    const table = args[0]
    const uniqueField = args[1]
    const foreignKeyField = args[2]
    const foreignId = args[3]
    if (args[4] && args[5]) {
      ignoreField = args[4]
      ignoreId = args[5]
    }

    const rowCount = await Database.table(table)
      .where(builder => {
        builder.where(uniqueField, '=', get(data, uniqueField))
        builder.where(foreignKeyField, '=', foreignId)
        if (!!ignoreId && !!ignoreField) {
          builder.whereNot(ignoreField, '=', ignoreId)
        }
      })
      .getCount()
    if (rowCount > 0) {
      throw message
    }
  }

  async idsExists (data, field, message, args, get) {
    const ids = get(data, field)
    const Database = use('Database')
    if (!ids) {
      return
    }
    if (!Array.isArray(ids)) {
      return
    }
    const id = args[2] ? args[2] : false
    const uniqueIds = [...new Set(ids.map(item => (id ? item[id] : item)))]
    const table = args[0]
    const idField = args[1] ? args[1] : 'id'
    const rows = await Database.table(table)
      .whereIn(idField, uniqueIds)
      .getCount()
    if (rows !== uniqueIds.length) {
      throw message
    }
  }

  async noDuplicates (data, field, message, args, get) {
    const items = get(data, field)
    if (!items) {
      return
    }
    if (!Array.isArray(items)) {
      return
    }
    const idField = args[0] ? args[0] : false
    const uniqueItems = [
      ...new Set(items.map(item => (idField ? item[idField] : item)))
    ]
    if (uniqueItems.length < items.length) {
      throw message
    }
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    const Validator = use('Validator')

    Validator.extend('uniqueCompound', this._uniqueFn, 'Must be unique')
    Validator.extend('idsExists', this.idsExists, 'all items must exist')
    Validator.extend(
      'noDuplicates',
      this.noDuplicates,
      'There must be no duplicates in array'
    )
  }
}

module.exports = CompoundValidationProvider
