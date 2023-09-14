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
        "spotId": 5,
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
      {
        "userId": 3,
        "spotId": 7,
        "review": "Meh!",
        "stars": 3,
      },
      {
        "userId": 4,
        "spotId": 6,
        "review": "Coolio!",
        "stars": 4,
      },
      {
        "userId": 2,
        "spotId": 8,
        "review": "Has a great old timey vibe!",
        "stars": 4,
      },
      {
        "userId": 1,
        "spotId": 9,
        "review": "Hated every second!!",
        "stars": 1,
      },
      {
        "userId": 4,
        "spotId": 10,
        "review": "Pretty good for what it was",
        "stars": 3,
      },
      {
        "userId": 4,
        "spotId": 11,
        "review": "It's a no for me",
        "stars": 2,
      },
      {
        "userId": 3,
        "spotId": 12,
        "review": "Way bigger than disneyland by a lot",
        "stars": 5,
      },
      {
        "userId": 4,
        "spotId": 13,
        "review": "Not my vibe",
        "stars": 2,
      },
      {
        "userId": 3,
        "spotId": 14,
        "review": "Average, but really hot!",
        "stars": 3,
      },
      {
        "userId": 4,
        "spotId": 15,
        "review": "Overall not bad",
        "stars": 3,
      },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]:["This was an awesome spot!","This place Sucked!!","Chill enough!","Average!","Cool!",
      "Meh!","Coolio!","Has a great old timey vibe!","Hated every second!!", "Pretty good for what it was","It's a no for me",
      "Way bigger than disneyland by a lot","Not my vibe","Average, but really hot!", "Overall not bad"]}
    }, {});
  }
};
