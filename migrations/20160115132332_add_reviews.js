exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table){
    table.increments();
    table.string('name');
    table.date('date');
    table.text('review');
    table.integer('rating');
    table.integer('restaurants_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};
