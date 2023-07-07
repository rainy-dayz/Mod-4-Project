'use strict';


/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        url:'https://wallpaperaccess.com/full/870823.jpg',
        preview:true
      },
      {
        spotId:1,
        url:'https://s1.1zoom.me/b4952/174/USA_Disneyland_Parks_Houses_California_Anaheim_520756_3840x2400.jpg',
        preview:false
      },
      {
        spotId:1,
        url:'https://1.bp.blogspot.com/-8w5yjNv4T-0/TtpvG98FIoI/AAAAAAAAFhM/vAiOJP8amXg/s1600/Amazing+Disneyland+Photos3.jpg',
        preview:false
      },
      {
        spotId:1,
        url:'https://wallpapercave.com/wp/X79mL2G.jpg',
        preview:false
      },
      {
        spotId:1,
        url:'https://foundtheworld.com/wp-content/uploads/2016/06/Disneyland-California-2.jpg',
        preview:false
      },
      {
        spotId:2,
        url:'https://www.ocregister.com/wp-content/uploads/2019/03/OCR-L-KNOTTS-BETTER-0329-10-2-1.jpg?w=1024&h=751',
        preview:true
      },
      {
        spotId:2,
        url:'https://www.insideuniversal.net/wp-content/uploads/2021/05/knotts100-scaled.jpeg',
        preview:false
      },
      {
        spotId:2,
        url:'https://wallpapercave.com/wp/wp3061834.jpg',
        preview:false
      },
      {
        spotId:2,
        url:'https://images.trvl-media.com/media/content/shared/images/travelguides/destination/7139/Knotts-Berry-Farm-20980.jpg',
        preview:false
      },
      {
        spotId:2,
        url:'https://i.pinimg.com/736x/00/fc/00/00fc0099dea656af01836d7a6f3c9df4--berry-farms.jpg',
        preview:false
      },
      {
        spotId:3,
        url:'https://kingged.com/wp-content/uploads/2019/09/Six-Flags-coupons.jpeg',
        preview:true
      },
      {
        spotId:3,
        url:'https://scvnews.com/wp-content/uploads/2017/08/six-flags-crazanity-key-art.jpg',
        preview:false
      },
      {
        spotId:3,
        url:'https://live.staticflickr.com/3744/13208988393_97da05ed7c_b.jpg',
        preview:false
      },
      {
        spotId:3,
        url:'https://blog.raynatours.com/wp-content/uploads/2015/09/six-flags-amusement-park.jpg',
        preview:false
      },
      {
        spotId:3,
        url:'https://i.pinimg.com/originals/15/a4/82/15a482056225d6633014069015224da3.jpg',
        preview:false
      },
      {
        spotId:4,
        url:'https://nbc-2.com/wp-content/uploads/2020/08/universal.jpg',
        preview:true
      },
      {
        spotId:4,
        url:'https://tillthemoneyrunsout.com/wp-content/uploads/2015/11/Diagon-Alley-Visiting-Harry-Potter-World-Orlando.jpg',
        preview:false
      },
      {
        spotId:4,
        url:'https://2.bp.blogspot.com/-TFuR6jEM5Ag/T7heik6SmvI/AAAAAAAAAEo/FHNhZ9ybkmc/s1600/sentossa+3.jpg',
        preview:false
      },
      {
        spotId:4,
        url:'https://cdn.cnn.com/cnnnext/dam/assets/210901000826-06-universal-beijing-super-tease.jpg',
        preview:false
      },
      {
        spotId:4,
        url:'https://i.pinimg.com/originals/45/4a/13/454a136f637532ddc68200b0d352dd30.jpg',
        preview:false
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4]}
    }, {});
  }
};
