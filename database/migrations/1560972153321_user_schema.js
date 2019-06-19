"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.table("users", table => {
      table.enu("role", ["admin", "client"]).defaultTo("client");
    });
  }

  down() {
    this.table("users", table => {
      table.dropColumn("role");
    });
  }
}

module.exports = UserSchema;
