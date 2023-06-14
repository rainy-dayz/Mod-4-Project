'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        userId:2,
        startDate:"2023-11-19",
        endDate:"2023-11-20",
      },
      {
        spotId:3,
        userId:3,
        startDate:"2023-11-19",
        endDate:"2023-11-20",
      },
      {
        spotId:2,
        userId:3,
        startDate:"2021-11-19",
        endDate:"2021-11-20",
      },
      {
        spotId:4,
        userId:3,
        startDate:"2023-10-11",
        endDate:"2023-10-20",
      },
  ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      id:{ [Op.in]:[1,2,3,4]}
    }, {});
  }
};
