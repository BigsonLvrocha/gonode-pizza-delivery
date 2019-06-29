'use strict'

const Antl = use('Antl')
class Product {
  get validateAll () {
    return true
  }

  get rules () {
    const userId = this.ctx.params.id
    return {
      name: `required|unique:products,name,id,${userId}`,
      description: 'required',
      estimated: 'required',
      file_id: 'required|integer|min:1'
    }
  }
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Product
