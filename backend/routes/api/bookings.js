const express = require('express');
const { Spot,SpotImage,User,Review,ReviewImage,Booking } = require('../../db/models');
const { requireAuth} = require("../../utils/auth");

const router = express.Router();
let  spottest= [
  {
    id: 19,
    spotId: 1,
    userId: 2,
    startDate: '2023-09-13',
    endDate: '2023-09-17',
    createdAt: '2023-09-13T01:44:04.732Z',
    updatedAt: '2023-09-13T04:01:28.541Z',
    Spot: {
      id: 1,
      ownerId: 1,
      address: '123 Disney Lane',
      city: 'Anaheim',
      state: 'California',
      country: 'United States of America',
      lat: 37.7645358,
      lng: -122.4730327,
      name: 'Disneyland',
      price: 123,
      previewImage: 'https://wallpaperaccess.com/full/870823.jpg'
    }
  }
]

router.get('/current', requireAuth, async (req, res)=>{
    let answer=[]
    let booking = await Booking.findAll({
        where:{userId:req.user.dataValues.id},
        include:{model:Spot, attributes:{exclude:['description','createdAt','updatedAt']},include:{model:SpotImage}}

    })

    booking.forEach((spot)=> {
        spot =spot.toJSON()
        if(!spot.Spot.SpotImages.length) spot.previewImage='no images'
    for(let image of spot.Spot.SpotImages){
        if(image.preview) {
            spot.Spot.previewImage = image.url;
           break;
        }else spot.Spot.previewImage='no preview image'
    }
    delete spot.Spot.SpotImages
    answer.push(spot)
    })
    // console.log('answeraqwfafasdfsdgaerawerhjta')
    res.json({Bookings:answer})
});

router.put('/:bookingId', requireAuth, async (req, res)=>{
    let bookings = await Booking.findByPk(req.params.bookingId)
    const {startDate,endDate} = req.body;
    if (!bookings) {
        return res.status(404).json({message: "Bookings couldn't be found"});
      }
    if(bookings.userId !== req.user.dataValues.id) return res.status(403).json({message:'Cannot edit bookings that are not yours'})
    if(startDate >=endDate){
        return res.status(400).json({message:"Bad Request", errors:{endDate:"Check-Out cannot be before Check-In"}})
      }
    let bookingDay= new Date(startDate)
    let today = new Date()

    if(today >= bookingDay) return res.status(403).json({message:"Bad Request", errors:{endDate: "Past bookings can't be modified"}})

      const spot = await Spot.findOne({where:{id:bookings.spotId},include:[Booking]})
      let errors={}
      let booking = spot.Bookings
      booking.forEach(book =>{
        let final= book.toJSON()
        if((final.startDate <= startDate && final.endDate >= startDate &&final.userId !== req.user.dataValues.id) ||
   (final.startDate <=endDate && final.endDate >= endDate && final.userId !== req.user.dataValues.id))
   errors.startDate = `Booking conflicts with an existing booking ${final.startDate.slice(5,7)}/${final.startDate.slice(8,10)}/${final.startDate.slice(0,4)} - ${final.endDate.slice(5,7)}/${final.endDate.slice(8,10)}/${final.endDate.slice(0,4)}`
          // if(final.startDate <= startDate && final.endDate >= startDate && final.userId !== req.user.dataValues.id)errors.startDate = "Start date conflicts with an existing booking"
          // if(final.startDate <=endDate && final.endDate >= endDate &&final.userId !== req.user.dataValues.id) errors.endDate="End date conflicts with an existing booking"
      })

      if(Object.keys(errors).length){
        return res.status(403).json({message: "Sorry, this spot is already booked for the specified dates",errors:errors})
      }
  await bookings.set({
    startDate,
    endDate,
  });
  await bookings.save()
  return res.json(bookings);

})


router.delete('/:bookingId', requireAuth,async (req,res)=>{
    let booking = await Booking.findByPk(req.params.bookingId)
    if (!booking){
        res.status(404)
        return res.json({message: "Booking couldn't be found"})
    }

    let startDay= new Date(booking.startDate)
    let endDay= new Date(booking.endDate)
    let today = new Date()
    today=today.toISOString()

    if(today >= startDay && today <=endDay) return res.status(403).json({message: "Bookings that have been started can't be deleted"})
    const spot = await Spot.findOne({where:{id:booking.spotId}})

    if(spot.ownerId !== req.user.dataValues.id && booking.userId !== req.user.dataValues.id) {
        return res.status(403).json({message:"You are not authorized the delete this booking"})
    }
    await booking.destroy()

    res.json({message:"Successfully deleted"})

})


module.exports = router;
