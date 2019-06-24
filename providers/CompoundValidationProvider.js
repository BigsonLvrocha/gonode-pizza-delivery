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
  }
}

module.exports = CompoundValidationProvider
