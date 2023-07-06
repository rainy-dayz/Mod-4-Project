'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "Anaheim",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "DisneyLand",
        description: "Place where web developers are created",
        price: 123,
      },
      {
        ownerId: 2,
        address: "6561 Beach Boulevard",
        city: "Buena Park",
        state: "California",
        country: "United States of America",
        lat: 33.8652,
        lng: -117.9985,
        name: "Knott's Berry Farm",
        description: "We got Funnel Cake",
        price: 60,
      },
      {
        ownerId: 2,
        address: "26101 Magic Mountain Pkwy",
        city: "Valencia",
        state: "California",
        country: "United States of America",
        lat: 34.3917,
        lng: -118.5426,
        name: "Six Flags",
        description: "Most Exciting Theme Park",
        price: 80,
      },
      {
        ownerId: 2,
        address: "100 Universal City Plaza",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.136518,
        lng: -118.356051,
        name: "Universal Studios",
        description: "All of the stars are here",
        price: 100,
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      address:{ [Op.in]:['123 Disney Lane', '6561 Beach Boulevard','26101 Magic Mountain Pkwy','100 Universal City Plaza']}
    }, {});
  }
};
