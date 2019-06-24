'use strict'

class Product {
  get rules () {
    const userId = this.ctx.params.id
    return {
      name: `required|unique:products,name,id,${userId}`,
      description: 'required',
      estimated: 'required',
      file_id: 'required|integer|min:1'
    }
  }
}

module.exports = Product
