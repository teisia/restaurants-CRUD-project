exports.up = function(knex, Promise) {
  return knex.schema.createTable('neighborhoods', function(table){
    table.increments();
    table.string('epicenter');
    table.string('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('neighborhoods');
};
