exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function(table){
    table.increments();
    table.string('name');
    table.string('street1');
    table.string('street2');
    table.string('city');
    table.string('state');
    table.integer('zip');
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
