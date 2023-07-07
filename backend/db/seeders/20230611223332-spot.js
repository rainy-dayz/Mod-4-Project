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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Purus viverra accumsan in nisl nisi. Placerat duis ultricies lacus sed turpis tincidunt. Arcu risus quis varius quam. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Pellentesque adipiscing commodo elit at imperdiet dui. Sit amet nulla facilisi morbi tempus iaculis urna. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Et sollicitudin ac orci phasellus egestas. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Turpis in eu mi bibendum neque egestas. Ipsum dolor sit amet consectetur.",
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
        description: "Facilisi nullam vehicula ipsum a arcu cursus vitae congue. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Sem integer vitae justo eget magna. Aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat. Faucibus turpis in eu mi bibendum neque. Netus et malesuada fames ac turpis egestas sed tempus. Cursus mattis molestie a iaculis at. Habitant morbi tristique senectus et. Molestie at elementum eu facilisis sed odio morbi quis commodo. Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Congue mauris rhoncus aenean vel elit scelerisque. Risus quis varius quam quisque id. Quisque egestas diam in arcu cursus euismod quis viverra nibh. Varius duis at consectetur lorem donec massa sapien faucibus. Mollis aliquam ut porttitor leo. Ultrices sagittis orci a scelerisque purus semper eget duis at. Neque egestas congue quisque egestas diam in arcu. Nec sagittis aliquam malesuada bibendum arcu. Dictum at tempor commodo ullamcorper a lacus vestibulum sed.",
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
        description: "At erat pellentesque adipiscing commodo elit at. Senectus et netus et malesuada fames ac turpis egestas. Risus pretium quam vulputate dignissim suspendisse in est. Convallis aenean et tortor at risus viverra adipiscing at. Eu mi bibendum neque egestas congue quisque egestas diam in. Quam nulla porttitor massa id. Ipsum dolor sit amet consectetur adipiscing elit pellentesque. Pharetra massa massa ultricies mi quis hendrerit. A arcu cursus vitae congue mauris rhoncus aenean vel. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra. At in tellus integer feugiat scelerisque varius morbi enim nunc. Ullamcorper malesuada proin libero nunc consequat interdum. Augue interdum velit euismod in pellentesque massa placerat. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Libero id faucibus nisl tincidunt. Lectus mauris ultrices eros in. Tellus integer feugiat scelerisque varius morbi enim nunc. Nunc id cursus metus aliquam eleifend mi in nulla posuere.",
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
        description: "Consequat interdum varius sit amet mattis vulputate. Pellentesque id nibh tortor id aliquet lectus proin. Semper quis lectus nulla at volutpat diam ut. Amet purus gravida quis blandit turpis cursus in hac. Elit at imperdiet dui accumsan sit amet nulla. Vel fringilla est ullamcorper eget nulla facilisi etiam. Non enim praesent elementum facilisis leo vel. Amet nulla facilisi morbi tempus iaculis urna. Risus pretium quam vulputate dignissim suspendisse. Neque vitae tempus quam pellentesque nec. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Vitae et leo duis ut. Sit amet nulla facilisi morbi tempus iaculis urna id volutpat. Velit scelerisque in dictum non.",
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
