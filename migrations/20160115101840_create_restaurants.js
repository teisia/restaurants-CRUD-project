exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function(table){
    table.increments();
    table.string('name');
    table.string('city');
    table.string('state');
    table.string('cuisine');
    table.integer('rating');
    table.text('bio');
    table.string('image');
    table.integer('neighborhood_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
