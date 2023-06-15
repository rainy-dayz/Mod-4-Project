const express = require('express');
const { Spot,SpotImage,User,Review,ReviewImage } = require('../../db/models');
const { requireAuth} = require("../../utils/auth");

const router = express.Router();





router.delete('/:imageId', requireAuth,async (req,res)=>{
    let reviewimage = await ReviewImage.findByPk(req.params.imageId)
    if (!reviewimage){
        return res.status(404).json({message: "Review Image couldn't be found"})
    }
    const reviews =await Review.findAll()
    const reviewid= reviews.find(review =>{
        return review.id === reviewimage.reviewId && review.userId !== req.user.dataValues.id
    })
    if(reviewid) return res.status(403).json({message:"You are not authorized the delete this review image"})
    await reviewimage.destroy()

    res.json({message:"Successfully deleted"})

})

















module.exports = router;
