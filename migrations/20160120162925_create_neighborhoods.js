exports.up = function(knex, Promise) {
  return knex.schema.createTable('neigborhoods', function(table){
    table.increments();
    table.string('address');
    table.string('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('neighborhoods');
};
