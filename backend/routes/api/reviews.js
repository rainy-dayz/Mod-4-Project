const express = require('express');
const { Spot,SpotImage,User,Review,ReviewImage } = require('../../db/models');
const { requireAuth} = require("../../utils/auth");

const router = express.Router();

router.get('/current', requireAuth,async(req,res)=>{
    let answer=[]
    let review = await Review.findAll({
        where:{userId:req.user.dataValues.id},
        include:[
      {model:User, attributes:['id','firstName','lastName']},
      {model:Spot, attributes:{exclude:['description','createdAt','updatedAt']}, include:{model:SpotImage}},
      {model:ReviewImage,attributes:{exclude:['reviewId','createdAt','updatedAt']}},
        ]
    })
    review.forEach((spot)=> {
        spot =spot.toJSON()
    for(let image of spot.Spot.SpotImages){
        if(image.preview) {
            spot.Spot.previewImage = image.url;
            break;
        }
            spot.Spot.previewImage='no preview image'
    }
    delete spot.Spot.SpotImages
    answer.push(spot)
    })
    res.json({Reviews:answer})

  })

router.post('/:reviewId/images', requireAuth, async(req,res)=>{
    const { url} = req.body;
    let review = await Review.findByPk(req.params.reviewId, {include:{model:ReviewImage}})
    if (!review){
        return res.status(404).json({message: "Review couldn't be found"})
    }
    if(review.userId !== req.user.dataValues.id) return res.status(403).json({message:"Review must belong to the current user"})
    if(url === "") res.status(400).json({message:'please provide a url'})

    if(review.ReviewImages.length > 9 ){
        return res.status(403).json({message: "Maximum number of images for this resource was reached"})
    }

    const newImage = await review.createReviewImage({
        url
    })
    return res.json({
        id: newImage.id,
        url: newImage.url,
    })

})

const validateReview = (review, stars) => {
    let error = {};
    if (!review) error.review = "Review text is required";
    if (!stars || stars < 0 || stars > 5)
      error.stars = "Stars must be an integer from 1 to 5";

    if (Object.keys(error).length > 0) {
      return error;
    }
  };

router.put('/:reviewId', requireAuth, async (req,res) =>{
    let reviews = await Review.findByPk(req.params.reviewId)
    const { review, stars,userId,spotId} = req.body;
  if (!reviews) {
    return res.status(400).json({message: "Review couldn't be found"});
  }
if(reviews.userId !== req.user.dataValues.id) return res.status(403).json({message:'You cannot edit a review that belongs to another user'})
  let error = validateReview(review, stars);
  if (error){
    return res.status(400).json({ message: "Bad Request", error: error });
  }
  await reviews.set({
    userId: req.user.dataValues.id,
    spotId:reviews.spotId,
    review,
    stars,
  });
  await reviews.save()
  return res.json(reviews);
})
  router.delete('/:reviewId', requireAuth,async (req,res)=>{
    let review = await Review.findByPk(req.params.reviewId)
    if (!review){
        res.status(404)
        return res.json({message: "Review couldn't be found"})
    }
    if(review.userId !== req.user.dataValues.id) return res.status(403).json({message:"You are not authorized the delete this review"})
    await review.destroy()

    res.json({message:"Successfully deleted"})

})








module.exports = router;
