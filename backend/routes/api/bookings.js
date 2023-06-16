const express = require('express');
const { Spot,SpotImage,User,Review,ReviewImage,Booking } = require('../../db/models');
const { requireAuth} = require("../../utils/auth");

const router = express.Router();


router.get('/current', requireAuth, async (req, res)=>{
    let answer=[]
    let booking = await Booking.findAll({
        where:{userId:req.user.dataValues.id},
        include:{model:Spot, attributes:{exclude:['description','createdAt','updatedAt']},include:{model:SpotImage}}

    })
if(!booking.length) res.json({message: "You have no bookings at this time"})
    booking.forEach((spot)=> {
        spot =spot.toJSON()
    for(let image of spot.Spot.SpotImages){
        if(image.preview) {
            spot.Spot.previewImage = image.url;
           break;
        }else spot.Spot.previewImage='no preview image'
    }
    delete spot.Spot.SpotImages

    answer.push(spot)
    })
    res.json({Bookings:answer})
});

router.put('/:bookingId', requireAuth, async (req, res)=>{
    let bookings = await Booking.findByPk(req.params.bookingId)
    const {startDate,endDate} = req.body;
    if (!bookings) {
        return res.status(404).json({message: "Bookings couldn't be found"});
      }
    if(bookings.userId !== req.user.dataValues.id) return res.status(403).json({message:'Requires Authorization'})
    if(startDate >=endDate){
        return res.status(400).json({message:"Bad Request", errors:{endDate:"endDate cannot be on or before startDate"}})
      }
    let bookingDay= new Date(startDate)
    let today = new Date()

    if(today >= bookingDay) return res.status(403).json({message: "Past bookings can't be modified"})

      const spot = await Spot.findOne({
        where:{id:bookings.spotId},
        include:[Booking]
      })
      let errors={}
      let booking = spot.Bookings
      booking.forEach(book =>{
        let final= book.toJSON()
          if(final.startDate <= startDate && final.endDate >= startDate)errors.startDate = "Start date conflicts with an existing booking"
          if(final.startDate <=endDate && final.endDate >= endDate) errors.endDate="End date conflicts with an existing booking"
      })

      if(Object.keys(errors).length){
        return res.status(403).json({message: "Sorry, this spot is already booked for the specified dates"})
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
    const spot = await Spot.findAll()
    const spotauth = spot.find(spot =>{
        return booking.spotId ===spot.ownerId
    })


    let startDay= new Date(booking.startDate)
    let endDay= new Date(booking.endDate)
    let today = new Date()

    if(today >= startDay && today <=endDay) return res.status(403).json({message: "Bookings that have been started can't be deleted"})
  
    if(booking.userId !== req.user.dataValues.id || !spotauth ) {
        return res.status(403).json({message:"You are not authorized the delete this booking"})
    }
    await booking.destroy()

    res.json({message:"Successfully deleted"})

})


module.exports = router;
