'use strict';


/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        "userId": 1,
        "spotId": 2,
        "review": "This was an awesome spot!",
        "stars": 5,
      },
      {
        "userId": 3,
        "spotId": 2,
        "review": "This place Sucked!!",
        "stars": 2,
      },
      {
        "userId": 2,
        "spotId": 1,
        "review": "Chill enough!",
        "stars": 3,
      },
      {
        "userId": 3,
        "spotId": 4,
        "review": "Average!",
        "stars": 3,
      },
      {
        "userId": 3,
        "spotId": 3,
        "review": "Cool!",
        "stars": 4,
      },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]:[1,2,3,4,5]}
    }, {});
  }
};
