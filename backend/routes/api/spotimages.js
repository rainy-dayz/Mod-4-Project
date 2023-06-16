const express = require('express');
const { Spot,SpotImage,User,Review,ReviewImage } = require('../../db/models');
const { requireAuth} = require("../../utils/auth");

const router = express.Router();




router.delete('/:imageId', requireAuth,async (req,res)=>{
    let spotimage = await SpotImage.findByPk(req.params.imageId)
    if (!spotimage){
        res.status(404)
        return res.json({message: "Spot Image couldn't be found"})
    }
    const spots = await Spot.findAll()
    const spotid = spots.find(spot=>{
        return spot.id === spotimage.spotId && spot.ownerId !== req.user.dataValues.id

    })

    if(spotid) return res.status(403).json({message:"You are not authorized the delete this spot image"})
    await spotimage.destroy()

    res.status(404).json({message:"Successfully deleted"})

})




module.exports = router;
