const express = require("express");
const {
  Spot,
  SpotImage,
  User,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

const validateSpot = (address,city,state,country,lat,lng,name, description, price) => {
  let error = {};
  if (!address) error.address = "Street address is required";
  if (!city) error.city = "City is required";
  if (!state) error.state = "State is required";
  if (!country) error.country = "Country is required";
  if (Number.isNaN(lat) || !lat) error.lat = "Latitude is not valid";
  if (Number.isNaN(lng) || !lng) error.lng = "Longitude is not valid";
  if (!name) error.name = "Name is required";
  if (name.length > 50) error.name = "Name must be less than 50 characters";
  if (!description) error.description = "Description is required";
  if (!price) error.price = "Price per day is required";

  if (Object.keys(error).length > 0) {
    return error;
  }
};

router.get("/", async (req, res) => {
  let error2 = {};


  let{page,size}= req.query
  if(!size || size >20) size =20

  if(!page || page > 10) page =1

  let pagination={}

  page=parseInt(page)
  size=parseInt(size)


  if(page >= 1 && size >=1){
  pagination.limit=size
  pagination.offset=size*(page-1)
}
  if(page < 1)error2.page=("Page must be greater thwn or equal to 1")
  if(size < 1)error2.size= ("Size must be greater than or equal to 1")
  if (Object.keys(error2).length > 0) {
    res.status(400)
     return res.json({message:"Bad Request",errors:error2})
  }
  let answer = [];
  let spot = await Spot.findAll({
    include: [{ model: SpotImage }, { model: Review, attributes: ["stars"] }],
    ...pagination
  });

  spot.forEach((spot) => {
    let total = 0;
    spot = spot.toJSON();
    const count = spot.Reviews.map((review) => {
      total += review.stars;
    });
    let avgRating = count.length > 0 ? total / count.length : null;
    if(!spot.SpotImages.length) spot.previewImage='no images'
    for (let image of spot.SpotImages) {
        if(image.preview){
            spot.previewImage = image.url
            break;
          }else if(!image.preview) spot.previewImage = "no preview image"
    }
    delete spot.Reviews;
    delete spot.SpotImages;
    spot.avgRating = Math.round(avgRating*100)/100;
    answer.push(spot);
  });
  res.json({ Spots: answer,page,size });
});

router.get("/current", requireAuth, async (req, res) => {
  let answer = [];
  let spot = await Spot.findAll({
    where: { ownerId: req.user.dataValues.id },
    include: { model: Review },
    include: [{ model: SpotImage }, { model: Review, attributes: ["stars"] }],
  });
  spot.forEach((spot) => {
    let total = 0;
    spot = spot.toJSON();
    const count = spot.Reviews.map((review) => {
      total += review.stars;
    });
    let avgRating = count.length > 0 ? total / count.length : null;
    if(!spot.SpotImages.length) spot.previewImage='no images'
    for (let image of spot.SpotImages) {
      if(image.preview){
        spot.previewImage = image.url
        break;
      }else spot.previewImage = "no preview image"
    }
    delete spot.Reviews;
    delete spot.SpotImages;
    spot.avgRating = Math.round(avgRating*100)/100;
    answer.push(spot);
  });
  res.json({ Spots: answer });
});

router.get('/:spotId/bookings', requireAuth,async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot) return res.status(404).json({message: "Spot couldn't be found"})
    const queries = { where: { spotId:req.params.spotId } };

    if (spot.ownerId !== req.user.dataValues.id) queries.attributes = ["spotId","startDate", "endDate"];
    else queries.include = [{ model: User, attributes: ["id", "firstName", "lastName"] }];

    const Bookings = await Booking.findAll(queries);
    res.json({ Bookings });
  });


router.get("/:spotId/reviews", requireAuth,async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId, {
    attributes: [],
    include: [
      {
        model: Review,
        attributes: ["id","spotId","userId","review","stars","createdAt","updatedAt"],
        include: [
          {
            model: User,
            as: "User",
            attributes: ["id", "firstName", "lastName"],
          },
          { model: ReviewImage, attributes: ["id", "url"] },
        ],
      },
    ],
  });
  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
  }
  res.json(spot);
});

router.get("/:spotId", async (req, res) => {
  let answer = [];
  let spot = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: SpotImage, attributes:{exclude:["spotId",'createdAt','updatedAt']}},
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
      { model: Review },
    ],
  });

  if (spot) {
    let total = 0;
    const count = spot.Reviews.map((review) => {
      total += review.stars;
    });
    let avgRating = count.length > 0 ? total / count.length : null;
    let place = spot.toJSON();
    delete place.Reviews;
    place.numReviews = count.length;
    place.avgStarRating = Math.round(avgRating*100)/100;
    answer.push(place);
    res.json(answer);
  } else {
    res.status(404);
    return res.json({ message: "Spot couldn't be found" });
  }
});


router.post('/:spotId/bookings', requireAuth,async (req,res) =>{
  const {startDate,endDate} = req.body
  const spot = await Spot.findByPk(req.params.spotId);
  if(!spot){
    return res.status(404).json({message: "Spot couldn't be found"});
  }
  if(spot.ownerId === req.user.dataValues.id){
    return res.status(403).json({message:"Cannot book a property your own"})
  }
  if(startDate >=endDate){
    return res.status(400).json({message:"Bad Request", errors:{endDate:"endDate cannot be on or before startDate"}})
  }
const bookings = await Booking.findAll()
let allBookings=[]
const bookingMatch = bookings.forEach(book =>{
  book=book.toJSON()
  if(spot.id === book.spotId) allBookings.push(book)

})

let errors={}

allBookings.forEach(final =>{
  if(final.startDate <= startDate && final.endDate >= startDate)errors.startDate = "Start date conflicts with an existing booking"
  if(final.startDate <=endDate && final.endDate >= endDate) errors.endDate="End date conflicts with an existing booking"
})

if(Object.keys(errors).length){
  return res.status(403).json({message: "Sorry, this spot is already booked for the specified dates"})
}else{
  const newbooking = await spot.createBooking({
    userId:req.user.dataValues.id,
    startDate,
    endDate,
  });
  res.json(newbooking)
}
})

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  if(spot.ownerId !== req.user.dataValues.id) return res.status(403).json({message:"To add an image you must own this spot"})
  const newImage = await spot.createSpotImage({
    url,
    preview,
  });

  return res.json({
    id: newImage.id,
    url: newImage.url,
    preview: newImage.preview,
  });
});


const validateReview = (review, stars) => {
  let error = {};
  if (!review) error.review = "Review text is required";
  if (!stars || stars < 0 || stars > 5)
    error.stars = "Stars must be an integer from 1 to 5";

  if (Object.keys(error).length > 0) {
    return error;
  }
};

router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  const { review, stars, userId } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  let error = validateReview(review, stars);
  if (error) {
    res.status(400);
    return res.json({ message: "Bad Request", error: error });
  }
  let reviews = await Review.findAll()

  let reviewAuth = reviews.find(review => {
    return review.userId ===req.user.dataValues.id && spot.id === review.spotId
  })
  if (reviewAuth) {
    return res.status(500).json({
      message: "User already has a review for this spot",
    });
  }
  const newImage = await spot.createReview({
    userId: req.user.dataValues.id,
    review,
    stars,
  });
  return res.status(201).json(newImage);
});

router.put("/:spotId", requireAuth, async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({ message: "Spot couldn't be found" });
  }
  if(spot.ownerId !== req.user.dataValues.id) return res.status(403).json({message:"Cannot edit a spot you do not own"})
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  let error = validateSpot(address,city,state,country,lat,lng,name, description, price)
  if (error) {
    res.status(400);
    return res.json({ message: "Bad Request", error: error });
  }
  await spot.update({
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price,
  });

  res.json(spot);
});

router.post("/", requireAuth, async (req, res, next) => {
  const {ownerId,address,city,state,country,lat,lng,name, description, price} = req.body;

  let error = validateSpot(address,city,state,country,lat,lng,name, description, price)
  if (error) {
   return res.status(400).json({ message: "Bad Request", error: error });
  }
  const newSpot = await Spot.create({
    ownerId: req.user.dataValues.id,address,city,state,country,lat,lng,name, description, price
  });
  res.status(201).json(newSpot);
});

router.delete("/:spotId", requireAuth, async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({ message: "Spot couldn't be found" });
  }
  if(spot.ownerId !== req.user.dataValues.id) return res.status(403).json({message:"Cannot delete a spot you do not own"})
  await spot.destroy();

  res.json({ message: "Successfully deleted" });
});

module.exports = router;
