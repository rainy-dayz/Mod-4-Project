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
    res.json(answer)
});




router.delete('/:bookingId', requireAuth,async (req,res)=>{
    let booking = await Booking.findByPk(req.params.bookingId, {include:{model:Spot}})
    if (!booking){
        res.status(404)
        return res.json({message: "Booking couldn't be found"})
    }
    if(booking.userId !== req.user.dataValues.id || booking.Spot.ownerId !== req.user.dataValues.id ) {
        return res.status(403).json({message:"You are not authorized the delete this booking"})
    }
    await booking.destroy()

    res.json({message:"Successfully deleted"})

})


module.exports = router;
